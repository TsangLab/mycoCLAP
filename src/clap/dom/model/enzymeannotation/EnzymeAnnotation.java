package clap.dom.model.enzymeannotation;

import org.dsrg.soenea.domain.DomainObject;

public class EnzymeAnnotation extends DomainObject<Long>{
	
	Long enzymeEntryId;
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
	
	public EnzymeAnnotation(Long id, Long enzymeEntryId, String ecNumber, 
			String goMolecularId, String goMolecularEvidence, String goMolecularRef,
			String goProcessId, String goProcessEvidence, String goProcessRef,
			String goComponentId, String goComponentEvidence, String goComponentRef) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
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
	}

	public Long getEnzymeEntryId() {	return enzymeEntryId;}
	public void setEnzymeEntryId(Long enzymeEntryId) {this.enzymeEntryId = enzymeEntryId;}
	
	public String getEcNumber() {	return ecNumber;}
	public void setEcNumber(String ecNumber) {this.ecNumber = ecNumber;}
	
	public String getGoMolecularId() {return goMolecularId;	}
	public void setGoMolecularId(String goMolecularId) {this.goMolecularId = goMolecularId;	}
	
	public String getGoMolecularEvidence() {return goMolecularEvidence;	}
	public void setGoMolecularEvidence(String goMolecularEvidence) {this.goMolecularEvidence = goMolecularEvidence;	}
	
	public String getGoMolecularRef() {return goMolecularRef;	}
	public void setGoMolecularRef(String goMolecularRef) {this.goMolecularRef = goMolecularRef;	}
	
	public String getGoProcessId() {	return goProcessId;	}
	public void setGoProcessId(String goProcessId) {this.goProcessId = goProcessId;	}
	
	public String getGoProcessEvidence() {	return goProcessEvidence;	}
	public void setGoProcessEvidence(String goProcessEvidence) {this.goProcessEvidence = goProcessEvidence;	}
	
	public String getGoProcessRef() { return goProcessRef; }
	public void setGoProcessRef(String goProcessRef) {this.goProcessRef = goProcessRef;}
	
	public String getGoComponentId() {	return goComponentId;	}
	public void setGoComponentId(String goComponentId) {this.goComponentId = goComponentId;	}
	
	public String getGoComponentEvidence() {	return goComponentEvidence;	}
	public void setGoComponentEvidence(String goComponentEvidence) {this.goComponentEvidence = goComponentEvidence;	}

	public String getGoComponentRef() { return goComponentRef; }
	public void setGoComponentRef(String goComponentRef) {this.goComponentRef = goComponentRef;}
}
