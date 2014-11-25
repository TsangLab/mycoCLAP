package clap.dom.model.literatureabstract;

import org.dsrg.soenea.domain.DomainObject;

public class LiteratureAbstract extends DomainObject<Long>{
	
	String pubmedId;
	String source;	
	String title;
	String author;
	String address;
	String litAbstract;
	
	public LiteratureAbstract(Long id, String pubmedId, String source, String title,
						String author, String address, String litAbstract) {
		super(id, 0);
		this.pubmedId = pubmedId;
		this.source = source;
		this.title = title;
		this.author = author;
		this.address = address;
		this.litAbstract = litAbstract;
	}

	public String getPubmedId() {return pubmedId;}
	public void setPubmedId(String pubmedId) {this.pubmedId = pubmedId;}
	
	public String getSource() {return source;	}
	public void setSource(String source) {this.source = source;	}
	
	public String getTitle() {return title;	}
	public void setTitle(String title) {this.title = title;	}
	
	public String getAuthor() {return author;	}
	public void setAuthore(String author) {this.author = author;	}
	
	public String getAddress() {return address;	}
	public void setAddress(String address) {this.address = address;	}
	
	public String getLitAbstract() {return litAbstract;	}
	public void setLitAbstract(String litAbstract) {this.litAbstract = litAbstract;	}
	
}
