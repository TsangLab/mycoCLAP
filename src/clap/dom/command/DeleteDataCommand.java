package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import clap.service.util.FileUploadUtil;
import clap.service.util.LuceneIndexFile;
import clap.service.util.dateTime;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
import clap.dom.model.entrylistref.EntryListRef;
import clap.dom.model.entrylistref.mappers.EntryListRefInputMapper;
import clap.dom.model.entrylistref.tdg.EntryListRefTDG;
import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;

public class DeleteDataCommand extends Command {
	
	public DeleteDataCommand(Helper helper) {
		super(helper);
	}
	
	public void execute() throws CommandException {
		String list = "";
		try {
			String[] data = helper.getStrings("data");
			if (data.length > 0)
				for(int i=0; i<data.length; i++) {	
					list = list + " " + deleteData(data[i]);
				}
						
			helper.setRequestAttribute("message", "list " + list + " have been deleted!");
			helper.setRequestAttribute("data", data);			
		} catch (Exception e) {
			helper.setRequestAttribute("message", e.getMessage());
			throw new CommandException(e);
		}
	}
	
	private String deleteData(String id) throws SQLException, MapperException {		
		long enzymeEntryId = Long.valueOf(id);
		MycoData mycoData = MycoDataInputMapper.findMycoDataByEnzymeEntryId(Long.valueOf(enzymeEntryId));
		String entryName = mycoData.getEntryName();
		IMycoclapuser user = (IMycoclapuser) helper.getSessionAttribute("CurrentUser");
		String comments = "Deletion: " + dataLog(mycoData);			

		Connection con = null;
		try {						
			con = DbRegistry.getDbConnection();
			con.setAutoCommit(false);
			
			// list of table declaration
			EntryListRef entryListRef = null;
			entryListRef = EntryListRefInputMapper.findEntryListRefByEnzymeEntryId(enzymeEntryId);
			EntryListRefTDG.update(entryListRef.getId(), entryListRef.getEnzymeEntryId(), entryListRef.getEntryNameId(), entryListRef.getVersion(), "delete");

			// log the deleted data			
			ChangeLoggingTDG.insert(
					ChangeLoggingTDG.getMaxId(), 
					user.getUsername(),
					dateTime.currenttime(),
					Long.valueOf(enzymeEntryId),
					mycoData.getEntryNameId(),
					entryName,
					"deletion",
					comments);	
	
			con.commit();
			con.setAutoCommit(true);	
			
			luceneIndexFileRecreate();
				
			return entryName;
		} catch (SQLException e) {
			helper.setRequestAttribute("message", e.getSQLState());	
			throw new SQLException(e);
		} catch (Exception e) {
			helper.setRequestAttribute("message", e.getMessage());
			throw new MapperException(e);
		}	
	}
		
