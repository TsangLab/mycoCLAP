package clap.dom.model.mycodata.tdg;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class MycoDataFinder {
		
	public static final String USEDENTRYNAMES = " (SELECT GROUP_CONCAT(used_entry_name SEPARATOR ', ') " +
								" FROM entry_name_logging WHERE entry_description.entry_name = entry_name_logging.entry_name" +
								" GROUP BY entry_name_logging.entry_name) as used_entry_name";
			
	public static final String FIELDS = "entry_list_ref.*, entry_description.*," +
								" biochemical_property.*, enzyme_annotation.*," +
								" external_resource.*, protein_feature.*," +
								" dna_sequence.*, protein_sequence.*," +
								" max(CAST(change_logging.date_time AS DATE)) as date_time," +
								USEDENTRYNAMES +
								"";
	
	public static final String FIELDSLUCENINDEX = "entry_list_ref.*, entry_description.*," +
							" biochemical_property.*, enzyme_annotation.*," +
							" external_resource.*, protein_feature.*," +
							USEDENTRYNAMES +
							"";

	public static final String FIELDSFORGENEVIEW = "entry_list_ref.*, entry_description.*," +
								" biochemical_property.*, enzyme_annotation.*," +
								" external_resource.*, protein_feature.*," +
								" dna_sequence.*, protein_sequence.*," +
								" species_list.*, ec_annotation.*" +
								"";
	
	public static final String JOINTABLE = LeftJoin("entry_list_ref", "entry_description", "entry_name_id")
								+ LeftJoin("entry_list_ref", "biochemical_property", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "enzyme_annotation", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "external_resource", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "protein_feature", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "dna_sequence", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "protein_sequence", "enzyme_entry_id")
								+ LeftJoin("entry_list_ref", "change_logging", "enzyme_entry_id");
	
	public static final String JOINTABLELUCENINDEX = LeftJoin("entry_list_ref", "entry_description", "entry_name_id")
							+ LeftJoin("entry_list_ref", "biochemical_property", "enzyme_entry_id")
							+ LeftJoin("entry_list_ref", "enzyme_annotation", "enzyme_entry_id")
							+ LeftJoin("entry_list_ref", "external_resource", "enzyme_entry_id")
							+ LeftJoin("entry_list_ref", "protein_feature", "enzyme_entry_id")
							+ LeftJoin("entry_list_ref", "change_logging", "enzyme_entry_id");

	
	public static final String COUNT = "count(*) as totalCnt";
	
	public static String SELECT_ALLMYCODATA_SQL = "SELECT " + FIELDS + " FROM entry_list_ref "
					+ JOINTABLE
					+ " WHERE entry_list_ref.status='active'"
					+ " GROUP BY entry_list_ref.enzyme_entry_id"
					+ " ORDER BY entry_description.entry_name"
					+ "";
	
	public static String SELECT_ALLMYCODATAFORLUCENINDEX_SQL = "SELECT " + FIELDSLUCENINDEX + " FROM entry_list_ref "
					+ JOINTABLELUCENINDEX
					+ " WHERE entry_list_ref.status='active'"
					+ " ORDER BY entry_description.entry_name"
					+ "";

	public static String SELECT_MYCODATABYRANGE_SQL = "SELECT " + FIELDS + " FROM entry_list_ref "
					+ JOINTABLE
					+ " WHERE entry_list_ref.status='active'"
					+ " LIMIT ?,?"
					+ " GROUP BY entry_list_ref.enzyme_entry_id"
					+ " ORDER BY entry_description.entry_name"
					+ "";
	
	public static String FIND_MYCODATA_BYENTRYNAME = "SELECT " + FIELDSFORGENEVIEW + " FROM entry_list_ref "
				+ JOINTABLE
				+ LeftJoin("entry_description", "species_list", "species")
				+ LeftJoin("enzyme_annotation", "ec_annotation", "ec_number")
				+ " WHERE entry_list_ref.status='active' AND entry_description.entry_name=?"
				+ " GROUP BY entry_list_ref.enzyme_entry_id"
				+ " ORDER BY entry_description.entry_name"
				+ "";
	
	public static String FIND_MYCODATA_BYENZYMEENTRYID = "SELECT " + FIELDS + " FROM entry_list_ref "
				+ JOINTABLE
				+ LeftJoin("entry_description", "species_list", "species")
				+ LeftJoin("enzyme_annotation", "ec_annotation", "ec_number")
				+ " WHERE entry_list_ref.status='active' AND entry_list_ref.enzyme_entry_id=?"
				+ " GROUP BY entry_list_ref.enzyme_entry_id"
				+ " ORDER BY entry_description.entry_name"
				+ "";

	public static String FIND_ENTRYNAME_LIST = "SELECT entry_description.id, DISTINCT entry_description.entry_name "
												+ " FROM entry_list_ref "
												+ LeftJoin("entry_list_ref", "entry_description", "entry_name_id")
												+ " WHERE entry_list_ref.status='active' ";

	public static String COUNT_ALLMYCODATA_SQL = "SELECT " + COUNT + " FROM entry_list_ref "
												+ " WHERE entry_list_ref.status='active'"
												+ "";
	
	public static ResultSet findAllMycoData() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLMYCODATA_SQL);
		return ps.executeQuery();
	}
	
	public static ResultSet findAllMycoDataForLucenIndex() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_ALLMYCODATAFORLUCENINDEX_SQL);
		return ps.executeQuery();
	}
	
	public static ResultSet findMycoDataByRange(int start, int limit) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(SELECT_MYCODATABYRANGE_SQL);
		ps.setInt(1, start);
        ps.setInt(2, limit);
		return ps.executeQuery();
	}
	
	public static ResultSet findMycoDataByEntryName(String entryName) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(FIND_MYCODATA_BYENTRYNAME);
		ps.setString(1, entryName);
		return ps.executeQuery();
	}
	
	public static ResultSet findMycoDataByEnzymeEntryId(Long enzymeEntryId) throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(FIND_MYCODATA_BYENZYMEENTRYID);
		ps.setLong(1, enzymeEntryId);
		return ps.executeQuery();
	}
	
	public static ResultSet countAllMycoData() throws SQLException {
		Connection con = DbRegistry.getDbConnection();
		PreparedStatement ps = con.prepareStatement(COUNT_ALLMYCODATA_SQL);
		return ps.executeQuery();
	}	
	
	public static String LeftJoin(String table1, String table2, String equity){
		String join = " LEFT JOIN " + table2 + " ON " + table1 + "." + equity + "=" + table2 + "." + equity;
		return join;
	}
	
}