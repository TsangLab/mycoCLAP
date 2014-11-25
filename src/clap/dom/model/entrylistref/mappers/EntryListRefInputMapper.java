package clap.dom.model.entrylistref.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.entrylistref.EntryListRef;
import clap.dom.model.entrylistref.tdg.EntryListRefFinder;

public class EntryListRefInputMapper {
	
	public static EntryListRef findEntryListRefByEnzymeEntryId(long enzymeEntryId) throws SQLException,
			MapperException {		
		ResultSet rs = EntryListRefFinder.findEntryListRefByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		EntryListRef e = getEntryListRef(rs);
		rs.close();
		return e;
	}

	public static EntryListRef findEntryListRefByEntryNameId(Long entryNameId) throws SQLException,
			MapperException {		
		ResultSet rs = EntryListRefFinder.findEntryListRefByEntryNameId(entryNameId);
		if (!rs.next())
			return null;	
		
		EntryListRef e = getEntryListRef(rs);
		rs.close();
		return e;
	}

	public static ArrayList<EntryListRef> findAllEntryListRef() throws SQLException,
			MapperException {
		ResultSet rs = EntryListRefFinder.findAllEntryListRef();
		ArrayList<EntryListRef> e = new ArrayList<EntryListRef>();
		while (rs.next()) {			
			EntryListRef arow = getEntryListRef(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}

	public static long findEntryListRefMaxId() throws SQLException,
			MapperException {		
		ResultSet rs = EntryListRefFinder.findEntryListRefMaxId();
		if (!rs.next())
			throw new MapperException("No results found for: " + rs.getLong("id"));		
				
		return rs.getLong("MAX(id)");
	}
	
	public static EntryListRef getEntryListRef(ResultSet rs) throws SQLException {
		EntryListRef arow = new EntryListRef(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getLong("entry_name_id"),
				rs.getLong("version"),
				rs.getString("status"));
		return arow;
	}

}
