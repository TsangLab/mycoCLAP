package clap.dom.model.proteinfeature.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.proteinfeature.ProteinFeature;
import clap.dom.model.proteinfeature.tdg.ProteinFeatureTDG;

public class ProteinFeatureOutputMapper implements GenericOutputMapper<Long, ProteinFeature>{
	
	public void delete(ProteinFeature object) throws MapperException {
		try {
			int count = ProteinFeatureTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("EntryDescriptionTDG: enzymeEntryId " +
					object.getEnzymeEntryId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete EntryDescription " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(ProteinFeature object) throws MapperException {
		try {
			ProteinFeatureTDG.insert(object.getId(), object.getEnzymeEntryId(), 
					object.getSignalPeptidePredicted(), object.getNTerminalExperimental(),
					object.getMolecularWtExperimental(), 
					object.getMolecularWtPredicted(), object.getProteinLength(), 
					object.getCbd(), object.getGlycosylation());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEnzymeEntryId(), e);
		}
	}
	
	public void update(ProteinFeature object) throws MapperException{
		try {
			if (ProteinFeatureTDG.update(object.getId(), object.getEnzymeEntryId(), 
					object.getSignalPeptidePredicted(), object.getNTerminalExperimental(), 
					object.getMolecularWtExperimental(), 
					object.getMolecularWtPredicted(), object.getProteinLength(), 
					object.getCbd(), object.getGlycosylation()) == 0)
				throw new LostUpdateException("On Entry Name: " + object.getEnzymeEntryId());
		} catch (SQLException e) {
			throw new MapperException("Could not update EntryDescription " + object.getEnzymeEntryId(), e);
		}
	}
	
}