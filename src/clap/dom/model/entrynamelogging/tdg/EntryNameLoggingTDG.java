package clap.dom.model.entrynamelogging.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryNameLoggingTDG {
	public static final String BASE_NAME = "entry_name_logging";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + "WHERE entry_name=?;";
	
	public static final String INSERT =
		"INSERT INTO " + TABLE + " (id, status, entry_name, used_entry_name, date_time) " +
		" values(?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET status=?, entry_name=?, used_entry_name=?, date_time=? " +
		"WHERE id=?";
	
	public static int delete(String entryName) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setString(1,entryName);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(Long id, String status, 
			String entryName, String usedEntryName, String datetime) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setString(2, status);
		ps.setString(3, entryName);
		ps.setString(4, usedEntryName);
		ps.setString(5, datetime);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(BASE_NAME, "id");
	}
	
	public static int update(Long id, String status,
			String entryName, String usedEntryName, String dateTime) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, status);
		ps.setString(2, entryName);
		ps.setString(3, usedEntryName);
		ps.setString(4, dateTime);
		ps.setLong(5, id);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}