package clap.app.dispatcher;

import java.util.Collection;
import java.util.Hashtable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dsrg.soenea.application.servlet.dispatcher.HttpServletHelper;
import org.dsrg.soenea.domain.helper.Helper;

public class MultipartHttpServletHelper extends HttpServletHelper implements Helper {
	
	public static String FORM_ITEM_STRING = "formItems";
	public static String FILE_ITEM_STRING = "fileItems";

	private HttpServletRequest myRequest;

	public MultipartHttpServletHelper(HttpServletRequest myRequest) {
		super(myRequest);
		this.myRequest = myRequest;
	}

	@Override
	public String getString(String pName){
		Hashtable<String,Object> myMap = (Hashtable<String,Object>)getRequestAttribute(FORM_ITEM_STRING);
		if(!myMap.containsKey(pName)) return null;
		return myMap.get(pName).toString();
	}

	@Override
	public Long getLong(String pName) {
		Hashtable<String,Object> myMap = (Hashtable<String,Object>)getRequestAttribute(FORM_ITEM_STRING);
		return Long.parseLong(myMap.get(pName).toString());
	}

	@Override
	public String[] getValues(String pName){
		return (((Map<String, Collection<String>>)myRequest.getAttribute(FORM_ITEM_STRING)).get(pName)).toArray(new String[0]);
	}

}

