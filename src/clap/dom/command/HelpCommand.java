package clap.dom.command;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

public class HelpCommand extends Command {
	
	public HelpCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		try {			
			helper.setRequestAttribute("activeItem", "help");
		} catch (Exception e) {
			throw new CommandException(e);
		}		
	}

}
