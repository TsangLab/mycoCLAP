package clap.dom.model.entrydescription.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.entrydescription.EntryDescription;
import clap.dom.model.entrydescription.tdg.EntryDescriptionTDG;

public class EntryDescriptionOutputMapper implements GenericOutputMapper<Long, EntryDescription> {
	public void delete(EntryDescription object) throws MapperException {
		try {
			int count = EntryDescriptionTDG.delete(object.getEntryNameId());
			if(count == 0) throw new LostUpdateException("EntryDescriptionTDG: entryNameId " +
					object.getEntryNameId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete EntryDescription " + object.getEntryNameId(), e);
		}		
	}
	
	public void insert(EntryDescription object) throws MapperException {
		try {
			EntryDescriptionTDG.insert(object.getId(), object.getEntryNameId(), 
					object.getSpecies(), object.getStrain(), object.getEntryName(), 
					object.getGeneName(), object.getGeneAlias(), 
					object.getEnzymeName(), object.getEcSystematicName(), 
					object.getEnzymeAlias(), object.getFamily());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEntryName(), e);
		}
	}
	
	public void update(EntryDescription object) throws MapperException{
		try {
			if (EntryDescriptionTDG.update(object.getId(), object.getEntryNameId(), 
					object.getSpecies(), object.getStrain(), object.getEntryName(), 
					object.getGeneName(), object.getGeneAlias(), 
					object.getEnzymeName(), object.getEcSystematicName(), 
					object.getEnzymeAlias(), object.getFamily()) == 0)
				throw new LostUpdateException("On Entry Name: " + object.getEntryName());
		} catch (SQLException e) {
			throw new MapperException("Could not update EntryDescription " + object.getEntryName(), e);
		}
	}
	
}