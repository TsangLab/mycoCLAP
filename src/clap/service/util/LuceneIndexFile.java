package clap.service.util;

import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.index.CorruptIndexException;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryParser.ParseException;
import org.apache.lucene.queryParser.QueryParser;
import org.apache.lucene.search.Hits;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.Searcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.LockObtainFailedException;

import clap.dom.model.mycodata.tdg.MycoDataFinder;

public class LuceneIndexFile {
	/*
	 * create index and save to file system
	 */	
	public static void createLuceneIndexFile(File parentDir) throws CorruptIndexException, LockObtainFailedException, 
			IOException, SQLException {
		Directory idx = FSDirectory.getDirectory(parentDir);		
		boolean recreateIndexIfExists = true;
        IndexWriter writer = new IndexWriter(idx, new StandardAnalyzer(), recreateIndexIfExists);
        
		// add all data index except sequences 
		ResultSet rs = MycoDataFinder.findAllMycoDataForLucenIndex();
		ResultSetMetaData md = (ResultSetMetaData) rs.getMetaData();
		createIndex(writer, md, rs, 3);	
		rs.close();
		
		writer.optimize();
		writer.close();
		idx.close();		
	}
	
	public static void createIndex(IndexWriter writer, ResultSetMetaData md, ResultSet rs, int index)
	    throws CorruptIndexException, LockObtainFailedException, IOException, SQLException
	{
	    while(rs.next()){
	        Document doc = new Document();
	        String arow = oneRowContent(md, rs, index);
	        doc.add(new Field("enzymeEntryId", rs.getString("enzyme_entry_id"), Field.Store.YES, Field.Index.NO));
	        doc.add(new Field("content", arow, Field.Store.NO, Field.Index.TOKENIZED));
	        
	        if( rs.getString("species") == null)
	        	doc.add(new Field("species", "", Field.Store.NO, Field.Index.TOKENIZED));
	        else
	        	doc.add(new Field("species", rs.getString("species"), Field.Store.NO, Field.Index.TOKENIZED));
	        
	        if( rs.getString("family") == null)
	        	doc.add(new Field("family", "", Field.Store.NO, Field.Index.TOKENIZED));
	        else
	        	doc.add(new Field("family", rs.getString("family"), Field.Store.NO, Field.Index.TOKENIZED));
	        
	        if( rs.getString("ec_number") == null)
				doc.add(new Field("ecnumber", "", Field.Store.NO, Field.Index.TOKENIZED));
			else
				doc.add(new Field("ecnumber", rs.getString("ec_number"), Field.Store.NO, Field.Index.TOKENIZED));
			
			if( rs.getString("host_for_recombinant_expression") == null)
				doc.add(new Field("host", "", Field.Store.NO, Field.Index.TOKENIZED));
			else
				doc.add(new Field("host", rs.getString("host_for_recombinant_expression"), Field.Store.NO, Field.Index.TOKENIZED));
	        
	        writer.addDocument(doc);
	    }	
	}
	
	public static String oneRowContent(ResultSetMetaData md, ResultSet rs, int index) throws SQLException {
		String row = "";
		for(int i = index; i<=md.getColumnCount(); i++){ 
			// loop start from index to exclude table id, version, status, and/or foreign key reference in search. 
			String colType = md.getColumnTypeName(i);
			String colName = md.getColumnLabel(i);
			boolean b = false;
			
			if( colType.contains("INTEGER")) {
				long value = rs.getLong(colName);
				b =  rs.wasNull();				
				if( b == false )	row += value + ", ";
				else				row += "";
			} else if ( colType.equals("VARCHAR")
					|| colType.contains("TEXT")
					|| colType.contains("DATE")) {
				String value = rs.getString(colName);				
				b = rs.wasNull();				
				if ( b == false ){
					value = value.replace("\n", "").replace("\r", "");
					row += value + ", ";
				}
				else				row += "";
			} else if ( colType.equals("FLOAT")) {
				float value = rs.getFloat(colName); 
				b = rs.wasNull();				
				if ( b == false)	row += value + ", ";	
				else 				row += "";
			}
		}	
		
		return row;
	}
	
	// FSDirectory index
    public static Hits hitsAll(String terms, Searcher searcher, String fieldMatch)
	    throws ParseException, SQLException, IOException
	{
    	QueryParser qp = null;
    	if( fieldMatch.equals("all"))
			qp = new QueryParser("content", new StandardAnalyzer());
		else if ( fieldMatch.equals("species"))
			qp = new QueryParser("species", new StandardAnalyzer());
		else if ( fieldMatch.equals("family"))
			qp = new QueryParser("family",new StandardAnalyzer());
		else if ( fieldMatch.equals("ecnumber"))
			qp = new QueryParser("ecnumber", new StandardAnalyzer());
		else if ( fieldMatch.equals("host"))
			qp = new QueryParser("host", new StandardAnalyzer());
		
	    qp.setAllowLeadingWildcard(true);
	    Query query = qp.parse(terms);
	    Hits hits = searcher.search(query);
	    
	    return hits;
	}
}