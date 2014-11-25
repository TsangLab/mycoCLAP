package clap.dom.model.entrylistref.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryListRefFinder {	
	public static final String FIELDS = "id, enzyme_entry_id, entry_name_id, version, status";
	
	public static String SELECT_ENTRYLISTREFBYENZYMEENTRYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_list_ref WHERE enzyme_entry_id = ?";
	
	public static String SELECT_ENTRYLISTREFBYENTRYNAMEID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_list_ref WHERE entry_name_id = ?";
	
	public static String SELECT_ALLENTRYLISTREF_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_list_ref";
	
	public static String SELECT_ENTRYLISTREFMAXID_SQL = 
		"SELECT MAX(id) " + 
		" FROM entry_list_ref";
	
	public static ResultSet findEntryListRefByEnzymeEntryId(long enzyme_entry_id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYLISTREFBYENZYMEENTRYID_SQL);
		ps.setLong(1, enzyme_entry_id);
		return ps.executeQuery();
	}
	
	public static ResultSet findEntryListRefByEntryNameId(Long entry_name_id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYLISTREFBYENTRYNAMEID_SQL);
		ps.setLong(1, entry_name_id);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllEntryListRef() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLENTRYLISTREF_SQL);
		return ps.executeQuery();
	}

	public static ResultSet findEntryListRefMaxId() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYLISTREFMAXID_SQL);
		return ps.executeQuery();
	}

}