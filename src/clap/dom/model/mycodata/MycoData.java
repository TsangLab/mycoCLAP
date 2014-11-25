package clap.dom.model.mycodata;

import org.dsrg.soenea.domain.DomainObject;

public class MycoData extends DomainObject<Long>{
	
// from mysql table entry_description	
	Long enzymeEntryId;
	Long entryNameId;
	String species;	
	String strain;
	String entryName;
	String geneName;
	String geneAlias;
	String enzymeName;
	String ecSystematicName;
	String enzymeAlias;
	String family;
// from mysql table biochemical_property
	String substrates;
	String host;
	String specificActivity;
	String activityAssayConditions;
	String substrateSpecificity;
	String km;
	String kcat;
	String vmax;
	String assay;
	String kineticAssayConditions;
	String productAnalysis;
	String productFormed;
	String phOptimum;
	String phStability;
	String temperatureOptimum;
	String temperatureStability;
	String ipExperimental;
	String ipPredicted;
	String otherFeatures;
// from mysql table enzyme_annotation
	String ecNumber;
	String goMolecularId;
	String goMolecularEvidence;
	String goMolecularRef;
	String goProcessId;
	String goProcessEvidence;
	String goProcessRef;
	String goComponentId;
	String goComponentEvidence;
	String goComponentRef;
// from mysql table external_resource
	String genbankGeneId;
	String otherGenbankGeneId;
	String uniprotId;
	String otherUniprotId;
	String genbankProteinId;
	String refseqProteinId;
	String jgiId;
	String broadId;
	String literaturePmid;
	String structurePmid;
	String sequencePmid;
	String pdbId;
	String structureDeterminationMethod;
// from mysql table protein_feature
	String signalPeptidePredicted;
	String nterminalExperimental;
	String molecularWtExperimental;
	String molecularWtPredicted;
	String proteinLength;
	String cbd;
	String glycosylation;
// from mysql table dna_sequence
	String dnaSeqId;
	String dnaSequence;
// from mysql table protein_sequence
	String proteinSeqId;	
	String proteinSequence;
// from mysql table change_logging
	String datetime;
	
