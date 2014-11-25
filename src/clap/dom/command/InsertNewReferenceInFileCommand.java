package clap.dom.command;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Scanner;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.datafiles.tdg.DataFilesTDG;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractFinder;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractTDG;
import clap.dom.model.mycoclapuser.IMycoclapuser;

import clap.service.util.MultipartRequest;
import clap.service.util.dateTime;

public class InsertNewReferenceInFileCommand extends Command {
	
	public InsertNewReferenceInFileCommand(Helper helper) {
		super(helper);
	}
	
	public static final String DOCUMENT_FILE_PARM = "fileUpload";
	public static final String FILE_ITEM_STRING = "fileItems";
	
	@SuppressWarnings("resource")
	public void execute() throws CommandException {
		String literatureUpdateMsg = "";
		String existList = "Ignored reference (existed): ";
		String errorList = "Unable to add reference: ";
		HashMap<String, String> rowData = new HashMap<String, String>();
		
		try {
			int lineNum = 0;
			String strLine;	  		  
			String[] nameArray = null;
			String [] valArray = null;
									
			// add date, user name, modified fields if it's update to db
			IMycoclapuser user = (IMycoclapuser) helper.getSessionAttribute("CurrentUser");
			
			String filename = null;
			File infile = null;	
			
			if ( MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != null &&
		    		  MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != ""  ) {
		    	  filename = MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM);
		    	  infile = MultipartRequest.getFile(helper, DOCUMENT_FILE_PARM);			  	      
		    	  FileInputStream fin =  new FileInputStream(infile);
		    	  BufferedReader buf = new BufferedReader(new InputStreamReader(fin, "cp1252"));

		    	  /*
		    	   * if file contains sequence of FASTA format, need to remove "LF" 
		    	   * in FASTA format to convert sequence to one string
		    	   */
		    	  Scanner src = new Scanner(buf).useDelimiter(System.getProperty("line.separator"));
		  		  
		  		  while(src.hasNext()) {
		  			  strLine = src.next().replaceAll("\n", "");		    	  
		  			  lineNum++;
		    		   
		    		  if (strLine.trim().length() == 0 ) 
		    			  continue;
		    		  		    
		    		  if (lineNum == 1) {		    			 
		    			  nameArray = strLine.split("\t");		 // title line
		    		  } else {
		    			  valArray = strLine.split("\t");
		    			  for(int i=0; i<valArray.length; i++) 
		    				  rowData.put(nameArray[i].replaceAll("\"", "").trim(), valArray[i].replaceAll("\"", "").trim());
		    			 
		    			  String msg = literatureAbstractInsert(rowData);		    			  
		    			  if (msg.equals("exists"))
		    				  existList += rowData.get("literatureLink") + "; ";
		    			  else if (msg.equals("error"))
		    			  	  errorList += rowData.get("literatureLink") + "; ";	
						  rowData.clear();
		    		  }		    		  
		    	  }
		  		  
		  		  if (! existList.equals("Ignored reference (existed): "))
		  			  literatureUpdateMsg += existList;
		  		  else if ( !errorList.equals("unable to add reference: "))
		  			  literatureUpdateMsg += errorList;
		  			  
		    	  /*
		    	   * save data file in a MySQL data_files table
		    	   */
		    	  FileInputStream finDb =  new FileInputStream(infile);		    	  
		    	  DataFilesTDG.insert(
	  						DataFilesTDG.getMaxId(), 
	  						MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM),
	  						new InputStreamReader(finDb, "cp1252"),
	  						user.getUsername(),
	  						dateTime.currenttime());
		    	  
		    	  src.close();
		    	  buf.close();
		    	  finDb.close();
		    	  fin.close();
		    	  
			      helper.setRequestAttribute("message", "File: " + filename + " submitted. " + literatureUpdateMsg);			     
			     							
			} else {
				  helper.setRequestAttribute("message", "No attach file");
			}				
		} catch (Exception e) {			
			helper.setRequestAttribute("message", e.getMessage());
			throw new CommandException(e);
		}
	}	
	
	public static String literatureAbstractInsert(HashMap<String, String> rowData) throws SQLException {
		String isInsert = "success";
		String literatureLink = rowData.get("literatureLink");
		try {
			if (rowData != null && !LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(literatureLink).next()) 
				LiteratureAbstractTDG.insert(
						LiteratureAbstractTDG.maxId(),
						literatureLink,
						rowData.get("source"), 
						rowData.get("title"), 
						rowData.get("author"), 
						rowData.get("address"), 
						null);
			else
				isInsert = "exists";
		} catch (SQLException e) {
			isInsert = "error";
		}
		return isInsert;
	}
	
}