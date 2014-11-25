package clap.app;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dsrg.soenea.application.servlet.DispatcherServlet;
import org.dsrg.soenea.application.servlet.dispatcher.Dispatcher;
import org.dsrg.soenea.application.servlet.dispatcher.HttpServletHelper;
import org.dsrg.soenea.application.servlet.service.DispatcherFactory;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.service.MySQLConnectionFactory;
import org.dsrg.soenea.service.Registry;
import org.dsrg.soenea.service.authorization.ApplicationAuthorizaton;
import org.dsrg.soenea.service.logging.Logging;
import org.dsrg.soenea.service.threadLocal.DbRegistry;
import org.dsrg.soenea.service.threadLocal.ThreadLocalTracker;
import org.dsrg.soenea.uow.MapperFactory;
import org.dsrg.soenea.uow.UoW;

import clap.service.util.ip.IpFactory;

import clap.app.FrontController;

import clap.app.dispatcher.LoginDispatcher;
import clap.app.dispatcher.MultipartHttpServletHelper;
import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.Mycoclapuser;
import clap.dom.model.mycoclapuser.mappers.MycoclapuserInputMapper;
import clap.dom.model.mycoclapuser.mappers.MycoclapuserOutputMapper;
import clap.service.applicationlog.requestparametermap.RequestParamMap;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;
import clap.service.util.FileUploadUtil;

public class FrontController extends DispatcherServlet {
	private static final Log log = LogFactory.getLog(FrontController.class);

	private String defaultDispatcher;
	private static final String XFORWARDEDFOR = "X-Forwarded-For";
    private static final String XFORWARDEDHOST = "X-Forwarded-Host";
	
	private static final int MAX_FILE_MEMORY_SIZE = 1024*90; 	// bigger files written to disk
	public static final int MAX_FILE_SIZE = 1024*1024*2000; 	// bigger files rejected
	private static final int MAX_REQUEST_SIZE = 1024*1024*2000; // overall size of request; bigger is rejected
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		try {	
			this.getServletContext().setAttribute("urlbase", Registry.getProperty("urlbase"));
		} catch (Exception e) {
			System.out.println("Dying horribly because there is no urlbase defined in MyResources.properties. It should be the absolute url to access this servlet.");
			e.printStackTrace();
		}
		
		try {
			defaultDispatcher = Registry.getProperty("defaultDispatcher");
		} catch (Exception e) {
			System.out.println("Dying horribly because there is no default dispatcher set. this might theoretically be 'clap.app.dispatcher.DisplayDataDispatcher' but we're putting it in MyResources.properties in case it changes (hopefully we'll use permalink solution soon).");
			e.printStackTrace();
		}
		
		this.getServletContext().setAttribute("realPath", getServletContext().getRealPath("."));
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final String LOGGING_STRING = "MycoCLAP";
	private static int count = 0;
	@Override
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Helper helper = null;
		
		Logging.setLoggerString(LOGGING_STRING);
		for (Handler handler : Logger.getLogger(LOGGING_STRING).getHandlers())
			Logger.getLogger(LOGGING_STRING).removeHandler(handler);
		Handler consoleHandler = new ConsoleHandler();
		consoleHandler.setLevel(Level.ALL);
        Logger.getLogger(LOGGING_STRING).addHandler(consoleHandler);
        Logger.getLogger(LOGGING_STRING).setLevel(Level.ALL);
		
        request.setAttribute("requestURI", request.getRequestURI());
        request.getSession().setMaxInactiveInterval(60*60);

		request.setCharacterEncoding("UTF-8");
				
		/*
		 * get multipart (fileupload)
		 */
		try {
			boolean isMultipartContent = ServletFileUpload.isMultipartContent(request);
			if(isMultipartContent)  helper = new MultipartHttpServletHelper(request);
			else helper = new HttpServletHelper(request);
			helper.setRequestAttribute("realPath", getServletContext().getRealPath("."));
			new FileUploadUtil((String)helper.getRequestAttribute("realPath"));
			
			setRemoteIP(request, helper);
            setRemoteHost(request, helper);
			
			String commandName;
			RequestParamMap requestParamMap = new RequestParamMap(null);
			if (isMultipartContent) {
				Logging.log(Level.INFO, "Form is multipart");

				final Map<String, FileItem> fileItems = new Hashtable<String, FileItem>();
				final Map<String, Object> formItems = new Hashtable<String, Object>();

				final List<FileItem> items = getMultipartFileItems(request);
				getMultipartFileItemsAndParameters(items, fileItems, formItems);
				commandName = getCommandName(formItems);
				helper.setRequestAttribute(MultipartHttpServletHelper.FORM_ITEM_STRING, formItems);
				helper.setRequestAttribute(MultipartHttpServletHelper.FILE_ITEM_STRING, fileItems);
				requestParamMap.putAll(formItems);
			} else {
				for(Object key: request.getParameterMap().keySet()) {
				    if ((""+key).toLowerCase().contains("password"))
				        continue;
					requestParamMap.putAll(key, Arrays.asList(request.getParameterValues(key.toString())));
				}
				commandName = getCommandName(helper);
			}
		} catch (Exception e){
			e.printStackTrace();
		}
		
