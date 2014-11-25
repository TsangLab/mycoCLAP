package clap.dom.model.literatureabstract.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class LiteratureAbstractFinder {
	public static final String FIELDS = "id, pubmed_id, source, title," +
										" author, address, abstract" +
										"";
	
	public static String SELECT_LITERATUREABSTRACTBYPUBMEDID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM literature_abstract WHERE pubmed_id=?" + 
		"";
	
	public static String SELECT_ALLLITERATUREABSTRACT_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM literature_abstract" +
		"";
	
	public static ResultSet findLiteratureAbstractByPubmedId(String pubmedId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_LITERATUREABSTRACTBYPUBMEDID_SQL);
		ps.setString(1, pubmedId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllLiteratureAbstract() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLLITERATUREABSTRACT_SQL);
		return ps.executeQuery();
	}
}