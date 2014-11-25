/**
  * @author Brendan Asselstine
  * @date Sep 23, 2009
**/

package clap.app.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.dsrg.soenea.application.servlet.dispatcher.HttpServletHelper;
import org.dsrg.soenea.domain.command.validator.source.impl.AttributeSource;
import org.dsrg.soenea.domain.command.validator.source.impl.ParameterSource;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.logging.Logging;

import clap.dom.command.validator.source.impl.PermalinkSource;
import clap.service.util.BaseURL;
import clap.service.util.permalink.PermalinkFactory;

public class PermalinkFilter implements Filter {

	private static final String COMMAND = "dispatcher";
    String 	controller = null;
	FilterConfig config = null;

	@Override
	public void destroy() {
	}

	private String getCommand(HttpServletRequest request) throws Exception
	{
	    String permalinkAttribute = PermalinkFactory.extractCommand(request);
	    Helper helper = new HttpServletHelper(request);
	    String command = null;
	    if (command == null) {
	        command = new PermalinkSource().getData(helper, String.class, COMMAND);
//	        if (command != null)
//	            Logging.logDebug(String.format("PermalinkFilter; dispatcher '%s' from permalink attribute", command));
	    }
	    if (command == null) {
	        command = new AttributeSource().getData(helper, String.class, COMMAND);
//            if (command != null)
//                Logging.logDebug(String.format("PermalinkFilter; dispatcher '%s' from attribute", command));
	    }
	    if (command == null) {
	        command = new ParameterSource().getData(helper, String.class, COMMAND);
//            if (command != null)
//                Logging.logDebug(String.format("PermalinkFilter; dispatcher '%s' from parameter", command));
	    }
	    if (command == null) {
	        command = permalinkAttribute;
//            if (command != null)
//                Logging.logDebug(String.format("PermalinkFilter; dispatcher '%s' from permalink '%s'", command, request.getRequestURI()));
	    }		
        if (command == null)
            Logging.logDebug(String.format("PermalinkFilter; no match"));
	    return command;
	}
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) arg0;
		BaseURL.init(request.getSession().getServletContext());
		try {
			String cmd = getCommand(request);	
			if (cmd!=null) {
                request.setAttribute(COMMAND, cmd);
				config.getServletContext().getNamedDispatcher(controller).forward(arg0,arg1);
			} else {
				arg2.doFilter(arg0,arg1);
			}
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		config = arg0;
		controller = arg0.getInitParameter("front-controller");
		if (controller == null) {
			throw new ServletException("No front-controller defined for PermalinkFilter " + arg0.getFilterName());
		}
	}

}
