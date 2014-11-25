/**
 * @author Marek Krajewski
 */

package clap.service.applicationlog.request;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.interf.IDomainObject;

import clap.service.applicationlog.requestparametermap.IRequestParamMap;
import clap.service.applicationlog.session.ISession;

public interface IRequest extends IDomainObject<Long>{

	public void setSession(ISession mySession);
	public ISession getSession();
	public Calendar getTimeOfRequest();
	public void setTimeOfRequest(Calendar timeOfRequest);
	public List<Dispatcher> getDispatchers();
	public List<Command> getCommands();
	public IRequestParamMap getRequestParamMap();
	public void setRequestParamMap(IRequestParamMap requestParamMap);

}
