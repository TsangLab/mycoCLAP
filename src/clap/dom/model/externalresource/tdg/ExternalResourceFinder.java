package clap.dom.model.externalresource.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ExternalResourceFinder {
	public static final String FIELDS = "id, enzyme_entry_id, " +
			"genbank_gene_id, other_genbank_gene_id, " +
			"uniprot_id, other_uniprot_id, " +
			"genbank_protein_id, refseq_protein_id, jgi_id, broad_id, " +
			"literature_pmid, structure_pmid, sequence_pmid, " +
			"pdb_id, structure_determination_method";
	
	public static String SELECT_EXTERNALRESOURCEBYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM external_resource WHERE id=?" + 
		"";
	
	public static String SELECT_EXTERNALRESOURCEBYENZYMEENTRYID_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM external_resource WHERE enzyme_entry_id=?" + 
		"";
	
	public static String SELECT_ALLEXTERNALRESOURCE_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM external_resource" +
		"";
	
	public static ResultSet findExternalResourceById(Long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_EXTERNALRESOURCEBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findExternalResourceByEnzymeEntryId(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_EXTERNALRESOURCEBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllExternalResource() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLEXTERNALRESOURCE_SQL);
		return ps.executeQuery();
	}
}