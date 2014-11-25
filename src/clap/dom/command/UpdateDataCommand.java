package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.dom.model.biochemicalproperty.BiochemicalProperty;
import clap.dom.model.biochemicalproperty.mappers.BiochemicalPropertyInputMapper;
import clap.dom.model.biochemicalproperty.tdg.BiochemicalPropertyTDG;
import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
import clap.dom.model.dnasequence.DnaSequence;
import clap.dom.model.dnasequence.mappers.DnaSequenceInputMapper;
import clap.dom.model.dnasequence.tdg.DnaSequenceFinder;
import clap.dom.model.dnasequence.tdg.DnaSequenceTDG;
import clap.dom.model.entrydescription.EntryDescription;
import clap.dom.model.entrydescription.mappers.EntryDescriptionInputMapper;
import clap.dom.model.entrydescription.tdg.EntryDescriptionFinder;
import clap.dom.model.entrydescription.tdg.EntryDescriptionTDG;
import clap.dom.model.entrylistref.EntryListRef;
import clap.dom.model.entrylistref.mappers.EntryListRefInputMapper;
import clap.dom.model.entrylistref.tdg.EntryListRefTDG;
import clap.dom.model.entrynamelogging.EntryNameLogging;
import clap.dom.model.entrynamelogging.mappers.EntryNameLoggingInputMapper;
import clap.dom.model.entrynamelogging.tdg.EntryNameLoggingTDG;
import clap.dom.model.enzymeannotation.EnzymeAnnotation;
import clap.dom.model.enzymeannotation.mappers.EnzymeAnnotationInputMapper;
import clap.dom.model.enzymeannotation.tdg.EnzymeAnnotationFinder;
import clap.dom.model.enzymeannotation.tdg.EnzymeAnnotationTDG;
import clap.dom.model.externalresource.ExternalResource;
import clap.dom.model.externalresource.mappers.ExternalResourceInputMapper;
import clap.dom.model.externalresource.tdg.ExternalResourceFinder;
import clap.dom.model.externalresource.tdg.ExternalResourceTDG;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractFinder;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractTDG;
import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.MycoDataGeneView;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.dom.model.proteinfeature.ProteinFeature;
import clap.dom.model.proteinfeature.mappers.ProteinFeatureInputMapper;
import clap.dom.model.proteinfeature.tdg.ProteinFeatureFinder;
import clap.dom.model.proteinfeature.tdg.ProteinFeatureTDG;
import clap.dom.model.proteinsequence.ProteinSequence;
import clap.dom.model.proteinsequence.mappers.ProteinSequenceInputMapper;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceFinder;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceTDG;
import clap.service.util.FileUploadUtil;
import clap.service.util.LuceneIndexFile;
import clap.service.util.PubMedFetch;
import clap.service.util.SequenceFetch;
import clap.service.util.dateTime;

import atg.taglib.json.util.JSONArray;
import atg.taglib.json.util.JSONObject;

public class UpdateDataCommand extends Command {
	
	public UpdateDataCommand(Helper helper) {
		super(helper);
	}
	
	public void execute() throws CommandException {
		String list = "";
		String literatureUpdateMsg = "";
		
		try {		
			String type = helper.getString("type");
			String entryName = null;
			int total = 0;
						
			if ( type.equals("read")) {
				entryName = helper.getString("entryName");
				ArrayList<MycoDataGeneView> mycoDataByEntryName = MycoDataInputMapper.findMycoDataByEntryName(entryName);
				total = mycoDataByEntryName.size();
				
				helper.setRequestAttribute("dataset", mycoDataByEntryName);
				helper.setRequestAttribute("total", total);	
				helper.setRequestAttribute("type", helper.getString("type"));
			}			
			
			/*
			 * modify existing entry
			 */
			if(type.equals("modify")){				
				String data = helper.getString("data");
				helper.setRequestAttribute("data", data);
				
				HashMap<String, String> rowData = new HashMap<String, String>();
				
				// it is an array - have to cast to array object
				if (data.toString().indexOf('[') > -1) {				
					JSONArray jsonArray = new JSONArray(data);
					
					for(int j=0; j<jsonArray.length(); j++) {
						JSONObject jsonObject = jsonArray.getJSONObject(j);					
						JSONArray nameArray = jsonObject.names();
						JSONArray valArray = jsonObject.toJSONArray(nameArray);
						
						if ( valArray != null ) {
							for(int i=0; i<valArray.length(); i++) 
								rowData.put(nameArray.getString(i), valArray.getString(i));
							
							updateData(rowData);
							literatureUpdateMsg = updateLiterature(rowData);
							list = list + " " + rowData.get("entryName");
							rowData.clear();
						}
					}					
				}	
				
				helper.setRequestAttribute("message", list + " have been updated!" + " " + literatureUpdateMsg);
				helper.setRequestAttribute("type", helper.getString("type"));
			}						
		} catch (Exception e) {
			String errorMsg = list + " have been updated" + "" + e.getMessage();
			helper.setRequestAttribute("message", errorMsg);
			throw new CommandException(e);
		}
	}
	
