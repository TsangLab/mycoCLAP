package clap.dom.model.goannotation.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.goannotation.GoAnnotation;
import clap.dom.model.goannotation.tdg.GoAnnotationTDG;

public class GoAnnotationOutputMapper implements GenericOutputMapper<Long, GoAnnotation> {
	public void delete(GoAnnotation object) throws MapperException {
		try {
			int count = GoAnnotationTDG.delete(object.getGoId());
			if(count == 0) throw new LostUpdateException("GoAnnotationTDG: goId " +
					object.getGoId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete GoAnnotation " + object.getGoId(), e);
		}		
	}
	
	public void insert(GoAnnotation object) throws MapperException {
		try {
			GoAnnotationTDG.insert(object.getId(), object.getGoId(), 
					object.getName(), object.getTermType());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getGoId(), e);
		}
	}
	
	public void update(GoAnnotation object) throws MapperException{
		try {
			if (GoAnnotationTDG.update(object.getId(), object.getGoId(), 
					object.getName(), object.getTermType()) == 0)
				throw new LostUpdateException("On GO Id: " + object.getGoId());
		} catch (SQLException e) {
			throw new MapperException("Could not update GoAnnotation " + object.getGoId(), e);
		}
	}
}