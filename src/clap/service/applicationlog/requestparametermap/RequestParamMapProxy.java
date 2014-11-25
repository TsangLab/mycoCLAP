/**
 * @author Marek Krajewski
 * @date 11th February 2010
 */

package clap.service.applicationlog.requestparametermap;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import clap.service.applicationlog.request.IRequest;

public class RequestParamMapProxy implements IRequestParamMap {
	
	private IRequest request;
	private RequestParamMap innerObject = null;

	public RequestParamMapProxy(IRequest request) {
		this.request = request;
	}

	protected RequestParamMap getInnerObject() {
		if(innerObject == null) 
		return null;
		return innerObject;
	}

	@Override
	public IRequest getRequest() {
		return getInnerObject().getRequest();
	}

	@Override
	public void setRequest(IRequest request) {
		getInnerObject().setRequest(request);

	}

	@Override
	public boolean containsValue(Object arg0) {
		return getInnerObject().containsValue(arg0);
	}

	@Override
	public Object get(Object arg0) {
		return getInnerObject().get(arg0);
	}

	@Override
	public Object remove(Object arg0) {
		return getInnerObject().remove(arg0);
	}

	@Override
	public Object remove(Object arg0, Object arg1) {
		return getInnerObject().remove(arg0, arg1);
	}

	@Override
	public int size() {
		return getInnerObject().size();
	}

	@Override
	public Collection values() {
		return getInnerObject().values();
	}

	@Override
	public void clear() {
		getInnerObject().clear();
	}

	@Override
	public boolean containsKey(Object arg0) {
		return getInnerObject().containsKey(arg0);
	}

	@Override
	public Set entrySet() {
		return getInnerObject().entrySet();
	}

	@Override
	public boolean isEmpty() {
		return getInnerObject().isEmpty();
	}

	@Override
	public Set keySet() {
		return getInnerObject().keySet();
	}

	@Override
	public void putAll(Map arg0) {
		getInnerObject().putAll(arg0);

	}

	@Override
	public Object put(Object arg0, Object arg1) {
		return getInnerObject().put(arg0, arg1);
	}

	@Override
	public Collection getCollection(Object key) {
		return getInnerObject().getCollection(key);
	}

	@Override
	public boolean putAll(Object key, Collection values) {
		return getInnerObject().putAll(key, values);
	}

}
