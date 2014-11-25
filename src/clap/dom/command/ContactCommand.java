package clap.dom.command;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

public class ContactCommand extends Command {
	
	public ContactCommand(Helper helper) {
		super(helper);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void execute() throws CommandException {
		String first = helper.getString("first");
		String last = helper.getString("last");
		String subject = helper.getString("subject");
		String sender = helper.getString("email");
		String message = helper.getString("message");
		String receiver = "mycoclap@concordia.ca";
		sender = "(" + first + " " + last + ")" + sender;
				
		try {
		  /*
		   * send email		
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
		  Transport.send(msg);		
		} catch (AddressException e) {
			throw new CommandException("Incorrect email address!");
		} catch (MessagingException e) {
			throw new CommandException("Unable to send email!");
		}
	}

}
