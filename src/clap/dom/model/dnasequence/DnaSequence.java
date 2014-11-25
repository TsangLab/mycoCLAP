package clap.dom.model.dnasequence;

import org.dsrg.soenea.domain.DomainObject;

public class DnaSequence extends DomainObject<Long>{
	
	Long enzymeEntryId;
	Long entryNameId;
	String genbankGeneId;
	String dnaSequence;
	
	public DnaSequence(Long id, Long enzymeEntryId,
			Long entryNameId, String genbankGeneId,
			String dnaSequence) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.entryNameId = entryNameId;
		this.genbankGeneId = genbankGeneId;
		this.dnaSequence = dnaSequence;
	}

	public Long getEnzymeEntryId() { return enzymeEntryId;	}
	public void setEnzymeEntryId(Long enzymeEntryId) {	this.enzymeEntryId = enzymeEntryId;	}
	
	public Long getEntryNameId() { return entryNameId;	}
	public void setEntryNameId(Long entryNameId) {	this.entryNameId = entryNameId;	}
	
	public String getGenbankGeneId() { return genbankGeneId;}
	public void setGenbankGeneId(String genbankGeneId) { this.genbankGeneId = genbankGeneId;}
	
	public String getDnaSequence() { return dnaSequence; }
	public void setDnaSequence(String dnaSequence) { this.dnaSequence = dnaSequence; }
}
