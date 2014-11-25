package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.accesslogging.AccessLogging;
import clap.dom.model.accesslogging.mappers.AccessLoggingInputMapper;
import clap.dom.model.accesslogging.tdg.AccessLoggingTDG;
import clap.service.util.FileUploadUtil;
import clap.service.util.LuceneIndexFile;
import clap.service.util.ip.IpAddress;

public class TbrowseCommand extends Command {
	
	public TbrowseCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		try {				
			/*
			 * Verify if needs to create Lucene index file or not
			 */
			AccessLogging a = AccessLoggingInputMapper.findAccessLoggingByMaxId();
            String lastAccessDateTime = a.getDatetime();
            Date dt = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date lastAccessDate = new java.sql.Date(sdf.parse(lastAccessDateTime).getTime());
            Date currentDate = new java.sql.Date(sdf.parse(sdf.format(dt)).getTime());
            
            if(!lastAccessDate.equals(currentDate))
            	luceneIndexFileRecreate();
			
            /*
             * access_logging
             */
            IpAddress ipAddress = (IpAddress)helper.getSessionAttribute("ip");
			String ip = ipAddress.getHumanReadable();			
			String hostAddress = (String) helper.getSessionAttribute("remoteHost");
			String user = (String) helper.getSessionAttribute("CurrentUser").toString();			
			String command = this.getClass().getName();			
			dt = new java.util.Date();
			sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
			String currentTime = sdf.format(dt);			
			String parameters = "";
						
			AccessLoggingTDG.insert(
				AccessLoggingTDG.getMaxId(), 
				ip, 
				hostAddress, 
				user, 
				currentTime,
				command,
				parameters);
			
			helper.setRequestAttribute("activeItem", "start-panel");
		} catch (Exception e) {
			throw new CommandException(e);
		}		
	}
	
	private void luceneIndexFileRecreate() throws IOException, SQLException 
	{
	    String relative_path = "/WEB-INF/uploads/luceneindex/";
	    FileUploadUtil.deleteFiles(helper.getRequestAttribute("realPath") +relative_path);
	    File parentDir = FileUploadUtil.luceneIndexDir();
	    LuceneIndexFile.createLuceneIndexFile(parentDir);
	}

}
