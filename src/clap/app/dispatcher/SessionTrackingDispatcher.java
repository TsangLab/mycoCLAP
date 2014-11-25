/**
 * Author: Marek Krajewski
 * Date: 10th Feb 2009
 */
package clap.app.dispatcher;

import java.io.IOException;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.helper.Helper;

public abstract class SessionTrackingDispatcher extends Dispatcher{
	
//  private static final Object DISPATCHER_ID_LOCK = "DISPATCHER_ID_LOCK";
//	private static final Map<String, Long> dispatcherIdMap = new HashMap<String, Long>();

	public String getName() {
		return this.getClass().getCanonicalName();
	}

	public void init(HttpServletRequest req, HttpServletResponse res, Helper myHelper) {
		init(req, res);
		this.myHelper = myHelper;
		if (myHelper.getRequestAttribute("notifications") == null)
			myRequest.setAttribute("notifications", new LinkedList<String>());
	}

	@Override
	protected void redirectToDispatcher(Dispatcher passed_dispatcher) throws ServletException, IOException {
		SessionTrackingDispatcher my_dispatcher = (SessionTrackingDispatcher) passed_dispatcher;
		my_dispatcher.init(myRequest, myResponse, myHelper);

		try {
			my_dispatcher.execute();
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	protected void redirectToURL(String url) {
        myResponse.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
        myResponse.setHeader("Location", url);
	}
}