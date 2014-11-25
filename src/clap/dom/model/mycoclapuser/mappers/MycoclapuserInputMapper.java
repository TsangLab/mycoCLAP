package clap.dom.model.mycoclapuser.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.DomainObjectNotFoundException;
import org.dsrg.soenea.domain.mapper.IdentityMap;
import org.dsrg.soenea.domain.role.RoleListProxy;
import org.dsrg.soenea.service.util.CalendarFactory;
import org.dsrg.soenea.uow.ObjectRemovedException;

import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.Mycoclapuser;
import clap.dom.model.mycoclapuser.MycoclapuserFactory;
import clap.dom.model.mycoclapuser.MycoclapuserProxy;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserFinder;

public class MycoclapuserInputMapper {
	
    public static Mycoclapuser find(long id) throws MapperException {
        try {
            ResultSet rs = MycoclapuserFinder.find(id);
            if (!rs.next())
                return null;
            Mycoclapuser user = getUser(rs);
            rs.close();
            return user;
        } catch (SQLException e) {
            throw new MapperException(e);
        }
    }
    
	public static IMycoclapuser findUserByUsernamePassword(String username, String password) throws MapperException {
		try {
			ResultSet rs = MycoclapuserFinder.findUserByUsernamePassword(username, password);
			if (!rs.next())
				return null;
			IMycoclapuser user = getUser(rs);
			rs.close();
			return user;
		} catch (SQLException e) {
			throw new MapperException(e);
		}
	}
	
	public static IMycoclapuser findUserByUsername(String username) throws MapperException {
		try {
			ResultSet rs = MycoclapuserFinder.findUserByUsername(username);
			IMycoclapuser user;
			if (!rs.next())
				return null;
			
			user = getUser(rs);
			rs.close();
			return user;
		} catch (SQLException e) {
			throw new MapperException(e);
		}
	}

	private static Mycoclapuser getUser(ResultSet rs) throws SQLException, MapperException {
		final long id = rs.getLong("id");
        try {
			return IdentityMap.get(id, Mycoclapuser.class);
		} catch (DomainObjectNotFoundException e) {
			// This is ok, we will just create a new object
		} catch (ObjectRemovedException e) {
			throw new MapperException(e);
		}
		java.util.Calendar createdate;
		try {
			createdate = CalendarFactory.create(rs.getLong("createdate"));
		} catch (Exception e) {
			createdate = Calendar.getInstance();
		}
		Mycoclapuser user = MycoclapuserFactory.createClean(
		                id, rs.getLong("version"),
		                rs.getString("username"), rs.getString("password"),
		                new RoleListProxy(new MycoclapuserProxy(id)),
		                rs.getString("firstname"), rs.getString("lastname"),
		                rs.getString("email"),
		                createdate
        );
		return user;
	}
	
}
