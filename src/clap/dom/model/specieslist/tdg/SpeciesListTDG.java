package clap.dom.model.specieslist.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class SpeciesListTDG {
	
	public static final String BASE_NAME = "species_list";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + "WHERE species=?;";
	
	public static final String INSERT =
		"INSERT INTO " + TABLE + " (id, species, taxonomic, acronym, " +
		"alternate_names, common_name, phylogeny) values(?, ?, ?, ?, ?, ?, ?);";
	
	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET taxonomic=?, acronym=?, alternate_names=?, common_name=?, phylogeny=? " +
		"WHERE id=? and species=?;";
	
	public static int delete(String species) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setString(1,species);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(Long id, String species, 
			String taxonomic, String acronym, String alternateNames, 
			String commonName, String phylogeny) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setString(2, species);
		ps.setString(3, taxonomic);
		ps.setString(4, acronym);
		ps.setString(5, alternateNames);
		ps.setString(6, commonName);
		ps.setString(7, phylogeny);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long maxId() throws SQLException {
		return UniqueIdFactory.getMaxId(BASE_NAME, "id");
	}
	
	public static int update(Long id, String species, 
			String taxonomic, String acronym, String alternateNames, 
			String commonName, String phylogeny) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, taxonomic);
		ps.setString(2, acronym);
		ps.setString(3, alternateNames);
		ps.setString(4, commonName);
		ps.setString(5, phylogeny);
		ps.setLong(6, id);
		ps.setString(7, species);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
}