		MySQLConnectionFactory connFactory = new MySQLConnectionFactory(null, null, null, null);
		try {
			connFactory.defaultInitialization();
		} catch (SQLException e) {
			throw new IOException(e);
		}
		try {
			DbRegistry.setTablePrefix(Registry.getProperty("mySqlTablePrefix"));
		} catch (Exception e) {
			throw new ServletException(e);
		}
		
		DbRegistry.setConFactory(connFactory);
    	MycoclapuserTDG.addDatabasePrefixToUserTables();
		initMappings();
		
		try {
            request.setAttribute("myDefaultURL", Registry.getProperty("myDefaultURL"));
        } catch (Exception e) {
            throw new ServletException(e);
        }
		
        ApplicationAuthorizaton.setBasePath(getServletContext().getRealPath("."));
		
        try {
            IMycoclapuser user = (IMycoclapuser)request.getSession().getAttribute("CurrentUser");
            if (user == null) {
                user = MycoclapuserInputMapper.findUserByUsername("guest");
            }
            request.getSession().setAttribute("CurrentUser", user);

			String dispatcherName = getDispatcherName(request);		
			if (!ApplicationAuthorizaton.hasAuthority(dispatcherName, user.getRoles())) {
				if ( dispatcherName.equals(defaultDispatcher)) {
					Dispatcher dispatcher = new LoginDispatcher(); 
					dispatcher.init(request, response); 
					dispatcher.execute();	
				} else {
					throw new AccessDeniedException(String.format("Access Denied to '%s' for '%s'", dispatcherName, user.getUsername()));
				}			
			} else if ( !request.getRequestURI().contains("clap/GeneView/")
						&& dispatcherName.equals("clap.app.dispatcher.GeneViewDispatcher") ) {				
				String redirectUrl = "clap/GeneView/" + helper.getString("entryName");
				response.sendRedirect(redirectUrl);

			} else {
			
				Dispatcher dispatcher = DispatcherFactory.getInstance(dispatcherName);
				dispatcher.init(request, response);
				Logging.log(Level.FINE, (++count) + "   " + dispatcher.getClass().getCanonicalName());
				dispatcher.execute();
			}
		} catch (AccessDeniedException e) {
		    e.printStackTrace();
		    helper.setRequestAttribute("message", "seesion expired, please re-login!");
			request.getRequestDispatcher("/WEB-INF/jsp/sessionError.jsp").forward(request, response);
		} catch (Exception e) {
			request.setAttribute("errorMessage", e.getMessage());
			request.setAttribute("exception", e);
			e.printStackTrace();
			request.getRequestDispatcher(errorJSP).forward(request, response);
		}
	}
	
	
    private void setRemoteIP(HttpServletRequest request, Helper helper) throws Exception
    {
        //First check x-forwarded-for header
        final Enumeration<String> addresses = request.getHeaders(XFORWARDEDFOR);
        if(addresses == null || !addresses.hasMoreElements()){
            log.info( "IP obtained from Request.getRemoteAddress()  " + request.getRemoteAddr());
            helper.setSessionAttribute("ip", IpFactory.create(request.getRemoteAddr()));
        }
        else {
            while(addresses.hasMoreElements()) {
                String ip = addresses.nextElement();
                String[] ips = ip.split(",");
                for (String theIp : ips) {
                    String proxy = theIp.trim();
                    if(!proxy.equals("unknown") && !proxy.isEmpty()) {
                        log.info("IP from X-Forwarded-For header is set to " + proxy);
                        helper.setSessionAttribute("ip", IpFactory.create(proxy));
                        break;
                    }
                }
            }
        }
        if(helper.getSessionAttribute("ip") == null) {
            log.warn( "Client IP could not be obtained. Setting to localhost");
            helper.setSessionAttribute("ip", IpFactory.create("192.168.0.1"));
        }
    }
    private void setRemoteHost(HttpServletRequest request, Helper helper) throws Exception
    {
        //First check x-forwarded-for header
        final Enumeration<String> addresses = request.getHeaders(XFORWARDEDHOST);
        if(addresses == null || !addresses.hasMoreElements()){
            log.info( "Host obtained from Request.getRemoteHost()  " + request.getRemoteHost());
            helper.setSessionAttribute("remoteHost", request.getRemoteHost());
        }
        else {
            while(addresses.hasMoreElements()) {
                String host = addresses.nextElement();
                String[] hosts = host.split(",");
                for (String theHost : hosts) {
                    String proxy = theHost.trim();
                    if(!proxy.equals("unknown") && !proxy.isEmpty()) {
                        log.info("Host from X-Forwarded-Host header is set to " + proxy);
                        helper.setSessionAttribute("remoteHost", proxy);
                        break;
                    }
                }
            }
        }
        if(helper.getSessionAttribute("remoteHost") == null) {
            log.warn( "Client Host could not be obtained. Setting to localhost");
            helper.setSessionAttribute("remoteHost", "localhost");
        }
    }
	
	
	@Override
	protected void postProcessRequest(HttpServletRequest request, HttpServletResponse response) {
		try {
			DbRegistry.getDbConnection().close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		ThreadLocalTracker.purgeThreadLocal();
	}

	/**
	 * This tries to get the command (dispatcher) name from the request, first
	 * looking for a parameter, and then an attribute with the name 'dispatcher'.
	 * 
	 * @param request
	 * @return non-null and non-empty command name.
	 * @throws ServletException
	 * Whenever there is no command in the request, an Exception to that effect
	 * will be thrown.
	 */
	@Override
	protected String getDispatcherName(HttpServletRequest request) throws ServletException {
		HttpServletHelper helper = new HttpServletHelper(request);
		String parameterName = "dispatcher";
		String dispatcherName = request.getParameter(parameterName);
		if (dispatcherName != null && !dispatcherName.equals(""))
			return dispatcherName;
		dispatcherName = (String) helper.getAttribute(parameterName);
		if (dispatcherName != null && !dispatcherName.equals(""))
			return dispatcherName;
		return defaultDispatcher;
	}
	
	public static void initMappings()
	{
		MapperFactory factory = new MapperFactory();
        factory.addMapping(Mycoclapuser.class, MycoclapuserOutputMapper.class);
        UoW.initMapperFactory(factory);
		UoW.newCurrent();
	}	

	protected String getCommandName(Helper helper) throws Exception{
		String commandName = helper.getString("command");
		if(commandName == null || commandName.isEmpty()) commandName = (String)helper.getAttribute("command");
		if (commandName == null || commandName.equals("")) {
			if (defaultDispatcher == null) throw new Exception("HTTP attribute 'command' is missing.");
			else commandName = defaultDispatcher;
		}
		return commandName.trim();
	}

	protected String getCommandName(Map<String, Object> parameters) throws Exception{
		String commandName = (String)parameters.get("command");
		if (commandName == null || commandName.equals("")) {
			if (defaultDispatcher == null) throw new Exception("HTTP attribute 'command' is missing.");
			else commandName = defaultDispatcher;
		}
		return commandName;
	}
	
	/*
	 * get FileItems from form
	 */
	protected List<FileItem> getMultipartFileItems(HttpServletRequest request) throws FileUploadException
	{
		final DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(MAX_FILE_MEMORY_SIZE);
		final ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(MAX_REQUEST_SIZE);
		upload.setFileSizeMax(MAX_FILE_SIZE);
		final List<FileItem> items;
		items = upload.parseRequest(request);
		return items;
	}
	/**
	 * Filters the FileItems into separate hashmaps, one for actual files, one for regular form item parameters.
	 * Hides some dirty work
	 *
	 *@param items in
	 *@param fileItems out
	 *@param formItems out
	 *
	 * todo: move me into an appropriate helper-place
	 *
	 */
	@SuppressWarnings("unchecked")
	protected void getMultipartFileItemsAndParameters(final List<FileItem> items,
			final Map<String, FileItem> fileItems, final Map<String, Object> formItems) {
		for (FileItem item : items) {
			if (item.isFormField()) {
				// a bit of ugly if for example a <select multiple='multiple'>
				if (formItems.containsKey(item.getFieldName())) {
					Object values = formItems.get(item.getFieldName());
					if (values instanceof Collection == false) {
						String tmp = (String)values;
						values = new ArrayList<String>();
						formItems.put(item.getFieldName(), values);
						((Collection)values).add(tmp);
					}
					((Collection)values).add(item.getString());
				} else
					formItems.put(item.getFieldName(),	item.getString());
			} else {
				fileItems.put(item.getFieldName(),	item);
			}
		}
	}
	
}
