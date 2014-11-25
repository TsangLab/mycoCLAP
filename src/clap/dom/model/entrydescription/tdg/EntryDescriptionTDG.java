package clap.dom.model.entrydescription.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryDescriptionTDG {	
	public static final String BASE_NAME = "entry_description";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE entry_name_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, entry_name_id, species, strain, " +
		"entry_name, gene_name, gene_alias, enzyme_name, ec_systematic_name, " +
		"enzyme_alias, family) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET species=?, strain=?, entry_name=?, gene_name=?, gene_alias=?, " +
		"enzyme_name=?, ec_systematic_name=?, enzyme_alias=?, family=? " +
		"WHERE id=? and entry_name_id=?;";
	
	public static int delete(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, entryNameId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long entryNameId, String species, 
			String strain, String entryName, String geneName, String geneAlias, 
			String enzymeName, String ecSystematicName, String enzymeAlias,
			String family) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, entryNameId);
		ps.setString(3, species);
		ps.setString(4, strain);
		ps.setString(5, entryName);
		ps.setString(6, geneName);
		ps.setString(7, geneAlias);
		ps.setString(8, enzymeName);
		ps.setString(9, ecSystematicName);
		ps.setString(10, enzymeAlias);
		ps.setString(11, family);
		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, long entryNameId, String species, 
			String strain, String entryName, String geneName, String geneAlias, 
			String enzymeName, String ecSystematicName, String enzymeAlias,
			String family) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, species);
		ps.setString(2, strain);
		ps.setString(3, entryName);
		ps.setString(4, geneName);
		ps.setString(5, geneAlias);
		ps.setString(6, enzymeName);
		ps.setString(7, ecSystematicName);
		ps.setString(8, enzymeAlias);
		ps.setString(9, family);
		ps.setLong(10, id);
		ps.setLong(11, entryNameId);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
}