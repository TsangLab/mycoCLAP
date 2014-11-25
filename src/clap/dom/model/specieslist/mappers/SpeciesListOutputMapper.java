package clap.dom.model.specieslist.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.specieslist.SpeciesList;
import clap.dom.model.specieslist.tdg.SpeciesListTDG;

public class SpeciesListOutputMapper implements GenericOutputMapper<Long, SpeciesList> {
	
	public void delete(SpeciesList object) throws MapperException {
		try {
			int count = SpeciesListTDG.delete(object.getSpecies());
			if(count == 0) throw new LostUpdateException("SpeciesListTDG: species " +
					object.getSpecies());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete SpeciesList " + object.getSpecies(), e);
		}		
	}
	
	public void insert(SpeciesList object) throws MapperException {
		try {
			SpeciesListTDG.insert(object.getId(), object.getSpecies(), 
					object.getTaxonomic(), object.getAcronym(),  
					object.getAlternateNames(), object.getCommonName(), 
					object.getPhylogeny());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getSpecies(), e);
		}
	}
	
	public void update(SpeciesList object) throws MapperException{
		try {
			if (SpeciesListTDG.update(object.getId(), object.getSpecies(), 
					object.getTaxonomic(), object.getAcronym(),  
					object.getAlternateNames(), object.getCommonName(), 
					object.getPhylogeny()) == 0)
				throw new LostUpdateException("On Species: " + object.getSpecies());
		} catch (SQLException e) {
			throw new MapperException("Could not update SpeciesList " + object.getSpecies(), e);
		}
	}
}