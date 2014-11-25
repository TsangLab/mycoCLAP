package clap.service.applicationlog.session;

import java.sql.SQLException;
import java.util.Calendar;

import org.dsrg.soenea.domain.user.IUser;
import org.dsrg.soenea.uow.UoW;

import clap.service.util.ip.IpAddress;

public class SessionFactory {
	
    public static Session createNew(IUser user, IpAddress ipAddress, String sessionString) throws SQLException {
        return null;
    }
	public static Session createNew(Long id, IUser user, IpAddress ipAddress, String sessionString) {
		Session session = new Session(id, 0l, user, ipAddress, Calendar.getInstance(), sessionString);
		UoW.getCurrent().registerNew(session);
		return session;
	}

    public static Session createClean(Long id, IUser user, IpAddress ipAddress, String sessionString) {
        Session session = new Session(id, 0l, user, ipAddress, Calendar.getInstance(), sessionString);
        UoW.getCurrent().registerClean(session);
        return session;
    }
}
