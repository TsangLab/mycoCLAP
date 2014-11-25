package clap.service.util;

public class HtmlContentParser {
	
	public static String removeHTML(String htmlString) {
		// Remove html break and replace New line 
		String noHTMLString = htmlString.replaceAll("\\<br>", "\n");		
		noHTMLString = noHTMLString.replaceAll("\\<br/>", "\n");
		
		// Remove HTML tag from java String
		noHTMLString = noHTMLString.replaceAll("\\<.*?>", "");		
		noHTMLString = noHTMLString.replaceAll("&.*?;","");
        return noHTMLString;
	}
	
}