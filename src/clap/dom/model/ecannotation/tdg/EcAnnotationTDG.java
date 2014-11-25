package clap.dom.model.ecannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EcAnnotationTDG {
	
	public static final String BASE_NAME = "ec_annotation";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + "WHERE ec_number=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, ec_number, common_name, ec_systematic_name, " +
		"alternate_names, definition) values(?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET common_name=?, common_name=?, ec_systematic_name=?, alternate_names=?, definition=? " +
		"WHERE id=? and ec_number=?;";
	
	public static int delete(String ecNumber) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setString(1, ecNumber);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, String ecNumber, String commonName, String ecSystematicName, 
			String alternateName, String definition) throws SQLException{
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setString(2, ecNumber);
		ps.setString(3, commonName);
		ps.setString(4, ecSystematicName);
		ps.setString(5, alternateName);
		ps.setString(6, definition);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, String ecNumber, String commonName, String ecSystematicName, 
			String alternateName, String definition) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, commonName);
		ps.setString(2, ecSystematicName);
		ps.setString(3, alternateName);
		ps.setString(4, definition);
		ps.setLong(5, id);
		ps.setString(6, ecNumber);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}