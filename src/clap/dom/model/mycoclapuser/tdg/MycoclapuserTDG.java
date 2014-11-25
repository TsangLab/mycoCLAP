package clap.dom.model.mycoclapuser.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.Registry;
import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.Logging;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.tdg.UserTDG;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class MycoclapuserTDG {
	public static final String DATABASE_NAME;
    static {
        try {
            DATABASE_NAME = Registry.getProperty("UserDatabase");
        } catch (Exception e) {
        	e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    public static void addDatabasePrefixToUserTables()
    {
        UserTDG.USER_TABLE = DATABASE_NAME + "." + "user";
        UserTDG.USER_ROLE_TABLE = DATABASE_NAME + "." + "user_role";
    }
    
	public static final String BASE_NAME = "user";
	public static String BASE_ROLE = "user_role";

	public static String TABLE = DATABASE_NAME + "." + DbRegistry.getTablePrefix()+BASE_NAME;
	public static String ROLE_TABLE = DATABASE_NAME + "." + DbRegistry.getTablePrefix()+BASE_ROLE;
		
	public static String INSERT_SQL = 
		"INSERT INTO " + TABLE + " " +
		"(id, version, username, password, firstname, lastname, email, createdate) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
	
	public static String UPDATE_SQL = 
		"UPDATE " + TABLE + " " +
		"SET version=version+1, username=?, password = ?, firstname = ?, lastname = ?, email = ?, createdate = ? " +
		"WHERE id=? AND version=?;";
	
	public static String DELETE_SQL = 
		"DELETE FROM " + TABLE + " " +
		"WHERE id=? AND version=?;";
	
    public static String CREATE_TABLE = ""
        + "CREATE TABLE IF NOT EXISTS " + TABLE + " ("
        + "    id BIGINT,"
        + "    version BIGINT,"
        + "    username VARCHAR(64) UNIQUE,"
        + "    password TEXT,"
        + "    createdate BIGINT,"
        + "    firstname TEXT,"
        + "    lastname TEXT,"
        + "    email TEXT,"
        + "    PRIMARY KEY(id)"
        + ") Engine=InnoDB "
        ;
    public static String DROP_TABLE = ""
        + "DROP TABLE IF EXISTS " + TABLE + " "
        ;

	public static String CREATE_USER_ROLE_SQL = 
		 "CREATE TABLE IF NOT EXISTS " + ROLE_TABLE + " ( " +
		 "user_id INTEGER, " +
		 "role_id INTEGER, " +
		 "PRIMARY KEY (user_id, role_id) " +
		 ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";

	public static String DROP_USER_ROLE_SQL = 
		"DROP TABLE " + ROLE_TABLE + ";";

	public static String INSERT_USER_ROLE_SQL = 
		"INSERT INTO " + ROLE_TABLE + " " +
		"(user_id, role_id) VALUES(?, ?);";
		
	public static String DELETE_USER_ROLE_SQL = 
		"DELETE FROM " + ROLE_TABLE + " " +
		"WHERE user_id=?;";
	
    public static void createTable() throws SQLException {
        Connection con = DbRegistry.getDbConnection();
        PreparedStatement ps = con.prepareStatement(CREATE_TABLE);
        try {
            SQLLogger.processUpdate(ps);
        } finally {
            try { ps.close(); } catch (SQLException ignored) {}
        }
    }
    public static void dropTable() throws SQLException {
        Connection con = DbRegistry.getDbConnection();
        PreparedStatement ps = con.prepareStatement(DROP_TABLE);
        try {
            SQLLogger.processUpdate(ps);
        } finally {
            try { ps.close(); } catch (SQLException ignored) {}
        }
    }
    
	public static int insert(long id, long version, String username, String password, String firstname, String lastname, String email, long createdate) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT_SQL);
		
		try {
            ps.setLong(1, id);
            ps.setLong(2, version);
            ps.setString(3, username);
    		ps.setString(4, password);
    		ps.setString(5, firstname);
    		ps.setString(6, lastname);
            ps.setString(7, email);
            ps.setLong(8, createdate);
    	
    		Logging.logSQL( ps.toString());
    		return SQLLogger.processUpdate(ps);
		} finally {
            try { ps.close(); } catch (SQLException ignored) {}
		}
	}
	
	public static int update(long id, long version, String username, String password, String firstname, String lastname, String email, long createdate) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE_SQL);
		try {
            ps.setString(1, username);
            ps.setString(2, password);
    		ps.setString(3, firstname);
    		ps.setString(4, lastname);
            ps.setString(5, email);
            ps.setLong(6, createdate);
    		ps.setLong(7, id);
    		ps.setLong(8, version);
    
            return SQLLogger.processUpdate(ps);
		} finally {
            try { ps.close(); } catch (SQLException ignored) {}
		}
	}
	
	public static int delete(long id, long version) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE_SQL);
		
		try {
    		ps.setLong(1, id);
    		ps.setLong(2, version);
    		
            return SQLLogger.processUpdate(ps);
		} finally {
            try { ps.close(); } catch (SQLException ignored) {}
		}
	}
	
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(TABLE, "id");
	}

	public static void createUserRoleTable() throws SQLException {
		SQLLogger.processUpdate(DbRegistry.getDbConnection().createStatement(), CREATE_USER_ROLE_SQL);
	}
	
	public static void dropUserRoleTable() throws SQLException {
		SQLLogger.processUpdate(DbRegistry.getDbConnection().createStatement(), DROP_USER_ROLE_SQL);
	}

	public static int insertUserRole(long user_id, long role_id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT_USER_ROLE_SQL);
		ps.setLong(1, user_id);
		ps.setLong(2, role_id);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	public static int deleteUserRole(long user_id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE_USER_ROLE_SQL);
		ps.setLong(1, user_id);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}
