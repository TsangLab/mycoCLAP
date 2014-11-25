package clap.app.dispatcher;

import java.io.IOException;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.UpdateDataCommand;

public class UpdateDataDispatcher extends Dispatcher {
		
	@Override
	public void execute() throws ServletException, IOException {
		try {
			if (myHelper.getBoolean("isSubmission") == Boolean.TRUE){
        		new UpdateDataCommand(myHelper).execute();
    			
    			if( myHelper.getRequestAttribute("type").equals("read") )
    				forward("/WEB-INF/jsp/data/json_updateData.jsp");

    			if( myHelper.getRequestAttribute("type").equals("modify"))
    				forward("/WEB-INF/jsp/data/json_updateData_success.jsp");
    		}
    		else {
    			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/updateByCuratorPanel.jsp");    		
    			forward("/WEB-INF/jsp/tbrowse.jsp");	
    		}			
			
		} catch (CommandException e) {
			forward("/WEB-INF/jsp/data/json_updateData_failure.jsp");
			e.printStackTrace();
		}
	}
	
}