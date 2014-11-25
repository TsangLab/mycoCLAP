package clap.dom.model.accesslogging.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;

import clap.dom.model.accesslogging.tdg.AccessLoggingTDG;
import clap.dom.model.accesslogging.AccessLogging;

public class AccessLoggingOutputMapper implements GenericOutputMapper<Long, AccessLogging> {
	
	public void insert(AccessLogging p) throws MapperException {
		try {
			AccessLoggingTDG.insert(p.getId(), p.getIp(), p.getAddress(), 
					p.getUser(), p.getDatetime(), 
					p.getCommand(), p.getParamters());          
		} catch (SQLException e) {
			throw new MapperException(e.getMessage(),e);
		}
	}

	@Override
	public void delete(AccessLogging d) throws MapperException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(AccessLogging d) throws MapperException {
		// TODO Auto-generated method stub
		
	}
	
}

