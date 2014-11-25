package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.LoginCommand;
import clap.dom.command.NotificationException;

public class LoginDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		if (myHelper.getBoolean("isSubmission") == Boolean.TRUE) {
        		new LoginCommand(myHelper).execute();
        		if (myHelper.getRequestAttribute("loginSuccess") == Boolean.TRUE)
        			forward("/WEB-INF/jsp/data/json_user_success.jsp");
        		else {
        			myHelper.setRequestAttribute("message", "Not an valid mycoCLAP user!");
        			forward("/WEB-INF/jsp/data/json_user_failure.jsp");
        		}
    		} else {
        		forward("/WEB-INF/jsp/login.jsp");
    		}
    	} catch (NotificationException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_user_failure.jsp");
    	} catch (CommandException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_user_failure.jsp");
    	}
    }

}
