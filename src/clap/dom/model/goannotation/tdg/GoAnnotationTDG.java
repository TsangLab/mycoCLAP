package clap.dom.model.goannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class GoAnnotationTDG {
	public static final String BASE_NAME = "go_annotation";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE go_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, go_id, name, term_type) " +
		"values(?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET name=?, term_type=? " +
		"WHERE id=? and go_id=?;";
	
	public static int delete(String goId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setNString(1, goId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, String goId, String name, String termType) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setNString(2, goId);
		ps.setString(3, name);
		ps.setString(4, termType);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, String goId, String name, String termType) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, name);
		ps.setString(2, termType);
		ps.setLong(3, id);
		ps.setString(4, goId);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}