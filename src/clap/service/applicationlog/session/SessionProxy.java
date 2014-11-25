/**
 * @author Marek Krajewski
 */

package clap.service.applicationlog.session;

import java.util.Calendar;
import java.util.Collection;

import org.dsrg.soenea.domain.DomainObjectCreationException;
import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.proxy.DomainObjectProxy;
import org.dsrg.soenea.domain.user.IUser;

import clap.service.applicationlog.request.IRequest;
import clap.service.util.ip.IpAddress;

public class SessionProxy extends DomainObjectProxy<Long, Session> implements ISession {
	
	public SessionProxy(Long id) {
		super(id);

	}

	@Override
	protected Session getFromMapper(Long id) throws MapperException,
	DomainObjectCreationException {
		return null;
	}

	@Override
	public IpAddress getIpAddress() {
		return getInnerObject().getIpAddress();
	}

	@Override
	public Collection<IRequest> getRequests() {
		return getInnerObject().getRequests();
	}

	@Override
	public Calendar getSessionStart() {
		return getInnerObject().getSessionStart();
	}
	@Override
	public IUser getUser() {
		return getInnerObject().getUser();
	}

	@Override
	public void setIpAddress(IpAddress ipAddress) {
		getInnerObject().setIpAddress(ipAddress);

	}

	@Override
	public void setSessionStart(Calendar sessionStart) {
		getInnerObject().setSessionStart(sessionStart);
	}

	@Override
	public void setUser(IUser myUser) {
		getInnerObject().setUser(myUser);

	}

	@Override
	public String getSessionString() {
		return getInnerObject().getSessionString();
	}

	@Override
	public void setSessionString(String sessionString) {
		getInnerObject().setSessionString(sessionString);
	}

	@Override
	public String toString() {
		return getInnerObject().toString();
	}
}
