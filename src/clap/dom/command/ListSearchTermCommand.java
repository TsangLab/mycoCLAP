package clap.dom.command;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;

public class ListSearchTermCommand extends Command {
	
	public ListSearchTermCommand(Helper helper) {
		super(helper);
	}

	@Override
	public void execute() throws CommandException {
		try {	
			ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
			ArrayList<Map<Comparable, Comparable>> searchTerm = new ArrayList<Map<Comparable, Comparable>>();
			HashMap<String, Boolean> list = new HashMap<String, Boolean>();			
			Integer cnt = 1;
			
			for (int i=0; i < allMycoData.size(); i++){
				MycoData arow = allMycoData.get(i);
				
				if(arow.getSpecies() != null &&
					arow.getSpecies() != ""	&& 
					list.get(arow.getSpecies()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);	
					hash.put("value", arow.getSpecies());
					searchTerm.add(hash); 
					list.put(arow.getSpecies(), true);
					cnt++;
				}
				
				if(arow.getEntryName() != null &&
					arow.getEntryName() != "" &&
					list.get(arow.getEntryName()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getEntryName());
					searchTerm.add(hash);
					list.put(arow.getEntryName(), true);
					cnt++;
				}
				
				if(arow.getGeneName() != null &&
					arow.getGeneName() != "" &&
					list.get(arow.getGeneName()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getGeneName());
					searchTerm.add(hash);
					list.put(arow.getGeneName(), true);
					cnt++;
				}
				
				if(arow.getGeneAlias() != null &&
					arow.getGeneAlias() != "" &&
					list.get(arow.getGeneAlias()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getGeneAlias());
					searchTerm.add(hash);
					list.put(arow.getGeneAlias(), true);
					cnt++;
				}
				
				if(arow.getEnzymeName() != null &&
					arow.getEnzymeName() != "" &&
					list.get(arow.getEnzymeName()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getEnzymeName());
					searchTerm.add(hash);
					list.put(arow.getEnzymeName(), true);
					cnt++;
				}
				
				if(arow.getEcSystematicName() != null &&
					arow.getEcSystematicName() != "" &&
					list.get(arow.getEcSystematicName()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getEcSystematicName());
					searchTerm.add(hash);
					list.put(arow.getEcSystematicName(), true);
					cnt++;
				}
				
				if(arow.getEnzymeAlias() != null &&
					arow.getEnzymeAlias() != "" &&
					list.get(arow.getEnzymeAlias()) == null ) {
					Map hash = new HashMap();
					hash.put("cnt", cnt);
					hash.put("value", arow.getEnzymeAlias());
					searchTerm.add(hash);
					list.put(arow.getEnzymeAlias(), true);
					cnt++;
				}
				
				if(arow.getFamily() != null &&
						arow.getFamily() != "" &&
						list.get(arow.getFamily()) == null ) {
						Map hash = new HashMap();
						hash.put("cnt", cnt);
						hash.put("value", arow.getFamily());
						searchTerm.add(hash);
						list.put(arow.getFamily(), true);
						cnt++;
					}
			}
			
			helper.setRequestAttribute("searchTerm", searchTerm);								
		} catch (Exception e) {
			throw new CommandException(e);
		}		
	}

}
