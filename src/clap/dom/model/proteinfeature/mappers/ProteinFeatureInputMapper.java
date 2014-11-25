package clap.dom.model.proteinfeature.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.proteinfeature.ProteinFeature;
import clap.dom.model.proteinfeature.tdg.ProteinFeatureFinder;

public class ProteinFeatureInputMapper {
	
	public static ProteinFeature findProteinFeatureById(Long id) throws SQLException,
		MapperException {		
		ResultSet rs = ProteinFeatureFinder.findProteinFeatureById(id);
		if (!rs.next())
			return null;	
		
		ProteinFeature e = getProteinFeature(rs);
		rs.close();
		return e;
	}

	public static ProteinFeature findProteinFeatureByEnzymeEntryId(Long enzymeEntryId) throws SQLException,
		MapperException {		
		ResultSet rs = ProteinFeatureFinder.findProteinFeatureByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		ProteinFeature e = getProteinFeature(rs);
		rs.close();
		return e;
	}

	public static ArrayList<ProteinFeature> findAllProteinFeature() throws SQLException,
			MapperException {
		ResultSet rs = ProteinFeatureFinder.findAllProteinFeature();
		ArrayList<ProteinFeature> e = new ArrayList<ProteinFeature>();
		
		while (rs.next()) {			
			ProteinFeature arow = getProteinFeature(rs);
			e.add(arow);
		}

		rs.close();
		return e;
	}
	
	public static ProteinFeature getProteinFeature(ResultSet rs) throws SQLException {			
		ProteinFeature arow = new ProteinFeature(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getString("signal_peptide_predicted"),
				rs.getString("n_terminal_experimental"),
				rs.getString("molecular_weight_experimental"),
				rs.getString("molecular_weight_predicted"),
				rs.getString("protein_length"),
				rs.getString("cbd"),
				rs.getString("glycosylation"));
			
		return arow;
	}

}
