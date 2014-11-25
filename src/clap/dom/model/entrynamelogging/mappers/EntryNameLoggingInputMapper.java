package clap.dom.model.entrynamelogging.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.entrynamelogging.EntryNameLogging;
import clap.dom.model.entrynamelogging.tdg.EntryNameLoggingFinder;

public class EntryNameLoggingInputMapper {
	public static ArrayList<EntryNameLogging> findEntryNameLoggingByEntryName(String entryName) throws SQLException,
			MapperException {		
		ResultSet rs = EntryNameLoggingFinder.findEntryNameLoggingByEntryName(entryName);
		ArrayList<EntryNameLogging> e = new ArrayList<EntryNameLogging>();
		
		while (rs.next()) {			
			EntryNameLogging arow = getEntryNameLogging(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}

	public static EntryNameLogging findEntryNameLoggingByUsedEntryName(String usedEntryName) throws SQLException,
			MapperException {		
		ResultSet rs = EntryNameLoggingFinder.findEntryNameLoggingByUsedEntryName(usedEntryName);
		
		if (rs.next()) {
			EntryNameLogging e = getEntryNameLogging(rs);
			rs.close();
			return e;
		} else
			return null;		
	}

	public static ArrayList<EntryNameLogging> findAllEntryNameLogging() throws SQLException,
			MapperException {
		ResultSet rs = EntryNameLoggingFinder.findAllEntryNameLogging();
		ArrayList<EntryNameLogging> e = new ArrayList<EntryNameLogging>();
		
		while (rs.next()) {			
			EntryNameLogging arow = getEntryNameLogging(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}

	public static long findEntryNameLoggingMaxId() throws SQLException,
			MapperException {		
		ResultSet rs = EntryNameLoggingFinder.findEntryNameLoggingMaxId();
		if (rs.next())						
			return rs.getLong("MAX(id)");
		else 
			return (Long) null;
	}
	
	public static EntryNameLogging getEntryNameLogging(ResultSet rs) throws SQLException {
		EntryNameLogging arow = new EntryNameLogging(
				rs.getLong("id"),
				rs.getString("status"),
				rs.getString("entry_name"),
				rs.getString("used_entry_name"),
				rs.getString("status"));
		return arow;
	}

}
