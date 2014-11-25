package clap.dom.model.dnasequence.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.dnasequence.tdg.DnaSequenceFinder;
import clap.dom.model.dnasequence.DnaSequence;

public class DnaSequenceInputMapper {
	
	public static DnaSequence findDnaSequenceById(long id) throws SQLException,
		MapperException {		
		ResultSet rs = DnaSequenceFinder.findDnaSequenceById(id);
		if (!rs.next())
			return null;		
		
		DnaSequence e = getDnaSequence(rs);
		rs.close();
		return e;
	}
	
	public static DnaSequence findDnaSequenceByGeneId(String genbankGeneId) throws SQLException,
			MapperException {		
		ResultSet rs = DnaSequenceFinder.findDnaSequenceByGeneId(genbankGeneId);
		if (!rs.next())
			return null;		
		
		DnaSequence e = getDnaSequence(rs);
		rs.close();
		return e;
	}
	
	public static DnaSequence findDnaSequenceByEnzymeEntryId(long enzymeEntryId) throws SQLException,
			MapperException {		
		ResultSet rs = DnaSequenceFinder.findDnaSequenceByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		DnaSequence e = getDnaSequence(rs);		
		rs.close();
		return e;
	}
	
	public static DnaSequence findDnaSequenceByEntryNameId(long entryNameId) throws SQLException,
			MapperException {		
		ResultSet rs = DnaSequenceFinder.findDnaSequenceByEntryNameId(entryNameId);
		if (!rs.next())
			return null;		
		
		DnaSequence e = getDnaSequence(rs);
		rs.close();
		return e;
	}
	
	public static ArrayList<DnaSequence> findAllDnaSequence() throws SQLException,
			MapperException {
		ResultSet rs = DnaSequenceFinder.findAllDnaSequence();
		ArrayList<DnaSequence> e = new ArrayList<DnaSequence>();
		while (rs.next()) {			
			DnaSequence arow = getDnaSequence(rs);
			e.add(arow);
		}
		
		rs.close();
		return e;
	}
	
	public static DnaSequence getDnaSequence(ResultSet rs) throws SQLException {
		DnaSequence arow = new DnaSequence(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getLong("entry_name_id"),
				rs.getString("genbank_gene_id"),
				rs.getString("dna_seq"));
		return arow;
	}

}
