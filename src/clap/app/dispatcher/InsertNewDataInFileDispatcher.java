package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.InsertNewDataInFileCommand;

public class InsertNewDataInFileDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {
		try {
			new InsertNewDataInFileCommand(myHelper).execute();
			forward("/WEB-INF/jsp/data/json_insertNewDataInFile_success.jsp");		
		} catch (CommandException e) {
			myHelper.setRequestAttribute("errorMessage", "Unable to add new data!");
			forward("/WEB-INF/jsp/data/json_insertNewDataInFile_failure.jsp");
			e.printStackTrace();
		}
	}
}