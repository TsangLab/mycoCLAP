package clap.dom.model.goannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class GoAnnotationFinder {
	public static final String FIELDS = "id, go_id, name, term_type";
	
	public static String SELECT_GOANNOTATIONBYGOID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM go_annotation WHERE go_id=?" + 
		"";
	
	public static String SELECT_ALLGOANNOTATION_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM go_annotation" +
		"";
	
	public static ResultSet findGoAnnotationByGoId(String goId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_GOANNOTATIONBYGOID_SQL);
		ps.setString(1, goId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllGoAnnotation() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLGOANNOTATION_SQL);
		return ps.executeQuery();
	}
}