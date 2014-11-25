package clap.dom.model.ecannotation;

import org.dsrg.soenea.domain.DomainObject;

public class EcAnnotation extends DomainObject<Long>{
	
	String ecNumber;
	String commonName;	
	String ecSystematicName;
	String alternateName;
	String definition;
	
	public EcAnnotation(Long id, String ecNumber, String commonName, 
			String ecSystematicName, String alternateName, String definition) {
		super(id, 0);
		this.ecNumber = ecNumber;
		this.commonName = commonName;
		this.ecSystematicName = ecSystematicName;
		this.alternateName = alternateName;
		this.definition = definition;
	}

	public String getEcNumber() {	return ecNumber;}
	public void setEcNumber(String ecNumber) {this.ecNumber = ecNumber;}
	
	public String getCommonName() {return commonName;	}
	public void setCommonName(String commonName) {this.commonName = commonName;	}
	
	public String getEcSystematicName() {return ecSystematicName;	}
	public void setEcSystematicName(String ecSystematicName) {this.ecSystematicName = ecSystematicName;	}
	
	public String getAlternateName() {return alternateName;	}
	public void setAlternateName(String alternateName) {this.alternateName = alternateName;	}
	
	public String getDefinition() {	return definition;	}
	public void setDefinition(String definition) {this.definition = definition;	}
}