	public MycoData(Long id, Long enzymeEntryId, Long entryNameId, String species, 
			String strain, String entryName, String geneName, 
			String geneAlias, String enzymeName, String ecSystematicName, 
			String enzymeAlias, String family, String substrates,
			String host, String specificActivity, String activityAssayConditions,
			String substrateSpecificity, String km, String kcat, String vmax,
			String assay, String kineticAssayConditions, String productAnalysis,
			String productFormed, String phOptimum, String phStability,
			String temperatureOptimum, String temperatureStability,
			String ipExperimental, String ipPredicted, String otherFeatures,
			String ecNumber, String goMolecularId, String goMolecularEvidence, String goMolecularRef,
			String goProcessId, String goProcessEvidence, String goProcessRef,
			String goComponentId, String goComponentEvidence, String goComponentRef,
			String genbankGeneId, String otherGenbankGeneId,
			String uniprotId, String otherUniprotId,
			String genbankProteinId, String refseqProteinId,
			String jgiId, String broadId,
			String literaturePmid, String structurePmid,
			String sequencePmid,
			String pdbId, String structureDeterminationMethod,
			String signalPeptidePredicted, String nterminalExperimental, 
			String molecularWtExperimental, String molecularWtPredicted,
			String proteinLength, String cbd, String glycosylation,
			String dnaSeqId, String dnaSequence, 
			String proteinSeqId, String proteinSequence,
			String datetime) {
		super(id, 0);
// from mysql table entry_description
		this.enzymeEntryId = enzymeEntryId;
		this.entryNameId = entryNameId;
		this.species = species;
		this.strain = strain;
		this.entryName = entryName;
		this.geneName = geneName;
		this.geneAlias = geneAlias;
		this.enzymeName = enzymeName;
		this.ecSystematicName = ecSystematicName;
		this.enzymeAlias = enzymeAlias;
		this.family = family;
// from mysql table biochemical_property
		this.substrates = substrates;
		this.host = host;
		this.specificActivity = specificActivity;
		this.activityAssayConditions = activityAssayConditions;
		this.substrateSpecificity = substrateSpecificity;
		this.km = km;
		this.kcat = kcat;
		this.vmax = vmax;
		this.assay = assay;
		this.kineticAssayConditions = kineticAssayConditions;
		this.productAnalysis = productAnalysis;
		this.productFormed = productFormed;
		this.phOptimum = phOptimum;
		this.phStability = phStability;
		this.temperatureOptimum = temperatureOptimum;
		this.temperatureStability = temperatureStability;
		this.ipExperimental = ipExperimental;
		this.ipPredicted = ipPredicted;
		this.otherFeatures = otherFeatures;
// from mysql table enzyme_annotation		
		this.ecNumber = ecNumber;
		this.goMolecularId = goMolecularId;
		this.goMolecularEvidence = goMolecularEvidence;
		this.goMolecularRef = goMolecularRef;
		this.goProcessId = goProcessId;
		this.goProcessEvidence = goProcessEvidence;
		this.goProcessRef = goProcessRef;
		this.goComponentId = goComponentId;
		this.goComponentEvidence = goComponentEvidence;
		this.goComponentRef = goComponentRef;
// from mysql table external_resource
		this.genbankGeneId = genbankGeneId;
		this.otherGenbankGeneId = otherGenbankGeneId;
		this.uniprotId = uniprotId;
		this.otherUniprotId = otherUniprotId;
		this.genbankProteinId = genbankProteinId;
		this.refseqProteinId = refseqProteinId;
		this.jgiId = jgiId;
		this.broadId = broadId;
		this.literaturePmid = literaturePmid;
		this.structurePmid = structurePmid;
		this.sequencePmid = sequencePmid;
		this.pdbId = pdbId;
		this.structureDeterminationMethod = structureDeterminationMethod;
// from mysql table protein_feature
		this.signalPeptidePredicted = signalPeptidePredicted;
		this.nterminalExperimental = nterminalExperimental;
		this.molecularWtExperimental = molecularWtExperimental;
		this.molecularWtPredicted = molecularWtPredicted;
		this.proteinLength = proteinLength;
		this.cbd = cbd;
		this.glycosylation = glycosylation;
// from mysql table dna_sequence
		this.dnaSeqId = dnaSeqId;
		this.dnaSequence = dnaSequence;
// from mysql table protein_sequence
		this.proteinSeqId = proteinSeqId;
		this.proteinSequence = proteinSequence;
// from mysql table change_logging
		this.datetime = datetime;
	}

// from mysql table entry_description
	public Long getEnzymeEntryId() {return enzymeEntryId;}
	public void setEnzymeEntryId(Long enzymeEntryId) {this.enzymeEntryId = enzymeEntryId; }
	
	public Long getEntryNameId() {return entryNameId;}
	public void setEntryNameId(Long entryNameId) {this.entryNameId = entryNameId; }
	
	public String getSpecies() {return species;}
	public void setSpecies(String species) {this.species = species;}
	
	public String getStrain() {return strain;}
	public void setStrain(String strain) {this.strain = strain;}
	
	public String getEntryName() {return entryName;}
	public void setEntryName(String entryName) {this.entryName = entryName;	}
	
	public String getGeneName() {return geneName;}
	public void setGeneName(String geneName) {this.geneName = geneName;}
	
	public String getGeneAlias() {return geneAlias;}
	public void setGeneAlias(String geneAlias) {this.geneAlias = geneAlias;}
	
	public String getEnzymeName() {return enzymeName;}
	public void setEnzymeName(String enzymeName) {this.enzymeName = enzymeName;}
	
	public String getEcSystematicName() {return ecSystematicName;}
	public void setEcSystematicName(String ecSystematicName) {this.ecSystematicName = ecSystematicName;	}
	
	public String getEnzymeAlias() {return enzymeAlias;	}
	public void setEnzymeAlias(String enzymeAlias) {this.enzymeAlias = enzymeAlias;}
	
	public String getFamily() {return family;}
	public void setFamily(String family) {this.family = family;}
	
// from mysql table biochemical_property
	public String getSubstrates() {	return substrates;}
	public void setSubstrates(String substrates) {this.substrates = substrates;	}
	
	public String getHost() {return host;}
	public void setHost(String host) {this.host = host;	}
	
