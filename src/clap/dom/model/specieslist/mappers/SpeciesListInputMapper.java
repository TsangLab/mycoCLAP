package clap.dom.model.specieslist.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.specieslist.SpeciesList;
import clap.dom.model.specieslist.tdg.SpeciesListFinder;

public class SpeciesListInputMapper {
	
	public static SpeciesList findSpeciesListById(long id) throws SQLException,
			MapperException {		
		ResultSet rs = SpeciesListFinder.findSpeciesListById(id);
		if (!rs.next())
			return null;		
		
		SpeciesList e = getSpeciesList(rs);
		rs.close();
		return e;
	}

	public static SpeciesList findEntryDescriptionByEntryName(String species) throws SQLException,
			MapperException {		
		ResultSet rs = SpeciesListFinder.findSpeciesListBySpecies(species);
		if (!rs.next())
			return null;	
		
		SpeciesList e = getSpeciesList(rs);
		rs.close();
		return e;
	}

	public static ArrayList<SpeciesList> findAllSpeciesList() throws SQLException,
			MapperException {
		ResultSet rs = SpeciesListFinder.findAllSpeciesList();
		ArrayList<SpeciesList> e = new ArrayList<SpeciesList>();
		
		while (rs.next()) {			
			SpeciesList arow = getSpeciesList(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static SpeciesList getSpeciesList(ResultSet rs) throws SQLException {
		SpeciesList arow = new SpeciesList(
				rs.getLong("id"),
				rs.getString("species"),
				rs.getString("taxonomic"),
				rs.getString("acronym"),
				rs.getString("alternate_names"),
				rs.getString("common_name"),
				rs.getString("phylogeny"));
		return arow;
	}

}
