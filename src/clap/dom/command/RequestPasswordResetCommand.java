package clap.dom.command;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.domain.mapper.DomainObjectNotFoundException;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.service.util.PasswordGenerator;
import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.Mycoclapuser;
import clap.dom.model.mycoclapuser.mappers.MycoclapuserInputMapper;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;

public class RequestPasswordResetCommand extends Command {

	public RequestPasswordResetCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		Mycoclapuser myUser;
		try {
			String username = helper.getString("username");
			String email = helper.getString("email");
			
			try {
				myUser = (Mycoclapuser) MycoclapuserInputMapper.findUserByUsername(username);
				
				if ( !email.equals(myUser.getEmail()) ){
			    	helper.setRequestAttribute("message", "Invalid email!");
			    	throw new NotificationException("Invalid email");
			    }
				
				String password = PasswordGenerator.generate(6);
				String passwordToUser = password;	
				password = LoginCommand.encryptPassword(password);				
				int count = MycoclapuserTDG.update(
						myUser.getId(), 
						myUser.getVersion(), 
						myUser.getUsername(), 
						password, 
						myUser.getFirstname(), 
						myUser.getLastname(), 
						myUser.getEmail(), 
						Calendar.getInstance().getTimeInMillis()
				);
				
				if(count == 0) throw new LostUpdateException("Update failed for RegistrationTDG: username " + myUser.getUsername());
				
				myUser.setVersion(myUser.getVersion()+1);
				
				/*
				 *  add date, user name, modified fields if it's update to db
				 */
				java.util.Date dt = new java.util.Date();
				java.text.SimpleDateFormat sdf = new
				java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

				String currentTime = sdf.format(dt);			
				String comments = "request password change";
				ChangeLoggingTDG.insert(
						ChangeLoggingTDG.getMaxId(), 
						myUser.getUsername(),
						currentTime,
						(long)java.sql.Types.NULL,
						(long)java.sql.Types.NULL,
						null,
						"resetPassword",
						comments);
				
				sendEmail(myUser, passwordToUser);				
			} catch (DomainObjectNotFoundException e) {
				helper.setRequestAttribute("message", "Invalid username!");
				throw new NotificationException("Invalid username");
			} catch (MapperException e) {
				helper.setRequestAttribute("message", e.getMessage());
				throw new NotificationException(e.getMessage());
			} catch (SQLException e) {
				helper.setRequestAttribute("message", "Access database failed!");
				throw new NotificationException("Access database failed!");
			}						
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}

	private void sendEmail(IMycoclapuser myUser, String password) throws CommandException{
		try {
			
			String subject = "mycoCLAP Password Reset";
			String sender = "min.wu@concordia.ca";
			String receiver = myUser.getEmail();
			String message = "You have requested a password reset. \n"
				+"Here is your new password: \n \n"
				+ "user: " + myUser.getUsername() + " \n"
				+ "password: " + password + " \n \n"
				+ "Thanks! \n \n";
			
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