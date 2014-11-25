package clap.app.dispatcher;

import java.io.IOException;
import javax.servlet.ServletException;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.GetGeneSequenceCommand;

public class GetGeneSequenceDispatcher extends Dispatcher {	
    
    public void execute() throws ServletException, IOException {
    	try {
    		new GetGeneSequenceCommand(myHelper).execute();
    		forward("/WEB-INF/jsp/getGeneSequence.jsp");
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

}
