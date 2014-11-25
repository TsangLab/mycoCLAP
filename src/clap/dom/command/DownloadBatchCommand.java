package clap.dom.command;

import java.util.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.service.util.mycoDataHeaderField;

public class DownloadBatchCommand extends Command {
	
	public DownloadBatchCommand(Helper helper) {
		super(helper);
	}	
	
	public String GetRowDataForPrint(HashMap<String, String> fieldValue, String[] headers){
		String rowValue = new String();
		
		for ( int k = 0; k < headers.length; k++ ) {
			String curValue = (String) fieldValue.get(headers[k]);
			if ( curValue == null )
				curValue = ""; 
			
			/*
			 * combine go id with its evidence
			 */
			if ( headers[k].equals("goProcessId") && curValue.length() > 0 )
				if( fieldValue.get("goProcessEvidence") != null && 
					fieldValue.get("goProcessEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goProcessEvidence");
			
			if ( headers[k].equals("goMolecularId") && curValue.length() > 0 )			
				if( fieldValue.get("goMolecularEvidence") != null && 
					fieldValue.get("goMolecularEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goMolecularEvidence");
			
			
			if ( headers[k].equals("goComponentId") && curValue.length() > 0 )
				if( fieldValue.get("goComponentEvidence") != null && 
					fieldValue.get("goComponentEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goComponentEvidence");
			
			if ( headers[k].equals("genbankGeneId") && curValue.length() > 0 )
				if( fieldValue.get("otherGenBankGeneId") != null &&
					fieldValue.get("otherGenBankGeneId").length() > 0)
					curValue += "," + fieldValue.get("otherGenBankGeneId");
			
			if ( headers[k].equals("uniprotId") && curValue.length() > 0 )
				if( fieldValue.get("otherUniprotId") != null &&
					fieldValue.get("otherUniprotId").length() > 0)
					curValue += "," + fieldValue.get("otherUniprotId");
							
			rowValue += curValue;
			
			if ( k == (headers.length - 1) )
				rowValue += "\n";
			else 
				rowValue += "\t";
		}
		
		return rowValue;
	}	
	
	@Override
	public void execute() throws CommandException {
		String dataType = helper.getString("dataType");	
	 	String[] headers = new String[0];	
	 	String data = "";
	 	String filename = "";
	 	
	 	if ( helper.getStrings("headers") != null ) {
	 		headers = helper.getStrings("headers"); 
	 	}

		try {									
			if( dataType.equals("Dataset") ) {
				filename = "mycoCLAP_data.txt";
				String curRow = "";
				
				/*
				 * output data column headers
				 */
				HashMap<String, String> fieldColumnHeader = mycoDataHeaderField.fieldColumnHeaderTable( );
				
				for( int i = 0; i < headers.length; i++) {
					String colHeader = fieldColumnHeader.get(headers[i]);
					curRow += colHeader;
					
					if ( i == (headers.length -1) )
						curRow += "\n";
					else 
						curRow += "\t";
				}
				
				data += curRow;
				
				/*
				 * output all the data
				 */	
				ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
				// format gene ontology ids
				allMycoData = DisplayDataCommand.mycoData(allMycoData);
				
				for(int i=0; i<allMycoData.size(); i++) {
					MycoData arow = allMycoData.get(i);
					HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow);
					curRow = GetRowDataForPrint(fieldValue, headers);
					data += curRow;
				}			
			}
			
			if ( dataType.equals("ProteinSequence") || dataType.equals("DNASequence") ) {				
				if ( dataType.equals("ProteinSequence") ) 
					filename = "mycoCLAP_proteinSeqs.fasta";
				else 
					filename = "mycoCLAP_DNASeqs.fasta";				
		
				String curRow = "";
				HashMap<String, Boolean> entryNameIdList = new HashMap<String, Boolean>();
				
				ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
	
				for(int i=0; i<allMycoData.size(); i++) {
					MycoData arow = allMycoData.get(i);
					HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow);
			
					if ( dataType.equals("ProteinSequence") ) {
						if ( fieldValue.get("proteinSeqId") != null && 
							 fieldValue.get("proteinSeqId").length() > 0 &&
							 fieldValue.get("proteinSequence") != null &&
							 fieldValue.get("proteinSequence").length() > 0 &&
							 entryNameIdList.get(fieldValue.get("entryName") + "_" + fieldValue.get("proteinSeqId")) == null ){
							 curRow = ">" + fieldValue.get("entryName") + " | " 
									 	+ fieldValue.get("proteinSeqId").replaceAll("\"", "") + " | "
										+ fieldValue.get("ecSystematicName") 
										+ " OS=" + fieldValue.get("species")
										+ " GN=" + fieldValue.get("geneAlias")
										+ "\n";
							 curRow += fieldValue.get("proteinSequence").replaceAll("\"", "") + "\n";
							 data += curRow;
							
							 entryNameIdList.put( (fieldValue.get("entryName") + "_" + fieldValue.get("proteinSeqId")), true);
						}	
					}
					
					if ( dataType.equals("DNASequence")) {
						if ( fieldValue.get("dnaSeqId") != null && 
							 fieldValue.get("dnaSeqId").length() > 0 &&
							 fieldValue.get("dnaSequence") != null &&
							 fieldValue.get("dnaSequence").length() > 0 &&
							 entryNameIdList.get(fieldValue.get("entryName") + "_" + fieldValue.get("dnaSeqId")) == null ){
							 curRow = ">" + fieldValue.get("entryName") + " | " 
									 	+ fieldValue.get("dnaSeqId").replaceAll("\"", "") + " | "
										+ fieldValue.get("ecSystematicName") 
										+ " OS=" + fieldValue.get("species")
										+ " GN=" + fieldValue.get("geneAlias")
										+ "\n";
							 curRow += fieldValue.get("dnaSequence").replaceAll("\"", "") + "\n";
							 data += curRow;
							
							 entryNameIdList.put((fieldValue.get("entryName") + "_" + fieldValue.get("dnaSeqId")), true);
						}	
					}
				}
				
			}
				
			helper.setRequestAttribute("data", data);   
		    helper.setRequestAttribute("filename", filename);
		    
		} 
		catch (Exception e){
			throw new CommandException("Unable to save data to file!");
		}			
	}

}
