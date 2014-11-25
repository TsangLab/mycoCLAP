package clap.dom.model.mycoclapuser;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.uow.UoW;

import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;

public class MycoclapuserFactory {
	public static IMycoclapuser createNew(String username, String password, List<IRole> roles, 
                    String firstname, String lastname, String email, Calendar whenCreated) throws SQLException {
        Mycoclapuser user = new Mycoclapuser(MycoclapuserTDG.getMaxId(), 1, username, password, roles, firstname, lastname, email, whenCreated);
        UoW.getCurrent().registerNew(user);
        return user;
    }
    public static Mycoclapuser createClean(long id, long version, String username, String password, List<IRole> roles, 
                    String firstname, String lastname, String email, Calendar whenCreated) {
        Mycoclapuser user = new Mycoclapuser(id, version, username, password, roles, firstname, lastname, email, whenCreated);
        UoW.getCurrent().registerClean(user);
        return user;
    }
}
