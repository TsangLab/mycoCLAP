package clap.dom.model.entrydescription.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryDescriptionFinder {
	
	public static final String FIELDS = "entry_description.id, entry_description.entry_name_id, species, strain, entry_name," +
			"gene_name, gene_alias, enzyme_name, ec_systematic_name, enzyme_alias, family";
	
	public static String SELECT_ENTRYDESCRIPTIONBYENTRYNAMEID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_description WHERE entry_name_id = ?";
	
	public static String SELECT_ENTRYDESCRIPTIONBYENTRYNAME_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_description WHERE entry_name = ?";
	
	public static String SELECT_ALLENTRYDESCRIPTION_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_description";
	
	public static String SELECT_ENTRYDESCRIPTIONMAXID_SQL = 
		"SELECT MAX(id)" + 
		" FROM entry_description";
	
	public static String SELECT_ENTRYNAMELIST_SQL =
			"SELECT " +
			FIELDS +
			" FROM entry_description, entry_list_ref " +
			" WHERE entry_description.entry_name_id = entry_list_ref.entry_name_id" +
			" AND entry_list_ref.status='active'" +
			" GROUP BY entry_name";
			

	public static ResultSet findEntryDescriptionByEntryNameId(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYDESCRIPTIONBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
	
	public static ResultSet findEntryDescriptionByEntryName(String entryName) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYDESCRIPTIONBYENTRYNAME_SQL);
		ps.setString(1, entryName);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllEntryDescription() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLENTRYDESCRIPTION_SQL);
		return ps.executeQuery();
	}

	public static ResultSet findEntryDescriptionMaxId() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYDESCRIPTIONMAXID_SQL);
		return ps.executeQuery();
	}

	public static ResultSet findEntryNameList() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYNAMELIST_SQL);
		return ps.executeQuery();
	}

}