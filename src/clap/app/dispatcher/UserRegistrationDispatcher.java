package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.UserRegistrationCommand;
import clap.dom.command.NotificationException;

public class UserRegistrationDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {    		
			if(myHelper.getBoolean("isRegistration")) {
				new UserRegistrationCommand(myHelper).execute();
				forward("/WEB-INF/jsp/data/json_registration_success.jsp");		
			} else {
				myHelper.setRequestAttribute("message", "Unable to add new user!");
				forward("/WEB-INF/jsp/data/json_registration_failure.jsp");
			}    	
    	} catch (NotificationException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_registration_failure.jsp");
    	} catch (CommandException e) {
    		e.printStackTrace();
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_registration_failure.jsp");
    	} 
    }

}
