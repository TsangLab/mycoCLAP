package clap.dom.model.entrylistref.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.entrylistref.EntryListRef;
import clap.dom.model.entrylistref.tdg.EntryListRefTDG;

public class EntryListRefOutputMapper implements GenericOutputMapper<Long, EntryListRef> {
	public void delete(EntryListRef object) throws MapperException {
		try {
			int count = EntryListRefTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("EntryDescriptionTDG: enzymeEntryId " +
					object.getEntryNameId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete EntryListRef " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(EntryListRef object) throws MapperException {
		try {
			EntryListRefTDG.insert(object.getId(), object.getEnzymeEntryId(), 
					object.getEntryNameId(), object.getVersion(), object.getStatus());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getEnzymeEntryId(), e);
		}
	}
	
	public void update(EntryListRef object) throws MapperException{
		try {
			if (EntryListRefTDG.update(object.getId(), object.getEnzymeEntryId(), 
					object.getEntryNameId(), object.getVersion(), object.getStatus()) == 0)
				throw new LostUpdateException("On Enzyme Entry Id: " + object.getEnzymeEntryId());
		} catch (SQLException e) {
			throw new MapperException("Could not update EntryDescription " + object.getEnzymeEntryId(), e);
		}
	}
}