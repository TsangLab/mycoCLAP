package clap.dom.model.entrydescription.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.entrydescription.tdg.EntryDescriptionFinder;
import clap.dom.model.entrydescription.EntryDescription;

public class EntryDescriptionInputMapper {
	
	public static EntryDescription findEntryDescriptionByEntryNameId(long entryNameId) throws SQLException,
			MapperException {		
		ResultSet rs = EntryDescriptionFinder.findEntryDescriptionByEntryNameId(entryNameId);
		if (!rs.next())
			return null;	
		
		EntryDescription e = getEntryDescription(rs);
		rs.close();
		return e;
	}

	public static EntryDescription findEntryDescriptionByEntryName(String entryName) throws SQLException,
			MapperException {		
		ResultSet rs = EntryDescriptionFinder.findEntryDescriptionByEntryName(entryName);
		if (!rs.next())
			return null;		
		
		EntryDescription e = getEntryDescription(rs);
		rs.close();
		return e;
	}

	public static ArrayList<EntryDescription> findAllEntryDescription() throws SQLException,
			MapperException {
		ResultSet rs = EntryDescriptionFinder.findAllEntryDescription();
		ArrayList<EntryDescription> e = new ArrayList<EntryDescription>();
		
		while (rs.next()) {			
			EntryDescription arow = getEntryDescription(rs);
			e.add(arow);
		}

		rs.close();
		return e;
	}

	public static long findEntryDescriptionMaxId( ) throws SQLException,
			MapperException {		
		ResultSet rs = EntryDescriptionFinder.findEntryDescriptionMaxId();
		if (!rs.next())
			throw new MapperException("No results found for: " + rs.getLong("MAX(id)"));		
		
		return rs.getLong("MAX(id)");
	}
	
	public static ArrayList<EntryDescription> findEntryNameList() throws SQLException,
			MapperException {		
		ResultSet rs = EntryDescriptionFinder.findEntryNameList();				
		ArrayList<EntryDescription> e = new ArrayList<EntryDescription>();
		
		while (rs.next()) {						
			EntryDescription arow = getEntryDescription(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static EntryDescription getEntryDescription(ResultSet rs) throws SQLException{
		EntryDescription arow = new EntryDescription(
				rs.getLong("id"),
				rs.getLong("entry_name_id"), 
				rs.getString("species"),
				rs.getString("strain"),
				rs.getString("entry_name"),
				rs.getString("gene_name"),
				rs.getString("gene_alias"),
				rs.getString("enzyme_name"),
				rs.getString("ec_systematic_name"),
				rs.getString("enzyme_alias"),
				rs.getString("family"));
		return arow;
	}

}
