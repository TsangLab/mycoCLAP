package clap.dom.command;

import java.io.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

public class HmmCommand extends Command {
		
	public HmmCommand(Helper helper) {
		super(helper);
	}
	
	@Override
	public void execute() throws CommandException {
		
		String sequence = helper.getString("sequence");
		String fileUpload = helper.getString("fileUpload");
		String filename = "hmmresult.txt";
System.out.println("sequence: " + sequence);	
System.out.println("inputFile: " + fileUpload);
		
		try {					
			 Runtime rt = Runtime.getRuntime() ;
			 Process p = rt.exec("D:/hmmer-3.0/src/hmmscan /cygdrive/d/hmmer-3.0/myData/mycoCLAPHMMs " + sequence) ;
			 InputStream in = p.getInputStream(); 		  
			 String line;
			 String result = "";
			 BufferedReader input = new BufferedReader(new InputStreamReader(in));
			 while((line = input.readLine()) != null) 
				 result += line + "\n";
			 
			 input.close();			 
			 p.destroy() ;
			 
			 helper.setRequestAttribute("result", result);
			 helper.setRequestAttribute("filename", filename);		
		} catch (Exception e) {
			throw new CommandException("Unable to search HMM database!");
		} 
	}

}
