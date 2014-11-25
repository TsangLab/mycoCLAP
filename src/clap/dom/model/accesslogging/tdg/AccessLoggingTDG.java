package clap.dom.model.accesslogging.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.Logging;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class AccessLoggingTDG {
	    
	public static final String BASE_NAME = "access_logging";

	public static String TABLE = BASE_NAME;
		
	public static String INSERT_SQL = 
		"INSERT INTO " + TABLE + " " +
		"(id, ip, address, user, date_time, command, parameters) VALUES(?, ?, ?, ?, ?, ?, ?);";
	    
	public static int insert(long id, String ip, String address, String user, 
					String datetime, String command, 
					String parameters) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT_SQL);
		
		try {
            ps.setLong(1, id);
            ps.setString(2, ip);
    		ps.setString(3, address);
    		ps.setString(4, user);
    		ps.setString(5, datetime);
    		ps.setString(6, command);
    		ps.setString(7, parameters);
    	
    		Logging.logSQL( ps.toString());
    		return SQLLogger.processUpdate(ps);
		} finally {
            try { ps.close(); } catch (SQLException ignored) {}
		}
	}
		
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(TABLE, "id");
	}

}
