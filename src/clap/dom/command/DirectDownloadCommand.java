package clap.dom.command;

import java.util.*;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.command.validator.source.impl.PermalinkSource;
import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;

public class DirectDownloadCommand extends ClapCommand {
	
	public DirectDownloadCommand(Helper helper) {
		super(helper);
	}	
	
	@Source(sources=PermalinkSource.class)
	public String downloadfile;
		
	public HashMap<String, String> fieldColumnHeaderTable( ) {
		LinkedHashMap<String, String> fieldColumnHeader = new LinkedHashMap<String, String>();
		fieldColumnHeader.put("species", "Species");
		fieldColumnHeader.put("strain", "Strain");
		fieldColumnHeader.put("entryName", "Entry Name");
		fieldColumnHeader.put("geneName", "Gene Name");
		fieldColumnHeader.put("geneAlias", "Gene Alias");
		fieldColumnHeader.put("enzymeName", "Enzyme Name");
		fieldColumnHeader.put("enzymeAlias", "Enzyme Alias");
		fieldColumnHeader.put("ecSystematicName", "EC Systematic Name");
		fieldColumnHeader.put("family", "Family");
		fieldColumnHeader.put("substrates", "Substrates");
		fieldColumnHeader.put("host", "Host (for recombinant expression)");
		fieldColumnHeader.put("specificActivity", "Specific Activity");
		fieldColumnHeader.put("activityAssayConditions", "Activity Assay Conditions");
		fieldColumnHeader.put("substrateSpecificity", "Substrate Specificity (%)");
		fieldColumnHeader.put("km", "Km");
		fieldColumnHeader.put("kcat", "kcat(s-1)");
		fieldColumnHeader.put("vmax", "Vmax");
		fieldColumnHeader.put("assay", "Assay");
		fieldColumnHeader.put("kineticAssayConditions", "Kinetic Assay Conditions");
		fieldColumnHeader.put("productAnalysis", "Product Analysis");
		fieldColumnHeader.put("productFormed", "Product Formed");
		fieldColumnHeader.put("phOptimum", "pH (Optimum)");
		fieldColumnHeader.put("phStability", "pH Stability");
		fieldColumnHeader.put("temperatureOptimum", "Temperature Optimum(\u00B0C)");
		fieldColumnHeader.put("temperatureStability", "Temperature Stability(\u00B0C)");
		fieldColumnHeader.put("ipExperimental", "Isoelectric Point (experimental)");
		fieldColumnHeader.put("ipPredicted", "Isoelectric Point (predicted)");
		fieldColumnHeader.put("otherFeatures", "Other Features");
		fieldColumnHeader.put("ecNumber", "EC number");
		fieldColumnHeader.put("goMolecularId", "GO (molecular function)");
		fieldColumnHeader.put("goProcessId", "GO (biological process)");
		fieldColumnHeader.put("goComponentId", "GO (cellular component)");
		fieldColumnHeader.put("genbankGeneId", "Genbank Gene ID");
		fieldColumnHeader.put("uniprotId", "Uniprot ID");
		fieldColumnHeader.put("genbankProteinId", "Genbank Protein ID");
		fieldColumnHeader.put("refseqProteinId", "RefSeq Protein ID");
		fieldColumnHeader.put("jgiId", "JGI ID");
		fieldColumnHeader.put("broadId", "BROAD ID");
		fieldColumnHeader.put("literaturePmid", "Literature PMID");
		fieldColumnHeader.put("structurePmid", "Structure PMID");
		fieldColumnHeader.put("sequencePmid", "Sequence PMID");
		fieldColumnHeader.put("pdbId", "PDB ID");
		fieldColumnHeader.put("structureDeterminationMethod", "Structure Determination Method");
		fieldColumnHeader.put("signalPeptidePredicted", "Signal Peptide (Predicted)");
		fieldColumnHeader.put("nterminalExperimental", "N-Terminal (Experimental)");
		fieldColumnHeader.put("molecularWtExperimental", "Molecular Weight in kDa (experimental)");
		fieldColumnHeader.put("molecularWtPredicted", "Molecular Weight in kDa (predicted)");
		fieldColumnHeader.put("proteinLength", "Protein Length");
		fieldColumnHeader.put("cbd", "CBD");
		fieldColumnHeader.put("glycosylation", "Glycosylation");
		fieldColumnHeader.put("dnaSeqId", "DNA sequence Id");
		fieldColumnHeader.put("dnaSequence", "DNA sequence");
		fieldColumnHeader.put("proteinSeqId", "Protein sequence Id");
		fieldColumnHeader.put("proteinSequence", "Protein sequence");
		
		return fieldColumnHeader;
	}
	