	public static String dataLog(MycoData mycoData ) {
		String data = "{" 
					+ "enzymeEntryId:" + mycoData.getEnzymeEntryId() + ","
					+ "entryNameId:" + mycoData.getEntryNameId() + ","
					+ "species:" + mycoData.getSpecies() + ","
					+ "strain:" + mycoData.getStrain() + ","
					+ "entryName:" + mycoData.getEntryName() + ","
					+ "geneName:" + mycoData.getGeneName() + ","
					+ "geneAlias:" + mycoData.getGeneAlias() + ","
					+ "enzymeName:" + mycoData.getEnzymeName() + ","
					+ "enzymeAlias:" + mycoData.getEnzymeAlias() + ","
					+ "ecSystematicName:" + mycoData.getEcSystematicName() + ","
					+ "family:" + mycoData.getFamily() + ","
					+ "substrates:" + mycoData.getSubstrates() + ","
					+ "host:" + mycoData.getHost() + ","
					+ "specificActivity:" + mycoData.getSpecificActivity() + ","
					+ "activityAssayConditions:" + mycoData.getActivityAssayConditions() + ","
					+ "substrateSpecificity:" + mycoData.getSubstrateSpecificity() + ","
					+ "km:" + mycoData.getKm() + ","
					+ "kcat:" + mycoData.getKcat() + ","
					+ "vmax:" + mycoData.getVmax() + ","
					+ "assay:" + mycoData.getAssay() + ","
					+ "kineticAssayConditions:" + mycoData.getKineticAssayConditions() + ","
					+ "productAnalysis:" + mycoData.getProductAnalysis() + ","
					+ "productFormed:" + mycoData.getProductFormed() + ","
					+ "phOptimum:" + mycoData.getPhOptimum() + ","
					+ "phStability:" + mycoData.getPhStability() + ","
					+ "temperatureOptimum:" + mycoData.getTemperatureOptimum() + ","
					+ "temperatureStatility:" + mycoData.getTemperatureStability() + ","
					+ "ipExperimental:" + mycoData.getIpExperimental() + ","
					+ "ipPredicted:" + mycoData.getIpPredicted() + ","
					+ "otherFeatures:" + mycoData.getOtherFeatures() + ","
					+ "ecNumber:" + mycoData.getEcNumber() +","
					+ "goMolecularId:" + mycoData.getGoMolecularId() + ","
					+ "goMolecularEvidence:" + mycoData.getGoMolecularEvidence() + ","
					+ "goMolecularRef:" + mycoData.getGoMolecularRef() + ","
					+ "goProcessId:" + mycoData.getGoProcessId() + ","
					+ "goProcessEvidence:" + mycoData.getGoProcessEvidence() + ","
					+ "goProcessRef:" + mycoData.getGoProcessRef() + ","
					+ "goComponentId:" + mycoData.getGoComponentId() + ","
					+ "goComponentEvidence:" + mycoData.getGoComponentEvidence() + ","
					+ "goComponentRef:" + mycoData.getGoComponentRef() + ","
					+ "genbankGeneId:" + mycoData.getGenbankGeneId() + ","
					+ "otherGenbankGeneId:" + mycoData.getOtherGenbankGeneId() + ","
					+ "uniprotId:" + mycoData.getUniprotId() + ","
					+ "otherUniprotId:" + mycoData.getOtherUniprotId() + ","
					+ "genbankProteinId:" + mycoData.getGenbankProteinId() + ","
					+ "refseqProteinId:" + mycoData.getRefseqProteinId() + ","
					+ "jgiId:" + mycoData.getJgiId() + ","
					+ "broadId:" + mycoData.getBroadId() + ","
					+ "literaturePmid:" + mycoData.getLiteraturePmid() + ","
					+ "structurePmid:" + mycoData.getStructurePmid() + ","
					+ "sequencePmid:" + mycoData.getSequencePmid() + ","
					+ "pdbId:" + mycoData.getPdbId() + ","
					+ "structureDeterminationMethod:" + mycoData.getStructureDeterminationMethod() + ","
					+ "signalPeptidePredicted:" + mycoData.getSignalPeptidePredicted() + ","
					+ "nterminalExperimental:" + mycoData.getNterminalExperimental() + ","
					+ "molecularWtExperimental:" + mycoData.getMolecularWtExperimental() + ","
					+ "molecularWtPredicted:" + mycoData.getMolecularWtPredicted() + ","
					+ "proteinLength:" + mycoData.getProteinLength() + ","
					+ "cbd:" + mycoData.getCbd() + ","
					+ "glycosylation:" + mycoData.getGlycosylation() + ","
					+ "dnaSeqId:" + mycoData.getDnaSeqId() + ","
					+ "dnaSequence:" + mycoData.getDnaSequence() + ","
					+ "proteinSeqId:" + mycoData.getProteinSeqId() + ","
					+ "proteinSequence:" + mycoData.getProteinSequence()
					+ "}";
		
		return data;
	}
		
	public void luceneIndexFileRecreate() throws IOException, SQLException 
	{
	    String relative_path = "/WEB-INF/uploads/luceneindex/";
	    FileUploadUtil.deleteFiles(helper.getRequestAttribute("realPath") +relative_path);
	    File parentDir = FileUploadUtil.luceneIndexDir();
	    LuceneIndexFile.createLuceneIndexFile(parentDir);
	}
	
}