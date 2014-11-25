package clap.dom.model.specieslist;

import org.dsrg.soenea.domain.DomainObject;

public class SpeciesList extends DomainObject<Long>{
	
	String species;	
	String taxonomic;
	String acronym;
	String alternateNames;
	String commonName;
	String phylogeny;
	
	public SpeciesList(Long id, String species, 
			String taxonomic, String acronym, String alternateNames, 
			String commonName, String phylogeny) {
		super(id, 0);
		this.species = species;
		this.taxonomic = taxonomic;
		this.acronym = acronym;
		this.alternateNames = alternateNames;
		this.commonName = commonName;
		this.phylogeny = phylogeny;
	}

	public String getSpecies() { return species;}
	public void setSpecies(String species) {this.species = species;	}
	
	public String getTaxonomic() {	return taxonomic;	}
	public void setTaxonomic(String taxonomic) {	this.taxonomic = taxonomic;}
	
	public String getAcronym() {	return acronym;}
	public void setAcronym(String acronym) {this.acronym = acronym; }
	
	public String getAlternateNames() {return alternateNames;}
	public void setAlternateNames(String alternateNames) {this.alternateNames = alternateNames;	}
	
	public String getCommonName() { return commonName;}
	public void setCommonName(String commonName) {this.commonName = commonName;	}
	
	public String getPhylogeny() {	return phylogeny;	}
	public void setPhylogeny(String phylogeny) { this.phylogeny = phylogeny;}
}