	public HashMap<String, String> buildFieldValueTable(MycoData row){
		HashMap<String, String> fieldValue = new HashMap<String, String>();
		fieldValue.put("species", row.getSpecies());
		fieldValue.put("strain", row.getStrain());
		fieldValue.put("entryName", row.getEntryName());
		fieldValue.put("geneName", row.getGeneName());
		fieldValue.put("geneAlias", row.getGeneAlias());
		fieldValue.put("enzymeName", row.getEnzymeName());
		fieldValue.put("enzymeAlias", row.getEnzymeAlias());
		fieldValue.put("ecSystematicName", row.getEcSystematicName());
		fieldValue.put("family", row.getFamily());
		fieldValue.put("substrates", row.getSubstrates());
		fieldValue.put("host", row.getHost());
		fieldValue.put("specificActivity", row.getSpecificActivity());
		fieldValue.put("activityAssayConditions", row.getActivityAssayConditions());
		fieldValue.put("substrateSpecificity", row.getSubstrateSpecificity());
		fieldValue.put("km", row.getKm());
		fieldValue.put("kcat", row.getKcat());
		fieldValue.put("vmax", row.getVmax());
		fieldValue.put("assay", row.getAssay());
		fieldValue.put("kineticAssayConditions", row.getKineticAssayConditions());
		fieldValue.put("productAnalysis", row.getProductAnalysis());
		fieldValue.put("productFormed", row.getProductFormed());
		fieldValue.put("phOptimum", row.getPhOptimum());
		fieldValue.put("phStability", row.getPhStability());
		fieldValue.put("temperatureOptimum", row.getTemperatureOptimum());
		fieldValue.put("temperatureStability", row.getTemperatureStability());
		fieldValue.put("ipExperimental", row.getIpExperimental());
		fieldValue.put("ipPredicted", row.getIpPredicted());
		fieldValue.put("otherFeatures", row.getOtherFeatures());
		fieldValue.put("ecNumber", row.getEcNumber());
		fieldValue.put("goMolecularId", row.getGoMolecularId());
		fieldValue.put("goMolecularEvidence", row.getGoMolecularEvidence());
		fieldValue.put("goProcessId", row.getGoProcessId());
		fieldValue.put("goProcessEvidence", row.getGoProcessEvidence());
		fieldValue.put("goComponentId", row.getGoComponentId());
		fieldValue.put("goComponentEvidence", row.getGoComponentEvidence());
		fieldValue.put("genbankGeneId", row.getGenbankGeneId());
		fieldValue.put("otherGenBankGeneId", row.getOtherGenbankGeneId());
		fieldValue.put("uniprotId", row.getUniprotId());
		fieldValue.put("otherUniprotId", row.getOtherUniprotId());
		fieldValue.put("genbankProteinId", row.getGenbankProteinId());
		fieldValue.put("refseqProteinId", row.getRefseqProteinId());
		fieldValue.put("jgiId", row.getJgiId());
		fieldValue.put("broadId", row.getBroadId());
		fieldValue.put("literaturePmid", row.getLiteraturePmid());
		fieldValue.put("structurePmid", row.getStructurePmid());
		fieldValue.put("sequencePmid", row.getSequencePmid());
		fieldValue.put("pdbId", row.getPdbId());
		fieldValue.put("structureDeterminationMethod", row.getStructureDeterminationMethod());
		fieldValue.put("signalPeptidePredicted", row.getSignalPeptidePredicted());
		fieldValue.put("nterminalExperimental", row.getNterminalExperimental());
		fieldValue.put("molecularWtExperimental", row.getMolecularWtExperimental());
		fieldValue.put("molecularWtPredicted", row.getMolecularWtPredicted());
		fieldValue.put("proteinLength", row.getProteinLength());
		fieldValue.put("cbd", row.getCbd());
		fieldValue.put("glycosylation", row.getGlycosylation());
		fieldValue.put("dnaSeqId", row.getDnaSeqId());
		fieldValue.put("dnaSequence", row.getDnaSequence());
		fieldValue.put("proteinSeqId", row.getProteinSeqId());
		fieldValue.put("proteinSequence", row.getProteinSequence());
		
		return fieldValue;
	}

