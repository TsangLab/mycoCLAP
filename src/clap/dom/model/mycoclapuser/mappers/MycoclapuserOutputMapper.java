package clap.dom.model.mycoclapuser.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;
import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.user.User;

import clap.dom.model.mycoclapuser.Mycoclapuser;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;

public class MycoclapuserOutputMapper implements GenericOutputMapper<Long, Mycoclapuser> {
	
	@Override
	public void delete(Mycoclapuser p) throws MapperException {
		try {
			int count = MycoclapuserTDG.delete(p.getId(), p.getVersion());
			if(count == 0) throw new LostUpdateException("Registration: username " + p.getUsername());
			p.setVersion(p.getVersion()+1);
            deleteRoles(p);
		} catch (SQLException e) {
			throw new MapperException(e.getMessage(),e);
		}
	}
	
	@Override
	public void insert(Mycoclapuser p) throws MapperException {
		try {
			MycoclapuserTDG.insert(p.getId(), p.getVersion(), p.getUsername(), p.getPassword(),p.getFirstname(), p.getLastname(), p.getEmail(), p.getCreatedate().getTimeInMillis());
            insertRoles(p);
		} catch (SQLException e) {
			throw new MapperException(e.getMessage(),e);
		}
	}

	@Override
	public void update(Mycoclapuser p) throws MapperException {
		try {
			int count = MycoclapuserTDG.update(p.getId(), p.getVersion(), p.getUsername(), p.getPassword(), p.getFirstname(), p.getLastname(), p.getEmail(), p.getCreatedate().getTimeInMillis());
			if(count == 0) throw new LostUpdateException("RegistrationTDG: username " + p.getUsername());
			p.setVersion(p.getVersion()+1);
            deleteRoles(p);
            insertRoles(p);
		} catch (SQLException e) {
			throw new MapperException(e.getMessage(),e);
		}
	}


    private void deleteRoles(User d) throws SQLException {
    	MycoclapuserTDG.deleteUserRole(d.getId());
    }
    private void insertRoles(User d) throws SQLException, MapperException {
        for(IRole r: d.getRoles()) {
            int result = MycoclapuserTDG.insertUserRole(d.getId(), r.getId());
            if(result == 0) throw new MapperException("Unable to insert User Role: " + d.getUsername() + 
                    "("+d.getId()+") " + r.getName() + "(" + r.getId() + ")");
        }
    }
	
}

