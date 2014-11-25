package clap.service.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SequenceFetch {
	
	public static String sequenceFromPubMed(String seqId) {
		URL url;
		
		try {			
			if(seqId.contains("http")) {
		        // the format of dnaId should be "http://www.ncbi.nlm.nih.gov/nuccore/134081809?from=154037&to=156562&report=gbwithparts"
				Pattern p = Pattern.compile("(^.*/nuccore/)(.*)(\\?from=)(\\d+)(.*to=)(\\d+)");
				Matcher m = p.matcher(seqId);
				String start = "";
				String stop = "";
				if (m.find()) {		
					start = m.group(4); System.out.println( m.group(4));
			        stop = m.group(6); System.out.println( m.group(6));
				}
				seqId = m.group(2); System.out.println( m.group(2));
				
				url = new URL("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="
						+ seqId
						+ "&seq_start="
						+ start
						+ "&seq_stop="
						+ stop
						+ "&rettype=fasta&retmode=text");	
			} else 			
				url = new URL("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=" 
						+ seqId
						+ "&rettype=fasta&retmode=text");
			
			return fetchSequence (url);
		} catch (MalformedURLException e) {
			return null;
        } 
	}
	
	public static String sequenceFromUniProt(String uniProtId) {
		URL url;
		
		try {
			url = new URL("http://www.uniprot.org/uniprot/"
					+ uniProtId
					+ ".fasta");			
			return fetchSequence (url);
		} catch (MalformedURLException e) {
			return null;
        } 
	}
	
	private static String fetchSequence (URL url) {
		URLConnection conn;
		try {
			conn = url.openConnection();
		
			InputStream in = conn.getInputStream();
			BufferedReader br = new BufferedReader(
			                      new InputStreamReader(in, "UTF-8"));
			
			String inputLine;
			String sequence = "";
			while ((inputLine = br.readLine()) != null) {				
				if(inputLine.matches("^>.*"))
					continue;
				else 
					sequence += inputLine.replaceAll("[\r\n]+$", "");
			}
			br.close();
			in.close();
			
			if (sequence.equals(""))
				return null;
			else			
				return sequence;
		} catch (IOException e) {
			return null;
		}
	}
}