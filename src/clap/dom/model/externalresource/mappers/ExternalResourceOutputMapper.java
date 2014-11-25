package clap.dom.model.externalresource.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.externalresource.ExternalResource;
import clap.dom.model.externalresource.tdg.ExternalResourceTDG;

public class ExternalResourceOutputMapper implements GenericOutputMapper<Long, ExternalResource>{
	public void delete(ExternalResource object) throws MapperException {
		try {
			int count = ExternalResourceTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("ExternalResourceTDG: entryNameId " +
					object.getEnzymeEntryId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete ExternalResource " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(ExternalResource object) throws MapperException {
		try {
			ExternalResourceTDG.insert(object.getId(), object.getEnzymeEntryId(), 
					object.getGenbankGeneId(), object.getOtherGeneId(), 
					object.getUniprotId(), object.getOtherUniprotId(), 
					object.getGenbankProteinId(), object.getRefseqProteinId(),
					object.getJgiId(), object.getBroadId(), 
					object.getLiteraturePmid(), object.getStructurePmid(),
					object.getSequencePmid(),
					object.getPdbId(), object.getStructureDeterminationMethod());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEnzymeEntryId(), e);
		}
	}
	
	public void update(ExternalResource object) throws MapperException{
		try {
			if (ExternalResourceTDG.update(object.getId(), object.getEnzymeEntryId(), 
					object.getGenbankGeneId(), object.getOtherGeneId(), 
					object.getUniprotId(), object.getOtherUniprotId(), 
					object.getGenbankProteinId(), object.getRefseqProteinId(),
					object.getJgiId(), object.getBroadId(), 
					object.getLiteraturePmid(), object.getStructurePmid(),
					object.getSequencePmid(),
					object.getPdbId(), object.getStructureDeterminationMethod()) == 0)
				throw new LostUpdateException("On Enzyme Entry Id: " + object.getEnzymeEntryId());
		} catch (SQLException e) {
			throw new MapperException("Could not update ExternalResource " + object.getEnzymeEntryId(), e);
		}
	}
	
}