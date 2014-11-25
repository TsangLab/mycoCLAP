package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.InsertNewDataInGridCommand;

public class InsertNewDataInGridDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {
		try {
			new InsertNewDataInGridCommand(myHelper).execute();
			forward("/WEB-INF/jsp/data/json_insertNewDataInGrid_success.jsp");		
		} catch (CommandException e) {
			forward("/WEB-INF/jsp/data/json_insertNewDataInGrid_failure.jsp");
			e.printStackTrace();
		}
	}
}