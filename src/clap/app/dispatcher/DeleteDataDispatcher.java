package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.DeleteDataCommand;

public class DeleteDataDispatcher extends Dispatcher {		
	@Override
	public void execute() throws ServletException, IOException {
		try {
			new DeleteDataCommand(myHelper).execute();		
			forward("/WEB-INF/jsp/data/json_deleteData_success.jsp");			
		} catch (CommandException e) {
			forward("/WEB-INF/jsp/data/json_deleteData_failure.jsp");
			e.printStackTrace();
		}
	}
}