package clap.app.dispatcher;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.validator.ValidationException;

import clap.dom.command.DirectDownloadCommand;

public class DirectDownloadDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		new DirectDownloadCommand(myHelper).execute();
    		forwardData((String)myRequest.getAttribute("data"), (String)myRequest.getAttribute("filename"));
    	} 
    	catch (ValidationException e){
    		forward("/WEB-INF/jsp/directDownload.jsp");
    	}
    	catch (CommandException e) {    		
    		myHelper.setRequestAttribute("errorMessage", e.getMessage());
    		forward("/WEB-INF/jsp/data/directDownload_failure.jsp");
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
