package clap.service.util;

public class geneOntologyId {
	public static String addPrefix(String goId) {
		
		String prefixGoId = goId;	
		
		if ( goId != null ) {
			if (goId.matches("GO:[0-9]+")) 
				prefixGoId = goId;			
			else if( goId.matches("[0-9]+")) {
				String goPrefix = "GO:";
				int length = goId.length();
				
				for (int i=0; i<7-length; i++) 
					prefixGoId = "0" + prefixGoId;
				
				prefixGoId = goPrefix + prefixGoId;			
			}
		}
		
		return prefixGoId;
	}
	
}
