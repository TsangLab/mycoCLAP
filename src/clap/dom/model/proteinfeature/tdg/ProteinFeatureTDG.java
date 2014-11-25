package clap.dom.model.proteinfeature.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ProteinFeatureTDG {
	
	public static final String BASE_NAME = "protein_feature";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, signal_peptide_predicted, n_terminal_experimental, " +
		"molecular_weight_experimental, molecular_weight_predicted, protein_length, " +
		"cbd, glycosylation) values(?, ?, ?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET signal_peptide_predicted=?, n_terminal_experimental=?, " +
		"molecular_weight_experimental=?, molecular_weight_predicted=?, " +
		"protein_length=?, cbd=?, glycosylation=? " +
		"WHERE id=? and enzyme_entry_id=?;";
	
	public static int delete(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, String signalPeptidePredicted,
			String nterminalExperimental,
			String molecularWtExperimental, String molecularWtPredicted,
			String proteinLength, String cbd, String glycosylation) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setString(3, signalPeptidePredicted);
		ps.setString(4, nterminalExperimental);
		ps.setString(5, molecularWtExperimental);
		ps.setString(6, molecularWtPredicted);
		ps.setString(7, proteinLength);
		ps.setString(8, cbd);
		ps.setString(9, glycosylation);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, long enzymeEntryId, String signalPeptidePredicted,
			String nterminalExperimental,
			String molecularWtExperimental, String molecularWtPredicted,
			String proteinLength, String cbd, String glycosylation) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, signalPeptidePredicted);
		ps.setString(2, nterminalExperimental);
		ps.setString(3, molecularWtExperimental);
		ps.setString(4, molecularWtPredicted);
		ps.setString(5, proteinLength);
		ps.setString(6, cbd);
		ps.setString(7, glycosylation);
		ps.setLong(8, id);
		ps.setLong(9, enzymeEntryId);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}