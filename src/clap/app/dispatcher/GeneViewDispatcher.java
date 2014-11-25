package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.GeneViewCommand;

public class GeneViewDispatcher extends Dispatcher {	
	@Override
	public void execute() throws ServletException, IOException {	
		try {
			new GeneViewCommand(myHelper).execute();
			forward("/WEB-INF/jsp/geneView.jsp");
		} catch (CommandException e) {
		    e.printStackTrace();
			myHelper.setRequestAttribute("errorMessage", "Unable to get detail view table");
			forward("/WEB-INF/jsp/error.jsp");
		}			
	}
}
