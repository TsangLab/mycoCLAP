package clap.dom.model.externalresource.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.externalresource.ExternalResource;
import clap.dom.model.externalresource.tdg.ExternalResourceFinder;

public class ExternalResourceInputMapper {
	public static ExternalResource findEnzymeAnnotationById(Long id) throws SQLException,
		MapperException {		
		ResultSet rs = ExternalResourceFinder.findExternalResourceById(id);
		if (!rs.next())
			return null;		
		
		ExternalResource e = getExternalResource(rs);
		rs.close();
		return e;
	}

	public static ExternalResource findExternalResourceByEnzymeEntryId(Long enzymeEntryId) throws SQLException,
		MapperException {		
		ResultSet rs = ExternalResourceFinder.findExternalResourceByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		ExternalResource e = getExternalResource(rs);
		rs.close();
		return e;
	}

	public static ArrayList<ExternalResource> findAllExternalResource() throws SQLException,
			MapperException {
		ResultSet rs = ExternalResourceFinder.findAllExternalResource();
		ArrayList<ExternalResource> e = new ArrayList<ExternalResource>();
		
		while (rs.next()) {			
			ExternalResource arow = getExternalResource(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static ExternalResource getExternalResource(ResultSet rs) throws SQLException {
		ExternalResource arow = new ExternalResource(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getString("genbank_gene_id"),
				rs.getString("other_genbank_gene_id"),
				rs.getString("uniprot_id"),
				rs.getString("other_uniprot_id"),
				rs.getString("genbank_protein_id"),
				rs.getString("refseq_protein_id"),
				rs.getString("jgi_id"),
				rs.getString("broad_id"),
				rs.getString("literature_pmid"),
				rs.getString("structure_pmid"),
				rs.getString("sequence_pmid"),
				rs.getString("pdb_id"),
				rs.getString("structure_determination_method"));
		return arow;
	}

}
