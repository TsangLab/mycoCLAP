package clap.test;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.role.impl.GuestRole;
import org.dsrg.soenea.service.MySQLConnectionFactory;
import org.dsrg.soenea.service.Registry;
import org.dsrg.soenea.service.logging.Logging;
import org.dsrg.soenea.service.threadLocal.DbRegistry;
import org.dsrg.soenea.uow.UoW;

import clap.app.FrontController;
import clap.dom.command.LoginCommand;
import clap.dom.model.mycoclapuser.MycoclapuserFactory;
import clap.dom.model.role.impl.AdminRole;
import clap.dom.model.role.impl.UserRole;
import clap.dom.model.mycoclapuser.tdg.MycoclapuserTDG;

public class DatabaseSetup {
    public static void main(String[] args) throws Exception {
    	setupLogging();
        setupDbConnection();
        setupUoW();
        dropTables();
        createTables();
        createFixtures();
    }
    public static void setupLogging() {
        Logging.setLoggerString(FrontController.LOGGING_STRING);
        for (Handler handler : Logger.getLogger(FrontController.LOGGING_STRING).getHandlers())
            Logger.getLogger(FrontController.LOGGING_STRING).removeHandler(handler);
        Handler consoleHandler = new ConsoleHandler();
        consoleHandler.setLevel(Level.ALL);
        Logger.getLogger(FrontController.LOGGING_STRING).addHandler(consoleHandler);
        Logger.getLogger(FrontController.LOGGING_STRING).setLevel(Level.ALL);
        Logger.getLogger("").addHandler(consoleHandler);
        Logger.getLogger("").setLevel(Level.ALL);
    }
    public static void setupDbConnection() throws Exception {
        MySQLConnectionFactory connFactory = new MySQLConnectionFactory(null, null, null, null);
        connFactory.defaultInitialization();
        DbRegistry.setTablePrefix(Registry.getProperty("mySqlTablePrefix"));
        DbRegistry.setConFactory(connFactory);
    	MycoclapuserTDG.addDatabasePrefixToUserTables();
    }
    public static void setupUoW() throws Exception {
        FrontController.initMappings();
    }
    public static void createFixtures() throws Exception {
        UoW.newCurrent();
        MycoclapuserFactory.createNew("guest",
                        LoginCommand.encryptPassword("guest"),
                        Arrays.asList((IRole)new GuestRole()),
                        "guest",
                        "guest",
                        "guest@guest",
                        Calendar.getInstance());
        MycoclapuserFactory.createNew("user",
                        LoginCommand.encryptPassword("user1234"),
                        Arrays.asList((IRole)
                            new GuestRole(),
                            new UserRole()
                        ),
                        "user",
                        "user",
                        "user@user",
                        Calendar.getInstance());
        MycoclapuserFactory.createNew("admin",
                        LoginCommand.encryptPassword("admin1234"),
                        Arrays.asList((IRole)
                            new GuestRole(),
                            new UserRole(),
                            new AdminRole()
                        ),
                        "admin",
                        "admin",
                        "admin@admin",
                        Calendar.getInstance());
        
        UoW.getCurrent().commit();
        UoW.newCurrent();
    }
    public static void createTables() throws SQLException {
    	MycoclapuserTDG.createUserRoleTable();
        MycoclapuserTDG.createTable();
    }
    public static void dropTables() throws SQLException {
        try { MycoclapuserTDG.dropUserRoleTable(); } catch (SQLException e) {}
        try { MycoclapuserTDG.dropTable(); } catch (SQLException e) {}
        // Currently we won't drop these tables since even in testing they contain a lot of data
        // and their structure is otherwise fixed in any case.
		//        GattributeTDG.createTable();
		//        GclassTDG.createTable();
		//        GdataTDG.createTable();
		//        GrelationshipTDG.createTable();
    }
}
