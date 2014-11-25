package clap.dom.model.proteinsequence.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ProteinSequenceTDG {
	
	public static final String BASE_NAME = "protein_sequence";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, entry_name_id, protein_id, protein_seq) " +
		"values(?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET id=?, protein_id=?, protein_seq=? " +
		"WHERE enzyme_entry_id=? and entry_name_id=?;";
	
	public static int delete(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, long entryNameId, String proteinId, String proteinSequence) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setLong(3, entryNameId);
		ps.setString(4, proteinId);
		ps.setString(5, proteinSequence);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");		
	}
	
	public static int update(long id, long enzymeEntryId, long entryNameId, String proteinId, String proteinSequence) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setLong(1, id);
		ps.setString(2, proteinId);
		ps.setString(3, proteinSequence);
		ps.setLong(4, enzymeEntryId);
		ps.setLong(5, entryNameId);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}