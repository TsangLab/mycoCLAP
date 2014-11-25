package clap.dom.model.datafiles;

import java.io.InputStreamReader;

import org.dsrg.soenea.domain.DomainObject;

public class DataFiles extends DomainObject<Long>{
	
	String filename;	
	InputStreamReader content;
	String user;
	String datetime;
	
	public DataFiles(Long id, String filename, InputStreamReader content,
					String user, String datetime) {
		super(id, 0);
		this.filename = filename;
		this.content = content;
		this.user = user;
		this.datetime = datetime;
	}

	public String getFileName() { return filename;}
	public void setFileName(String filename) {this.filename = filename;	}
	
	public InputStreamReader getContent() {	return content;	}
	public void setContent(InputStreamReader content) {	this.content = content;}
	
	public String getUser() { return user; }
	public void setUser(String user) { this.user = user; }
	
	public String getDateTime() { return datetime; }
	public void setDateTime(String datatime) { this.datetime = datatime; }
	
}
