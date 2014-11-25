package clap.dom.model.proteinfeature;

import org.dsrg.soenea.domain.DomainObject;

public class ProteinFeature extends DomainObject<Long>{
	
	Long enzymeEntryId;
	String signalPeptidePredicted;
	String nterminalExperimental;
	String molecularWtExperimental;
	String molecularWtPredicted;
	String proteinLength;
	String cbd;
	String glycosylation;
	
	public ProteinFeature(Long id, Long enzymeEntryId, 
			String signalPeptidePredicted, String nterminalExperimental,
			String molecularWtExperimental, String molecularWtPredicted, 
			String proteinLength, String cbd,
			String glycosylation) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.signalPeptidePredicted = signalPeptidePredicted;
		this.nterminalExperimental = nterminalExperimental;
		this.molecularWtExperimental = molecularWtExperimental;
		this.molecularWtPredicted = molecularWtPredicted;
		this.proteinLength = proteinLength;
		this.cbd = cbd;
		this.glycosylation = glycosylation;
	}

	public Long getEnzymeEntryId() {	return enzymeEntryId;}
	public void setEnzymeEntryId(Long enzymeEntryId) {this.enzymeEntryId = enzymeEntryId;}
	
	public String getSignalPeptidePredicted() {	return signalPeptidePredicted;}
	public void setSignalPeptidePredicted(String signalPeptidePredicted) {this.signalPeptidePredicted = signalPeptidePredicted;}
	
	public String getNTerminalExperimental() {	return nterminalExperimental;}
	public void setNTerminalExperimental(String nterminalExperimental) {this.nterminalExperimental = nterminalExperimental;}
	
	public String getMolecularWtExperimental() {return molecularWtExperimental;	}
	public void setMolecularWtExperimental(String molecularWtExperimental) {this.molecularWtExperimental = molecularWtExperimental;	}
	
	public String getMolecularWtPredicted() {return molecularWtPredicted;	}
	public void setMolecularWtPredicted(String molecularWtPredicted) {this.molecularWtPredicted = molecularWtPredicted;	}
	
	public String getProteinLength() {	return proteinLength;	}
	public void setProteinLength(String proteinLength) {this.proteinLength = proteinLength;	}
	
	public String getCbd() {	return cbd;	}
	public void setCbd(String cbd) {this.cbd = cbd;	}
	
	public String getGlycosylation() {	return glycosylation;	}
	public void setGlycosylation(String glycosylation) {this.glycosylation = glycosylation;	}
}
