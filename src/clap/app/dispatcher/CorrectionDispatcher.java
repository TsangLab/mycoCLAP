package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.CorrectionCommand;

public class CorrectionDispatcher extends Dispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		if (myHelper.getBoolean("isSubmission") == Boolean.TRUE){
        		new CorrectionCommand(myHelper).execute();
        		forward("/WEB-INF/jsp/data/json_correction_success.jsp");
    		}
    		else {
    			myHelper.setRequestAttribute("innerTemplate", "/WEB-INF/jsp/correctionPanel.jsp");    		
    			forward("/WEB-INF/jsp/tbrowse.jsp");	
    		}
    	} catch (CommandException e) {
    		myHelper.setRequestAttribute("message", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_correction_failure.jsp");
    	}
    }
    
    public void forwardSuccess() throws IOException
    {
    	String jsonStr = "{success:true}";
	    myResponse.setContentType ("text/html;charset=iso-8859-9");
	    myResponse.getWriter().write(jsonStr);
    }
    
    public void forwardFail() throws IOException
    {
    	String jsonStr = "{success:false;errors:{reason:'Sorry, unable to send email'}}";
	    myResponse.setContentType ("text/html;charset=iso-8859-9");
	    myResponse.getWriter().write(jsonStr);
    }


}
