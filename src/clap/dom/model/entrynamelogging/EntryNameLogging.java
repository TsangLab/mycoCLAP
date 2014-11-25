package clap.dom.model.entrynamelogging;

import org.dsrg.soenea.domain.DomainObject;

public class EntryNameLogging extends DomainObject<Long>{
	
	String status;
	String entryname;	
	String usedentryname;
	String datetime;
	
	public EntryNameLogging(Long id, String status, String entryName, 
					String usedEntryName, String dateTime) {
		super(id, 0);
		this.status = status;
		this.entryname = entryName;
		this.usedentryname = usedEntryName;
		this.datetime = dateTime;
	}

	public String getStatus() { return status;}
	public void setStatus(String status) {this.status = status;	}
	
	public String getEntryName() { return entryname;}
	public void setEntryName(String entryName) {this.entryname = entryName;	}
	
	public String getUsedEntryName() { return usedentryname; }
	public void setUser(String usedEntryName) { this.usedentryname = usedEntryName; }
	
	public String getDateTime() { return datetime; }
	public void setDateTime(String datatime) { this.datetime = datatime; }
	
}
