package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.RequestPasswordResetCommand;

public class RequestPasswordResetDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {
		try {
			new RequestPasswordResetCommand(myHelper).execute();
			myHelper.setRequestAttribute("message", "Password has been reset successfully. An email has been sent to the user!");
			forward("/WEB-INF/jsp/data/json_requestpasswordreset_success.jsp");		
		} catch (CommandException e) {
			forward("/WEB-INF/jsp/data/json_requestpasswordreset_failure.jsp");
			e.printStackTrace();
		} 
	}

}