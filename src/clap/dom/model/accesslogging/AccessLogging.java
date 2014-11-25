package clap.dom.model.accesslogging;

import org.dsrg.soenea.domain.DomainObject;

public class AccessLogging extends DomainObject<Long>{
	
	String ip;
	String address;
	String user;
	String datetime;
	String command;
	String parameters;
	
	public AccessLogging(Long id, String ip, String address, String user, 
						String datetime, String command, String parameters) {
		super(id, 0);
		this.ip = ip;
		this.address = address;
		this.user = user;
		this.datetime = datetime;
		this.command = command;
		this.parameters = parameters;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
		this.user = user;
	}
	
	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	
	public String getCommand() {
		return command;
	}
	
	public void setCommand(String command) {
		this.command = command;
	}
	
	public String getParamters() {
		return parameters;
	}
	
	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
	
}
