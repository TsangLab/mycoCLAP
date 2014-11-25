package clap.dom.model.changelogging.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.Logging;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ChangeLoggingTDG {
	    
	public static final String BASE_NAME = "change_logging";

	public static String TABLE = BASE_NAME;
		
	public static String INSERT_SQL = 
		"INSERT INTO " + TABLE + " " +
		"(id, user, date_time, enzyme_entry_id, entry_name_id, entry_name, operation, comments) " + 
		"VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
	    
	public static int insert(long id, String user, String datetime, 
					Long enzymeEntryId, Long entryNameId, String entryName,
					String operation, String comments) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT_SQL);
		
		try {
            ps.setLong(1, id);
    		ps.setString(2, user);
    		ps.setString(3, datetime);
    		ps.setLong(4, enzymeEntryId);
    		ps.setLong(5, entryNameId);
    		ps.setString(6, entryName);
    		ps.setString(7, operation);
    		ps.setString(8, comments);
    	
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
