package clap.dom.model.literatureabstract.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.dsrg.soenea.domain.MapperException;

import clap.dom.model.literatureabstract.LiteratureAbstract;
import clap.dom.model.literatureabstract.tdg.LiteratureAbstractFinder;

public class LiteratureAbstractInputMapper {
	public static LiteratureAbstract findLiteratureAbstractByPubmedId(String pubmedId) throws SQLException,
			MapperException {		
		ResultSet rs = LiteratureAbstractFinder.findLiteratureAbstractByPubmedId(pubmedId);
		if (!rs.next())
			return null;		
		
		LiteratureAbstract e = getLiteratureAbstract(rs);
		rs.close();
		return e;
	}

	public static ArrayList<LiteratureAbstract> findAllLiteratureAbstract() throws SQLException,
			MapperException {
		ResultSet rs = LiteratureAbstractFinder.findAllLiteratureAbstract();
		ArrayList<LiteratureAbstract> e = new ArrayList<LiteratureAbstract>();
		
		while (rs.next()) {			
			LiteratureAbstract arow = getLiteratureAbstract(rs);
			e.add(arow);
		}
		rs.close();
		return e;
	}
	
	public static LiteratureAbstract getLiteratureAbstract(ResultSet rs) throws SQLException {
		LiteratureAbstract arow = new LiteratureAbstract(
				rs.getLong("id"),
				rs.getString("pubmed_id"),
				rs.getString("source"),
				rs.getString("title"),
				rs.getString("author"),
				rs.getString("address"),
				rs.getString("abstract"));
		return arow;
	}

}
