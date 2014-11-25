package clap.dom.model.mycodata.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import com.mysql.jdbc.ResultSetMetaData;

import clap.dom.model.mycodata.CountMycoData;
import clap.dom.model.mycodata.MycoData;
import clap.dom.model.mycodata.MycoDataForLucenIndex;
import clap.dom.model.mycodata.MycoDataGeneView;
import clap.dom.model.mycodata.MycoMetaData;
import clap.dom.model.mycodata.tdg.MycoDataFinder;

public class MycoDataInputMapper {
	
	public static CountMycoData countAllMycoData() throws SQLException,
		MapperException {
		ResultSet rs = MycoDataFinder.countAllMycoData();
		rs.next();
		CountMycoData e = new CountMycoData(rs.getLong("totalCnt"));
		rs.close();
		return e;
	}
	
	public static ArrayList<MycoMetaData> findMycoMetaData() throws SQLException,
		MapperException {
		
		ResultSet rs = MycoDataFinder.findAllMycoData();
		ResultSetMetaData rsMetaData = (ResultSetMetaData) rs.getMetaData();
		int numberOfColumns = rsMetaData.getColumnCount();
		ArrayList<MycoMetaData> e = new ArrayList<MycoMetaData>();
		for (int i = 1; i < numberOfColumns + 1; i++) {
			MycoMetaData arow = new MycoMetaData(
					(long)i,
					rsMetaData.getColumnName(i));
			e.add(arow);		   
	    }
		rs.close();	
		return e;
	}
	
	public static ArrayList<MycoData> findAllMycoData() throws SQLException,
		MapperException {
		ResultSet rs = MycoDataFinder.findAllMycoData();
		ArrayList<MycoData> e = new ArrayList<MycoData>();
		
		while (rs.next()) {
			MycoData arow = getMycoData(rs);		
			e.add(arow);
		}
		
		rs.close();
		return e;
	}

	public static ArrayList<MycoData> findAllMycoDataForLucenIndex() throws SQLException,
		MapperException {
		ResultSet rs = MycoDataFinder.findAllMycoDataForLucenIndex();
		ArrayList<MycoData> e = new ArrayList<MycoData>();
		
		while (rs.next()) {
			MycoData arow = getMycoData(rs);		
			e.add(arow);
		}
		
		rs.close();
		return e;
	}


	public static ArrayList<MycoData> findMycoDataByRange(int start, int limit) throws SQLException,
			MapperException {
		ResultSet rs = MycoDataFinder.findMycoDataByRange(start, limit);
		ArrayList<MycoData> e = new ArrayList<MycoData>();
		
		while (rs.next()) {
			MycoData arow = getMycoData(rs);		
			e.add(arow);
		}

		rs.close();
		return e;
	}
	
	
	public static ArrayList<MycoDataGeneView> findMycoDataByEntryName(String entryName) throws SQLException,
			MapperException {
		ResultSet rs = MycoDataFinder.findMycoDataByEntryName(entryName);
		ArrayList<MycoDataGeneView> e = new ArrayList<MycoDataGeneView>();
		
		while (rs.next()) {	
			MycoDataGeneView arow = getMycoDataGeneView(rs);		
			e.add(arow);
		}

		rs.close();
		return e;
	}

	public static MycoData findMycoDataByEnzymeEntryId(Long enzymeEntryId) throws SQLException,
			MapperException {
		ResultSet rs = MycoDataFinder.findMycoDataByEnzymeEntryId(enzymeEntryId);
		rs.next();		
		MycoData e = getMycoData(rs);
		rs.close();
		return e;
	}

