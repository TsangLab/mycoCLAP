/**
 * This is the interface to the systems application log.
 */

package clap.service.applicationlog;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.helper.Helper;

import clap.service.applicationlog.request.Request;
import clap.service.applicationlog.requestparametermap.RequestParamMap;
import clap.app.dispatcher.SessionTrackingDispatcher;

public class ApplicationLogging {
	
	/**
	 * Main interface function for application logging. Calls trackSession and trackRequest.
	 *
	 *@param Helper myHelper
	 */
	public static void trackApplicationLog(Helper myHelper, SessionTrackingDispatcher dispatcher) throws SQLException, MapperException {
		trackSession(myHelper);
		trackRequest(myHelper);
		trackDispatcher(dispatcher);
	}

	/**
	 * Inits Session object used for application Logging, stored in user session.
	 * This should be called by every dispatcher.
	 * Stores as session attribute as "LogSession"
	 *
	 *@param Helper myHelper
	 */
	public static void trackSession(Helper myHelper) throws SQLException, MapperException {

	}

	/**
	 * Inits Request object used for application logging, stored as thread local.
	 * This should be called by every dispatcher.
	 *
	 *@param Helper myHelper
	 */

	public static void trackRequest(Helper myHelper) throws MapperException, SQLException {

		RequestParamMap map = (RequestParamMap)myHelper.getRequestAttribute("REQUESTPARAMLOGSTRING");

		Request myTrackerRequest = RequestTracker.getRequest();

		if(myTrackerRequest == null) {
			map.setRequest(myTrackerRequest);
			myTrackerRequest.setRequestParamMap(map);
			RequestTracker.setRequest(myTrackerRequest);
		}
	}

	public static void trackDispatcher(
			SessionTrackingDispatcher sessionTrackingDispatcher) throws SQLException, MapperException {
	}

}
