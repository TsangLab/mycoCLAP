package clap.dom.model.accesslogging.mappers;

import clap.dom.model.accesslogging.AccessLogging;
import clap.dom.model.accesslogging.tdg.AccessLoggingFinder;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.dsrg.soenea.domain.MapperException;

public class AccessLoggingInputMapper
{
    public static AccessLogging findAccessLoggingByMaxId()
        throws SQLException, MapperException
    {
        ResultSet rs = AccessLoggingFinder.findAccessLoggingByMaxId();
        if(!rs.next())
        {
            return null;
        } else
        {
            AccessLogging c = new AccessLogging(rs.getLong("id"), 
            									rs.getString("ip"), 
            									rs.getString("address"), 
            									rs.getString("user"), 
            									rs.getString("date_time"), 
            									rs.getString("command"),
            									rs.getString("parameters"));
            rs.close();
            return c;
        }
    }
}