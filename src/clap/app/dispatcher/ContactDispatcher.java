package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.ContactCommand;

public class ContactDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		new ContactCommand(myHelper).execute();
    		forward("/WEB-INF/jsp/data/json_contact_success.jsp");
    	} catch (CommandException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_contact_failure.jsp");
    	}
    }

}
