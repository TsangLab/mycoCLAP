package clap.app.dispatcher;

import javax.servlet.http.HttpServletResponse;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.service.logging.Logging;

public abstract class ClapDispatcher extends Dispatcher {

    protected void redirectToURL(String url) {
        Logging.logDebug("Redirecting to: " + url);
        myResponse.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
        myResponse.setHeader("Location", url);
    }

}
