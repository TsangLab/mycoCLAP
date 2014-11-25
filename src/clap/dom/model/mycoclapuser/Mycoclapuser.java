package clap.dom.model.mycoclapuser;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.user.User;

public class Mycoclapuser extends User implements IMycoclapuser{
	
	String firstname;		
	String lastname;
	String email;
	Calendar createdate;
	
	public Mycoclapuser(Long id, long version, String username, String password, List<IRole> roles, 
						String firstname, String lastname, String email, Calendar createdate) {
		super(id, version, username, roles);
		this.firstname = firstname;
		this.lastname = lastname;
		this.setPassword(password);
		this.email = email;
		this.createdate = createdate;
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public String getEmail() {
		return email;
	}
	
	public Calendar getCreatedate() {
		return createdate;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setCreatedate(Calendar createdate) {
		this.createdate = createdate;
	}
	
}
