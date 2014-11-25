/**
 * @author Marek Krajewski
 */

package clap.service.applicationlog.session;

import java.util.Calendar;
import java.util.Collection;

import org.dsrg.soenea.domain.interf.IDomainObject;
import org.dsrg.soenea.domain.user.IUser;

import clap.service.applicationlog.request.IRequest;
import clap.service.util.ip.IpAddress;

public interface ISession extends IDomainObject<Long>{

	public Collection<IRequest> getRequests();
	public void setIpAddress(IpAddress ipAddress);
	public IpAddress getIpAddress();
	public void setSessionStart(Calendar sessionStart);
	public Calendar getSessionStart();
	public IUser getUser();
	public void setUser(IUser myUser);
	public String getSessionString();
	public void setSessionString(String sessionString);
	public String toString();


}
