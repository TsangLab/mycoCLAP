package clap.dom.command;

import java.net.InetAddress;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.ValidatorCommand;
import org.dsrg.soenea.domain.helper.Helper;

public abstract class ClapCommand extends ValidatorCommand
{
	
    public ClapCommand(Helper helper) {
        super(helper);
    }

    protected abstract void executeCommand() throws CommandException;
    
    @Override
    public void execute() throws CommandException
    {
    	try {    		
	    	/*
			 * catch ip address	to db		
			 */
    		InetAddress thisIp;; 
			String ip;
			String hostAddress;
			String hostName;
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
				
/*			String command = this.getClass().getName();			
			java.util.Date dt = new java.util.Date();
			java.text.SimpleDateFormat sdf = new
			java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
			String currentTime = sdf.format(dt);
			String parameters = "";

			AccessLoggingTDG.insert(
				AccessLoggingTDG.getMaxId(), 
				ip, 
				hostAddress, 
				hostName, 
				currentTime,
				command,
				parameters);
*/		} catch (Exception e) {
			throw new CommandException(e);
		} 
		
        prepare();
        executeCommand();
    }

}
