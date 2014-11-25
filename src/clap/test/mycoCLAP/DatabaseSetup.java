package clap.test.mycoCLAP;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.role.impl.GuestRole;
import org.dsrg.soenea.service.tdg.UniqueIdTableTDG;
import org.dsrg.soenea.service.tdg.UserTDG;
import org.dsrg.soenea.service.threadLocal.DbRegistry;
import org.dsrg.soenea.uow.UoW;

import clap.dom.model.role.impl.AdminRole;
import clap.dom.model.role.impl.UserRole;

public abstract class DatabaseSetup {
	public static void main(String[] args) throws Exception {
		setupLogging();
		dropAllTables();
		createAllTables();
		createSpecialCaseObjects();
	}

	public static void setup() throws SQLException, MapperException, InstantiationException, IllegalAccessException
	{
		setupFixtures();
	}

	public static void setupFixtures() throws SQLException, MapperException, InstantiationException, IllegalAccessException
	{
		startTransaction();
		createAllTablesNoCommit();
		createSpecialCaseObjectsNoCommit();
		finishTransaction();
	}


	public static void createSpecialCaseObjects() throws SQLException, MapperException, InstantiationException, IllegalAccessException
	{
		startTransaction();
		createSpecialCaseObjectsNoCommit();
		finishTransaction();
	}

	public static void createSpecialCaseObjectsNoCommit() throws MapperException, SQLException
	{
        final long rootId = UserTDG.getMaxId();
        final long guestId = UserTDG.getMaxId();
        final long devId = UserTDG.getMaxId();

		List<IRole> rootRoles = new Vector<IRole>();
		rootRoles.add(new GuestRole());
		rootRoles.add(new UserRole());
		rootRoles.add(new AdminRole());

		List<IRole> devRoles = new Vector<IRole>();
		devRoles.add( new UserRole() );
		devRoles.add( new GuestRole() );

		List<IRole> guestRoles = new Vector<IRole>();
		guestRoles.add(new GuestRole());

        
	}

	public static void teardown() throws SQLException, MapperException, InstantiationException, IllegalAccessException
	{
		startTransaction();
		dropAllTablesNoCommit();
		finishTransaction();
	}

	/**
	 * The imporant distinction between this and teardown() is that we do not drop tables.
	 * @throws Exception
	 * @throws IOException
	 */
	public static void teardownMinimal() throws IOException, Exception {
		UoW.newCurrent();
	}

	/* NOTE: do NOT add any other crap setup code- this method is for creating tables!
	 */
	public static void createAllTablesNoCommit() throws SQLException
	{		
		try {
			UniqueIdTableTDG.createTable();
		} catch (SQLException e) {
			e.printStackTrace();
			// table already exists
		}
		
	}

	/* NOTE: do NOT add any other init code- this method is for CREATING TABLES
	 */
	public static void createAllTables() throws SQLException, MapperException, InstantiationException, IllegalAccessException {
		startTransaction();
		createAllTablesNoCommit();
	}

	/*
	 * DO NOT add
	 */
	public static void dropAllTablesNoCommit() throws SQLException
	{
		;
	}

	public static void dropAllTables() throws SQLException {
		DbRegistry.getDbConnection().setAutoCommit(false);
		dropAllTablesNoCommit();
		DbRegistry.getDbConnection().commit();
	}


	public static void startTransaction() throws SQLException {
		DbRegistry.getDbConnection().setAutoCommit(false);
		DbRegistry.getDbConnection().createStatement().execute("Start Transaction");
		UoW.newCurrent();
	}

	public static void finishTransaction() throws MapperException, InstantiationException, IllegalAccessException, SQLException
	{
		
	}

	public static void setupLogging() {
	}
}
