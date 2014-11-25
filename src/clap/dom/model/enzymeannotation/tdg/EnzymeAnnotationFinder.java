package clap.dom.model.enzymeannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EnzymeAnnotationFinder {
	public static final String FIELDS = "id, enzyme_entry_id, ec_number, " +
			"go_molecular_function_id, go_molecular_function_evidence, go_molecular_function_ref, " +
			"go_biological_process_id, go_biological_process_evidence, go_biological_process_ref, " +
			"go_cellular_component_id, go_cellular_component_evidence, go_cellular_component_ref";
	
	public static String SELECT_ENZYMEANNOTATIONBYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM enzyme_annotation WHERE id=?" + 
		"";
	
	public static String SELECT_ENZYMEANNOTATIONBYENZYMEENTRYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM enzyme_annotation WHERE enzyme_entry_id=?" + 
		"";
	
	public static String SELECT_ENZYMEANNOTATIONBYECNUMBER_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM enzyme_annotation WHERE ec_number=?" + 
		"";
	
	public static String SELECT_ALLENZYMEANNOTATION_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM enzyme_annotation" +
		"";
	
	public static ResultSet findEnzymeAnnotationById(Long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENZYMEANNOTATIONBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findEnzymeAnnotationByEnzymeEntryId(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENZYMEANNOTATIONBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findEnzymeAnnotationByEcNumber(String ecNumber) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENZYMEANNOTATIONBYECNUMBER_SQL);
		ps.setString(1, ecNumber);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllEnzymeAnnotation() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLENZYMEANNOTATION_SQL);
		return ps.executeQuery();
	}
}