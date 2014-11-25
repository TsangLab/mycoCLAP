package clap.dom.command.validator.source.impl;

import java.util.Map;
import java.util.Vector;

import org.dsrg.soenea.domain.command.validator.source.FieldSource;
import org.dsrg.soenea.domain.helper.Helper;

import clap.service.util.permalink.PermalinkFactory;


public class PermalinkSource extends FieldSource
{
    @Override
    public <Type> Type getData(Helper helper, Class<Type> returnType, String key) {
        Map<String, Object> linkattr = (Map<String, Object>)helper.getRequestAttribute(PermalinkFactory.PERMALINK_ATTRIBUTES);
        if (linkattr == null)
            return null;
        Object value = linkattr.get(key);		
        if(value == null) return null;
        if(returnType.equals(String.class))
            value = getString(key, linkattr);
        else if(returnType.equals(Long.class))
            value = getLong(key, linkattr);
        else if(returnType.equals(Long[].class) || long[].class.equals(returnType))
            value = getLongs(key, linkattr);
        else if(returnType.equals(long.class))
            value = getLong(key, linkattr);
        else if(returnType.equals(Integer.class))
            value = getInt(key, linkattr);
        else if(returnType.equals(int.class))
            value = getInt(key, linkattr);
        else if(returnType.equals(Boolean.class))
            value = getBoolean(key, linkattr);
        return (Type)value;
    }
    private String getString(String key, Map<String, Object> attr)
    {
        Object value = attr.get(key);
        if (value == null)
            return null;
        return value.toString();
    }
    private Long getLong(String key, Map<String, Object> attr)
    {
        String str = getString(key, attr);
        if (str == null)
            return null;
        return Long.parseLong(str);
    }
    
    private Long[] getLongs(String key, Map<String, Object> attr) {
    	if(attr.get(key).getClass().getComponentType() != null) {
			Vector<Long> values = new Vector<Long>();
			for(String s: (String[])attr.get(key)) {
				values.add(Long.parseLong(s));
			}
			return values.toArray(new Long[((String[])attr.get(key)).length]);
    	} else {
    		return new Long[] {getLong(key, attr)};
    	}
    }
    
    private Integer getInt(String key, Map<String, Object> attr)
    {
        String str = getString(key, attr);
        if (str == null)
            return null;
        return Integer.parseInt(str);
    }
    private Boolean getBoolean(String key, Map<String, Object> attr)
    {
        String str = getString(key, attr);
        if (str == null)
            return null;
        return Boolean.parseBoolean(str);
    }
}
