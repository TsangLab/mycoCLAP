package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.InsertNewReferenceInFileCommand;

public class InsertNewReferenceInFileDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {
		try {
			new InsertNewReferenceInFileCommand(myHelper).execute();
			forward("/WEB-INF/jsp/data/json_insertNewReferenceInFile_success.jsp");		
		} catch (CommandException e) {
			myHelper.setRequestAttribute("errorMessage", "Unable to add new reference!");
			forward("/WEB-INF/jsp/data/json_insertNewReferenceInFile_failure.jsp");
			e.printStackTrace();
		}
	}
}