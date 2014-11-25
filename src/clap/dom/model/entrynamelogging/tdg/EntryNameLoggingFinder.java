package clap.dom.model.entrynamelogging.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EntryNameLoggingFinder {
	public static final String FIELDS = "id, status, entry_name, used_entry_name, date_time";
	
	public static String SELECT_ENTRYNAMELOGGINGBYENTRYNAME_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_name_logging WHERE entry_name = ?";
	
	public static String SELECT_ENTRYNAMELOGGINGBYUSEDENTRYNAME_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM entry_name_logging WHERE used_entry_name = ?";
	
	public static String SELECT_ALLENTRYNAMELOGGING_SQL = 
		"SELECT " + 
		FIELDS + 
		" FROM entry_name_logging";

	public static String SELECT_ENTRYNAMELOGGINGMAXID_SQL = 
		"SELECT MAX(id) " + 
		" FROM entry_name_loggingf";
	
	public static ResultSet findEntryNameLoggingByEntryName(String entryName) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYNAMELOGGINGBYENTRYNAME_SQL);
		ps.setString(1, entryName);
		return ps.executeQuery();
	}
	
	public static ResultSet findEntryNameLoggingByUsedEntryName(String usedEntryName) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYNAMELOGGINGBYUSEDENTRYNAME_SQL);
		ps.setString(1, usedEntryName);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllEntryNameLogging() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLENTRYNAMELOGGING_SQL);
		return ps.executeQuery();
	}

	public static ResultSet findEntryNameLoggingMaxId() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ENTRYNAMELOGGINGMAXID_SQL);
		return ps.executeQuery();
	}

}

