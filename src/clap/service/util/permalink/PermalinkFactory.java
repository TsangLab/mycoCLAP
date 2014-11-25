/**
 * @author Brendan Asselstine
 * @date Sep 23, 2009
 **/

package clap.service.util.permalink;

import java.io.File;
import java.net.URL;
import java.util.List;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.service.logging.Logging;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;


import clap.service.util.BaseURL;

import com.sun.org.apache.xpath.internal.XPathAPI;

/**
 * Class used to load Permalink information from the Permalink.xml file.
 * 
 * Stuart Says:: Each permalink keeps a pattern, its dispatcher and attributes. When something tries
 * to extract, if a match is found all the attributes are set in PERMALINK_ATTRIBUTES and the dispatcher is returned.
 * The original code from Brendan also stored a bunch of URI stuff and the command in the request, so I have let 
 * this happen here too.
 * 
 * @author brendan
 *
 */
public class PermalinkFactory {

	public static final String URI_ATTR = "permalinkURI";
	public static final String URL_ATTR = "permalinkURL";
	public static final String PERMALINK_ATTRIBUTES = "PERMALINK_ATTRIBUTES";
	public static final String COMMAND_ATTRIBUTE = "dispatcher";

	public static final String PermalinkFilename = "Permalink.xml";

	public static String extractCommand(HttpServletRequest request) throws Exception {
		return getSingleton().extract(request);
	}

	private Permalink[] permaLinks = null; 
	
	private static PermalinkFactory singleton = null;

	protected static PermalinkFactory getSingleton() throws Exception {
		if (singleton == null)
			singleton = new PermalinkFactory();
		return singleton;
	}

	public PermalinkFactory() throws Exception {
		URL permalinkFilePath = getClass().getClassLoader().getResource(PermalinkFilename);
		if (permalinkFilePath == null)
			throw new Exception("Missing " + PermalinkFilename + " for permalink mappings.");

		try {
			File permalinkFile = new File(permalinkFilePath.toURI());
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = dbf.newDocumentBuilder();
			Document doc = builder.parse(permalinkFile);

			List<Permalink> links = new Vector<Permalink>();
			NodeIterator iterator = XPathAPI.selectNodeIterator(doc.getDocumentElement(), "//Permalink");
			Node node = iterator.nextNode();
			while (node != null) {
				String pattern = XPathAPI.eval(node, "pattern/.").str();
				String dispatcher = XPathAPI.eval(node, "dispatcher/.").str();
				
				List<Permalink.Attribute> attributes = new Vector<Permalink.Attribute>();
				NodeIterator attributeNodes = XPathAPI.selectNodeIterator(node, "attribute");
				Node n = attributeNodes.nextNode();
				while (n != null) {
					String attribute = XPathAPI.eval(n, "attribute::name").str();
					String defaultAttribute = null;
					try {
						defaultAttribute  = XPathAPI.eval(n, "attribute::default").str();
					} catch (Exception e){}
					String split = null;
					try {
						split  = XPathAPI.eval(n, "attribute::split").str();
						if(split.isEmpty()) split = null;
					} catch (Exception e){}
					
					attributes.add(new Permalink.Attribute(attribute, defaultAttribute, split));
					n = attributeNodes.nextNode();
				}

				links.add(new Permalink(pattern, dispatcher, attributes.toArray(new Permalink.Attribute[]{})));
				node = iterator.nextNode();
			}
			
			permaLinks = links.toArray(new Permalink[]{});
	
		} catch (Exception e) {
			Logging.logError(e.getMessage());
			throw e;
		}
	}

	public String extract(HttpServletRequest request) throws Exception {
		String uri = request.getRequestURI();	
		String uriMinusBase = uri.substring( BaseURL.getMyBaseURI().length() );
		for (Permalink link : permaLinks) {
			if (link.matches(uriMinusBase)) {
				request.setAttribute(URI_ATTR, uri);
				request.setAttribute(URL_ATTR, BaseURL.getMyHost() + uri);
				request.setAttribute(PERMALINK_ATTRIBUTES, link.getMatchedAttributes(uriMinusBase));
			
				return link.getDispatcher();
			}
		}
		return null;
	}

	protected String getReverseCommandMapping(String fullCommand) throws ServletException {
		for (Permalink link : permaLinks) {
			if (link.getDispatcher().equals(fullCommand))
				return link.getPattern().pattern();
		}
		return null;
	}

	public static String getPermalinkURI(Class<? extends Dispatcher> dispatcherClass) throws Exception {
		String briefCommand = getSingleton().getReverseCommandMapping(dispatcherClass.getCanonicalName());
		if (briefCommand == null) {
			throw new Exception("No mapping for dispatcher " + dispatcherClass.getCanonicalName());
		}
		return BaseURL.getMyBaseURL() + briefCommand;
	}

	public static String getPermalinkURL(Class<? extends Dispatcher> dispatcherClass) throws Exception {
		String uri = getPermalinkURI(dispatcherClass);
		return BaseURL.getMyHost() + uri;
	}

	public static String getPermalinkURI(HttpServletRequest request) {
		return request.getAttribute(URI_ATTR).toString();
	}

	public static String getPermalinkURL(HttpServletRequest request) {
		return request.getAttribute(URL_ATTR).toString();
	}

	public static void clearAttributes(HttpServletRequest request) {
		request.setAttribute(URI_ATTR,null);
		request.setAttribute(URL_ATTR,null);
	}
}
