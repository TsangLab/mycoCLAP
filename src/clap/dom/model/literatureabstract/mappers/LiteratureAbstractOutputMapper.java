package clap.dom.model.literatureabstract.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.literatureabstract.LiteratureAbstract;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractTDG;

public class LiteratureAbstractOutputMapper implements GenericOutputMapper<Long, LiteratureAbstract>{
	public void delete(LiteratureAbstract object) throws MapperException {
		try {
			int count = LiteratureAbstractTDG.delete(object.getPubmedId());
			if(count == 0) throw new LostUpdateException("LiteratureAbstractTDG: pubmedId " +
					object.getPubmedId());			
		} catch (SQLException e) {
			throw new MapperException("Could not delete LiteratureAbstract " + object.getPubmedId(), e);
		}		
	}
	
	public void insert(LiteratureAbstract object) throws MapperException {
		try {
			LiteratureAbstractTDG.insert(object.getId(), object.getPubmedId(), 
					object.getSource(), object.getTitle(), object.getAuthor(), 
					object.getAddress(), object.getLitAbstract());
		} catch (SQLException e) {
			throw new MapperException("Could not insert " + object.getPubmedId(), e);
		}
	}
	
	public void update(LiteratureAbstract object) throws MapperException{
		try {
			if (LiteratureAbstractTDG.update(object.getId(), object.getPubmedId(), 
					object.getSource(), object.getTitle(), object.getAuthor(), 
					object.getAddress(), object.getLitAbstract()) == 0)
				throw new LostUpdateException("On Pubmed Id: " + object.getPubmedId());
		} catch (SQLException e) {
			throw new MapperException("Could not update LiteratureAbstract " + object.getPubmedId(), e);
		}
	}
	
}