	private void updateData(HashMap<String, String> rowData) throws SQLException, MapperException {		
		long enzymeEntryId = Long.valueOf(rowData.get("enzymeEntryId"));
		long entryNameId;		
		MycoData mycoData = MycoDataInputMapper.findMycoDataByEnzymeEntryId(Long.valueOf(enzymeEntryId));
		String	entryName = mycoData.getEntryName();
		IMycoclapuser user = (IMycoclapuser) helper.getSessionAttribute("CurrentUser");
		String comments = "Modification: " + DeleteDataCommand.dataLog(mycoData);
		
		Connection con = null;
		try {
			con = DbRegistry.getDbConnection();
			con.setAutoCommit(false);
			
			// list of table declaration
			EntryListRef entryListRef = null;
			BiochemicalProperty biochemicalProperty = null; 
			DnaSequence dnaSequence = null;
			EntryDescription entryDescription = null;
			EnzymeAnnotation enzymeAnnotation = null;
			ExternalResource externalResource = null;	
			ProteinFeature proteinFeature = null;
			ProteinSequence proteinSequence = null;
			ResultSet rs = null;
			
			// EntryListRef table update
			entryListRef = EntryListRefInputMapper.findEntryListRefByEnzymeEntryId(enzymeEntryId);
			entryNameId = entryListRef.getEntryNameId();
			
			EntryListRefTDG.update(enzymeEntryId, enzymeEntryId, entryNameId, entryListRef.getVersion()+1, "active");
			
			// BiochemicalProperty table update
			if( BiochemicalPropertyInputMapper.findBiochemicalPropertyByEnzymeEntryId(enzymeEntryId) != null ) {
				biochemicalProperty = BiochemicalPropertyInputMapper.findBiochemicalPropertyByEnzymeEntryId(enzymeEntryId);
				BiochemicalPropertyTDG.update(
						biochemicalProperty.getId(), 
						enzymeEntryId, 
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
			} else {			
				BiochemicalPropertyTDG.insert(
						BiochemicalPropertyTDG.getMaxId(), 
						enzymeEntryId, 
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
			}
						
			// DnaSequence table update
			String[] dnaSeqRetrieval = getDnaSeq(rowData); 
			String dnaId = dnaSeqRetrieval[0];
			String sequence = dnaSeqRetrieval[1];
			
			rs = DnaSequenceFinder.findDnaSequenceByEnzymeEntryId(enzymeEntryId);
			if ( !rs.next() ){
				if ( sequence != null )
					DnaSequenceTDG.insert(
							DnaSequenceTDG.maxId(), 
							enzymeEntryId, 
							entryNameId, 
							dnaId, 
							sequence);
			} else {
				dnaSequence = DnaSequenceInputMapper.findDnaSequenceByEnzymeEntryId(enzymeEntryId);
				DnaSequenceTDG.update(
						dnaSequence.getId(), 
						enzymeEntryId, 
						entryNameId, 
						dnaId, 
						sequence);
			}
			
			// EntryDescription table update
			rs = EntryDescriptionFinder.findEntryDescriptionByEntryNameId(entryNameId);
			if( rs.next() ) {
				entryDescription = EntryDescriptionInputMapper.findEntryDescriptionByEntryNameId(entryNameId);
				EntryDescriptionTDG.update(
						entryDescription.getId(), 
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
			}
			
			// EnzymeAnnotation table update
			rs = EnzymeAnnotationFinder.findEnzymeAnnotationByEnzymeEntryId(enzymeEntryId);
			if( !rs.next() ){
				EnzymeAnnotationTDG.insert(
						EnzymeAnnotationTDG.getMaxId(),
						enzymeEntryId, 
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
			} else {
				enzymeAnnotation = EnzymeAnnotationInputMapper.findEnzymeAnnotationByEnzymeEntryId(enzymeEntryId);
				EnzymeAnnotationTDG.update(
						enzymeAnnotation.getId(), 
						enzymeEntryId, 
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
			}
			
			// ExternalReqource table update
			rs = ExternalResourceFinder.findExternalResourceByEnzymeEntryId(enzymeEntryId);
			if ( !rs.next() ) {
				ExternalResourceTDG.insert(
						ExternalResourceTDG.maxId(),
						enzymeEntryId, 
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
			} else {			
				externalResource = ExternalResourceInputMapper.findExternalResourceByEnzymeEntryId(enzymeEntryId);
				ExternalResourceTDG.update(
						externalResource.getId(), 
						enzymeEntryId, 
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
			}
			
			// ProteinFeature table update
			rs = ProteinFeatureFinder.findProteinFeatureByEnzymeEntryId(enzymeEntryId);
			if ( !rs.next() ) {
				ProteinFeatureTDG.insert(
						ProteinFeatureTDG.maxId(), 
						enzymeEntryId, 
						rowData.get("signalPeptidePredicted"),
						rowData.get("nterminalExperimental"),
						rowData.get("molecularWtExperimental"), 
						rowData.get("molecularWtPredicted"), 
						rowData.get("proteinLength"), 
						rowData.get("cbd"), 
						rowData.get("glycosylation"));
			} else {
				proteinFeature = ProteinFeatureInputMapper.findProteinFeatureByEnzymeEntryId(enzymeEntryId);
				ProteinFeatureTDG.update(
						proteinFeature.getId(), 
						enzymeEntryId, 
						rowData.get("signalPeptidePredicted"),
						rowData.get("nterminalExperimental"),
						rowData.get("molecularWtExperimental"), 
						rowData.get("molecularWtPredicted"), 
						rowData.get("proteinLength"), 
						rowData.get("cbd"), 
						rowData.get("glycosylation"));
			}
			
			// ProteinSequence table update			
			String[] proteinSeqRetrieval = getProteinSeq(rowData);
			String proteinId = proteinSeqRetrieval[0];
			sequence = proteinSeqRetrieval[1];
			
			rs = ProteinSequenceFinder.findProteinSequenceByEnzymeEntryId(enzymeEntryId);
			if ( !rs.next() ) {
				if (sequence != null )
					ProteinSequenceTDG.insert(
							ProteinSequenceTDG.maxId(), 
							enzymeEntryId, 
							entryNameId, 
							proteinId, 
							sequence);
			} else {
				proteinSequence = ProteinSequenceInputMapper.findProteinSequenceByEnzymeEntryId(enzymeEntryId);
				ProteinSequenceTDG.update(
						proteinSequence.getId(), 
						enzymeEntryId, 
						entryNameId, 
						proteinId, 
						sequence);
			}	
			
			/*
			 * update entry_name_logging table if entryName changes 
			 */
			if ( !entryName.equals(rowData.get("entryName"))){
				ArrayList<EntryNameLogging> entryNameLogging = new ArrayList<EntryNameLogging>();
				entryNameLogging = EntryNameLoggingInputMapper.findEntryNameLoggingByEntryName(entryName);
				
				/*
				 * update entry_name_logging list if the entry_name exists.
				 */
				if ( entryNameLogging.size() != 0)
					for(int i = 0; i < entryNameLogging.size(); i++) {
						EntryNameLoggingTDG.update(
							entryNameLogging.get(i).getId(), 
							entryNameLogging.get(i).getStatus(), 
							rowData.get("entryName"), 
							entryNameLogging.get(i).getUsedEntryName(), 
							dateTime.currenttime());
					}
													
				EntryNameLoggingTDG.insert(
					EntryNameLoggingTDG.getMaxId(), 
					"active", 
					rowData.get("entryName"), 
					entryName, 
					dateTime.currenttime());				
			}
			
			ChangeLoggingTDG.insert(
					ChangeLoggingTDG.getMaxId(), 
					user.getUsername(),
					dateTime.currenttime(),
					Long.valueOf(enzymeEntryId),
					mycoData.getEntryNameId(),
					entryName,
					"modification",
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
	
	public static String[] getDnaSeq(HashMap<String, String> rowData) {
		String dnaId = null;
		String sequence = null;
		if ( rowData.get("genbankGeneId") != null && 
			!rowData.get("genbankGeneId").equals("") ) {
			dnaId = rowData.get("genbankGeneId");
			
			if (dnaId == null)
				return new String[] {null, null};
			else if (dnaId.contains(",")) {
				String[] dnaIds = dnaId.split(",");
				dnaId = dnaIds[0].trim();
			}
			
//			if (rowData.get("dnaSequence") != null &&
//				!rowData.get("dnaSequence").equals("") ) {
//				sequence = rowData.get("dnaSequence");
//			}
//			else 
				sequence = SequenceFetch.sequenceFromPubMed(dnaId);
		}
		else if ( rowData.get("broadId") != null &&
				 !rowData.get("broadId").equals("") ) {
			dnaId = rowData.get("broadId");
			
			if (dnaId == null)
				return new String[] {null, null};
			else if (dnaId.contains(",")) {
				String[] dnaIds = dnaId.split(",");
				dnaId = dnaIds[0].trim();
			}
			sequence = rowData.get("dnaSequence");
		}
				
		return new String[] {dnaId, sequence};
	}

	
	public static String[] getProteinSeq(HashMap<String, String> rowData) {
		String proteinId = null;
		String sequence = null;
		if ( rowData.get("uniprotId") != null &&
				!rowData.get("uniprotId").equals("")) {
			proteinId = rowData.get("uniprotId");
		}					
		else if ( rowData.get("genbankProteinId") != null &&
				 !rowData.get("genbankProteinId").equals("")) {
			proteinId = rowData.get("genbankProteinId");
		}		
		
		if (proteinId == null) 
			return new String[] {null, null};
		else {
			if (proteinId.contains(",")) {
				String[] proteinIds = proteinId.split(",");
				proteinId = proteinIds[0].trim();
			}	
			
//			if ( rowData.get("proteinSequence") != null &&
//				!rowData.get("proteinSequence").equals("")) 
//				sequence = rowData.get("proteinSequence");
//			else
				sequence = SequenceFetch.sequenceFromUniProt(proteinId);
			
			if( sequence == null || sequence.equals(""))
				sequence = SequenceFetch.sequenceFromPubMed(proteinId);
			
			return new String[] {proteinId, sequence};
		}
	}
		
	public static String updateLiterature(HashMap<String, String> rowData) {
		String msg = "";
		// literature_abstract table update
		String literaturePmid = rowData.get("literaturePmid");
		String structurePmid = rowData.get("structurePmid");
		String sequencePmid = rowData.get("sequencePmid");
		
		try {
			if (literaturePmid != null &&
				literaturePmid.matches("[0-9]+") && 
				! LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(literaturePmid).next() )
				if ( !literatureAbstractInsert(literaturePmid) )
					msg += " " + literaturePmid;
			if (structurePmid != null &&
				structurePmid.matches("[0-9]+") && 
				! LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(structurePmid).next() )
				if ( !literatureAbstractInsert(structurePmid) )
					msg += " " + structurePmid;
			if (sequencePmid != null &&
				sequencePmid.matches("[0-9]+") && 
				! LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(sequencePmid).next() )
				if ( !literatureAbstractInsert(sequencePmid) )
					msg += " " + sequencePmid;			
		} catch (SQLException e) {
			 msg += ", " + e.getSQLState();
		}		
		
		if (! msg.equals("") )
			msg = "Unable to retrieve pmid" + msg; 
		return msg;								
	}
	
	public static Boolean literatureAbstractInsert(String pmid) throws SQLException {
		Boolean isInsert = false;
		try {
			HashMap<String, String> litRef = PubMedFetch.referenceInfo(pmid);
			if (litRef != null) {
				LiteratureAbstractTDG.insert(
						LiteratureAbstractTDG.maxId(),
						pmid,
						litRef.get("source"), 
						litRef.get("title"), 
						litRef.get("author"), 
						litRef.get("address"), 
						litRef.get("abstractText"));
				isInsert = true;
			} else
				isInsert = false;
		} catch (SQLException e) {
			isInsert = false;
		}
		return isInsert;
	}
	
	public void luceneIndexFileRecreate() throws IOException, SQLException 
	{
	    String relative_path = "/WEB-INF/uploads/luceneindex/";
	    FileUploadUtil.deleteFiles(helper.getRequestAttribute("realPath") +relative_path);
	    File parentDir = FileUploadUtil.luceneIndexDir();
	    LuceneIndexFile.createLuceneIndexFile(parentDir);
	}
	
}