package clap.app.dispatcher;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.FamilyActivitySummaryCommand;

public class FamilyActivitySummaryDispatcher extends Dispatcher {
	
	public void execute() throws ServletException, IOException {
		
		try {
			if(myHelper.getBoolean("isDownload") == true){
				new FamilyActivitySummaryCommand(myHelper).execute();
				forwardData((String)myRequest.getAttribute("data"), (String)myRequest.getAttribute("filename"));
			}			
			else if (myHelper.getBoolean("isSubmission") == true ) {
				new FamilyActivitySummaryCommand(myHelper).execute();
				forward("/WEB-INF/jsp/data/json_familyActivitySummary.jsp");	
			}
		} catch (CommandException e){
			myHelper.setRequestAttribute("errorMessage", "unable to get summary data");
			forward("/WEB-INF/jsp/data/error.jsp");
		}	
	}
		
	public void forwardData(String data, String filename) throws IOException
    {
	    myResponse.setContentType ("application/text");
	    myResponse.setHeader("Content-Disposition", "attachment; filename=" + filename);

	    OutputStream o = myResponse.getOutputStream();
	    o.write(data.getBytes());
	    o.flush();
	    o.close();
	    data = null;
    }
}