package clap.dom.command;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.SQLException;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.validator.source.Source;
import org.dsrg.soenea.domain.command.validator.source.impl.AttributeSource;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.Registry;

import clap.dom.command.validator.source.impl.PermalinkSource;
import clap.dom.model.accesslogging.tdg.AccessLoggingTDG;

public class LiteraturesCommand extends ClapCommand {
		
	public LiteraturesCommand(Helper helper) {
		super(helper);
	}
	
	@Source(sources=PermalinkSource.class)
	public String id;

	@Source(sources=AttributeSource.class)
	public String realPath;
	
	public static final String LITERATURE_PATH;
    static {
        try {
        	LITERATURE_PATH = Registry.getProperty("literaturePath");
        } catch (Exception e) {
        	e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
	
	@Override
	protected void executeCommand() throws CommandException {
    	String filename = id + ".pdf";
//	    File parentDir = new File(realPath + "/WEB-INF/literatures/");
    	File parentDir = new File(LITERATURE_PATH);
	    File file = new File(parentDir, filename);

	    if (!file.exists())
	    	throw new CommandException(new FileNotFoundException("File not found: " + id));
	    
	    /* even though we constructed file inside parentDir, this makes sure that
	     ** id doesn't contain anything like "../" that might let the user grab files
	     ** outside the parentDir
	     */
	    if (!file.getParentFile().equals(parentDir))
	    	throw new CommandException(new FileNotFoundException("File not found: " + id));
	    
		helper.setRequestAttribute("file", file);
		
		/*
		 * catch ip address	to db		
		 */
		InetAddress thisIp;; 
		String ip;
		String hostAddress;
		String hostName;
		try {
			if ( InetAddress.getLocalHost() == null) {
				ip = "";
				hostAddress = "unable to catch host address";
				hostName = "unable to catch host name";
			}
			else {
				thisIp = InetAddress.getLocalHost();
				ip = thisIp.toString();
				hostAddress = thisIp.getHostAddress();
				hostName = thisIp.getHostName();
			}
					
			String command = this.getClass().getName();			
			java.util.Date dt = new java.util.Date();
			java.text.SimpleDateFormat sdf = new
			java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
			String currentTime = sdf.format(dt);
			String parameters = "pdf id: " + filename;
			
			AccessLoggingTDG.insert(
				AccessLoggingTDG.getMaxId(), 
				ip, 
				hostAddress, 
				hostName, 
				currentTime,
				command,
				parameters);			
		} catch (UnknownHostException e) {
			throw new CommandException("Unknown host try to access the web!");
		} catch (SQLException e) {
			throw new CommandException("Unknown to access the dababase!");
		}
	}

}
