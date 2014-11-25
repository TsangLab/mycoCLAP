package clap.dom.command;

import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.role.impl.GuestRole;
import org.dsrg.soenea.environment.CreationException;
import org.dsrg.soenea.environment.KeyNotFoundException;
import org.dsrg.soenea.service.util.CalendarFactory;
import org.dsrg.soenea.uow.UoW;

import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.MycoclapuserFactory;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserFinder;
import clap.dom.model.role.impl.AdminRole;
import clap.dom.model.role.impl.UserRole;

public class UserRegistrationCommand extends Command {
	
	public UserRegistrationCommand(Helper helper) {
		super(helper);
	}
	
	@Override
	public void execute() throws CommandException {
		try {
			String firstname = helper.getString("Firstname");
			String lastname = helper.getString("Lastname");
			String email = helper.getString("Email");
			String username = helper.getString("newUsername");
			String password = helper.getString("newPassword");
			String confirmpassword = helper.getString("confirmPassword");
			String userrole = helper.getString("Userrole");
			
			if(firstname == null 
					|| lastname == null 
					|| email == null 
					|| username == null 
					|| password == null
					|| confirmpassword == null
					|| firstname == ""
					|| lastname == ""
					|| email == "" 
					|| username == "" 
					|| password == ""
					|| confirmpassword == ""
					|| userrole == null	
										) {
				throw new CommandException("All fields must be filled in");
			} 
			
			// test if user exists
			try {
				ResultSet newUser = MycoclapuserFinder.findUserByUsername(username);
				if (newUser.next()) 
					throw new CommandException("User " + username + " exists. Please select other username.");
			} catch (SQLException e) {
				throw new CommandException(e.getMessage(), e);
			}
						
			if ( password.length() < 6 ) 
				throw new CommandException("Password must be at least 6 characters!");
			
			if ( !password.equals(confirmpassword) )
				throw new CommandException("Your password and confirm password did not match!");
			
			password = LoginCommand.encryptPassword(password);			
			List<IRole> roles = Arrays.asList((IRole) new GuestRole());
			
			if ( userrole.equals("user") ) {
				roles = Arrays.asList((IRole) 
							new GuestRole(), 
							new UserRole()
						);
			} else if ( userrole.equals("admin") ) {
				roles = Arrays.asList((IRole) 
							new GuestRole(), 
							new UserRole(), 
							new AdminRole()
						);
			}			
			
			IMycoclapuser newUser = MycoclapuserFactory.createNew(
	                username,
	                password,
	                roles,
	                firstname,
	                lastname,
	                email,
	                CalendarFactory.create());
            UoW.getCurrent().commit();
            UoW.newCurrent();
            			
		} 
		catch (CommandException e) {
			throw e;
		} catch (NoSuchAlgorithmException e) {
			throw new CommandException(e);
		} catch (SQLException e) {
			throw new CommandException(e);
		} catch (KeyNotFoundException e) {
			throw new CommandException(e);
		} catch (CreationException e) {
			throw new CommandException(e);
		} catch (MapperException e) {
			throw new CommandException(e);
		}		
	}

}
