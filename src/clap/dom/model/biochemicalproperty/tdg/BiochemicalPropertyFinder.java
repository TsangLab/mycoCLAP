package clap.dom.model.biochemicalproperty.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class BiochemicalPropertyFinder {	
	public static final String FIELDS = "id, enzyme_entry_id, substrates, " +
			"host_for_recombinant_expression, specific_activity, " +
			"activity_assay_conditions, substrate_specificity, " +
			"km, kcat, vmax, assay, kinetic_assay_conditions, " +
			"product_analysis, product_formed, " +
			"ph_optimum, ph_stability, " +
			"temperature_optimum, temperature_stability, " +
			"isoelectric_point_experimental, isoelectric_point_predicted, " +
			"other_features";
	
	public static String SELECT_BIOCHEMICALPROPERTYBYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM biochemical_property WHERE id=?" + 
			"";
	
	public static String SELECT_BIOCHEMICALPROPERTYBYENZYMEENTRYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM biochemical_property WHERE enzyme_entry_id=?" + 
			"";
		
	public static String SELECT_ALLBIOCHEMICALPROPERTY_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM biochemical_property" +
			"";
	
	public static ResultSet findBiochemicalPropertyById(Long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_BIOCHEMICALPROPERTYBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findBiochemicalPropertyByEnzymeEntryId(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_BIOCHEMICALPROPERTYBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllBiochemicalProperty() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLBIOCHEMICALPROPERTY_SQL);
		return ps.executeQuery();
	}
}