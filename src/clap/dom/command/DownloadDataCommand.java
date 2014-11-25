package clap.dom.command;

import java.io.File;
import java.util.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.service.util.FileUploadUtil;
import clap.service.util.mycoDataHeaderField;

public class DownloadDataCommand extends Command {
	
	public DownloadDataCommand(Helper helper) {
		super(helper);
	}
	
	private String GetRowDataForPrint(HashMap<String, String> fieldValue, String[] headers){
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
	 	String[] headers = helper.getStrings("header");
	 	Long[] rowId = {};
	 	String term = helper.getString("searchTerm");
//	 	String searchScale = helper.getString("searchScale");
	 	String fieldMatch = helper.getString("fieldMatch");		// added on Nov 27, 2012 for search on specific field
	 	boolean downloadAll = helper.getBoolean("downloadAll");
	 	boolean fasta = helper.getBoolean("fasta");	 	
	 	String data = "";
	 	String filename = "";
	
	 	if ( downloadAll == false ) 
	 		rowId = helper.getLongs("rowDataId");
	 	
		try {
			
			if ( fasta == false ) {
				filename = "mycoCLAP_data.txt";				
				String curRow = "";
				HashMap<String, String> fieldColumnHeader = mycoDataHeaderField.fieldColumnHeaderTable( );
				
				/*
				 * output data column headers, but ignore last one which is "Date of Last Modification"
				 */
				for( int i = 0; i < headers.length-1; i++) {
					String colHeader = fieldColumnHeader.get(headers[i]);
					curRow += colHeader;
					
					if ( i == (headers.length -2) )
						curRow += "\n";
					else 
						curRow += "\t";
				}
				
				data += curRow;
				
				if ( downloadAll == false ) {
					/*
					 * download only selected data from search results
					 */
					for ( int i = 0; i < rowId.length; i++ ) {
						MycoData arow = MycoDataInputMapper.findMycoDataByEnzymeEntryId(rowId[i]);
						HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow);  
						curRow = GetRowDataForPrint(fieldValue, headers);
						data += curRow;
					}
				}
				else {	
					/*
					 * download all the data from search results
					 */
					ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
					ArrayList<MycoData> finalResult = new ArrayList<MycoData>();
					ArrayList<MycoData> returnResult = new ArrayList<MycoData>();
					
					if ( term != null && term != "" ) {						
						File parentDir = FileUploadUtil.luceneIndexDir();
						finalResult = DisplayDataCommand.mycodataByTerms(term, parentDir, fieldMatch);
					}						
					
					if ( term == "" ) 
						returnResult = allMycoData;
					else 
						returnResult = finalResult;	
					
					// format gene ontology ids
					returnResult = DisplayDataCommand.mycoData(returnResult);
					
					for ( int i = 0; i < returnResult.size(); i++ ) {
						MycoData arow = returnResult.get(i);
						HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow);  
						curRow = GetRowDataForPrint(fieldValue, headers);
						data += curRow;
					}
				}
			}							
			
			if ( fasta == true ) {
				filename = "mycoCLAP_seqs.fasta";
				String curRow = "";
				HashMap<String, Boolean> entryNameIdList = new HashMap<String, Boolean>();
				
				if ( downloadAll == false ) {
					/*
					 * download only selected data from search results
					 */
					for ( int i = 0; i < rowId.length; i++ ) {
						MycoData arow = MycoDataInputMapper.findMycoDataByEnzymeEntryId(rowId[i]);
						HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow);  
						
						if ( fieldValue.get("proteinSeqId") != null && 
							 fieldValue.get("proteinSeqId").length() > 0  &&
							 fieldValue.get("proteinSequence") != null &&
							 fieldValue.get("proteinSequence").length() > 0 &&
							 entryNameIdList.get(fieldValue.get("entryName") + "_" + fieldValue.get("proteinSeqId")) == null ) {
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
				}
				else {	
					/*
					 * download all the data from search results
					 */
					ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
					ArrayList<MycoData> finalResult = new ArrayList<MycoData>();
					ArrayList<MycoData> returnResult = new ArrayList<MycoData>();
										
					if ( term != null && term != "" ) {						
						File parentDir = FileUploadUtil.luceneIndexDir();
						finalResult = DisplayDataCommand.mycodataByTerms(term, parentDir, fieldMatch);
					}
					
					if ( term == "" ) 
						returnResult = allMycoData;
					else 
						returnResult = finalResult;	
					
					for ( int i = 0; i < returnResult.size(); i++ ) {
						MycoData arow = returnResult.get(i);
						HashMap<String, String> fieldValue = mycoDataHeaderField.buildFieldValueTable(arow); 
						
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
				}				
			}
						
		    helper.setRequestAttribute("data", data);   
		    helper.setRequestAttribute("filename", filename);		    		    
		} catch (Exception e){
			throw new CommandException("Unable to save data to file!");
		}			
	}

}
