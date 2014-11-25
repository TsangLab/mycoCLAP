package clap.dom.model.dnasequence.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class DnaSequenceFinder {
	
	public static final String FIELDS = "id, enzyme_entry_id, entry_name_id, genbank_gene_id, dna_seq";
	
	public static String SELECT_DNASEQUENCEBYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM dna_sequence WHERE id = ?";
	
	public static String SELECT_DNASEQUENCEBYGENEID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM dna_sequence WHERE genbank_gene_id = ?";
	
	public static String SELECT_DNASEQUENCEBYENZYMEENTRYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM dna_sequence WHERE enzyme_entry_id = ?";
	
	public static String SELECT_DNASEQUENCEBYENTRYNAMEID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM dna_sequence WHERE entry_name_id = ?";

	public static String SELECT_ALLDNASEQUENCE_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM dna_sequence";
	
	public static ResultSet findDnaSequenceById(long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_DNASEQUENCEBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findDnaSequenceByGeneId(String genbankGeneId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_DNASEQUENCEBYGENEID_SQL);
		ps.setString(1, genbankGeneId);
		return ps.executeQuery();
	}
	
	public static ResultSet findDnaSequenceByEnzymeEntryId(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_DNASEQUENCEBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findDnaSequenceByEntryNameId(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_DNASEQUENCEBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllDnaSequence() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLDNASEQUENCE_SQL);
		return ps.executeQuery();
	}
	
}