package clap.dom.model.proteinsequence.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ProteinSequenceFinder {
	
	public static final String FIELDS = "id, enzyme_entry_id, entry_name_id," +
			"protein_id, protein_seq";
	
	public static String SELECT_PROTEINSEQUENCEBYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM protein_sequence WHERE id = ?";
	
	public static String SELECT_PROTEINSEQUENCEBYPROTEINID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM protein_sequence WHERE protein_id = ?";
	
	public static String SELECT_PROTEINSEQUENCEBYENZYMEENTRYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM protein_sequence WHERE enzyme_entry_id = ?";

	public static String SELECT_PROTEINSEQUENCEBYENTRYNAMEID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM protein_sequence WHERE entry_name_id = ?";

	public static String SELECT_ALLPROTEINSEQUENCE_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM protein_sequence";
	
	public static ResultSet findProteinSequenceById(long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINSEQUENCEBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findProteinSequenceByProteinId(String uniprotId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINSEQUENCEBYPROTEINID_SQL);
		ps.setString(1, uniprotId);
		return ps.executeQuery();
	}
	
	public static ResultSet findProteinSequenceByEnzymeEntryId(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINSEQUENCEBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findProteinSequenceByEntryNameId(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_PROTEINSEQUENCEBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllProteinSequence() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLPROTEINSEQUENCE_SQL);
		return ps.executeQuery();
	}
	
}