package clap.dom.model.familyactivitysummary.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.familyactivitysummary.FamilyActivitySummary;
import clap.dom.model.familyactivitysummary.tdg.FamilyActivitySummaryFinder;

public class FamilyActivitySummaryInputMapper {
	
	public static ArrayList<FamilyActivitySummary> findNonBifunctionalEnzymeSummary() throws SQLException,
			MapperException {		
		ResultSet rs = FamilyActivitySummaryFinder.findNonBifunctionalEnzymeSummary();
		ArrayList<FamilyActivitySummary> e = new ArrayList<FamilyActivitySummary>();
		while (rs.next()) { 
			FamilyActivitySummary arow = getFamilyActivitySummary(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static ArrayList<FamilyActivitySummary> findBifunctionalEnzymeSummary() throws SQLException,
			MapperException {		
		ResultSet rs = FamilyActivitySummaryFinder.findBifunctionalEnzymeSummary();
		ArrayList<FamilyActivitySummary> e = new ArrayList<FamilyActivitySummary>();
		while (rs.next()) { 
			FamilyActivitySummary arow = getFamilyActivitySummary(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static Integer findTotalNumberOfEnzymes()  throws SQLException,
			MapperException {
		ResultSet rs = FamilyActivitySummaryFinder.findTotalNumberOfEnzyme();
		Integer total = 0;
		if(rs.next())
			total = rs.getInt("total");
		else
			total = 0;
		rs.close();
		return total;
	}

	public static FamilyActivitySummary getFamilyActivitySummary(ResultSet rs) throws SQLException {
					
		FamilyActivitySummary arow = new FamilyActivitySummary(
				rs.getString("family"),
				rs.getString("activity"),
				rs.getLong("enzyme_characterized"));
		return arow;
	}
}