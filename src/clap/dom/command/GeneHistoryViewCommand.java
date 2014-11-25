package clap.dom.command;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.command.validator.source.impl.PermalinkSource;
import clap.dom.model.changelogging.ChangeLogging;
import clap.dom.model.changelogging.mappers.ChangeLoggingInputMapper;

public class GeneHistoryViewCommand extends ClapCommand {
	
	public GeneHistoryViewCommand(Helper helper) {
		super(helper);
	}
		
	@Source(sources=PermalinkSource.class)
	public String entryName;
	
	@Override
	protected void executeCommand() throws CommandException {
		try {
			Long changeLoggingId = helper.getLong("changeLoggingId");
			Long enzymeEntryId = helper.getLong("enzymeEntryId");
			
			ChangeLogging changeLoggingHistory = null;			
			changeLoggingHistory = ChangeLoggingInputMapper.findChangeLoggingByChangeLoggingId(changeLoggingId, enzymeEntryId);
			
			Map<String, String> rowData=new HashMap<String, String>();
			ArrayList<Map<String, String>> historyData = new ArrayList<Map<String, String>>();
			String[] fieldVal;
			String comments = changeLoggingHistory.getComments();
			comments =comments.replaceAll("Modification\\s*:\\s*\\{", "");
			comments =comments.replaceAll("s*\\}\\s*", "");
			String[] row = comments.split("\",\"");
			
			System.out.println("row: " + row[0]);
			for(int i=0; i<row.length; i++) {
				System.out.println("row: " + row[i]);
				row[i] = row[i].replace("\\s*\"", "");
				row[i] = row[i].replace("\"\\s*", "");
				fieldVal = row[i].split("\"\\s*:\\s*\"\\s*");
				rowData.put("name", fieldVal[0]);
				System.out.println("fieldVal0: " + fieldVal[0]);						
				if (fieldVal.length == 2)
					rowData.put("value", fieldVal[1]);
				else 
					rowData.put("value", null);
				historyData.add(rowData);
				System.out.println("historyData" + historyData);
			}
						
			helper.setRequestAttribute("historydata", historyData);
		} catch (SQLException e) {
			throw new CommandException(e);
		} catch (MapperException e) {
			e.printStackTrace();
		} 	
	}
	
}