/**
 * @author Marek Krajewski
 * @date 12012010
 */

package clap.service.applicationlog.request;

import java.util.ArrayList;
import java.util.List;

import org.dsrg.soenea.domain.command.impl.Command;

public class CommandListProxy extends SimpleListProxy<Command>{
	
	public IRequest request;

	public CommandListProxy(IRequest request) {
		this.request = request;
	}

	@Override
	protected List<Command> getActualList() throws Exception {
		List<Command> listResult = new ArrayList<Command>();
		return listResult;
	}

}
