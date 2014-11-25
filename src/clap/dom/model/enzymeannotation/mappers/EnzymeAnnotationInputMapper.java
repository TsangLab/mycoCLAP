package clap.dom.model.enzymeannotation.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.enzymeannotation.EnzymeAnnotation;
import clap.dom.model.enzymeannotation.tdg.EnzymeAnnotationFinder;

public class EnzymeAnnotationInputMapper {
	public static EnzymeAnnotation findEnzymeAnnotationById(Long id) throws SQLException,
		MapperException {		
		ResultSet rs = EnzymeAnnotationFinder.findEnzymeAnnotationById(id);
		if (!rs.next())
			return null;		
		
		EnzymeAnnotation e = getEnzymeAnnotation(rs);
		rs.close();
		return e;
	}

	public static EnzymeAnnotation findEnzymeAnnotationByEnzymeEntryId(Long enzymeEntryId) throws SQLException,
		MapperException {		
		ResultSet rs = EnzymeAnnotationFinder.findEnzymeAnnotationByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		EnzymeAnnotation e = getEnzymeAnnotation(rs);
		rs.close();
		return e;
	}

	public static EnzymeAnnotation findEnzymeAnnotationByEcNumber(String ecNumber) throws SQLException,
			MapperException {		
		ResultSet rs = EnzymeAnnotationFinder.findEnzymeAnnotationByEcNumber(ecNumber);
		if (!rs.next())
			return null;
		
		EnzymeAnnotation e = getEnzymeAnnotation(rs);
		rs.close();
		return e;
	}

	public static ArrayList<EnzymeAnnotation> findAllEnzymeAnnotation() throws SQLException,
			MapperException {
		ResultSet rs = EnzymeAnnotationFinder.findAllEnzymeAnnotation();
		ArrayList<EnzymeAnnotation> e = new ArrayList<EnzymeAnnotation>();
		
		while (rs.next()) {			
			EnzymeAnnotation arow = getEnzymeAnnotation(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static EnzymeAnnotation getEnzymeAnnotation(ResultSet rs) throws SQLException {
		EnzymeAnnotation arow = new EnzymeAnnotation(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getString("ec_number"),
				rs.getString("go_molecular_function_id"),
				rs.getString("go_molecular_function_evidence"),
				rs.getString("go_molecular_function_ref"),
				rs.getString("go_biological_process_id"),
				rs.getString("go_biological_process_evidence"),
				rs.getString("go_biological_process_ref"),
				rs.getString("go_cellular_component_id"),
				rs.getString("go_cellular_component_evidence"),
				rs.getString("go_cellular_component_ref"));
		return arow;
	}

}