	public String GetRowDataForPrint(HashMap<String, String> fieldValue, HashMap<String, String> fieldHeader){
		String rowValue = new String();
		String header;
		Iterator entries = fieldHeader.entrySet().iterator();
		int totalEntries = fieldHeader.size();
		int cnt = 0;

		while (entries.hasNext()) {
			cnt++;			
			Map.Entry entry = (Map.Entry) entries.next();
			header = (String)entry.getKey();						
			String curValue = (String) fieldValue.get(header);
			if ( curValue == null )
				curValue = ""; 
			
			/*
			 * combine go id with its evidence
			 */
			if ( header.equals("goProcessId") && curValue.length() > 0 )
				if( fieldValue.get("goProcessEvidence") != null && 
					fieldValue.get("goProcessEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goProcessEvidence");
			
			if ( header.equals("goMolecularId") && curValue.length() > 0 )			
				if( fieldValue.get("goMolecularEvidence") != null && 
					fieldValue.get("goMolecularEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goMolecularEvidence");
			
			
			if ( header.equals("goComponentId") && curValue.length() > 0 )
				if( fieldValue.get("goComponentEvidence") != null && 
					fieldValue.get("goComponentEvidence").length()>0 ) 
					curValue += ":" + fieldValue.get("goComponentEvidence");
			
			if ( header.equals("genbankGeneId") && curValue.length() > 0 )
				if( fieldValue.get("otherGenBankGeneId") != null &&
					fieldValue.get("otherGenBankGeneId").length() > 0)
					curValue += "," + fieldValue.get("otherGenBankGeneId");
			
			if ( header.equals("uniprotId") && curValue.length() > 0 )
				if( fieldValue.get("otherUniprotId") != null &&
					fieldValue.get("otherUniprotId").length() > 0)
					curValue += "," + fieldValue.get("otherUniprotId");
							
			rowValue += curValue;
			
			if ( cnt == totalEntries )
				rowValue += "\n";
			else 
				rowValue += "\t";
		}
		
		return rowValue;
	}	
	
	@Override
	public void executeCommand() throws CommandException {
	 	String data = "";
	 	String filename = downloadfile;
	 	
	 	if (filename == null)
	 		filename = "";

		try {									
			if( filename.equals("mycoCLAP_data.txt") ) {
				String curRow = "";
				
				/*
				 * output data column headers
				 */
				HashMap<String, String> fieldColumnHeader = fieldColumnHeaderTable( );
												
				Iterator entries = fieldColumnHeader.entrySet().iterator();
				int totalEntries = fieldColumnHeader.size();
				int cnt = 0;
				
				while (entries.hasNext()) {
					cnt++;
					
					Map.Entry entry = (Map.Entry) entries.next();
					curRow += (String)entry.getValue();
				
					if ( cnt == totalEntries )
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
					HashMap<String, String> fieldValue = buildFieldValueTable(arow);
					curRow = GetRowDataForPrint(fieldValue, fieldColumnHeader);
					data += curRow;
				}			
			}
			
			if ( downloadfile.equals("mycoCLAP_proteinSeqs.fasta") 
				|| downloadfile.equals("mycoCLAP_proteinSeqs_pipeline.fasta") 
				|| downloadfile.equals("mycoCLAP_DNASeqs.fasta")) {				
				String curRow = "";
				HashMap<String, Boolean> entryNameIdList = new HashMap<String, Boolean>();
				
				ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
	
				for(int i=0; i<allMycoData.size(); i++) {
					MycoData arow = allMycoData.get(i);
					HashMap<String, String> fieldValue = buildFieldValueTable(arow);
			
					if ( downloadfile.equals("mycoCLAP_proteinSeqs.fasta") ) {
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
					
					if ( downloadfile.equals("mycoCLAP_proteinSeqs_pipeline.fasta") ) {
						if ( fieldValue.get("proteinSeqId") != null && 
							 fieldValue.get("proteinSeqId").length() > 0 &&
							 fieldValue.get("proteinSequence") != null &&
							 fieldValue.get("proteinSequence").length() > 0 &&
							 entryNameIdList.get(fieldValue.get("entryName") + "_" + fieldValue.get("proteinSeqId")) == null ){
							 curRow = ">" + fieldValue.get("entryName") + " | " 
									 	+ fieldValue.get("proteinSeqId").replaceAll("\"", "") + " | "
										+ fieldValue.get("enzymeName") 
										+ " OS=" + fieldValue.get("species")
										+ " GN=" + fieldValue.get("geneAlias")
										+ "\n";
							 curRow += fieldValue.get("proteinSequence").replaceAll("\"", "") + "\n";
							 data += curRow;
							
							 entryNameIdList.put( (fieldValue.get("entryName") + "_" + fieldValue.get("proteinSeqId")), true);
						}	
					}
					
					if ( downloadfile.equals("mycoCLAP_DNASeqs.fasta")) {
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
			
			if ( downloadfile.equals("UniProtID_EntryName_Mapping.txt") ) { 
				String curRow = "";
				data += "UniProtKB accession number\tmycoCLAP Entry Name\n";
				HashMap<String, Boolean> entryNameUniprotIdList = new HashMap<String, Boolean>();
				/*
				 * output all the data
				 */	
				ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
				for(int i=0; i<allMycoData.size(); i++) {
					MycoData arow = allMycoData.get(i);					
					String entryName = arow.getEntryName();
					String uniprotId = arow.getUniprotId();
					String otherUniprotId = arow.getOtherUniprotId();
					
					if ( uniprotId != null && !uniprotId.equals("") ) {
						
						if ( entryNameUniprotIdList.get(entryName + "_" + uniprotId) == null ) {
							data += uniprotId + "\t" + entryName + "\n";
							entryNameUniprotIdList.put((entryName + "_" + uniprotId), true);
						}
					}
					
					if ( otherUniprotId != null && !otherUniprotId.equals("") ) {
						String[] otherIds = otherUniprotId.split(",");
						
						for ( int j = 0; j < otherIds.length; j++) {
							String curId = otherIds[j].trim();
							
							if ( entryNameUniprotIdList.get(entryName + "_" + curId) == null) {
								data += curId + "\t" + entryName + "\n";
								entryNameUniprotIdList.put((entryName + "_" + curId), true);
							}
						}
					}					
				}	
			}
			
		    helper.setRequestAttribute("data", data);   
		    helper.setRequestAttribute("filename", filename);
		    
		} 
		catch (Exception e){
			e.printStackTrace();
			throw new CommandException("Unable to get data!");
		}			
	}

}
