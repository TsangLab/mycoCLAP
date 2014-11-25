/**
 * @author Marek Krajewski
 * @date early 2009
 */

package clap.service.applicationlog.session;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.domain.DomainObject;
import org.dsrg.soenea.domain.user.IUser;

import clap.service.applicationlog.request.IRequest;
import clap.service.util.ip.IpAddress;

public class Session extends DomainObject<Long> implements ISession {
	
	private IUser myUser;
	private IpAddress ipAddress;
	private String sessionString;
	private List<IRequest> requests;
	private Calendar sessionStart;

	public Session(Long id, Long version,IUser myUser, IpAddress ipAddress, Calendar sessionStart, String sessionString) {
		super(id, version);
		this.myUser = myUser;
		this.ipAddress = ipAddress;
		this.sessionStart = sessionStart;
		this.sessionString = sessionString;
		this.requests = new RequestListProxy(this);
	}

	@Override
	public String toString() {
		return "ID: " + getId() + ", UserId: " + myUser.getId() + ", IP: " + this.ipAddress + ", Session String: " + this.sessionString;
	}
	public List<IRequest> getRequests() {
		return this.requests;
	}
	public void setIpAddress(IpAddress ipAddress) {
		this.ipAddress = ipAddress;
	}
	public IpAddress getIpAddress() {
		return this.ipAddress;
	}
	public void setSessionStart(Calendar sessionStart) {
		this.sessionStart = sessionStart;
	}
	public Calendar getSessionStart() {
		return this.sessionStart;
	}
	public IUser getUser() {
		return this.myUser;
	}
	public void setUser(IUser myUser) {
		this.myUser = myUser;
	}
	public void setSessionString(String sessionString) {
		this.sessionString = sessionString;
	}
	public String getSessionString() {
		return this.sessionString;
	}
}
