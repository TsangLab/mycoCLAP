package clap.dom.model.mycoclapuser.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;

public class MycoclapuserFinder {
	public static final String FIELDS = "id, version,username, password, firstname, lastname, email, createdate";
	
    public static String FIND_BY_ID = 
        "SELECT " + FIELDS + " FROM "+MycoclapuserTDG.TABLE+" WHERE id=?";
    
	public static String FIND_MYCOCLAPUSER_BYUSERNAMEANDPASSWORD = 
		"SELECT " + FIELDS + " FROM "+MycoclapuserTDG.TABLE+" WHERE username = ? AND password = ?";
	
	public static String FIND_MYCOCLAPUSER_BYUSERNAME = 
		"SELECT " + FIELDS + " FROM "+MycoclapuserTDG.TABLE+" WHERE username = ?";

	public static ResultSet findUserByUsernamePassword(String username, String password) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(FIND_MYCOCLAPUSER_BYUSERNAMEANDPASSWORD);
		ps.setString(1, username);
		ps.setString(2, password);
		return ps.executeQuery();
	}
	
    public static ResultSet findUserByUsername(String username) throws SQLException {
        Connection con = DbRegistry.getDbConnection();
        PreparedStatement ps = con.prepareStatement(FIND_MYCOCLAPUSER_BYUSERNAME);
        ps.setString(1, username);
        return ps.executeQuery();
    }
    
    public static ResultSet find(long id) throws SQLException {
        Connection con = DbRegistry.getDbConnection();
        PreparedStatement ps = con.prepareStatement(FIND_BY_ID);
        ps.setLong(1, id);
        return ps.executeQuery();
    }
    
}

