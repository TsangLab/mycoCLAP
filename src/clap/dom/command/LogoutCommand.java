package clap.dom.command;

import javax.servlet.http.HttpServletRequest;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.mappers.MycoclapuserInputMapper;

public class LogoutCommand extends Command {
	
	public LogoutCommand(Helper helper) {
		super(helper);
	}
	
	@Override
	public void execute() throws CommandException {		
		HttpServletRequest request = (HttpServletRequest)helper.getRequestAttribute("request");
		request.getSession().invalidate();
		IMycoclapuser user = null;
		
        try {
            user = MycoclapuserInputMapper.findUserByUsername("guest");                
        } catch (MapperException e) {
            throw new CommandException(e);
        } finally {
            helper.setSessionAttribute("CurrentUser", user);
        }
	}

}
