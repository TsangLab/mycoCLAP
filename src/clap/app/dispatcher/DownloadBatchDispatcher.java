package clap.app.dispatcher;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.DownloadBatchCommand;

public class DownloadBatchDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		if (myHelper.getBoolean("isSubmission") == Boolean.TRUE){
    			new DownloadBatchCommand(myHelper).execute();
    			forwardData((String)myRequest.getAttribute("data"), (String)myRequest.getAttribute("filename"));
    		}
    		else {
    			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/downloadBatchPanel.jsp");    		
    			forward("/WEB-INF/jsp/tbrowse.jsp");	
    		}
    	} 
    	catch (IOException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_download_failure.jsp");
    	} 
    	catch (CommandException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_download_failure.jsp");
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
