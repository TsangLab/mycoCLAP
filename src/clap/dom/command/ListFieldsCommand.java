package clap.dom.command;

import java.util.ArrayList;
import java.util.HashMap;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoMetaData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;

public class ListFieldsCommand extends Command {
	
	public ListFieldsCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		try {	
			ArrayList<MycoMetaData> allColumnHeaders = MycoDataInputMapper.findMycoMetaData();			
			ArrayList<MycoMetaData> columnHeaders = new ArrayList<MycoMetaData>();
			HashMap<String, Boolean> headerList = new HashMap<String, Boolean>();
			
			for (int i=0; i<allColumnHeaders.size(); i++) {
				String columnName = allColumnHeaders.get(i).getColumnHeader();
				if ( headerList.get(columnName) == null &&
					 !columnName.equals("id") &&
					 !columnName.equals("entry_name_id") &&
					 !columnName.equals("enzyme_entry_id") ){ 
					columnHeaders.add(allColumnHeaders.get(i));
					headerList.put(columnName, true);
				}
			}

			helper.setRequestAttribute("columnHeaders", columnHeaders);								
		} catch (Exception e) {
			throw new CommandException(e);
		}
	}

}
