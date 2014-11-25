package clap.dom.command;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;
import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;

import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.mappers.MycoDataInputMapper;
import clap.service.util.FileUploadUtil;
import clap.service.util.LuceneIndexFile;
import clap.service.util.geneOntologyId;

public class DisplayDataCommand extends Command {
	
	public DisplayDataCommand(Helper helper) {
		super(helper);
	}
	
	public void execute() throws CommandException {
		try {	
			String fieldMatch = helper.getString("fieldMatch");
			String term = helper.getString("term").trim();
		 	String header = helper.getString("header");
		 	String[] headers ;
		 	String searchScale = helper.getString("searchScale");
		 	Integer limit = helper.getInt("limit");
		 	Integer start = helper.getInt("start");
		 	long begin = System.currentTimeMillis();		
	
	 		if (limit == null)	
	 			limit = 600;
	 		if (start == null)
	 			start = 0;	
	 		if (helper.getString("searchScale").equals(null))
	 			searchScale = "EntireDataset";
	 		else 
	 			searchScale = helper.getString("searchScale");
	 		if (fieldMatch.equals(null) || fieldMatch.equals(""))
	 			fieldMatch = "all";
	 		if (header.equals(null) || header.equals("")){
	 			header = "";
	 			headers = new String[0];
	 		} else 
	 			headers = header.split("&header="); 	// convert it to array;
	
			/*
			 * get request data
			 */
			ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
			Integer total;
			
			long elapsedTimeMillis = System.currentTimeMillis()-begin;
			float elapsedTimeSec = elapsedTimeMillis/1000F;
			System.out.println("SQLquery time: " + elapsedTimeSec + "s");

			ArrayList<MycoData> finalResult = new ArrayList<MycoData>();
			ArrayList<MycoData> returnResult = new ArrayList<MycoData>();
			int last = start + limit;
														
			/*
			 * booleanquery
			 */
			if ( term != null && term != "" ) {								
				File parentDir = FileUploadUtil.luceneIndexDir();
				finalResult = mycodataByTerms(term, parentDir, fieldMatch);
			}
			long searchFinishTime = System.currentTimeMillis()-begin;
			float searchFinishTimeSec = searchFinishTime/1000F;
			System.out.println("Search time: " + searchFinishTimeSec + "s");

			if ( term == "" ) {
				if ( allMycoData.size() < (limit + start) )
					last = allMycoData.size(); 
				
				for(int i = start; i < last; i++)
					returnResult.add(allMycoData.get(i));		
				
				total = allMycoData.size();
			}
			else {							
				if ( finalResult.size() < (limit + start) )
					last = finalResult.size(); 
				
				for(int i = start; i < last; i++)
					returnResult.add(finalResult.get(i));
				
				total = finalResult.size();				
			}
			
			// format gene ontology ids
			returnResult = mycoData(returnResult);
			
			helper.setRequestAttribute("dataset", returnResult);
			helper.setRequestAttribute("total", total);
			helper.setRequestAttribute("searchTerm", term);
			helper.setRequestAttribute("fieldMatch", fieldMatch);
			helper.setRequestAttribute("searchScale", searchScale);
		} catch (Exception e) {
			throw new CommandException(e);
		} 		
	}
	
	public static ArrayList<MycoData> mycoData (ArrayList<MycoData> rows) {
		
		for(int i = 0; i < rows.size(); i++) {
			String goMolecularId = rows.get(i).getGoMolecularId();
			String goProcessId = rows.get(i).getGoProcessId();
			String goComponentId = rows.get(i).getGoComponentId();
			
			if( goMolecularId != null && !goMolecularId.equals(""))
				goMolecularId = geneOntologyId.addPrefix(goMolecularId);
			
			if( goProcessId != null && !goProcessId.equals(""))
				goProcessId = geneOntologyId.addPrefix(goProcessId);
			
			if( goComponentId != null && !goComponentId.equals(""))
				goComponentId = geneOntologyId.addPrefix(goComponentId);
							
			rows.get(i).setGoMolecularId(goMolecularId);
			rows.get(i).setGoProcessId(goProcessId);
			rows.get(i).setGoComponentId(goComponentId);
		}
		
		return rows;
	}
	
	public static ArrayList<MycoData> mycodataByTerms(String terms, File parentDir, String fieldMatch) 
				throws SQLException, CorruptIndexException, IOException, NumberFormatException, MapperException, ParseException {
		ArrayList<MycoData> mycodata = new ArrayList<MycoData>();
		
		// using index file
		Directory fileIdx = FSDirectory.getDirectory(parentDir);
        Directory idx = new RAMDirectory(fileIdx);
        fileIdx.close();
        Searcher searcher = new IndexSearcher(idx);
        Hits hits = LuceneIndexFile.hitsAll(terms, searcher, fieldMatch);
        mycodata = getHits(hits, fieldMatch);
        searcher.close();
        idx.close();
        
		return mycodata;
	}
	
		
	public static ArrayList<MycoData> getHits(Hits hits, String fieldMatch) 
			throws CorruptIndexException, IOException, SQLException, NumberFormatException, MapperException {
		ArrayList<MycoData> mycodata = new ArrayList<MycoData>();
		HashMap<String, Long> enzymeentryIdList = new HashMap<String, Long>();

		for(int i=0; i<hits.length(); i++) {
			Document doc = hits.doc(i);
			String enzymeentryId = doc.get("enzymeEntryId");
			
			if ( ! fieldMatch.equals("all")) {
				MycoData arow;
				if ( (arow = MycoDataInputMapper.findMycoDataByEnzymeEntryId(Long.parseLong(enzymeentryId))) != null )
					mycodata.add(arow);
			}
			else {
				if ( MycoDataInputMapper.findMycoDataByEnzymeEntryId(Long.parseLong(enzymeentryId)) != null )
					enzymeentryIdList.put(enzymeentryId, Long.parseLong(enzymeentryId));
			}
		}
		
		// need reorder the data by EntryName since Lucene search results are ordered by score
		if ( fieldMatch.equals("all"))
			mycodata = mycodataReorder(enzymeentryIdList);
		
		return mycodata;
	}
	
	
	public static ArrayList<MycoData> mycodataReorder(HashMap<String, Long> enzymeentryIdList) throws SQLException, MapperException {
		ArrayList<MycoData> mycodataInOrder = new ArrayList<MycoData>();		
		ArrayList<MycoData> allMycoData = MycoDataInputMapper.findAllMycoData();
		/*
		 * group and reorder of the search result by entryName 
		 * Note: the data in MycoDataInputMapper.findAllMycoData() is already grouped and ordered by entryName
		 */
		for(int i=0; i<allMycoData.size(); i++) {
			MycoData arow = allMycoData.get(i);
			Long enzymeentryId = arow.getEnzymeEntryId();
			if(enzymeentryIdList.get(enzymeentryId.toString()) != null )
				mycodataInOrder.add(arow);	
		}
		
		return mycodataInOrder;
	}

}
