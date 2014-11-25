/**
 * @author Marek Krajewski
 * @date 11th February, 2010
 */

package clap.service.applicationlog.requestparametermap;

import org.apache.commons.collections.map.MultiValueMap;

import clap.service.applicationlog.request.IRequest;

public class RequestParamMap extends MultiValueMap implements IRequestParamMap{
	private IRequest request;

	public RequestParamMap(IRequest request) {
		super();
		this.request = request;
	}

	public IRequest getRequest() {
		return request;
	}
	public void setRequest(IRequest request) {
		this.request = request;
	}

}
