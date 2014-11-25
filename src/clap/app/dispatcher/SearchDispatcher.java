package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.TbrowseCommand;

public class SearchDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {		
		try {
			new TbrowseCommand(myHelper).execute();
			myHelper.setRequestAttribute("searchTerm", myHelper.getString("term"));
			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/searchPanel.jsp");   		
			forward("/WEB-INF/jsp/tbrowse.jsp");
		} catch (CommandException e) {
			myHelper.setRequestAttribute("errorMessage", "Required parameters are not proveided");
			forward("/WEB-INF/jsp/error.jsp");
			e.printStackTrace();
		}
	}

}