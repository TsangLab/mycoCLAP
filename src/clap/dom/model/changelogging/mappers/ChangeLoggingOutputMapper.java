package clap.dom.model.changelogging.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;

import clap.dom.model.changelogging.tdg.ChangeLoggingTDG;
import clap.dom.model.changelogging.ChangeLogging;

public class ChangeLoggingOutputMapper implements GenericOutputMapper<Long, ChangeLogging> {	
	public void insert(ChangeLogging p) throws MapperException {
		try {
			ChangeLoggingTDG.insert(p.getId(), p.getUser(), p.getDatetime(), 
					p.getEnzymeEntryId(), p.getEntryNameId(), p.getEntryName(),
					p.getOperation(), p.getComments());          
		} catch (SQLException e) {
			throw new MapperException(e.getMessage(),e);
		}
	}

	@Override
	public void delete(ChangeLogging d) throws MapperException {
		// TODO Auto-generated method stub		
	}

	@Override
	public void update(ChangeLogging d) throws MapperException {
		// TODO Auto-generated method stub		
	}
	
}

