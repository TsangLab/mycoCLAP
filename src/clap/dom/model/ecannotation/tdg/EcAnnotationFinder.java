package clap.dom.model.ecannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EcAnnotationFinder {
	
	public static final String FIELDS = "id, ec_number, common_name," +
			"alternate_names, definition";
	
	public static String SELECT_ECANNOTATIONBYECNUMBER_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM ec_annotation WHERE ec_number=?" + 
		"";
	
	public static String SELECT_ALLECANNOTATION_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM ec_annotation" +
		"";
	
	public static ResultSet findEcAnnotationByEcNumber(String ecNumber) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ECANNOTATIONBYECNUMBER_SQL);
		ps.setString(1, ecNumber);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllEcAnnotation() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLECANNOTATION_SQL);
		return ps.executeQuery();
	}
}