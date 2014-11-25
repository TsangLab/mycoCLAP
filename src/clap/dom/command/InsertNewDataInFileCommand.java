package clap.dom.command;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Scanner;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.dom.model.biochemicalproperty.tdg.BiochemicalPropertyTDG;
import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
import clap.dom.model.datafiles.tdg.DataFilesTDG;
import clap.dom.model.dnasequence.tdg.DnaSequenceFinder;
import clap.dom.model.dnasequence.tdg.DnaSequenceTDG;
import clap.dom.model.entrydescription.mappers.EntryDescriptionInputMapper;
import clap.dom.model.entrydescription.tdg.EntryDescriptionFinder;
import clap.dom.model.entrydescription.tdg.EntryDescriptionTDG;
import clap.dom.model.entrylistref.mappers.EntryListRefInputMapper;
import clap.dom.model.entrylistref.tdg.EntryListRefTDG;
import clap.dom.model.enzymeannotation.tdg.EnzymeAnnotationTDG;
import clap.dom.model.externalresource.tdg.ExternalResourceTDG;
import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.proteinfeature.tdg.ProteinFeatureTDG;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceFinder;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceTDG;
import clap.service.util.FileUploadUtil;
import clap.service.util.LuceneIndexFile;
import clap.service.util.MultipartRequest;
import clap.service.util.dateTime;

public class InsertNewDataInFileCommand extends Command {
	
	public InsertNewDataInFileCommand(Helper helper) {
		super(helper);
	}
	
	public static final String DOCUMENT_FILE_PARM = "fileUpload";
	public static final String FILE_ITEM_STRING = "fileItems";
	
