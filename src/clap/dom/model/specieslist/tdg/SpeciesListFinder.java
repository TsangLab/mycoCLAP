package clap.dom.model.specieslist.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class SpeciesListFinder {
	
	public static final String FIELDS = "id, species, taxonomic," +
			"acronym, alternate_names, common_name, phylogeny";
	
	public static String SELECT_SPECIESLISTBYID_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM species_list WHERE id = ?";
	
	public static String SELECT_SPECIESLISTBYSPECIES_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM species_list WHERE species = ?";
	
	public static String SELECT_ALLSPECIESLIST_SQL = 
			"SELECT " + 
			FIELDS + 
			" FROM species_list";
	
	public static ResultSet findSpeciesListById(long id) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_SPECIESLISTBYID_SQL);
		ps.setLong(1, id);
		return ps.executeQuery();
	}
	
	public static ResultSet findSpeciesListBySpecies(String species) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_SPECIESLISTBYSPECIES_SQL);
		ps.setString(1, species);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllSpeciesList() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLSPECIESLIST_SQL);
		return ps.executeQuery();
	}
	
}