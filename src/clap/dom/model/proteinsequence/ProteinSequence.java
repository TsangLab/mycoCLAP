package clap.dom.model.proteinsequence;

import org.dsrg.soenea.domain.DomainObject;

public class ProteinSequence extends DomainObject<Long>{
	
	Long enzymeEntryId;
	Long entryNameId;
	String proteinId;
	String proteinSequence;
	
	public ProteinSequence(Long id, Long enzymeEntryId, Long entryNameId,
			String proteinId, String proteinSequence) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.entryNameId = entryNameId;
		this.proteinId = proteinId;
		this.proteinSequence = proteinSequence;
	}

	public Long getEnzymeEntryId() { return enzymeEntryId;	}
	public void setEnzymeEntryId(Long enzymeEntryId) {	this.enzymeEntryId = enzymeEntryId;	}
	
	public Long getEntryNameId() { return entryNameId;	}
	public void setEntryNameId(Long entryNameId) {	this.entryNameId = entryNameId;	}
	
	public String getProteinId() { return proteinId;}
	public void setProteinId(String proteinId) { this.proteinId = proteinId;}
	
	public String getProteinSequence() { return proteinSequence; }
	public void setProteinSequence(String proteinSequence) { this.proteinSequence = proteinSequence; }
		
}
