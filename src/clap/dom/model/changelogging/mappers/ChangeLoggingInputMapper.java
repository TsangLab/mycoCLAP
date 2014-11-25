package clap.dom.model.changelogging.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.changelogging.ChangeLogging;
import clap.dom.model.changelogging.tdg.ChangeLoggingFinder;
import clap.dom.model.entrynamelogging.EntryNameLogging;

public class ChangeLoggingInputMapper {
	
	public static ArrayList<ChangeLogging> findChangeLoggingByEntryNameId(Long entryNameId) throws SQLException, 
			MapperException {
		ResultSet rs = ChangeLoggingFinder.findChangeLoggingByEntryNameId(entryNameId);
		ArrayList<ChangeLogging> e = new ArrayList<ChangeLogging>();
			
		while (rs.next()) {	
			ChangeLogging  arow =getChangeLogging(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static ChangeLogging findChangeLoggingByChangeLoggingId(Long changeLoggingId, Long enzymeEntryId) throws SQLException, 
			MapperException {
		ResultSet rs = ChangeLoggingFinder.findChangeLoggingByChangeLoggingId(changeLoggingId, enzymeEntryId);
				
		if (rs.next()) {
			ChangeLogging e = getChangeLogging(rs);	
			rs.close();
			return e;
		} else
			return null;			
	}
	
	public static ArrayList<ChangeLogging> findChangeLoggingDateByEntryNameId(Long entryNameId) throws SQLException, 
			MapperException {
		ResultSet rs = ChangeLoggingFinder.findChangeLoggingDateByEntryNameId(entryNameId);
		ArrayList<ChangeLogging> e = new ArrayList<ChangeLogging>();
			
		while (rs.next()) {	
			ChangeLogging arow = new ChangeLogging(
					(long)1,
					"",
					rs.getString("date_time"),					
					(long)1,
					rs.getLong("entry_name_id"),
					rs.getString("entry_name"),
					"modification",
					"");
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static ArrayList<ChangeLogging> findMaxChangeLoggingDateByEntryNameId(Long entryNameId) throws SQLException, 
			MapperException {
		ResultSet rs = ChangeLoggingFinder.findMaxChangeLoggingDateByEntryNameId(entryNameId);
		ArrayList<ChangeLogging> e = new ArrayList<ChangeLogging>();
			
		while (rs.next()) {	
			ChangeLogging arow = new ChangeLogging(
					(long)1,
					"",
					rs.getString("date_time"),					
					(long)1,
					rs.getLong("entry_name_id"),
					rs.getString("entry_name"),
					"modification",
					"");
			e.add(arow);
		}
		rs.close();
		return e;
	}

	public static ChangeLogging getChangeLogging(ResultSet rs) throws SQLException {
		ChangeLogging arow = new ChangeLogging(
				rs.getLong("id"),
				rs.getString("user"),
				rs.getString("date_time"),
				rs.getLong("enzyme_entry_id"),
				rs.getLong("entry_name_id"),
				rs.getString("entry_name"),
				rs.getString("operation"),
				rs.getString("comments"));
		return arow;
	}
}