package clap.dom.command;

import java.io.File;
import java.io.FileNotFoundException;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

public class RequestUploadTemplateCommand extends Command {
	
	public RequestUploadTemplateCommand(Helper helper) {
		super(helper);
	}	
	
	@Override
	public void execute() throws CommandException {
		String requestFile = helper.getString("requestFile");
		String filename = null;
		if ( requestFile.equals("literatureFile"))
			filename = "upload_literatureData_template.txt";
		else if ( requestFile.equals("dataFile"))
			filename = "upload_newData_template.txt";			    
		File parentDir = new File(helper.getRequestAttribute("realPath") + "/WEB-INF/uploads/saved/");
		File file = new File(parentDir, filename);
	  	      
	    if (!file.exists())
	    	throw new CommandException(new FileNotFoundException("File not found: " + filename));
	    
	    /* even though we constructed file inside parentDir, this makes sure that
	    ** filename doesn't contain anything like "../" that might let the user grab files
	    ** outside the parentDir
	    */
	    if (!file.getParentFile().equals(parentDir))
	    	throw new CommandException(new FileNotFoundException("File not found: " + filename));
	   
	    helper.setRequestAttribute("file", file);
	}

}
