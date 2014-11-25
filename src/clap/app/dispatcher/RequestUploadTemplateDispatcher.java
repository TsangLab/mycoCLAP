package clap.app.dispatcher;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;

import org.dsrg.soenea.domain.command.CommandException;

import clap.dom.command.RequestUploadTemplateCommand;

public class RequestUploadTemplateDispatcher extends ClapDispatcher {
	
    @Override
    public void execute() throws ServletException, IOException {
    	try {
    		new RequestUploadTemplateCommand(myHelper).execute();
    		forwardData( (File)myRequest.getAttribute("file"));
    	} 
    	catch (IOException e) {
    		myHelper.setRequestAttribute("errorMessage", e.getMessage());
    		forward("/WEB-INF/jsp/data/json_requestUploadTemplate_failure.jsp");
    	} catch (CommandException e) {
    		if (e.getCause() instanceof FileNotFoundException) {
        		myHelper.setRequestAttribute("errorMessage", e.getCause().getMessage());
        		forward("/WEB-INF/jsp/notfound.jsp");
    		} else {
        		myHelper.setRequestAttribute("errorMessage", e.getMessage());
        		forward("/WEB-INF/jsp/data/json_requestUploadTemplate_failure.jsp");
    		}
		}
    }
    
    public void forwardData(File file) throws IOException
    {
	    myResponse.setContentType("application/text");
	    myResponse.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
	    
	    copy(new FileInputStream(file), myResponse.getOutputStream());
    }
    
	public static void copy(InputStream input, OutputStream output) throws IOException
	{
		long before = System.currentTimeMillis();
		long total = 0;
		try {
			byte[] buffer = new byte[1024*4];
			int read = 0;
			while ((read=input.read(buffer)) != -1) {
				output.write(buffer, 0, read);
				total += read;
			}
			output.flush();
		} finally {
			try { input.close(); } catch (IOException e) {}
			try { output.close(); } catch (IOException e) {}
		}
		long after = System.currentTimeMillis();
		System.out.println(String.format("RequestUploadTemplateDispatcher took %dms to transfer %d KB", after-before, total/1024));
	}
}