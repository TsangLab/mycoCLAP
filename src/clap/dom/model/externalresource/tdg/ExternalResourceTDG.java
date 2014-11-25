package clap.dom.model.externalresource.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ExternalResourceTDG {
	public static final String BASE_NAME = "external_resource";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, genbank_gene_id, other_genbank_gene_id, " +
		"uniprot_id, other_uniprot_id, genbank_protein_id, refseq_protein_id, jgi_id, broad_id, " +
		"literature_pmid, structure_pmid, sequence_pmid, pdb_id, structure_determination_method) " +
		"values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET genbank_gene_id=?, other_genbank_gene_id=?, " +
		"uniprot_id=?, other_uniprot_id=?, genbank_protein_id=?, refseq_protein_id=?, jgi_id=?, broad_id=?, " +
		"literature_pmid=?, structure_pmid=?, sequence_pmid=?, " +
		"pdb_id=?, structure_determination_method=? " +
		"WHERE id=? and enzyme_entry_id=?;";
	
	public static int delete(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, 
			String genbankGeneId, String otherGenbankGeneId,
			String uniprotId, String otherUniprotId,
			String genbankProteinId, String refseqProteinId,
			String jgiId, String broadId,
			String literaturePmid, String structurePmid,
			String sequencePmid,
			String pdbId, String structureDeterminationMethod) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setString(3, genbankGeneId);
		ps.setString(4, otherGenbankGeneId);
		ps.setString(5, uniprotId);
		ps.setString(6, otherUniprotId);
		ps.setString(7, genbankProteinId);
		ps.setString(8, refseqProteinId);
		ps.setString(9, jgiId);
		ps.setString(10, broadId);
		ps.setString(11, literaturePmid);
		ps.setString(12, structurePmid);	
		ps.setString(13, sequencePmid);
		ps.setString(14, pdbId);
		ps.setString(15, structureDeterminationMethod);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId( BASE_NAME, "id");
	}
	
	public static int update(long id, long enzymeEntryId, 
			String genbankGeneId, String otherGenbankGeneId,
			String uniprotId, String otherUniprotId,
			String genbankProteinId, String refseqProteinId,
			String jgiId, String broadId,
			String literaturePmid, String structurePmid,
			String sequencePmid,
			String pdbId, String structureDeterminationMethod) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, genbankGeneId);
		ps.setString(2, otherGenbankGeneId);
		ps.setString(3, uniprotId);
		ps.setString(4, otherUniprotId);
		ps.setString(5, genbankProteinId);
		ps.setString(6, refseqProteinId);
		ps.setString(7, jgiId);
		ps.setString(8, broadId);
		ps.setString(9, literaturePmid);
		ps.setString(10, structurePmid);
		ps.setString(11, sequencePmid);
		ps.setString(12, pdbId);
		ps.setString(13, structureDeterminationMethod);
		ps.setLong(14, id);
		ps.setLong(15, enzymeEntryId);	
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}