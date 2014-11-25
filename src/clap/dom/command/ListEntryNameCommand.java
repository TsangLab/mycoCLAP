package clap.dom.command;

import java.util.ArrayList;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.entrydescription.EntryDescription;
import clap.dom.model.entrydescription.mappers.EntryDescriptionInputMapper;


public class ListEntryNameCommand extends Command {
	
	public ListEntryNameCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		try {	
			ArrayList<EntryDescription> allEntryDescription = EntryDescriptionInputMapper.findEntryNameList();
			
			helper.setRequestAttribute("allEntryDescription", allEntryDescription);								
		} catch (Exception e) {
			throw new CommandException(e);
		}		
	}

}
