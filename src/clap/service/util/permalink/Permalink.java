package clap.service.util.permalink;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dsrg.soenea.service.logging.Logging;

public class Permalink {
	Pattern pattern;
	public Pattern getPattern() {
		return pattern;
	}

	String dispatcher;
	Attribute[] attributes;
	public Permalink(String pattern, String dispatcher, Attribute[] attributes) {
		super();
		this.pattern = Pattern.compile(pattern);
		this.dispatcher = dispatcher;
		this.attributes = attributes;	
	}
	public boolean matches(CharSequence uri) {
		Matcher m = pattern.matcher(uri);
		return m.matches();
	}
	
	public String getDispatcher() {	
		return dispatcher;
	}
	public void setDispatcher(String dispatcher) {
		this.dispatcher = dispatcher;
	}
	
	public Map<String, Object> getMatchedAttributes(CharSequence uri) {
		StringWriter sw = new StringWriter();
		PrintWriter buffer = new PrintWriter(sw);
		
		Matcher m = pattern.matcher(uri);
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(m.matches()) {
				buffer.println("Permalink Proccessing " + attributes.length + " attributes");
				for(int i = 0; i < attributes.length; i++) {
					buffer.println("\tChecking for attribute: " + attributes[i].attribute);
					String result = m.group(i+1);
					buffer.println("\t\t"+result);
					if(result != null && !result.equals("")) {
						if(attributes[i].split != null) {
							buffer.println("\t\tAdding Array: "+Arrays.toString(result.split(attributes[i].split)));
							map.put(attributes[i].attribute, result.split(attributes[i].split));
						} else {
							buffer.println("\t\tAdding: "+result);
							map.put(attributes[i].attribute, result);
						}
					} else if(attributes[i].defaultAttribute != null && !attributes[i].defaultAttribute.isEmpty()) {
                        buffer.println("\t\tUsing default value: "+attributes[i].defaultAttribute);
						map.put(attributes[i].attribute, attributes[i].defaultAttribute);
					} else {
                        buffer.println("\t\tUsing null value");
						map.put(attributes[i].attribute, null);
					}
				}
			}
		} finally {
			buffer.flush();
			Logging.log(Level.FINE, sw.toString());
		}
		return map;
	}

	public static class Attribute {
		String attribute;
		String defaultAttribute;
		String split;
		public Attribute(String attribute, String defaultAttribute, String split) {
			this.attribute = attribute;
			this.defaultAttribute = defaultAttribute;
			this.split = split;
		}
	}

}


