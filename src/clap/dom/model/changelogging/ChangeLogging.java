package clap.dom.model.changelogging;

import org.dsrg.soenea.domain.DomainObject;

public class ChangeLogging extends DomainObject<Long>{
	
	String user;
	String datetime;
	Long enzymeentryid;
	Long entrynameid;
	String entryname;
	String operation;
	String comments;
	
	public ChangeLogging(Long id, String user, String datetime, 
						Long enzymeEntryId, Long entryNameId, String entryName,
						String operation, String comments) {
		super(id, 0);
		this.user = user;
		this.datetime = datetime;
		this.enzymeentryid = enzymeEntryId;
		this.entrynameid = entryNameId;
		this.entryname = entryName;
		this.operation = operation;
		this.comments = comments;
	}

	public String getUser() { return user; }	
	public void setUser(String user) { this.user = user; }
	
	public String getDatetime() { return datetime; }
	public void setDatetime(String datetime) { this.datetime = datetime; }
	
	public Long getEnzymeEntryId() { return enzymeentryid; }
	public void setEnzymeEntryId(Long enzymeEntryId) { this.enzymeentryid = enzymeEntryId; }
	
	public Long getEntryNameId() { return entrynameid; }
	public void setEntryNameId(Long entryNameId) { this.entrynameid = entryNameId; }
	
	public String getEntryName() { return entryname; }
	public void setEntryName(String entryName) { this.entryname = entryName; }
	
	public String getOperation() { return operation; }
	public void setOperation(String operation) { this.operation = operation; }
	
	public String getComments() { return comments; }	
	public void setComments(String comments) { this.comments = comments; }
	
}