	public void execute() throws CommandException {
		String list = "Inserted: ";
		String literatureUpdateMsg = "";
		HashMap<String, String> rowData = new HashMap<String, String>();
		
		try {
			int lineNum = 0;
			String[] nameArray = null;
			String [] valArray = null;
									
			// add date, user name, modified fields if it's update to db
			IMycoclapuser user = (IMycoclapuser) helper.getSessionAttribute("CurrentUser");
			String comments = "";		
			
			String filename = null;
			File infile = null;	
			
			if ( MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != null &&
		    		  MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM) != ""  ) {
		    	  filename = MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM);
		    	  infile = MultipartRequest.getFile(helper, DOCUMENT_FILE_PARM);
			  	      
		    	  FileInputStream fin =  new FileInputStream(infile);
		    	  BufferedReader buf = new BufferedReader(new InputStreamReader(fin, "cp1252"));

		    	  /*
		    	   * if file contains sequence of FASTA format, need to remove "LF" 
		    	   * in FASTA format to convert sequence to one string
		    	   */
		    	  Scanner src = new Scanner(buf).useDelimiter(System.getProperty("line.separator"));
		    	  		    	  
		  		  String strLine;
		  		  
		  		  while(src.hasNext()) {
		  			  strLine = src.next().replaceAll("\n", "");		    	  
		  			  lineNum++;
		    		   
		    		  if (strLine.trim().length() == 0 ) 
		    			  continue;
		    		  		    
		    		  if (lineNum == 1) {		    			 
		    			  nameArray = strLine.split("\t");		 // title line
		    		  } else {
		    			  valArray = strLine.split("\t");
		    			  for(int i=0; i<valArray.length; i++) {
		    				  rowData.put(nameArray[i].replaceAll("\"", "").trim(), valArray[i].replaceAll("\"", "").trim());
		    				  comments += nameArray[i].replaceAll("\"", "").trim() + ":" + valArray[i].replaceAll("\"", "").trim();
		    				  if(i<valArray.length-1) 
		    					  comments += ",";
		    			  }
		    			  
		    			  String entryName = rowData.get("entryName");
							
		    			  if (entryName.matches("[a-zA-Z0-9]+_[a-zA-Z0-9]{5}")) {
		    				  comments = "Insert from file: {[" + comments + "]}";
			    			  insertData(rowData, comments, user);	
			    			  literatureUpdateMsg += " " + UpdateDataCommand.updateLiterature(rowData);
			    			  list += rowData.get("entryName") + "; ";
		    			  }
		    			  else {
		    				  throw new Exception("Wrong Entry Name - " + entryName);							
		    			  }
						  rowData.clear();
						  comments = "";
		    		  }		    		  
		    	  }
		    	  
		    	  /*
		    	   * save data file in a MySQL table
		    	   */
		    	  FileInputStream finDb =  new FileInputStream(infile);		    	  
		    	  DataFilesTDG.insert(
	  						DataFilesTDG.getMaxId(), 
	  						MultipartRequest.getFileName(helper, DOCUMENT_FILE_PARM),
	  						new InputStreamReader(finDb, "cp1252"),
	  						user.getUsername(),
	  						dateTime.currenttime());
		    	  
		    	  src.close();
		    	  buf.close();
		    	  finDb.close();
		    	  fin.close();
		    	  
			     helper.setRequestAttribute("message", "File: " + filename + " submitted. " + list + " " +literatureUpdateMsg);			     
			     							
	        } else {
	    	    helper.setRequestAttribute("message", "No attach file");
	        }				
		} catch (Exception e) {
			String errorMsg = rowData.get("entryName") + " : " + e.getMessage();
			
			if ( !list.equals("") )
				errorMsg = list + " and " + errorMsg;
			helper.setRequestAttribute("message", errorMsg);
			throw new CommandException(e);
		}
	}
	
	
	private void insertData(HashMap<String, String> rowData, String comments, IMycoclapuser user) throws SQLException, MapperException {
		/*
		 * separate genbankGeneId into genbankGeneId and otherGenbankGeneId
		 * separate uniprotId into uniprotId and otherUniprotId
		 */
		String genbankGeneId = rowData.get("genbankGeneId");
		String uniprotId = rowData.get("uniprotId");
		String otherGenbankGeneId = "";
		String otherUniprotId = "";
		
		if( genbankGeneId.contains(",")) {
			int indexVal = genbankGeneId.indexOf(",");
			otherGenbankGeneId = genbankGeneId.substring(indexVal+1).trim();
			genbankGeneId = genbankGeneId.substring(0, indexVal).trim();
		}
		
		if( uniprotId.contains(",")) {
			int indexVal = uniprotId.indexOf(",");
			otherUniprotId = uniprotId.substring(indexVal+1).trim();
			uniprotId = uniprotId.substring(0, indexVal).trim();
		}
		
		/*
		 * if entry_name not in the list, create new entry_description
		 */
		String entryName = rowData.get("entryName");
		long entryNameId;
		
		Connection con = null;
		try {
			con = DbRegistry.getDbConnection();
			con.setAutoCommit(false);
				
			long id = EntryListRefInputMapper.findEntryListRefMaxId()+1;
		
			// to check if the entry_name exists in db			
			ResultSet rs = EntryDescriptionFinder.findEntryDescriptionByEntryName(rowData.get("entryName"));
			
			if ( !rs.next() ) {				
				long entryDescriptionId = EntryDescriptionInputMapper.findEntryDescriptionMaxId()+1;
				entryNameId = entryDescriptionId;
				EntryDescriptionTDG.insert(
						entryDescriptionId,
						entryNameId, 
						rowData.get("species"), 
						rowData.get("strain"), 
						rowData.get("entryName"),
						rowData.get("geneName"), 
						rowData.get("geneAlias"), 
						rowData.get("enzymeName"), 
						rowData.get("ecSystematicName"), 
						rowData.get("enzymeAlias"), 
						rowData.get("family"));			
			} else {
				// update entry description table if entry name exists 
				// so, if the contents in other columns changes, the table will be updated.
				entryNameId = EntryDescriptionInputMapper.findEntryDescriptionByEntryName(entryName).getEntryNameId();
				
				/*
				 * If entryName exists in the database, we don't update the entry_description table. 
				 * If the entry_desciption for that entry needs to be updated, we will go to data "UPDATE" section to change it.
				 * Requested by Kimchi on July 23, 2014
				 */
				/* EntryDescriptionTDG.update(
						entryNameId, 
						entryNameId, 
						rowData.get("species"), 
						rowData.get("strain"), 
						rowData.get("entryName"),
						rowData.get("geneName"), 
						rowData.get("geneAlias"), 
						rowData.get("enzymeName"), 
						rowData.get("ecSystematicName"), 
						rowData.get("enzymeAlias"), 
						rowData.get("family"));	
						*/
			}
			
			EntryListRefTDG.insert(id, id, entryNameId, 1, "active");
			
			BiochemicalPropertyTDG.insert(
					BiochemicalPropertyTDG.getMaxId(), 
					id, 
					rowData.get("substrates"), 
					rowData.get("host"), 
					rowData.get("specificActivity"), 
					rowData.get("activityAssayConditions"), 
					rowData.get("substrateSpecificity"), 
					rowData.get("km"), 
					rowData.get("kcat"), 
					rowData.get("vmax"), 
					rowData.get("assay"), 
					rowData.get("kineticAssayConditions"), 
					rowData.get("productAnalysis"), 
					rowData.get("productFormed"), 
					rowData.get("phOptimum"), 
					rowData.get("phStability"), 
					rowData.get("temperatureOptimum"), 
					rowData.get("temperatureStability"), 
					rowData.get("ipExperimental"), 
					rowData.get("ipPredicted"), 
					rowData.get("otherFeatures"));
			
			EnzymeAnnotationTDG.insert(
					EnzymeAnnotationTDG.getMaxId(),
					id, 
					rowData.get("ecNumber"), 
					rowData.get("goMolecularId"), 
					rowData.get("goMolecularEvidence"), 
					rowData.get("goMolecularRef"),
					rowData.get("goProcessId"), 
					rowData.get("goProcessEvidence"),
					rowData.get("goProcessRef"),
					rowData.get("goComponentId"), 
					rowData.get("goComponentEvidence"),
					rowData.get("goComponentRef"));
			
			ExternalResourceTDG.insert(
					ExternalResourceTDG.maxId(),
					id, 
					genbankGeneId,
					otherGenbankGeneId,
					uniprotId,
					otherUniprotId,
					rowData.get("genbankProteinId"), 
					rowData.get("refseqProteinId"),
					rowData.get("jgiId"), 
					rowData.get("broadId"), 
					rowData.get("literaturePmid"), 
					rowData.get("structurePmid"),
					rowData.get("sequencePmid"),
					rowData.get("pdbId"),
					rowData.get("structureDeterminationMethod"));
			
			// dna sequence table
			String[] dnaSeqRetrieval = UpdateDataCommand.getDnaSeq(rowData); 
			String dnaId = dnaSeqRetrieval[0];
			String sequence = dnaSeqRetrieval[1];
			
//			ResultSet dnaSeqRs = DnaSequenceFinder.findDnaSequenceByEntryNameId(entryNameId);
//			if ( ! dnaSeqRs.next() && sequence != null) 
			if(dnaId != null && sequence != null )
				DnaSequenceTDG.insert(
					DnaSequenceTDG.maxId(), 
					id, 
					entryNameId, 
					dnaId, 
					sequence);
			
			// protein feature table
			ProteinFeatureTDG.insert(
					ProteinFeatureTDG.maxId(), 
					id, 
					rowData.get("signalPeptidePredicted"), 
					rowData.get("nterminalExperimental"),
					rowData.get("molecularWtExperimental"), 
					rowData.get("molecularWtPredicted"), 
					rowData.get("proteinLength"), 
					rowData.get("cbd"), 
					rowData.get("glycosylation"));
			
			// protein sequence table
			String[] proteinSeqRetrieval = UpdateDataCommand.getProteinSeq(rowData);
			String proteinId = proteinSeqRetrieval[0];
			sequence = proteinSeqRetrieval[1];
			
//			ResultSet proteinSeqRs = ProteinSequenceFinder.findProteinSequenceByEntryNameId(entryNameId);
//			if ( ! proteinSeqRs.next() && sequence != null) 
			if ( proteinId != null && sequence != null )
				ProteinSequenceTDG.insert(
						ProteinSequenceTDG.maxId(), 
						id, 
						entryNameId, 
						proteinId, 
						sequence);
			
		   // changeLogging table	
		   ChangeLoggingTDG.insert(
					ChangeLoggingTDG.getMaxId(), 
					user.getUsername(),
					dateTime.currenttime(),
					id,
					entryNameId,
					rowData.get("entryName"),
					"insert",
					comments);					
			con.commit();
			con.setAutoCommit(true);
			
			luceneIndexFileRecreate();			
			helper.setRequestAttribute("message", "Insert data to database successfully!");
		} catch (SQLException e) {
			helper.setRequestAttribute("message", e.getSQLState());
			throw new SQLException(e);
		} catch (Exception e) {
			helper.setRequestAttribute("message", e.getMessage());
			throw new MapperException(e);
		}	
	}
	
	public void luceneIndexFileRecreate() throws IOException, SQLException 
	{
	    String relative_path = "/WEB-INF/uploads/luceneindex/";
	    FileUploadUtil.deleteFiles(helper.getRequestAttribute("realPath") +relative_path);
	    File parentDir = FileUploadUtil.luceneIndexDir();
	    LuceneIndexFile.createLuceneIndexFile(parentDir);
	}
	
}