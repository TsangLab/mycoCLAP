package clap.dom.command;

import java.util.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.service.util.mycoDataHeaderField;

public class GetGeneSequenceCommand extends Command {
	
	public GetGeneSequenceCommand(Helper helper) {
		super(helper);
	}
	
	@Override
	public void execute() throws CommandException {
	 	Long enzymeEntryId = helper.getLong("enzymeEntryId");
	 	boolean proteinSeq = helper.getBoolean("proteinSeq");
	 	boolean dnaSeq = helper.getBoolean("dnaSeq");	 	
	 	String data = "";
		 	
		try {
			MycoData arow = MycoDataInputMapper.findMycoDataByEnzymeEntryId(enzymeEntryId);
			HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow); 
			String entryName = arow.getEntryName();
						
			if ( proteinSeq == true ) {				
				if ( fieldValue.get("proteinSeqId") != null && 
					 fieldValue.get("proteinSeqId").length() > 0 &&
					 fieldValue.get("proteinSequence") != null &&
					 fieldValue.get("proteinSequence").length() > 0 ){
					 data = ">" + fieldValue.get("entryName") + " | " 
							+ fieldValue.get("proteinSeqId").replaceAll("\"", "") + " | "
							+ fieldValue.get("ecSystematicName") 
							+ " OS=" + fieldValue.get("species")
							+ " GN=" + fieldValue.get("geneAlias")
							+ "\n";
					data += splitIntoLine(fieldValue.get("proteinSequence").replaceAll("\"", ""), 100);
				}			
								
			} else if ( dnaSeq == true ) {
				if ( fieldValue.get("dnaSeqId") != null && 
					 fieldValue.get("dnaSeqId").length() > 0 &&
					 fieldValue.get("dnaSeqId") != null &&
					 fieldValue.get("dnaSeqId").length() > 0 ){
					 data = ">" + fieldValue.get("entryName") + " | " 
							+ fieldValue.get("proteinSeqId").replaceAll("\"", "") + " | "
							+ fieldValue.get("ecSystematicName") 
							+ " OS=" + fieldValue.get("species")
							+ " GN=" + fieldValue.get("geneAlias")
							+ "\n";
					 data += splitIntoLine(fieldValue.get("dnaSequence").replaceAll("\"", ""), 100);
				}	
			}
						
		    helper.setRequestAttribute("data", data); 	    		    
		} catch (Exception e){
			throw new CommandException("Unable to save data to file!");
		}			
	}
	
	private String splitIntoLine(String input, int maxCharInLine) {
		StringTokenizer tok = new StringTokenizer(input, " ");
		StringBuilder output = new StringBuilder(input.length());
		int lineLen = 0;
		while (tok.hasMoreTokens()) {
			String word = tok.nextToken();
			
			while(word.length() > maxCharInLine) {
				output.append(word.substring(0, maxCharInLine-lineLen) + "\n");
	            word = word.substring(maxCharInLine-lineLen);
	            lineLen = 0;
	        }

	        if (lineLen + word.length() > maxCharInLine) {
	            output.append("\n");
	            lineLen = 0;
	        }
	        output.append(word + " ");

	        lineLen += word.length() + 1;
	    }
	    return output.toString();
	}

}
