package clap.dom.model.mycodata;

import org.dsrg.soenea.domain.DomainObject;

public class MycoMetaData extends DomainObject<Long>{
	
	String columnHeader;	
	
	public MycoMetaData(Long id, String columnHeader) {
		super(id, 0);	
		this.columnHeader = columnHeader;
	}

	public String getColumnHeader() {return columnHeader;}
	public void setColumnHeader(String columnHeader) {this.columnHeader = columnHeader; }
	
}
