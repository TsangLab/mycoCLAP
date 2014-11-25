package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.NewentryCommand;

public class NewentryDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		if (myHelper.getBoolean("isSubmission") == Boolean.TRUE){
    			new NewentryCommand(myHelper).execute();
    			forward("/WEB-INF/jsp/data/json_newentry_success.jsp");
    		}
    		else {
    			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/newEntryPanel.jsp");    		
    			forward("/WEB-INF/jsp/tbrowse.jsp");	
    		}
    	} catch (CommandException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_newentry_failure.jsp");
    	}
    }

}
