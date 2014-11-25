/**
 * @author Marek Krajewski
 */

package clap.service.applicationlog.request;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.DomainObject;
import org.dsrg.soenea.domain.command.impl.Command;

import clap.service.applicationlog.requestparametermap.IRequestParamMap;
import clap.service.applicationlog.requestparametermap.RequestParamMapProxy;
import clap.service.applicationlog.session.ISession;

public class Request extends DomainObject<Long> implements IRequest {
	
	private ISession mySession;
	private Calendar timeOfRequest = Calendar.getInstance();
	private IRequestParamMap requestParamMap;
	private List<Dispatcher> dispatchers;
	private List<Command> myCommands;

	public Request(Long id, Long version, ISession mySession, Calendar timeOfRequest, IRequestParamMap map) {
		super(id, version);
		this.mySession = mySession;
		this.timeOfRequest = timeOfRequest;
		this.requestParamMap = map;
		dispatchers = new DispatcherListProxy(this);
		myCommands = new CommandListProxy(this);
	}

	public Request(Long id, Long version, ISession session, Long timeOfRequest) {
		super(id, version);
		this.mySession = session;
		this.timeOfRequest.setTimeInMillis(timeOfRequest);
		dispatchers = new DispatcherListProxy(this);
		myCommands = new CommandListProxy(this);
		requestParamMap = new RequestParamMapProxy(this);
	}

	public Request(Long id, ISession session, Long timeOfRequest) {
		super(id,0);
		this.mySession = session;
		this.timeOfRequest.setTimeInMillis(timeOfRequest);
		dispatchers = new DispatcherListProxy(this);
		myCommands = new CommandListProxy(this);
		requestParamMap = new RequestParamMapProxy(this);
	}

	public void setSession(ISession mySession) {
		this.mySession = mySession;
	}

	public IRequestParamMap getRequestParamMap() {
		return requestParamMap;
	}

	public void setRequestParamMap(IRequestParamMap map) {
		this.requestParamMap = map;
	}

	public ISession getSession() {
		return this.mySession;
	}

	public Calendar getTimeOfRequest() {
		return this.timeOfRequest;
	}

	public void setTimeOfRequest(Calendar timeOfRequest) {
		this.timeOfRequest = timeOfRequest;
	}

	public List<Dispatcher> getDispatchers() {
		return this.dispatchers;
	}

	public List<Command> getCommands() {
		return this.myCommands;
	}

}
