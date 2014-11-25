package clap.app.dispatcher;

import java.io.*;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.HmmCommand;

public class HmmDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		new HmmCommand(myHelper).execute();
    		forwardData((String)myRequest.getAttribute("result"),(String)myRequest.getAttribute("filename"));
    	} catch (CommandException e) {
    		myHelper.setRequestAttribute("message", "No search result can be found!");
    		forward("/WEB-INF/jsp/data/error.jsp");
    	}
    }    

    public void forwardData(String result, String filename) throws IOException
    {
	    myResponse.setContentType ("application/text");
	    myResponse.setHeader("Content-Disposition", "attachment; filename=" + filename);

	    OutputStream o = myResponse.getOutputStream();
	    o.write(result.getBytes());
	    o.flush();
	    o.close();
	    result = null;
    }  

}
