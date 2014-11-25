/**
 * @author Marek Krajewski
 * @date 12012010
 */

package clap.service.applicationlog.request;

import java.util.ArrayList;
import java.util.List;

import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;

public class DispatcherListProxy extends SimpleListProxy<Dispatcher>{
	
	public IRequest request;

	public DispatcherListProxy(IRequest request) {
		this.request = request;
	}

	@Override
	protected List<Dispatcher> getActualList() throws Exception {
		List<Dispatcher> listResult = new ArrayList<Dispatcher>();
		return listResult;
	}
}