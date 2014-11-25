package clap.dom.model.enzymeannotation.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.dsrg.soenea.service.UniqueIdFactory;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class EnzymeAnnotationTDG {
	public static final String BASE_NAME = "enzyme_annotation";	
	public static final String TABLE = DbRegistry.getTablePrefix() + BASE_NAME;
	
	public static final String DELETE =
		"DELETE FROM " + TABLE + " WHERE enzyme_entry_id=?;";
	
	public static final String INSERT = 
		"INSERT INTO " + TABLE + " (id, enzyme_entry_id, ec_number, " +
		"go_molecular_function_id, go_molecular_function_evidence, go_molecular_function_ref, " +
		"go_biological_process_id, go_biological_process_evidence, go_biological_process_ref, " +
		"go_cellular_component_id, go_cellular_component_evidence, go_cellular_component_ref) " +
		"values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

	public static final String UPDATE = 
		"UPDATE " + TABLE + " " +
		"SET ec_number=?, go_molecular_function_id=?, go_molecular_function_evidence=?, go_molecular_function_ref=?, " +
		"go_biological_process_id=?, go_biological_process_evidence=?, go_biological_process_ref=?, " +
		"go_cellular_component_id=?, go_cellular_component_evidence=?, go_cellular_component_ref=? " +
		"WHERE id=? and enzyme_entry_id=?;";
	
	public static int delete(long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(DELETE);
		ps.setLong(1, enzymeEntryId);
		int count = SQLLogger.processUpdate(ps);
		return count;
	}
	
	public static int insert(long id, long enzymeEntryId, String ecNumber, 
			String goMolecularId, String goMolecularEvidence, String goMolecularRef,
			String goProcessId, String goProcessEvidence, String goProcessRef,
			String goComponentId, String goComponentEvidence, String goComponentRef) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(INSERT);
		ps.setLong(1, id);
		ps.setLong(2, enzymeEntryId);
		ps.setString(3, ecNumber);
		ps.setString(4, goMolecularId);
		ps.setString(5, goMolecularEvidence);
		ps.setString(6, goMolecularRef);
		ps.setString(7, goProcessId);
		ps.setString(8, goProcessEvidence);
		ps.setString(9, goProcessRef);
		ps.setString(10, goComponentId);
		ps.setString(11, goComponentEvidence);
		ps.setString(12, goComponentRef);
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}

	public static int update(long id, long enzymeEntryId, String ecNumber, 
			String goMolecularId, String goMolecularEvidence, String goMolecularRef,
			String goProcessId, String goProcessEvidence, String goProcessRef, 
			String goComponentId, String goComponentEvidence, String goComponentRef) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(UPDATE);
		ps.setString(1, ecNumber);
		ps.setString(2, goMolecularId);
		ps.setString(3, goMolecularEvidence);
		ps.setString(4, goMolecularRef);
		ps.setString(5, goProcessId);
		ps.setString(6, goProcessEvidence);
		ps.setString(7, goProcessRef);
		ps.setString(8, goComponentId);
		ps.setString(9, goComponentEvidence);
		ps.setString(10, goComponentRef);
		ps.setLong(11, id);
		ps.setLong(12, enzymeEntryId);		
		int count = SQLLogger.processUpdate(ps);
		ps.close();
		return count;
	}
	
	public static long getMaxId() throws SQLException {
		return UniqueIdFactory.getMaxId(TABLE, "id");
	}

}