	public String getSpecificActivity() {return specificActivity;}
	public void setSpecificActivity(String specificActivity) {this.specificActivity = specificActivity;	}

	public String getActivityAssayConditions() {return activityAssayConditions;}
	public void setActivityAssayConditions(String activityAssayConditions) {this.activityAssayConditions = activityAssayConditions;	}

	public String getSubstrateSpecificity() {return substrateSpecificity;}
	public void setSubstrateSpecificity(String substrateSpecificity) {this.substrateSpecificity = substrateSpecificity;}

	public String getKm() {return km;}
	public void setKm(String km) {this.km = km;	}
	
	public String getKcat() {return kcat;}
	public void setKcat(String kcat) {this.kcat = kcat;	}
	
	public String getVmax() {return vmax;}
	public void setVmax(String vmax) {this.vmax = vmax;	}
	
	public String getAssay() {return assay;}
	public void setAssay(String assay) {this.assay = assay;	}
	
	public String getKineticAssayConditions() {return kineticAssayConditions;}
	public void setKineticAssayConditions(String kineticAssayConditions) {this.kineticAssayConditions = kineticAssayConditions;	}
	
	public String getProductAnalysis() {return productAnalysis;}
	public void setProductAnalysis(String productAnalysis) {this.productAnalysis = productAnalysis;	}

	public String getProductFormed() {return productFormed;}
	public void setProductFormed(String productFormed) {this.productFormed = productFormed;	}

	public String getPhOptimum() {return phOptimum;}
	public void setPhOptimum(String phOptimum) {this.phOptimum = phOptimum;	}

	public String getPhStability() {return phStability;}
	public void setPhStability(String phStability) {this.phStability = phStability;	}

	public String getTemperatureOptimum() {return temperatureOptimum;}
	public void setTemperatureOptimum(String temperatureOptimum) {this.temperatureOptimum = temperatureOptimum;	}

	public String getTemperatureStability() {return temperatureStability;}
	public void setTemperatureStability(String temperatureStability) {this.temperatureStability = temperatureStability;	}

	public String getIpExperimental() {return ipExperimental;}
	public void setIpExperimental(String ipExperimental) {this.ipExperimental = ipExperimental;	}

	public String getIpPredicted() {return ipPredicted;}
	public void setIpPredicted(String ipPredicted) {this.ipPredicted = ipPredicted;	}

	public String getOtherFeatures() {return otherFeatures;}
	public void setOtherFeatures(String otherFeatures) {this.otherFeatures = otherFeatures;	}

// from mysql table enzyme_annotation
	public String getEcNumber() {return ecNumber;}
	public void setEcNumber(String ecNumber) {this.ecNumber = ecNumber;	}

	public String getGoMolecularId() {return goMolecularId;}
	public void setGoMolecularId(String goMolecularId) {this.goMolecularId = goMolecularId;	}

	public String getGoMolecularEvidence() {return goMolecularEvidence;}
	public void setGoMolecularEvidence(String goMolecularEvidence) {this.goMolecularEvidence = goMolecularEvidence;	}

	public String getGoMolecularRef() {return goMolecularRef;	}
	public void setGoMolecularRef(String goMolecularRef) {this.goMolecularRef = goMolecularRef;	}
	
	public String getGoProcessId() {return goProcessId;}
	public void setGoProcessId(String goProcessId) {this.goProcessId = goProcessId;	}

	public String getGoProcessEvidence() {return goProcessEvidence;}
	public void setGoProcessEvidence(String goProcessEvidence) {this.goProcessEvidence = goProcessEvidence;	}
	
	public String getGoProcessRef() { return goProcessRef; }
	public void setGoProcessRef(String goProcessRef) {this.goProcessRef = goProcessRef;}
	
	public String getGoComponentId() {return goComponentId;}
	public void setGoComponentId(String goComponentId) {this.goComponentId = goComponentId;	}
	
	public String getGoComponentEvidence() {return goComponentEvidence;}
	public void setGoComponentEvidence(String goComponentEvidence) {this.goComponentEvidence = goComponentEvidence;	}

