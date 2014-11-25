/**
 * @author Marek Krajewski
 * @date 28th January, 2010
 */

package clap.service.applicationlog.session;

import java.util.List;

import clap.service.applicationlog.request.IRequest;
import clap.service.applicationlog.request.SimpleListProxy;

public class RequestListProxy extends SimpleListProxy<IRequest>{
	
	private ISession session;

	public RequestListProxy(ISession session) {
		this.session = session;
	}

	@Override
	protected List<IRequest> getActualList() throws Exception {
		return null;
	}
}
