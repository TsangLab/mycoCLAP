package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.ListEntryNameCommand;

public class ListEntryNameDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {		
		try {
			new ListEntryNameCommand(myHelper).execute();
			forward("/WEB-INF/jsp/data/json_listEntryName.jsp");
		} catch (CommandException e) {
			myHelper.setRequestAttribute("errorMessage", "Database access error!");
			forward("/WEB-INF/jsp/data/error.jsp");
			e.printStackTrace();
		}		
	}
}