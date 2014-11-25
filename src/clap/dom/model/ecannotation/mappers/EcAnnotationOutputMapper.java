package clap.dom.model.ecannotation.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.ecannotation.EcAnnotation;
import clap.dom.model.ecannotation.tdg.EcAnnotationTDG;

public class EcAnnotationOutputMapper implements GenericOutputMapper<Long, EcAnnotation> {

	public void delete(EcAnnotation object) throws MapperException {
		try {
			int count = EcAnnotationTDG.delete(object.getEcNumber());
			if(count == 0) throw new LostUpdateException("EcAnnotationTDG: ecNumber " +
					object.getEcNumber());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete EcAnnotation " + object.getEcNumber(), e);
		}		
	}
	
	public void insert(EcAnnotation object) throws MapperException {
		try {
			EcAnnotationTDG.insert(object.getId(), object.getEcNumber(), 
					object.getCommonName(), object.getEcSystematicName(),  
					object.getAlternateName(), object.getDefinition());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEcNumber(), e);
		}
	}
	
	public void update(EcAnnotation object) throws MapperException{
		try {
			if (EcAnnotationTDG.update(object.getId(), object.getEcNumber(), 
					object.getCommonName(), object.getEcSystematicName(),  
					object.getAlternateName(), object.getDefinition()) == 0)
				throw new LostUpdateException("On EC Number: " + object.getEcNumber());
		} catch (SQLException e) {
			throw new MapperException("Could not update EcAnnotation " + object.getEcNumber(), e);
		}
	}
}