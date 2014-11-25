package clap.dom.model.biochemicalproperty.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.biochemicalproperty.BiochemicalProperty;
import clap.dom.model.biochemicalproperty.tdg.BiochemicalPropertyFinder;

public class BiochemicalPropertyInputMapper {
	
	public static BiochemicalProperty findBiochemicalPropertyById(Long id) throws SQLException,
		MapperException {		
		ResultSet rs = BiochemicalPropertyFinder.findBiochemicalPropertyById(id);
		if (!rs.next())
			return null;	
		
		BiochemicalProperty e = getBiochemicalProperty(rs);
		rs.close();
		return e;
	}

	public static BiochemicalProperty findBiochemicalPropertyByEnzymeEntryId(Long enzymeEntryId) throws SQLException,
		MapperException {		
		ResultSet rs = BiochemicalPropertyFinder.findBiochemicalPropertyByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		BiochemicalProperty e = getBiochemicalProperty(rs);
		rs.close();
		return e;
	}

	public static ArrayList<BiochemicalProperty> findAllEnzymeAnnotation() throws SQLException,
			MapperException {
		ResultSet rs = BiochemicalPropertyFinder.findAllBiochemicalProperty();
		ArrayList<BiochemicalProperty> e = new ArrayList<BiochemicalProperty>();
		
		while (rs.next()) {			
			BiochemicalProperty arow = getBiochemicalProperty(rs);
			e.add(arow);
		}
		
		rs.close();		
		return e;
	}
	
	public static BiochemicalProperty getBiochemicalProperty(ResultSet rs) throws SQLException {
		BiochemicalProperty arow = new BiochemicalProperty(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getString("substrates"),
				rs.getString("host_for_recombinant_expression"),
				rs.getString("specific_activity"),
				rs.getString("activity_assay_conditions"),
				rs.getString("substrate_specificity"),
				rs.getString("km"),
				rs.getString("kcat"),
				rs.getString("vmax"),
				rs.getString("assay"),
				rs.getString("kinetic_assay_conditions"),
				rs.getString("product_analysis"),
				rs.getString("product_formed"),
				rs.getString("ph_optimum"),
				rs.getString("ph_stability"),
				rs.getString("temperature_optimum"),
				rs.getString("temperature_stability"),
				rs.getString("isoelectric_point_experimental"),
				rs.getString("isoelectric_point_predicted"),
				rs.getString("other_features"));
		return arow;
	}

}
