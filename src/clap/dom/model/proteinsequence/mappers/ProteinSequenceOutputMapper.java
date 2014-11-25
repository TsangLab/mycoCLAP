package clap.dom.model.proteinsequence.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.proteinsequence.ProteinSequence;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceTDG;

public class ProteinSequenceOutputMapper implements GenericOutputMapper<Long, ProteinSequence> {
	
	public void delete(ProteinSequence object) throws MapperException {
		try {
			int count = ProteinSequenceTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("ProteinSequenceTDG: enzyme_entry_id " +
					object.getEnzymeEntryId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete Protein sequence " + object.getEnzymeEntryId(), e);
		}		
	}
	
	public void insert(ProteinSequence object) throws MapperException {
		try {
			ProteinSequenceTDG.insert(object.getId(), object.getEnzymeEntryId(),
					object.getEntryNameId(), object.getProteinId(), 
					object.getProteinSequence());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getProteinId(), e);
		}
	}
	
	public void update(ProteinSequence object) throws MapperException{
		try {
			if (ProteinSequenceTDG.update(object.getId(), object.getEnzymeEntryId(),
					object.getEntryNameId(), object.getProteinId(), 
					object.getProteinSequence()) == 0)
				throw new LostUpdateException("On Protein ID: " + object.getProteinId());
		} catch (SQLException e) {
			throw new MapperException("Could not update ProteinSequence " + object.getProteinId(), e);
		}
	}
}