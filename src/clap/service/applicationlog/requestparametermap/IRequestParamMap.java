/**
 * @author Marek Krajewski
 * @date 11th February 2010
 */

package clap.service.applicationlog.requestparametermap;

import java.util.Collection;

import org.apache.commons.collections.MultiMap;

import clap.service.applicationlog.request.IRequest;

public interface IRequestParamMap extends MultiMap {
	public IRequest getRequest();
	public void setRequest(IRequest request);
	public boolean putAll(Object key, Collection values);
	public Collection getCollection(Object key);
}
