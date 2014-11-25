package clap.dom.model.goannotation;

import org.dsrg.soenea.domain.DomainObject;

public class GoAnnotation extends DomainObject<Long>{
	
	String goId;
	String name;	
	String termType;
	
	public GoAnnotation(Long id, String goId, String name, String termType) {
		super(id, 0);
		this.goId = goId;
		this.name = name;
		this.termType = termType;
	}

	public String getGoId() {return goId;}
	public void setGoId(String goId) {this.goId = goId;}
	
	public String getName() {return name;	}
	public void setName(String name) {this.name = name;	}
	
	public String getTermType() {return termType;	}
	public void setTermType(String termType) {this.termType = termType;	}
	
}
