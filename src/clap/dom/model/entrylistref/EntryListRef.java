package clap.dom.model.entrylistref;

import org.dsrg.soenea.domain.DomainObject;

public class EntryListRef extends DomainObject<Long>{
	
	Long enzymeEntryId;
	Long entryNameId;
	Long version;
	String status;
	
	public EntryListRef(Long id, Long enzymeEntryId, Long entryNameId, Long version, String status) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.entryNameId = entryNameId;
		this.version = version;
		this.status = status;
	}

	public Long getEnzymeEntryId() { return enzymeEntryId;	}
	public void setEnzymeEntryId(Long enzymeEntryId) {	this.enzymeEntryId = enzymeEntryId;	}
	
	public Long getEntryNameId() { return entryNameId;	}
	public void setEntryNameId(Long entryNameId) {	this.entryNameId = entryNameId;	}
	
	public long getVersion() { return version;	}
	public void setVersion(Long version) {	this.version = version;	}
	
	public String getStatus() { return status;	}
	public void setStatus(String status) {	this.status = status;	}
}
