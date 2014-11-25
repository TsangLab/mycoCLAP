package clap.dom.model.entrylistref.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryListRefTDG {	
	public static final String BASE_NAME = "entry_list_ref";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, entry_name_id, version, status) " +
		"values(?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET enzyme_entry_id=?, entry_name_id=?, version=?, status=? " +
		"WHERE id=?;";
	
	public static int delete(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, long entryNameId, long version, String status) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setLong(3, entryNameId);
		ps.setLong(4, version);
		ps.setString(5, status);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, long enzymeEntryId, long entryNameId, long version, String status) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setLong(1, enzymeEntryId);
		ps.setLong(2, entryNameId);
		ps.setLong(3, version);
		ps.setString(4, status);
		ps.setLong(5, id);	
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
}