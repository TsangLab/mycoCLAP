package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.DisplayDataCommand;

public class DisplayDataDispatcher extends Dispatcher {
	
	@Override
	public void execute() throws ServletException, IOException {
				
		try {
			if (myHelper.getBoolean("isSubmission") == Boolean.TRUE){
        		new DisplayDataCommand(myHelper).execute();
        		forward("/WEB-INF/jsp/data/json_displayData.jsp");
    		}
			else {					
				myHelper.setRequestAttribute("searchTerm", myHelper.getString("term"));
				myHelper.setRequestAttribute("header", myHelper.getString("header"));
				myHelper.setRequestAttribute("searchScale", myHelper.getString("searchScale"));
				myHelper.setRequestAttribute("fieldMatch", myHelper.getString("fieldMatch"));
				myHelper.setRequestAttribute("columnFilters", myHelper.getString("columnFilters"));
				myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/dataViewPanel.jsp"); 
				forward("/WEB-INF/jsp/tbrowse.jsp");	
			}
		} catch (CommandException e) {
			myHelper.setRequestAttribute("errorMessage", "Database access error!");
			forward("/WEB-INF/jsp/data/error.jsp");
			e.printStackTrace();
		}
		
	}

}
