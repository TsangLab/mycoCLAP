package clap.service.applicationlog;

import org.dsrg.soenea.service.threadLocal.ThreadLocalTracker;

import clap.service.applicationlog.request.Request;

public class RequestTracker {
	
	private static Request requestInit = null;
	private static ThreadLocalRequest request = new ThreadLocalRequest();

	private static class ThreadLocalRequest extends ThreadLocal<Request> {
		public ThreadLocalRequest() {
			super();
			ThreadLocalTracker.registerThreadLocal(this);
		}
		@Override
		public Request initialValue() {
			return requestInit;
		}
	}

	public static Request getRequest() {
		return request.get();
	}
	public static void setRequest(Request myRequest) {
		request.set(myRequest);
	}
}
