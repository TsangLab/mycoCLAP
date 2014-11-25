package clap.dom.model.enzymeannotation.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.enzymeannotation.EnzymeAnnotation;
import clap.dom.model.enzymeannotation.tdg.EnzymeAnnotationTDG;

public class EnzymeAnnotationOutputMapper implements GenericOutputMapper<Long, EnzymeAnnotation> {
	public void delete(EnzymeAnnotation object) throws MapperException {
		try {
			int count = EnzymeAnnotationTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("EnzymeAnnotationTDG: enzymeEntryId " +
					object.getEnzymeEntryId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete EnzymeAnnotation " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(EnzymeAnnotation object) throws MapperException {
		try {
			EnzymeAnnotationTDG.insert(object.getId(), object.getEnzymeEntryId(), object.getEcNumber(), 
					object.getGoMolecularId(), object.getGoMolecularEvidence(), object.getGoMolecularRef(),
					object.getGoProcessId(), object.getGoProcessEvidence(), object.getGoProcessRef(),
					object.getGoComponentId(), object.getGoComponentEvidence(), object.getGoComponentRef());		
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEnzymeEntryId(), e);
		}
	}
	
	public void update(EnzymeAnnotation object) throws MapperException {
		try {
			if (EnzymeAnnotationTDG.update(object.getId(), object.getEnzymeEntryId(), object.getEcNumber(), 
					object.getGoMolecularId(), object.getGoMolecularEvidence(), object.getGoMolecularRef(),
					object.getGoProcessId(), object.getGoProcessEvidence(), object.getGoProcessRef(),
					object.getGoComponentId(), object.getGoComponentEvidence(), object.getGoComponentRef()) == 0)
				throw new LostUpdateException("On Enzyme Entry Id: " + object.getEnzymeEntryId());
		} catch (SQLException e) {
			throw new MapperException("Could not update EnzymeAnnotation " + object.getEnzymeEntryId(), e);
		}
	}
}