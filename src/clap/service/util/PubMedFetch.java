package clap.service.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PubMedFetch {
	
	public static HashMap<String, String> referenceInfo(String pmid) {
		URL url;
		String title = "";
        String author = "";
        String source = "";
        String address = "";
        String abstractText = "";
        String curAuthor = "";
        String inputLine;
		Boolean isAuthorList = false;
		HashMap<String, String> ref = new HashMap<String, String>();
        ArrayList<String> authors = new ArrayList<String>();
			
        try {
 	   		// xml
        	// get URL content
     	    // retmode: xml, html, text, asn.1
     	    // rettype: uilist, abstract, citation, medline, full
   			url = new URL("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" 
   							+pmid
   							+"&retmode=xml&rettype=abstract");
   			URLConnection conn = url.openConnection();	    
   			InputStream in = conn.getInputStream();
   			BufferedReader br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
   			
   			while ((inputLine = br.readLine()) != null) {
   				if (inputLine.contains("<ArticleTitle>")) {
   					title = inputLine.replaceAll("^\\s*<ArticleTitle>", "");
   					title = title.replaceAll("</ArticleTitle>*", "");
   				} else if (inputLine.contains("<AbstractText>")) {
   					abstractText = inputLine.replaceAll("^\\s*<AbstractText>", "");
   					abstractText = abstractText.replaceAll("^*</AbstractText>", ""); 
   				} else if (inputLine.contains("<Affiliation>")) {
   					address = inputLine.replaceAll("^\\s*<Affiliation>", "");
   					address = address.replaceAll("</Affiliation>", "");
   				} else if (inputLine.contains("<AuthorList")) {
   					isAuthorList = true;
   				} else if (inputLine.contains("</AuthorList>")) {
   					isAuthorList = false;
   				} else if (isAuthorList) {
   					if (inputLine.contains("<LastName>")) {
   						curAuthor = inputLine.replaceAll("^\\s*<LastName>", "");
   						curAuthor = curAuthor.replaceAll("</LastName>", "");
   					} else if (inputLine.contains("<Initials>")) {
   						String initials = inputLine.replaceAll("^\\s*<Initials>", "");
   						initials = initials.replaceAll("</Initials>", "");
   						curAuthor += " " + initials;	
   						authors.add(curAuthor);
   						curAuthor = "";
   					}
   				}
			}
   			br.close();			
	   			
   			// retrieve in medline format to get source which is easy to get than xml format
        	url = new URL("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" 
						+pmid
						+"&retmode=text&rettype=medline");
			conn = url.openConnection();	
			in = conn.getInputStream();
			br = new BufferedReader(new InputStreamReader(in, "UTF-8"));								
			Pattern pattern = Pattern.compile("^\\s*SO\\s*-\\s*.*");			
			
			while ((inputLine = br.readLine()) != null) {
				Matcher matcher = pattern.matcher(inputLine);					
				if (matcher.matches())
					source = inputLine.replaceAll("^\\s*SO\\s*-\\s*", "");						
			}			
			br.close();			
   				   			
   			for (int i=0; i < authors.size(); i++) {
   				if ( i == 0 )
   					author += authors.get(i);
   				else if ( i == (authors.size() - 1) )
   					author += ", " + authors.get(i) + ".";
   				else
   					author += ", " + authors.get(i);
   			}
   			
   			if ( title.equals("") 
   				&& author.equals("")
   				&& source.equals("")
   				&& address.equals("")
   				&& abstractText.equals("") )
   				ref = null;
   			else { 
	   			ref.put("title", title);
	   			ref.put("author", author);
	   			ref.put("source", source);
	   			ref.put("address", address);
	   			ref.put("abstractText", abstractText);
   			}
   			
   			in.close();
        } catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        return ref;
    }
	
}