	public String getGoComponentRef() { return goComponentRef; }
	public void setGoComponentRef(String goComponentRef) {this.goComponentRef = goComponentRef;}
	
// from mysql table external_resource
	public String getGenbankGeneId() {return genbankGeneId;}
	public void setGenbankGeneId(String genbankGeneId) {this.genbankGeneId = genbankGeneId;	}

	public String getOtherGenbankGeneId() {return otherGenbankGeneId;}
	public void setOtherGenbankGeneId(String otherGenbankGeneId) {this.otherGenbankGeneId = otherGenbankGeneId;	}

	public String getUniprotId() {return uniprotId;}
	public void setUniprotId(String uniprotId) {this.uniprotId = uniprotId;	}

	public String getOtherUniprotId() {return otherUniprotId;}
	public void setOtherUniprotId(String otherUniprotId) {this.otherUniprotId = otherUniprotId;	}

	public String getGenbankProteinId() {return genbankProteinId;}
	public void setGenbankProteinId(String genbankProteinId) {this.genbankProteinId = genbankProteinId;	}

	public String getRefseqProteinId() {return refseqProteinId;}
	public void setRefseqProteinId(String refseqProteinId) {this.refseqProteinId = refseqProteinId; }
	
	public String getJgiId() {return jgiId;}
	public void setJgiId(String jgiId) {this.jgiId = jgiId;	}

	public String getBroadId() {return broadId;}
	public void setBroadId(String broadId) {this.broadId = broadId;	}

	public String getLiteraturePmid() {return literaturePmid;}
	public void setLiteraturePmid(String literaturePmid) {this.literaturePmid = literaturePmid;	}

	public String getStructurePmid() {return structurePmid;}
	public void setStructurePmid(String structurePmid) {this.structurePmid = structurePmid;	}
	
	public String getSequencePmid() { return sequencePmid; }
	public void setSequencePmid(String sequencePmid) {this.sequencePmid = sequencePmid; }
	
	public String getPdbId() {return pdbId;}
	public void setPdbId(String pdbId) {this.pdbId = pdbId;	}
	
	public String getStructureDeterminationMethod() {return structureDeterminationMethod;}
	public void setStructureDeterminationMethod(String structureDeterminationMethod) {this.structureDeterminationMethod = structureDeterminationMethod;	}
	
// from mysql table protein_feature
	public String getSignalPeptidePredicted() {return signalPeptidePredicted;}
	public void setSignalPeptidePredicted(String signalPeptidePredicted) {this.signalPeptidePredicted = signalPeptidePredicted;	}

	public String getNterminalExperimental() {return nterminalExperimental;}
	public void setNterminalExperimental(String nterminalExperimental) {this.nterminalExperimental = nterminalExperimental;	}

	public String getMolecularWtExperimental() {return molecularWtExperimental;}
	public void setMolecularWtExperimental(String molecularWtExperimental) {this.molecularWtExperimental = molecularWtExperimental;	}

	public String getMolecularWtPredicted() {return molecularWtPredicted;}
	public void setMolecularWtPredicted(String molecularWtPredicted) {this.molecularWtPredicted = molecularWtPredicted;	}

	public String getProteinLength() {return proteinLength;}
	public void setProteinLength(String proteinLength) {this.proteinLength = proteinLength;	}

	public String getCbd() {return cbd;}
	public void setCbd(String cbd) {this.cbd = cbd;	}

	public String getGlycosylation() {return glycosylation;}
	public void setGlycosylation(String glycosylation) {this.glycosylation = glycosylation;	}

// from mysql table dna_sequence
	public String getDnaSeqId() {return dnaSeqId;}
	public void setDnaSeqId(String dnaSeqId) {this.dnaSeqId = dnaSeqId;	}

	public String getDnaSequence() {return dnaSequence;}
	public void setDnaSequence(String dnaSequence) {this.dnaSequence = dnaSequence;	}

// from mysql table protein_sequence
	public String getProteinSeqId() {return proteinSeqId;}
	public void setProteinSeqId(String proteinSeqId) {this.proteinSeqId = proteinSeqId;	}

	public String getProteinSequence() {return proteinSequence;}
	public void setProteinSequence(String proteinSequence) {this.proteinSequence = proteinSequence;	}
	
// from mysql table change_logging
	public String getDatetime() { return datetime; }
	public void setDatetime(String datetime) { this.datetime = datetime; }

		
}
