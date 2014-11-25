package clap.dom.model.changelogging.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class ChangeLoggingFinder {
	
	public static final String FIELDS = "change_logging.id, user,  DATE(date_time) AS date_time," +
								" change_logging.enzyme_entry_id, change_logging.entry_name_id," +
								" change_logging.entry_name, operation, comments";
	
	public static final String DATEFIELDS = "DISTINCT(DATE(date_time)) AS date_time, " +
								"change_logging.entry_name_id, change_logging.entry_name";
	
	public static final String MAXDATEFIELDS = "DISTINCT(MAX(DATE(date_time))) AS date_time, " +
			"change_logging.entry_name_id, change_logging.entry_name";

	public static String SELECT_CHANGELOGGINGBYENTRYNAMEID_SQL = 
		"SELECT " +
		FIELDS +
		" FROM change_logging, entry_list_ref " +
		" WHERE change_logging.enzyme_entry_id = entry_list_ref.enzyme_entry_id" +
		" AND change_logging.operation LIKE '%modification%'" +
		" AND change_logging.entry_name_id=?" +
		" AND entry_list_ref.status='active'" +
		"";
	
	public static String SELECT_CHANGELOGGINGBYCHANGELOGGINGID_SQL = 
			"SELECT " +
			FIELDS +
			" FROM change_logging, entry_list_ref " +
			" WHERE change_logging.enzyme_entry_id = entry_list_ref.enzyme_entry_id" +
			" AND change_logging.operation LIKE '%modification%'" +
			" AND change_logging.id=?" +
			" AND change_logging.enzyme_entry_id=?" +
			" AND entry_list_ref.status='active'" +
			"";
		
	public static String SELECT_CHAGNELOGGINGDATEBYENTRYNAMEID_SQL =
			"SELECT " +
			DATEFIELDS +
			" FROM change_logging, entry_list_ref " +
			" WHERE change_logging.enzyme_entry_id = entry_list_ref.enzyme_entry_id" +
			" AND change_logging.operation LIKE '%modification%'" +
			" AND change_logging.entry_name_id=?" +
			" AND entry_list_ref.status='active'" +
			"";
	
	public static String SELECT_MAXCHAGNELOGGINGDATEBYENTRYNAMEID_SQL =
			"SELECT " +
			MAXDATEFIELDS +
			" FROM change_logging, entry_list_ref " +
			" WHERE change_logging.enzyme_entry_id = entry_list_ref.enzyme_entry_id" +
			" AND change_logging.operation LIKE '%modification%'" +
			" AND change_logging.entry_name_id=?" +
			" AND entry_list_ref.status='active'" +
			"";
					
	public static ResultSet findChangeLoggingByEntryNameId(Long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_CHANGELOGGINGBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
	
	public static ResultSet findChangeLoggingByChangeLoggingId(Long changeLoggingId, Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_CHANGELOGGINGBYCHANGELOGGINGID_SQL);
		ps.setLong(1, changeLoggingId);
		ps.setLong(2, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet findChangeLoggingDateByEntryNameId(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_CHAGNELOGGINGDATEBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
	
	public static ResultSet findMaxChangeLoggingDateByEntryNameId(long entryNameId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_MAXCHAGNELOGGINGDATEBYENTRYNAMEID_SQL);
		ps.setLong(1, entryNameId);
		return ps.executeQuery();
	}
}