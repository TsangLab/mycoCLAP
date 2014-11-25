package clap.dom.command;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.command.validator.source.impl.PermalinkSource;
import clap.dom.model.changelogging.ChangeLogging;
import clap.dom.model.changelogging.mappers.ChangeLoggingInputMapper;
import clap.dom.model.entrydescription.EntryDescription;
import clap.dom.model.entrydescription.mappers.EntryDescriptionInputMapper;
import clap.dom.model.entrynamelogging.EntryNameLogging;
import clap.dom.model.entrynamelogging.mappers.EntryNameLoggingInputMapper;
import clap.dom.model.goannotation.GoAnnotation;
import clap.dom.model.goannotation.mappers.GoAnnotationInputMapper;
import clap.dom.model.literatureabstract.LiteratureAbstract;
import clap.dom.model.literatureabstract.mappers.LiteratureAbstractInputMapper;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractFinder;
import clap.dom.model.mycodata.MycoDataGeneView;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.service.util.geneOntologyId;


public class GeneViewCommand extends ClapCommand {
	
	public GeneViewCommand(Helper helper) {
		super(helper);
	}
		
	@Source(sources=PermalinkSource.class)
	public String entryName;
	
	@Override
	protected void executeCommand() throws CommandException {
		try {			
			ArrayList<MycoDataGeneView> mycoDataGeneView = MycoDataInputMapper.findMycoDataByEntryName(entryName);
			ArrayList<GoAnnotation> allGoAnnotation = GoAnnotationInputMapper.findAllGoAnnotation();
			ArrayList<LiteratureAbstract> litAbstract = new ArrayList<LiteratureAbstract>();
			ArrayList<EntryNameLogging> entryNameHistory = new ArrayList<EntryNameLogging>();
			ArrayList<ChangeLogging> changeLoggingHistory = new ArrayList<ChangeLogging>();
			entryNameHistory = EntryNameLoggingInputMapper.findEntryNameLoggingByEntryName(entryName);
		
			if ( mycoDataGeneView.size() == 0 )
				if (EntryNameLoggingInputMapper.findEntryNameLoggingByUsedEntryName(entryName) != null) {
					entryName = EntryNameLoggingInputMapper.findEntryNameLoggingByUsedEntryName(entryName).getEntryName();
					entryNameHistory = EntryNameLoggingInputMapper.findEntryNameLoggingByEntryName(entryName);
					mycoDataGeneView = MycoDataInputMapper.findMycoDataByEntryName(entryName);
				} 
			
			EntryDescription entryDescription = EntryDescriptionInputMapper.findEntryDescriptionByEntryName(entryName);
			if (entryDescription != null) {
				Long entryNameId = entryDescription.getEntryNameId();
				changeLoggingHistory = ChangeLoggingInputMapper.findMaxChangeLoggingDateByEntryNameId(entryNameId);
			}
				
			// set the length of sequence for display
			for(int i = 0; i < mycoDataGeneView.size(); i++) {
				String proteinSeqIn = mycoDataGeneView.get(i).getProteinSequence();
				String dnaSeqIn = mycoDataGeneView.get(i).getDnaSequence();
				String goMolecularId = mycoDataGeneView.get(i).getGoMolecularId();
				String goProcessId = mycoDataGeneView.get(i).getGoProcessId();
				String goComponentId = mycoDataGeneView.get(i).getGoComponentId();
				String proteinSeqOut = "";
				String dnaSeqOut ="";
				int proteinlen;
				int dnalen; 				
		
				if ( proteinSeqIn != null && proteinSeqIn != "") {
					proteinlen = proteinSeqIn.length();
				
					for(int j = 0; j < proteinlen; j++) {
						if( j%10 == 0 )
							proteinSeqOut += " ";
														
						proteinSeqOut += proteinSeqIn.charAt(j);
					}
				}
				
				if ( dnaSeqIn != null && dnaSeqIn != "") {
					dnalen = dnaSeqIn.length();
					
					for(int k = 0; k < dnalen; k++) {
						if( k%10 == 0 )
							dnaSeqOut += " ";
						
						dnaSeqOut += dnaSeqIn.charAt(k);
					}
				}
				
				if( goMolecularId != null && !goMolecularId.equals(""))
					goMolecularId = geneOntologyId.addPrefix(goMolecularId);
				
				if( goProcessId != null && !goProcessId.equals(""))
					goProcessId = geneOntologyId.addPrefix(goProcessId);
				
				if( goComponentId != null && !goComponentId.equals(""))
					goComponentId = geneOntologyId.addPrefix(goComponentId);
								
				mycoDataGeneView.get(i).setProteinSequence(proteinSeqOut);
				mycoDataGeneView.get(i).setDnaSequence(dnaSeqOut);	
				mycoDataGeneView.get(i).setGoMolecularId(goMolecularId);
				mycoDataGeneView.get(i).setGoProcessId(goProcessId);
				mycoDataGeneView.get(i).setGoComponentId(goComponentId);
			}
			
			HashMap <String, Integer> litList = new HashMap <String, Integer>();
			for(int i = 0; i < mycoDataGeneView.size(); i++) {
				LiteratureAbstract lit;
				String pubmedId;
				
				if( mycoDataGeneView.get(i).getLiteraturePmid() != null ) {
					pubmedId = mycoDataGeneView.get(i).getLiteraturePmid();
				
					if (pubmedId.matches("[0-9]+") 
						&& litList.get(pubmedId) == null	
						&& LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(pubmedId).next() ) {
						lit = LiteratureAbstractInputMapper.findLiteratureAbstractByPubmedId(pubmedId);
						litAbstract.add(lit);
						litList.put(pubmedId, 1);
					} 					
				}
				
				if( mycoDataGeneView.get(i).getStructurePmid() != null ) {
					pubmedId = mycoDataGeneView.get(i).getStructurePmid();
					
					if (pubmedId.matches("[0-9]+")
							&& litList.get(pubmedId) == null	
							&& LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(pubmedId).next() ) {
						lit = LiteratureAbstractInputMapper.findLiteratureAbstractByPubmedId(pubmedId);
						litAbstract.add(lit);
						litList.put(pubmedId, 1);
					}
				}
				
				if( mycoDataGeneView.get(i).getSequencePmid() != null ) {
					pubmedId = mycoDataGeneView.get(i).getSequencePmid();
					
					if (pubmedId.matches("[0-9]+")
							&& litList.get(pubmedId) == null	
							&& LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(pubmedId).next() ) {
						lit = LiteratureAbstractInputMapper.findLiteratureAbstractByPubmedId(pubmedId);
						litAbstract.add(lit);
						litList.put(pubmedId, 1);
					}
				}							
			}
			
			HashMap<Integer, String> literatureMap = literatureList(mycoDataGeneView);
			
			helper.setRequestAttribute("geneview", mycoDataGeneView);
			helper.setRequestAttribute("goannotation", allGoAnnotation);
			helper.setRequestAttribute("litabstract", litAbstract);
			helper.setRequestAttribute("literatureMap", literatureMap);
			helper.setRequestAttribute("entrynamehistory", entryNameHistory);
			helper.setRequestAttribute("changelogginghistory", changeLoggingHistory);
			helper.setRequestAttribute("entryname", entryName);			
		} catch (SQLException e) {
			throw new CommandException(e);
		} catch (MapperException e) {
			e.printStackTrace();
		} 		
	}
	
