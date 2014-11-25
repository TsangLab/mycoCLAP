package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.GeneHistoryViewCommand;

public class GeneHistoryViewDispatcher extends Dispatcher {	
	@Override
	public void execute() throws ServletException, IOException {	
		try {
			new GeneHistoryViewCommand(myHelper).execute();
			forward("/WEB-INF/jsp/geneHistoryView.jsp");
		} catch (CommandException e) {
		    e.printStackTrace();
			myHelper.setRequestAttribute("errorMessage", "Unable to get detail history view table");
			forward("/WEB-INF/jsp/error.jsp");
		}			
	}
}