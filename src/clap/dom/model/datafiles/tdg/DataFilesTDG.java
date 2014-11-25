package clap.dom.model.datafiles.tdg;

import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class DataFilesTDG {
	
	public static final String BASE_NAME = "data_files";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + "WHERE file_name=?;";
	
	public static final String INSERT =
		"INSERT INTO " + TABLE + " (id, file_name, content, user, date_time) " +
		" values(?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET content=?, user=?, date_time=? " +
		"WHERE file_name=?";
	
	public static int delete(String filename) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setString(1,filename);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(Long id, String filename, 
			InputStreamReader inputStreamReader, String user, String datetime) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setString(2, filename);
		ps.setCharacterStream(3, inputStreamReader);
		ps.setString(4, user);
		ps.setString(5, datetime);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(BASE_NAME, "id");
	}
	
	public static int update(String filename, 
			String content, String user, String datetime) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, content);
		ps.setString(2, user);
		ps.setString(3, datetime);
		ps.setString(4, filename);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}