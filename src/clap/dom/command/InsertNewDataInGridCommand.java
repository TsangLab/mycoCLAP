package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.dom.model.biochemicalproperty.tdg.BiochemicalPropertyTDG;
import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
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
import clap.service.util.dateTime;

import atg.taglib.json.util.JSONArray;
import atg.taglib.json.util.JSONObject;

public class InsertNewDataInGridCommand extends Command {
	
	public InsertNewDataInGridCommand(Helper helper) {
		super(helper);
	}
	
	public void execute() throws CommandException {
		String list = "";
		String literatureUpdateMsg = "";
		HashMap<String, String> rowData = new HashMap<String, String>();
		
		try {	
			String comments = "Insert Entry: ";				
			String data = helper.getString("data");
			helper.setRequestAttribute("data", data);
			
			// it is an array - have to cast to array object
			if (data.toString().indexOf('[') > -1) {				
				JSONArray jsonArray = new JSONArray(data);
				
				for(int j=0; j<jsonArray.length(); j++) {
					JSONObject jsonObject = jsonArray.getJSONObject(j);					
					JSONArray nameArray = jsonObject.names();
					JSONArray valArray = jsonObject.toJSONArray(nameArray);
					
					if ( valArray != null ) {
						for(int i=0; i<valArray.length(); i++) 
							rowData.put(nameArray.getString(i).trim(), valArray.getString(i).trim());
						
						String entryName = rowData.get("entryName");
						
						if (entryName.matches("[a-zA-Z0-9]+_[a-zA-Z0-9]{5}")) {
							comments = "Insert: " + jsonArray.get(j).toString();
							insertData(rowData, comments);
							literatureUpdateMsg = UpdateDataCommand.updateLiterature(rowData);
							list = list + " Insert: " + rowData.get("entryName");
						}
						else {
							throw new Exception("Wrong Entry Name - " + entryName);						
						}
						rowData.clear();
						comments = "";
					}
				}					
			}

			helper.setRequestAttribute("message", list + " " + literatureUpdateMsg);
								
		} catch (Exception e) {
			String errorMsg = rowData.get("entryName") + " : " + e.getMessage();			
			if ( !list.equals(""))
				errorMsg = list + " and " + errorMsg;
			
			helper.setRequestAttribute("message", errorMsg);
			throw new CommandException(e);
		}
	}
	
	private void insertData(HashMap<String, String> rowData, String comments) throws SQLException, MapperException {
		
		IMycoclapuser user = (IMycoclapuser) helper.getSessionAttribute("CurrentUser");		
		Connection con = null;
		try {
			con = DbRegistry.getDbConnection();
			con.setAutoCommit(false);
			
			long entryNameId;			
			long id = EntryListRefInputMapper.findEntryListRefMaxId()+1;
			String entryName = rowData.get("entryName");
						
			// to check if the entry_name exists in db			
			ResultSet rs = EntryDescriptionFinder.findEntryDescriptionByEntryName(rowData.get("entryName"));
			
			if ( !rs.next() ) {				
				long entryDescriptionId = EntryDescriptionInputMapper.findEntryDescriptionMaxId()+1;
				System.out.println("entryNameId: " + EntryDescriptionInputMapper.findEntryDescriptionMaxId());
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
				System.out.println("After insertion entryNameId: " + EntryDescriptionInputMapper.findEntryDescriptionMaxId());
			} else {
				// update entry description table if entry name exists 
				// so, if the contents in other columns changes, the table will be updated.
				entryNameId = EntryDescriptionInputMapper.findEntryDescriptionByEntryName(entryName).getEntryNameId();

				/*
				 * If entryName exists in the database, we don't update the entry_description table. 
				 * If the entry_desciption for that entry needs to be updated, we will go to data "UPDATE" section to change it.
				 * Requested by Kimchi on July 23, 2014
				 */
				/*				EntryDescriptionTDG.update(
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
					rowData.get("genbankGeneId"), 
					rowData.get("otherGenbankGeneId"), 
					rowData.get("uniprotId"), 
					rowData.get("otherUniprotId"), 
					rowData.get("genbankProteinId"), 
					rowData.get("refseqProteinId"),
					rowData.get("jgiId"), 
					rowData.get("broadId"), 
					rowData.get("literaturePmid"), 
					rowData.get("structurePmid"),
					rowData.get("sequencePmid"),
					rowData.get("pdbId"),
					rowData.get("structureDeterminationMethod"));
			
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
					entryName,
					"insert",
					comments);	
			
			con.commit();
			con.setAutoCommit(true);	
			
			luceneIndexFileRecreate();
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