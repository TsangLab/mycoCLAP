package clap.dom.model.proteinfeature.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ProteinFeatureFinder {
	
	public static final String FIELDS = "protein_feature.*";
	
	public static String SELECT_PROTEINFEATUREBYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM protein_feature WHERE id=?" + 
		"";
	
	public static String SELECT_PROTEINFEATUREBYENZYMEENTRYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM protein_feature WHERE enzyme_entry_id=?" + 
		"";
	
	public static String SELECT_ALLPROTEINFEATURE_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM protein_feature" +
		"";
	
	public static ResultSet findProteinFeatureById(Long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINFEATUREBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findProteinFeatureByEnzymeEntryId(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINFEATUREBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllProteinFeature() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLPROTEINFEATURE_SQL);
		return ps.executeQuery();
	}
}