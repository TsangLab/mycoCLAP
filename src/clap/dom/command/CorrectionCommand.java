package clap.dom.command;

import java.io.*;
import java.util.*;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.command.validator.source.impl.AttributeSource;
import org.dsrg.soenea.domain.helper.Helper;

import clap.service.util.HtmlContentParser;
import clap.service.util.MultipartRequest;

public class CorrectionCommand extends Command {
	
	public CorrectionCommand(Helper helper) {
		super(helper);
	}
	
	public static final String DOCUMENT_FILE_PARM = "fileUpload";
	
	@Source(sources=AttributeSource.class)
	public String realPath;
	
	@Override
	public void execute() throws CommandException {
		
		String entryname = MultipartRequest.getFieldString(helper, "entryname");
		String pubmed = MultipartRequest.getFieldString(helper, "pubmed");
		String pmid = MultipartRequest.getFieldString(helper, "pmid");
		String author = MultipartRequest.getFieldString(helper, "author");
		String title = MultipartRequest.getFieldString(helper, "title");
		String affiliation = MultipartRequest.getFieldString(helper, "affiliation");
		String journal = MultipartRequest.getFieldString(helper, "journal");
		String year = MultipartRequest.getFieldString(helper, "year");
		String field = MultipartRequest.getFieldString(helper, "field");
		String updatedvalue = MultipartRequest.getFieldString(helper, "updatedvalue");
		String first = MultipartRequest.getFieldString(helper, "first");
		String last = MultipartRequest.getFieldString(helper, "last");
		String subject = MultipartRequest.getFieldString(helper, "subject");
		String sender = MultipartRequest.getFieldString(helper, "email");
		String message = MultipartRequest.getFieldString(helper, "message");		
		String receiver = "mycoclap@concordia.ca";
		
		message = HtmlContentParser.removeHTML(message);
		message += "\n\nEntry Name: " + entryname + "\n";
		message += "PubMed: " + pubmed + "\n";
		message += "PMID: " + pmid + "\n";
		message += "Author: " + author + "\n";
		message += "Title: " + title + "\n";
		message += "Affiliation: " + affiliation + "\n";
		message += "Journal: " + journal + "\n";
		message += "Year: " + year + "\n";
		message += "Field: " + field + "\n";
		message += "Updated Value: " + updatedvalue + "\n";
		sender = "(" + first + " " + last + ")" + sender;	

		try {
			/*
			 * send correction request
			 */			
			String filename = null;
			File infile = null;
						
		/*
		 * email process part	
		 */
		  Properties props = System.getProperties();
		  props.put("mail.smtp.host", "smtp.concordia.ca");
		  
		  Session session = Session.getInstance(props, null);
		  MimeMessage msg = new MimeMessage(session);
		  InternetAddress from = new InternetAddress(sender);
		  InternetAddress to = new InternetAddress(receiver);
		  msg.setFrom(from);
		  msg.addRecipient(Message.RecipientType.TO, to);
		  msg.setSubject(subject);
		  msg.setText(message);
		  
		  /*
		   *  get upload file and attach it to the message
		   */
	      if ( MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != null &&
	    		  MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != ""  ) {
	    	  filename = MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM);
	    	  infile = MultipartRequest.getTempFile(helper, DOCUMENT_FILE_PARM);
		
	    	  /*
			   *  create and fill the message part
			   */
			  MimeBodyPart msgBodyPart = new MimeBodyPart();
			  msgBodyPart.setText(message);
			  MimeBodyPart attachmentPart = new MimeBodyPart();		      
		      			  
	    	  FileDataSource fileDataSource = new FileDataSource(infile);
		      attachmentPart.setDataHandler(new DataHandler(fileDataSource));
		      attachmentPart.setFileName(filename);
		      
		      /*
			    *  create the Multipart and add its parts to it
			    */
		      Multipart multipart = new MimeMultipart();		      
		      multipart.addBodyPart(msgBodyPart);     
		      multipart.addBodyPart(attachmentPart);
		      /*
		       *  add the Multipart to the message
		       */
		      msg.setContent(multipart);			  
	      } else {
	    	  System.out.println("No attach file");
	      }
	  
	      Transport.send(msg);
		
	      if ( filename != null)
	    	  infile.delete();
	      
		} catch (AddressException e) {
			throw new CommandException("Incorrect email address!");
		} catch (MessagingException e) {
			throw new CommandException("Unable to send email!");
		} catch (FileNotFoundException e) {
			throw new CommandException("Unable to find the specified file!");
		} catch (Exception e){
			if (e instanceof CommandException)
		        throw (CommandException)e; 
		}
	}

}
