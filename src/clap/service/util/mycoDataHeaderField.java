package clap.service.util;

import java.util.HashMap;

import clap.dom.model.mycodata.MycoData;

public class mycoDataHeaderField {
	public static HashMap<String, String> fieldColumnHeaderTable( ) {
		HashMap<String, String> fieldColumnHeader = new HashMap<String, String>();
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
		fieldColumnHeader.put("goMolecularRef", "GO (molecular function) Ref");
		fieldColumnHeader.put("goProcessId", "GO (biological process)");
		fieldColumnHeader.put("goProcessRef", "GO (biological process) Ref");
		fieldColumnHeader.put("goComponentId", "GO (cellular component)");
		fieldColumnHeader.put("goComponentRef", "GO (cellular component) Ref");
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
	
	public static HashMap<String, String> buildFieldValueTable(MycoData row){
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
		fieldValue.put("goMolecularId", geneOntologyId.addPrefix(row.getGoMolecularId()));
		fieldValue.put("goMolecularEvidence", geneOntologyId.addPrefix(row.getGoMolecularEvidence()));
		fieldValue.put("goMolecularRef", row.getGoMolecularRef());
		fieldValue.put("goProcessId", geneOntologyId.addPrefix(row.getGoProcessId()));
		fieldValue.put("goProcessEvidence", row.getGoProcessEvidence());
		fieldValue.put("goProcessRef", row.getGoProcessRef());
		fieldValue.put("goComponentId", row.getGoComponentId());
		fieldValue.put("goComponentEvidence", row.getGoComponentEvidence());
		fieldValue.put("goComponentRef", row.getGoComponentRef());
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
}
