package clap.dom.model.proteinsequence.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.proteinsequence.ProteinSequence;
import clap.dom.model.proteinsequence.tdg.ProteinSequenceFinder;

public class ProteinSequenceInputMapper {
	
	public static ProteinSequence findProteinSequenceById(long id) throws SQLException,
			MapperException {		
		ResultSet rs = ProteinSequenceFinder.findProteinSequenceById(id);
		if (!rs.next())
			return null;		
		
		ProteinSequence e = getProteinSequence(rs);
		rs.close();
		return e;
	}
	
	public static ProteinSequence findProteinSequenceByProteinId(String uniprotId) throws SQLException,
			MapperException {		
		ResultSet rs = ProteinSequenceFinder.findProteinSequenceByProteinId(uniprotId);
		if (!rs.next())
			return null;		
		
		ProteinSequence e = getProteinSequence(rs);
		rs.close();
		return e;
	}
	
	public static ProteinSequence findProteinSequenceByEnzymeEntryId(long enzymeEntryId) throws SQLException,
		MapperException {		
		ResultSet rs = ProteinSequenceFinder.findProteinSequenceByEnzymeEntryId(enzymeEntryId);
		if (!rs.next())
			return null;		
		
		ProteinSequence e = getProteinSequence(rs);
		rs.close();
		return e;
	}
	
	public static ProteinSequence findProteinSequenceByEntryNameId(long entryNameId) throws SQLException,
		MapperException {		
		ResultSet rs = ProteinSequenceFinder.findProteinSequenceByEntryNameId(entryNameId);
		if (!rs.next())
			return null;		
		
		ProteinSequence e = getProteinSequence(rs);
		rs.close();
		return e;
	}
	
	public static ArrayList<ProteinSequence> findAllProteinSequence() throws SQLException,
			MapperException {
		ResultSet rs = ProteinSequenceFinder.findAllProteinSequence();
		ArrayList<ProteinSequence> e = new ArrayList<ProteinSequence>();
		
		while (rs.next()) {			
			ProteinSequence arow = getProteinSequence(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static ProteinSequence getProteinSequence(ResultSet rs) throws SQLException {
		ProteinSequence arow = new ProteinSequence(
				rs.getLong("id"),
				rs.getLong("enzyme_entry_id"),
				rs.getLong("entry_name_id"),
				rs.getString("protein_id"),
				rs.getString("protein_seq"));
		return arow;
	}
	
}
