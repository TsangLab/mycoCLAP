package clap.dom.model.familyactivitysummary.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class FamilyActivitySummaryFinder {
	public static String SELECT_NONBIFUNCTIONALENZYME_SQL = "SELECT family, GROUP_CONCAT(CONCAT(activity, '(', enzyme_characterized, ')') SEPARATOR ', ') AS activity, SUM(enzyme_characterized) AS enzyme_characterized "
			+ "FROM family_activity_summary WHERE activity NOT LIKE '%bifunction%' GROUP BY family ORDER BY family "
			+ "";
	
	public static String SELECT_BIFUNCTIONALENZYME_SQL = "SELECT family, GROUP_CONCAT(CONCAT(activity, '(', enzyme_characterized, ')') SEPARATOR ', ') AS activity, SUM(enzyme_characterized) AS enzyme_characterized "
			+ "FROM family_activity_summary WHERE activity LIKE '%bifunction%' GROUP BY family ORDER BY family"
			+ "";
	
	public static String TOTAL_NUMBEROFENZYMES_SQL = "SELECT SUM(enzyme_characterized) AS total "
			+ "FROM family_activity_summary"
			+ "";
		
	public static ResultSet findNonBifunctionalEnzymeSummary() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_NONBIFUNCTIONALENZYME_SQL);
		return ps.executeQuery();
	}
	
	public static ResultSet findBifunctionalEnzymeSummary() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_BIFUNCTIONALENZYME_SQL);
		return ps.executeQuery();
	}
	
	public static ResultSet findTotalNumberOfEnzyme() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(TOTAL_NUMBEROFENZYMES_SQL);
		return ps.executeQuery();
	}
	
}