	public static MycoData getMycoData(ResultSet rs) throws SQLException {
		
		MycoData arow = new MycoData(
				rs.getLong("entry_list_ref.id"),
				rs.getLong("entry_list_ref.enzyme_entry_id"),
				rs.getLong("entry_description.entry_name_id"), 
				rs.getString("entry_description.species"),
				rs.getString("entry_description.strain"),
				rs.getString("entry_description.entry_name"),
				rs.getString("entry_description.gene_name"),
				rs.getString("entry_description.gene_alias"),
				rs.getString("entry_description.enzyme_name"),
				rs.getString("entry_description.ec_systematic_name"),
				rs.getString("entry_description.enzyme_alias"),
				rs.getString("entry_description.family"),
				rs.getString("biochemical_property.substrates"),
				rs.getString("biochemical_property.host_for_recombinant_expression"),
				rs.getString("biochemical_property.specific_activity"),
				rs.getString("biochemical_property.activity_assay_conditions"),
				rs.getString("biochemical_property.substrate_specificity"),
				rs.getString("biochemical_property.km"),
				rs.getString("biochemical_property.kcat"),
				rs.getString("biochemical_property.vmax"),
				rs.getString("biochemical_property.assay"),
				rs.getString("biochemical_property.kinetic_assay_conditions"),
				rs.getString("biochemical_property.product_analysis"),
				rs.getString("biochemical_property.product_formed"),
				rs.getString("biochemical_property.ph_optimum"),
				rs.getString("biochemical_property.ph_stability"),
				rs.getString("biochemical_property.temperature_optimum"),
				rs.getString("biochemical_property.temperature_stability"),
				rs.getString("biochemical_property.isoelectric_point_experimental"),
				rs.getString("biochemical_property.isoelectric_point_predicted"),
				rs.getString("biochemical_property.other_features"),
				rs.getString("enzyme_annotation.ec_number"),
				rs.getString("enzyme_annotation.go_molecular_function_id"),
				rs.getString("enzyme_annotation.go_molecular_function_evidence"),
				rs.getString("enzyme_annotation.go_molecular_function_ref"),
				rs.getString("enzyme_annotation.go_biological_process_id"),
				rs.getString("enzyme_annotation.go_biological_process_evidence"),
				rs.getString("enzyme_annotation.go_biological_process_ref"),
				rs.getString("enzyme_annotation.go_cellular_component_id"),
				rs.getString("enzyme_annotation.go_cellular_component_evidence"),
				rs.getString("enzyme_annotation.go_cellular_component_ref"),
				rs.getString("external_resource.genbank_gene_id"),
				rs.getString("external_resource.other_genbank_gene_id"),
				rs.getString("external_resource.uniprot_id"),
				rs.getString("external_resource.other_uniprot_id"),
				rs.getString("external_resource.genbank_protein_id"),
				rs.getString("external_resource.refseq_protein_id"),
				rs.getString("external_resource.jgi_id"),
				rs.getString("external_resource.broad_id"),
				rs.getString("external_resource.literature_pmid"),
				rs.getString("external_resource.structure_pmid"),
				rs.getString("external_resource.sequence_pmid"),
				rs.getString("external_resource.pdb_id"),
				rs.getString("external_resource.structure_determination_method"),
				rs.getString("protein_feature.signal_peptide_predicted"),
				rs.getString("protein_feature.n_terminal_experimental"),
				rs.getString("protein_feature.molecular_weight_experimental"),
				rs.getString("protein_feature.molecular_weight_predicted"),
				rs.getString("protein_feature.protein_length"),
				rs.getString("protein_feature.cbd"),
				rs.getString("protein_feature.glycosylation"),
				rs.getString("dna_sequence.genbank_gene_id"),
				rs.getString("dna_sequence.dna_seq"),
				rs.getString("protein_sequence.protein_id"),
				rs.getString("protein_sequence.protein_seq"),
				rs.getString("date_time"));
		
		return arow;
	}
	
public static MycoDataForLucenIndex getMycoDataForLucenIndex(ResultSet rs) throws SQLException {
		
		MycoDataForLucenIndex arow = new MycoDataForLucenIndex(
				rs.getLong("entry_list_ref.id"),
				rs.getLong("entry_list_ref.enzyme_entry_id"),
				rs.getLong("entry_description.entry_name_id"), 
				rs.getString("entry_description.species"),
				rs.getString("entry_description.strain"),
				rs.getString("entry_description.entry_name"),
				rs.getString("entry_description.gene_name"),
				rs.getString("entry_description.gene_alias"),
				rs.getString("entry_description.enzyme_name"),
				rs.getString("entry_description.ec_systematic_name"),
				rs.getString("entry_description.enzyme_alias"),
				rs.getString("entry_description.family"),
				rs.getString("biochemical_property.substrates"),
				rs.getString("biochemical_property.host_for_recombinant_expression"),
				rs.getString("biochemical_property.specific_activity"),
				rs.getString("biochemical_property.activity_assay_conditions"),
				rs.getString("biochemical_property.substrate_specificity"),
				rs.getString("biochemical_property.km"),
				rs.getString("biochemical_property.kcat"),
				rs.getString("biochemical_property.vmax"),
				rs.getString("biochemical_property.assay"),
				rs.getString("biochemical_property.kinetic_assay_conditions"),
				rs.getString("biochemical_property.product_analysis"),
				rs.getString("biochemical_property.product_formed"),
				rs.getString("biochemical_property.ph_optimum"),
				rs.getString("biochemical_property.ph_stability"),
				rs.getString("biochemical_property.temperature_optimum"),
				rs.getString("biochemical_property.temperature_stability"),
				rs.getString("biochemical_property.isoelectric_point_experimental"),
				rs.getString("biochemical_property.isoelectric_point_predicted"),
				rs.getString("biochemical_property.other_features"),
				rs.getString("enzyme_annotation.ec_number"),
				rs.getString("enzyme_annotation.go_molecular_function_id"),
				rs.getString("enzyme_annotation.go_molecular_function_evidence"),
				rs.getString("enzyme_annotation.go_molecular_function_ref"),
				rs.getString("enzyme_annotation.go_biological_process_id"),
				rs.getString("enzyme_annotation.go_biological_process_evidence"),
				rs.getString("enzyme_annotation.go_biological_process_ref"),
				rs.getString("enzyme_annotation.go_cellular_component_id"),
				rs.getString("enzyme_annotation.go_cellular_component_evidence"),
				rs.getString("enzyme_annotation.go_cellular_component_ref"),
				rs.getString("external_resource.genbank_gene_id"),
				rs.getString("external_resource.other_genbank_gene_id"),
				rs.getString("external_resource.uniprot_id"),
				rs.getString("external_resource.other_uniprot_id"),
				rs.getString("external_resource.genbank_protein_id"),
				rs.getString("external_resource.refseq_protein_id"),
				rs.getString("external_resource.jgi_id"),
				rs.getString("external_resource.broad_id"),
				rs.getString("external_resource.literature_pmid"),
				rs.getString("external_resource.structure_pmid"),
				rs.getString("external_resource.sequence_pmid"),
				rs.getString("external_resource.pdb_id"),
				rs.getString("external_resource.structure_determination_method"),
				rs.getString("protein_feature.signal_peptide_predicted"),
				rs.getString("protein_feature.n_terminal_experimental"),
				rs.getString("protein_feature.molecular_weight_experimental"),
				rs.getString("protein_feature.molecular_weight_predicted"),
				rs.getString("protein_feature.protein_length"),
				rs.getString("protein_feature.cbd"),
				rs.getString("protein_feature.glycosylation"));
		
		return arow;
	}
	
