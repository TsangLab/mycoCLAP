package clap.dom.model.entrydescription;

import org.dsrg.soenea.domain.DomainObject;

public class EntryDescription extends DomainObject<Long>{
	
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
	
	public EntryDescription(Long id, Long entryNameId, String species, 
			String strain, String entryName, String geneName, 
			String geneAlias, String enzymeName, String ecSystematicName, 
			String enzymeAlias, String family) {
		super(id, 0);
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
	}

	public Long getEntryNameId() {	return entryNameId;	}
	public void setEntryNameId(Long entryNameId) {	this.entryNameId = entryNameId;	}
	
	public String getSpecies() { return species;}
	public void setSpecies(String species) {this.species = species;	}
	
	public String getStrain() {	return strain;	}
	public void setStrain(String strain) {	this.strain = strain;}
	
	public String getEntryName() {	return entryName;}
	public void setEntryName(String entryName) {this.entryName = entryName; }
	
	public String getGeneName() {return geneName;}
	public void setGeneName(String geneName) {this.geneName = geneName;	}
	
	public String getGeneAlias() { return geneAlias;}
	public void setGeneAlias(String geneAlias) {this.geneAlias = geneAlias;	}
	
	public String getEnzymeName() {	return enzymeName;	}
	public void setEnzymeName(String enzymeName) { this.enzymeName = enzymeName;}
	
	public String getEcSystematicName() { return ecSystematicName;}
	public void setEcSystematicName(String ecSystematicName) { this.ecSystematicName = ecSystematicName;}
	
	public String getEnzymeAlias() {return enzymeAlias;	}
	public void setEnzymeAlias(String enzymeAlias) { this.enzymeAlias = enzymeAlias;}
	
	public String getFamily() {	return family;}
	public void setFamily(String family) {	this.family = family;}
}
