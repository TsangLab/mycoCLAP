package clap.dom.model.goannotation.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.goannotation.GoAnnotation;
import clap.dom.model.goannotation.tdg.GoAnnotationFinder;

public class GoAnnotationInputMapper {
	public static GoAnnotation findGoAnnotationByGoId(String goId) throws SQLException,
			MapperException {		
		ResultSet rs = GoAnnotationFinder.findGoAnnotationByGoId(goId);
		if (!rs.next())
			return null;		
		
		GoAnnotation e = getGoAnnotation(rs);
		rs.close();
		return e;
	}

	public static ArrayList<GoAnnotation> findAllGoAnnotation() throws SQLException,
			MapperException {
		ResultSet rs = GoAnnotationFinder.findAllGoAnnotation();
		ArrayList<GoAnnotation> e = new ArrayList<GoAnnotation>();
		
		while (rs.next()) {			
			GoAnnotation arow = getGoAnnotation(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static GoAnnotation getGoAnnotation(ResultSet rs) throws SQLException {
		GoAnnotation arow = new GoAnnotation(
				rs.getLong("id"),
				rs.getString("go_id"),
				rs.getString("name"),
				rs.getString("term_type"));
		return arow;
	}

}