	public static MycoDataGeneView getMycoDataGeneView(ResultSet rs) throws SQLException {
		
		MycoDataGeneView arow = new MycoDataGeneView(
				rs.getLong("entry_list_ref.id"),
				rs.getLong("entry_list_ref.enzyme_entry_id"),
				rs.getLong("entry_description.entry_name_id"), 
				rs.getString("entry_description.species"),
				rs.getString("entry_description.strain"),
				rs.getString("entry_description.entry_name"),
				rs.getString("entry_description.gene_name"),
				rs.getString("entry_description.gene_alias"),
				rs.getString("entry_description.enzyme_name"),
				rs.getString("entry_description.ec_systematic_name"),
				rs.getString("entry_description.enzyme_alias"),
				rs.getString("entry_description.family"),
				rs.getString("biochemical_property.substrates"),
				rs.getString("biochemical_property.host_for_recombinant_expression"),
				rs.getString("biochemical_property.specific_activity"),
				rs.getString("biochemical_property.activity_assay_conditions"),
				rs.getString("biochemical_property.substrate_specificity"),
				rs.getString("biochemical_property.km"),
				rs.getString("biochemical_property.kcat"),
				rs.getString("biochemical_property.vmax"),
				rs.getString("biochemical_property.assay"),
				rs.getString("biochemical_property.kinetic_assay_conditions"),
				rs.getString("biochemical_property.product_analysis"),
				rs.getString("biochemical_property.product_formed"),
				rs.getString("biochemical_property.ph_optimum"),
				rs.getString("biochemical_property.ph_stability"),
				rs.getString("biochemical_property.temperature_optimum"),
				rs.getString("biochemical_property.temperature_stability"),
				rs.getString("biochemical_property.isoelectric_point_experimental"),
				rs.getString("biochemical_property.isoelectric_point_predicted"),
				rs.getString("biochemical_property.other_features"),
				rs.getString("enzyme_annotation.ec_number"),
				rs.getString("enzyme_annotation.go_molecular_function_id"),
				rs.getString("enzyme_annotation.go_molecular_function_evidence"),
				rs.getString("enzyme_annotation.go_molecular_function_ref"),
				rs.getString("enzyme_annotation.go_biological_process_id"),
				rs.getString("enzyme_annotation.go_biological_process_evidence"),
				rs.getString("enzyme_annotation.go_biological_process_ref"),
				rs.getString("enzyme_annotation.go_cellular_component_id"),
				rs.getString("enzyme_annotation.go_cellular_component_evidence"),
				rs.getString("enzyme_annotation.go_cellular_component_ref"),
				rs.getString("external_resource.genbank_gene_id"),
				rs.getString("external_resource.other_genbank_gene_id"),
				rs.getString("external_resource.uniprot_id"),
				rs.getString("external_resource.other_uniprot_id"),
				rs.getString("external_resource.genbank_protein_id"),
				rs.getString("external_resource.refseq_protein_id"),
				rs.getString("external_resource.jgi_id"),
				rs.getString("external_resource.broad_id"),
				rs.getString("external_resource.literature_pmid"),
				rs.getString("external_resource.structure_pmid"),
				rs.getString("external_resource.sequence_pmid"),
				rs.getString("external_resource.pdb_id"),
				rs.getString("external_resource.structure_determination_method"),
				rs.getString("protein_feature.signal_peptide_predicted"),
				rs.getString("protein_feature.n_terminal_experimental"),
				rs.getString("protein_feature.molecular_weight_experimental"),
				rs.getString("protein_feature.molecular_weight_predicted"),
				rs.getString("protein_feature.protein_length"),
				rs.getString("protein_feature.cbd"),
				rs.getString("protein_feature.glycosylation"),
				rs.getString("dna_sequence.genbank_gene_id"),
				rs.getString("dna_sequence.dna_seq"),
				rs.getString("protein_sequence.protein_id"),
				rs.getString("protein_sequence.protein_seq"),
				rs.getString("species_list.taxonomic"),
				rs.getString("species_list.phylogeny"),
				rs.getString("ec_annotation.common_name"),
				rs.getString("ec_annotation.alternate_names"),
				rs.getString("ec_annotation.definition"));
		
		return arow;
	}
}
