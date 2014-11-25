package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.FamilyActivitySummaryCommand;
import clap.dom.command.TbrowseCommand;

public class SummaryViewDispatcher extends Dispatcher {
	
	public void execute() throws ServletException, IOException {
		
		try {
			new FamilyActivitySummaryCommand(myHelper).execute();
			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/summaryPanel.jsp");
			forward("/WEB-INF/jsp/tbrowse.jsp");					
		} catch (CommandException e){
			myHelper.setRequestAttribute("errorMessage", "unable to get summary data");
			forward("/WEB-INF/jsp/error.jsp");
		}	
	}
}