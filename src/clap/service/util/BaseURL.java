/**
  * @author Brendan Asselstine
  * @date Sep 24, 2009
**/

package clap.service.util;

import javax.servlet.ServletContext;

import org.dsrg.soenea.service.Registry;

public class BaseURL {

	public static final String BASEURI_ATTR = "myBaseURI";
	public static final String BASEURL_ATTR = "myBaseURL";
	
	private static BaseURL singleton = null;
	
	protected String myHost;
	protected String myBaseURL;
	protected String myBaseURI;
	
	public BaseURL(ServletContext context) {
		try {
			myHost = Registry.getProperty("myHost");
			context.setAttribute("myHost", myHost);
		} catch (Exception e2) {
			e2.printStackTrace();
			System.exit(1);
		}
		try {
			String myProxyPath = Registry.getProperty("myProxyPath");
			myBaseURI = myProxyPath + "/";
		} catch (Exception e) {
			myBaseURI = context.getContextPath() + "/";
		}
		context.setAttribute("myBaseURI", myBaseURI);
		
		myBaseURL = myHost + myBaseURI;

		context.setAttribute("myBaseURL", myBaseURL);
		
	}
	
	public static void init(ServletContext context) {
		if (singleton == null) {
			singleton = new BaseURL(context);
		}
	}
	
	public static String getMyBaseURI() {
		return singleton.myBaseURI;
	}

	public static String getMyBaseURL() {
		return singleton.myBaseURL;
	}
	
	public static String getMyHost() {
		return singleton.myHost;
	}
}