	private HashMap<Integer, String> literatureList (ArrayList<MycoDataGeneView> mycoDataGeneView) {
		HashMap<Integer, String> literatureMap = new HashMap<Integer, String>();
		HashMap <String, Integer> litList = new HashMap <String, Integer>();
		int cnt = 0;
		for(int i = 0; i < mycoDataGeneView.size(); i++) {
			if( mycoDataGeneView.get(i).getLiteraturePmid() != null && 
					litList.get(mycoDataGeneView.get(i).getLiteraturePmid()) == null &&					
					! mycoDataGeneView.get(i).getLiteraturePmid().trim().equals("") ) {
				cnt++;
				literatureMap.put(new Integer(cnt), mycoDataGeneView.get(i).getLiteraturePmid());
				litList.put(mycoDataGeneView.get(i).getLiteraturePmid(), 1);
			}
			
			if( mycoDataGeneView.get(i).getStructurePmid() != null &&
					litList.get(mycoDataGeneView.get(i).getStructurePmid()) == null &&					
					! mycoDataGeneView.get(i).getStructurePmid().trim().equals("") ) {
				cnt++;
				literatureMap.put(new Integer(cnt), mycoDataGeneView.get(i).getStructurePmid());
				litList.put(mycoDataGeneView.get(i).getStructurePmid(), 1);
			}
			
			if( mycoDataGeneView.get(i).getSequencePmid() != null &&
					litList.get(mycoDataGeneView.get(i).getSequencePmid()) == null &&					
					! mycoDataGeneView.get(i).getSequencePmid().trim().equals("") ) {
				cnt++;
				literatureMap.put(new Integer(cnt), mycoDataGeneView.get(i).getSequencePmid());
				litList.put(mycoDataGeneView.get(i).getSequencePmid(), 1);
			}
		}
		return literatureMap;
	}
}
