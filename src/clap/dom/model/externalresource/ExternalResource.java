package clap.dom.model.externalresource;

import org.dsrg.soenea.domain.DomainObject;

public class ExternalResource extends DomainObject<Long>{
	
	Long enzymeEntryId;
	String genbankGeneId;
	String otherGeneId;
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
	
	public ExternalResource(Long id, Long enzymeEntryId, 
			String genbankGeneId, String otherGeneId, 
			String uniprotId, String otherUniprotId, 
			String genbankProteinId,
			String refseqProteinId,
			String jgiId, String broadId,
			String literaturePmid, String structurePmid,
			String sequencePmid,
			String pdbId, String structureDeterminationMethod) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.genbankGeneId = genbankGeneId;
		this.otherGeneId = otherGeneId;
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
	}

	public Long getEnzymeEntryId() { return enzymeEntryId;}
	public void setEnzymeEntryId(Long enzymeEntryId) {this.enzymeEntryId = enzymeEntryId;}
	
	public String getGenbankGeneId() {	return genbankGeneId;}
	public void setGenbankGeneId(String genbankGeneId) {this.genbankGeneId = genbankGeneId;}
	
	public String getOtherGeneId() {return otherGeneId;	}
	public void setOtherGeneId(String otherGeneId) {this.otherGeneId = otherGeneId;	}
	
	public String getUniprotId() {return uniprotId;	}
	public void setUniprotId(String uniprotId) {this.uniprotId = uniprotId;	}
	
	public String getOtherUniprotId() {	return otherUniprotId;	}
	public void setOtherUniprotId(String otherUniprotId) {this.otherUniprotId = otherUniprotId;	}
	
	public String getGenbankProteinId() { return genbankProteinId;	}
	public void setGenbankProteinId(String genbankProteinId) {this.genbankProteinId = genbankProteinId;	}
	
	public String getRefseqProteinId() { return refseqProteinId; }
	public void setRefseqProteinId(String refseqProteinId) {this.refseqProteinId = refseqProteinId; }
	
	public String getJgiId() {	return jgiId;	}
	public void setJgiId(String jgiId) {this.jgiId = jgiId;	}
	
	public String getBroadId() { return broadId;	}
	public void setBroadId(String broadId) {this.broadId = broadId;	}
	
	public String getLiteraturePmid() {	return literaturePmid;	}
	public void setLiteraturePmid(String literaturePmid) {this.literaturePmid = literaturePmid;	}
	
	public String getStructurePmid() {	return structurePmid;	}
	public void setStructurePmid(String structurePmid) {this.structurePmid = structurePmid;	}
	
	public String getSequencePmid() { return sequencePmid; }
	public void setSequencePmid(String sequencePmid) {this.sequencePmid = sequencePmid; }
	
	public String getPdbId() {	return pdbId;	}
	public void setPdbId(String pdbId) {this.pdbId = pdbId;	}
	
	public String getStructureDeterminationMethod() {	return structureDeterminationMethod;	}
	public void setStructureDeterminationMethod(String structureDeterminationMethod) {this.structureDeterminationMethod = structureDeterminationMethod;	}
}
