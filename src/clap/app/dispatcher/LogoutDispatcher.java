package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.LogoutCommand;

public class LogoutDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		myHelper.setRequestAttribute("request", myRequest);
			new LogoutCommand(myHelper).execute();
			myHelper.setRequestAttribute("isLogout", true);
    		forward("/WEB-INF/jsp/login.jsp");
    	}  catch (CommandException e) {
            e.printStackTrace();
    		myHelper.setRequestAttribute("errorMessage", e.getMessage());
    		forward("/WEB-INF/jsp/error.jsp");
    	}
    }

}
