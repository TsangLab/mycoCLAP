package clap.dom.model.accesslogging.tdg;

import java.sql.*;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

public class AccessLoggingFinder
{
    public static ResultSet findAccessLoggingByMaxId()
        throws SQLException
    {
        Connection con = DbRegistry.getDbConnection();
        PreparedStatement ps = con.prepareStatement(SELECT_ACCESSLOGGINGBYMAXID_SQL);
        return ps.executeQuery();
    }

    public static String SELECT_ACCESSLOGGINGBYMAXID_SQL = "SELECT * FROM access_logging WHERE id=(select max(id) from access_logging)";

}