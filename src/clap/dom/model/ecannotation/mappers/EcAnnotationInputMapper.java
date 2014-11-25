package clap.dom.model.ecannotation.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.ecannotation.EcAnnotation;
import clap.dom.model.ecannotation.tdg.EcAnnotationFinder;

public class EcAnnotationInputMapper {
	
	public static EcAnnotation findEcAnnotationByEcNumber(String ecNumber) throws SQLException,
			MapperException {		
		ResultSet rs = EcAnnotationFinder.findEcAnnotationByEcNumber(ecNumber);
		if (!rs.next())
			return null;	
		
		EcAnnotation e = getEcAnnotation(rs);
		rs.close();
		return e;
	}

	public static ArrayList<EcAnnotation> findAllEcAnnotation() throws SQLException,
			MapperException {
		ResultSet rs = EcAnnotationFinder.findAllEcAnnotation();
		ArrayList<EcAnnotation> e = new ArrayList<EcAnnotation>();
		
		while (rs.next()) {			
			EcAnnotation arow = getEcAnnotation(rs);
			e.add(arow);
		}
		
		rs.close();
		return e;
	}
	
	public static EcAnnotation getEcAnnotation(ResultSet rs) throws SQLException {
		EcAnnotation arow = new EcAnnotation(
				rs.getLong("id"),
				rs.getString("ec_number"),
				rs.getString("common_name"),
				rs.getString("ec_systematic_name"),
				rs.getString("alternate_names"),
				rs.getString("definition"));
		return arow;
	}

}
