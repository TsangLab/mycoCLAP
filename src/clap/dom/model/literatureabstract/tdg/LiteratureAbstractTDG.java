package clap.dom.model.literatureabstract.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class LiteratureAbstractTDG {
	public static final String BASE_NAME = "literature_abstract";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE pubmed_id=?;";

	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, pubmed_id, source, title, author, " +
		"address, abstract) values(?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE INTO " + TABLE + " " +
		"SET source=?, title=?, author=?, address=?, abstract=? " +
		"WHERE id=? and pubmed_id=?;";
	
	public static int delete(String pubmedId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setString(1, pubmedId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, String pubmed_id, String source, String title, 
			String author, String address, String litAbstract) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setString(2, pubmed_id);
		ps.setString(3, source);
		ps.setString(4, title);
		ps.setString(5, author);
		ps.setString(6, address);
		ps.setString(7, litAbstract);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	
	public static int update(long id, String pubmed_id, String source, String title, 
			String author, String address, String litAbstract) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, source);
		ps.setString(2, title);
		ps.setString(3, author);
		ps.setString(4, address);
		ps.setString(5, litAbstract);
		ps.setLong(6, id);
		ps.setString(7, pubmed_id);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}