/**
 * @author Marek Krajewski
 */

package clap.service.applicationlog.request;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.DomainObjectCreationException;
import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.proxy.DomainObjectProxy;

import clap.service.applicationlog.requestparametermap.IRequestParamMap;
import clap.service.applicationlog.session.ISession;

public class RequestProxy extends DomainObjectProxy<Long, Request> implements IRequest {
	
	public RequestProxy(Long id) {
		super(id);
	}

	@Override
	protected Request getFromMapper(Long id) throws MapperException,
	DomainObjectCreationException {
		return null;
	}

	@Override
	public List<Command> getCommands() {
		return getInnerObject().getCommands();
	}

	@Override
	public List<Dispatcher> getDispatchers() {
		return getInnerObject().getDispatchers();
	}

	@Override
	public ISession getSession() {
		return getInnerObject().getSession();
	}

	@Override
	public Calendar getTimeOfRequest() {
		return getInnerObject().getTimeOfRequest();
	}

	@Override
	public void setSession(ISession mySession) {
		getInnerObject().setSession(mySession);

	}

	@Override
	public void setTimeOfRequest(Calendar timeOfRequest) {
		getInnerObject().setTimeOfRequest(timeOfRequest);

	}

	@Override
	public IRequestParamMap getRequestParamMap() {
		return getInnerObject().getRequestParamMap();
	}

	@Override
	public void setRequestParamMap(IRequestParamMap requestParamMap) {
		getInnerObject().setRequestParamMap(requestParamMap);
	}
}
