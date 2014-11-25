package clap.dom.model.biochemicalproperty.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class BiochemicalPropertyTDG {
	public static final String BASE_NAME = "biochemical_property";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT =
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, substrates, " +
		"host_for_recombinant_expression, specific_activity, " +
		"activity_assay_conditions, substrate_specificity, " + 
		"km, kcat, vmax, assay, kinetic_assay_conditions, " +
		"product_analysis, product_formed, ph_optimum, ph_stability, " +
		"temperature_optimum, temperature_stability, " +
		"isoelectric_point_experimental, isoelectric_point_predicted, " +
		"other_features) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET substrates=?, host_for_recombinant_expression=?, specific_activity=?, " +
		"activity_assay_conditions=?, substrate_specificity=?, " +
		"km=?, kcat=?, vmax=?, assay=?, kinetic_assay_conditions=?, " +
		"product_analysis=?, product_formed=?, ph_optimum=?, ph_stability=?, " +
		"temperature_optimum=?, temperature_stability=?, " +
		"isoelectric_point_experimental=?, isoelectric_point_predicted=?, " +
		"other_features=? " +
		"WHERE id=? and enzyme_entry_id=?;";
	
	public static int delete(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, String substrates, 
			String host, String specificActivity, String activityAssayConditions, 
			String substrateSpecificity, String km, String kcat, String vmax,
			String assay, String kineticAssayConditions, 
			String productAnalysis, String productFormed, 
			String phOptimum, String phStability, 
			String temperatureOptimum, String temperatureStability, 
			String ipExperimental, String ipPredicted, String otherFeatures)throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setString(3, substrates);
		ps.setString(4, host);
		ps.setString(5, specificActivity);
		ps.setString(6, activityAssayConditions);
		ps.setString(7, substrateSpecificity);
		ps.setString(8, km);
		ps.setString(9, kcat);
		ps.setString(10, vmax);
		ps.setString(11, assay);
		ps.setString(12, kineticAssayConditions);
		ps.setString(13, productAnalysis);
		ps.setString(14, productFormed);
		ps.setString(15, phOptimum);
		ps.setString(16, phStability);
		ps.setString(17, temperatureOptimum);
		ps.setString(18, temperatureStability);
		ps.setString(19, ipExperimental);
		ps.setString(20, ipPredicted);
		ps.setString(21, otherFeatures);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, long enzymeEntryId, String substrates, 
			String host, String specificActivity, String activityAssayConditions, 
			String substrateSpecificity, String km, String kcat, String vmax,
			String assay, String kineticAssayConditions, 
			String productAnalysis, String productFormed, 
			String phOptimum, String phStability, 
			String temperatureOptimum, String temperatureStability, 
			String ipExperimental, String ipPredicted, String otherFeatures)throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, substrates);
		ps.setString(2, host);
		ps.setString(3, specificActivity);
		ps.setString(4, activityAssayConditions);
		ps.setString(5, substrateSpecificity);
		ps.setString(6, km);
		ps.setString(7, kcat);
		ps.setString(8, vmax);
		ps.setString(9, assay);
		ps.setString(10, kineticAssayConditions);
		ps.setString(11, productAnalysis);
		ps.setString(12, productFormed);
		ps.setString(13, phOptimum);
		ps.setString(14, phStability);
		ps.setString(15, temperatureOptimum);
		ps.setString(16, temperatureStability);
		ps.setString(17, ipExperimental);
		ps.setString(18, ipPredicted);
		ps.setString(19, otherFeatures);
		ps.setLong(20, id);
		ps.setLong(21, enzymeEntryId);
		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(TABLE, "id");
	}

}