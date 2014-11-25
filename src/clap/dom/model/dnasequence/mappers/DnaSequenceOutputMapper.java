package clap.dom.model.dnasequence.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.dnasequence.DnaSequence;
import clap.dom.model.dnasequence.tdg.DnaSequenceTDG;

public class DnaSequenceOutputMapper implements GenericOutputMapper<Long, DnaSequence> {

	public void delete(DnaSequence object) throws MapperException {
		try {
			int count = DnaSequenceTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("DnaSequenceTDG: enzyme_entry_id " +
					object.getEnzymeEntryId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete DNA sequence " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(DnaSequence object) throws MapperException {
		try {
			DnaSequenceTDG.insert(object.getId(), object.getEnzymeEntryId(),
					object.getEntryNameId(), object.getGenbankGeneId(), 
					object.getDnaSequence());
		} catch (SQLException ee) {
			throw new MapperException("Could not insert " + object.getGenbankGeneId(), ee);
		}
	}
	
	public void update(DnaSequence object) throws MapperException{
		try {
			if (DnaSequenceTDG.update(object.getId(), object.getEnzymeEntryId(),
					object.getEntryNameId(), object.getGenbankGeneId(), 
					object.getDnaSequence()) == 0)
				throw new LostUpdateException("On Genbank Gene ID: " + object.getGenbankGeneId());
		} catch (SQLException e) {
			throw new MapperException("Could not update DnaSequence " + object.getGenbankGeneId(), e);
		}
	}
}