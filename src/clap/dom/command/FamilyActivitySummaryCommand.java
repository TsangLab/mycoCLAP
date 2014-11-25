package clap.dom.command;

import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.familyactivitysummary.FamilyActivitySummary;
import clap.dom.model.familyactivitysummary.mappers.FamilyActivitySummaryInputMapper;

public class FamilyActivitySummaryCommand extends Command {
	
	public FamilyActivitySummaryCommand(Helper helper){
		super(helper);
	}

	public void execute() throws CommandException {
		try {
			ArrayList<FamilyActivitySummary> familyActivitySummary = new ArrayList<FamilyActivitySummary>();
			ArrayList<FamilyActivitySummary> nonBifunctionalEnzymeSummary = FamilyActivitySummaryInputMapper.findNonBifunctionalEnzymeSummary();
			ArrayList<FamilyActivitySummary> bifunctionalEnzymeSummary = FamilyActivitySummaryInputMapper.findBifunctionalEnzymeSummary();
			Integer totalNumberOfEnzymes = FamilyActivitySummaryInputMapper.findTotalNumberOfEnzymes();
			familyActivitySummary.addAll(nonBifunctionalEnzymeSummary);
			familyActivitySummary.addAll(bifunctionalEnzymeSummary);
System.out.println("total: " +totalNumberOfEnzymes);			
			if (helper.getBoolean("isDownload") == true) {
				String filename = "FamilyActivitySummary.txt";
				String curRow = "Family\tNumber of Enzyme Characterized\tActivity\tCategories\n";
				for(int i=0; i<familyActivitySummary.size(); i++) {
					FamilyActivitySummary arow = familyActivitySummary.get(i);
					curRow += arow.getFamily() + "\t" + arow.getCharacterizedEnzyme() + "\t" + arow.getActivity() + "\t" + arow.getCategories() + "\n";					
				}
				helper.setRequestAttribute("data", curRow);
				helper.setRequestAttribute("filename", filename);
			}
			else if (helper.getBoolean("isSubmission") == true)
				helper.setRequestAttribute("familyActivitySummary", familyActivitySummary);
			else 
				helper.setRequestAttribute("total", totalNumberOfEnzymes);
			
		} catch (SQLException e) {
			helper.setRequestAttribute("message", "Database errors!");
			e.printStackTrace();
		} catch (MapperException e) {
			helper.setRequestAttribute("message", "Not able to get summary data!");
			e.printStackTrace();
		}
	}
}