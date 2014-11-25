package clap.test.mycoCLAP;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.antlr.stringtemplate.StringTemplate;
import org.dsrg.soenea.service.logging.SQLLogger;
import org.dsrg.soenea.service.tdg.UniqueIdTableTDG;
import org.dsrg.soenea.service.threadLocal.DbRegistry;

import clap.test.mycoCLAP.DatabaseDump;

public class DatabaseDump {
    /**
     * Gets an SQL statement out of a PreparedStatement.
     * We do some dirty hacking here relying on PS's toString. This is terrible, and so should
     * never be used in production code. It does make life easier in the TestCases though
     * and we're sure to throw in case of mismatch.
     *
     * A more proper alternative would involve using an external mysqldump perhaps.
     *
     * @param ps
     * @return
     * @throws SQLException
     */
    private static String toString(PreparedStatement ps) throws SQLException
    {
        Pattern pattern = Pattern.compile(String.format(".*?: (.*)", ps.getClass().getCanonicalName().replace(".", "\\.")));
        String string = ps.toString();
        Matcher matcher = pattern.matcher(string);
        if (!matcher.find())
            throw new SQLException("Failed to parse SQL statement from PreparedStatement: " + string);
        String sql = matcher.group(1);
        return sql;
    }

    private Connection conn;
    DatabaseMetaData dbMeta;
    public DatabaseDump(Connection conn)
    {
        this.conn = conn;
    }
    private String showCreateTable(String tableName) throws SQLException
    {
        StringTemplate st = new StringTemplate("SHOW CREATE TABLE $tableName$");
        st.setAttribute("tableName", tableName);
        PreparedStatement ps = conn.prepareStatement(st.toString());
        try {
            ResultSet rs = SQLLogger.processQuery(ps);
            if (!rs.next())
                throw new SQLException("No such table: " + tableName);
            String createTable = rs.getString("Create Table"); // column name was discovered via VOODOO
            return createTable;
        } finally {
            try { ps.close(); } catch (SQLException e) { }
        }
    }
    private String truncTable(String tableName)
    {
        StringTemplate st = new StringTemplate("TRUNCATE TABLE $tableName$");
        st.setAttribute("tableName", tableName);
        return st.toString();
    }
    private List<String> dumpTable(String tableName) throws SQLException
    {
        List<String> placeHolders = new ArrayList<String>();
        List<String> columns = new ArrayList<String>();
        ResultSet columnsRS = dbMeta.getColumns(null, null, tableName, null);
        while (columnsRS.next()) {
            placeHolders.add("?");
            columns.add("`" + columnsRS.getString("COLUMN_NAME") + "`");
        }
        final int columnCount = columns.size();

        StringTemplate selectST = new StringTemplate("SELECT $columns; separator=\",\"$ FROM $tableName$");
        selectST.setAttribute("tableName", tableName);
        selectST.setAttribute("columns", columns);
        PreparedStatement selectPS = conn.prepareStatement(selectST.toString());
        System.out.println(selectPS);
        ResultSet selectRS = selectPS.executeQuery();

        StringTemplate insertST = new StringTemplate("INSERT INTO $tableName$ ($columns; separator=\",\"$) VALUES($values; separator=\",\"$)");
        insertST.setAttribute("tableName", tableName);
        insertST.setAttribute("columns", columns);
        insertST.setAttribute("values", placeHolders);

        List<String> rows = new ArrayList<String>();
        while (selectRS.next()) {
            PreparedStatement ps = conn.prepareStatement(insertST.toString());
            try {
                for (int i = 0; i < columnCount; ++i) {
                    Object value = selectRS.getObject(1+i);
                    ps.setObject(1+i, value);
                }
                rows.add(toString(ps));
            } finally {
                try { ps.close(); } catch (SQLException e) { }
            }
        }
        return rows;
    }
    public List<String> dump() throws SQLException
    {
        long before = System.currentTimeMillis();

        List<String> truncTableStatements = new ArrayList<String>();
        List<String> insertStatements = new ArrayList<String>();

        Connection conn = DbRegistry.getDbConnection();
        dbMeta = conn.getMetaData();

        String[] types = { "TABLE" };
        ResultSet rs = dbMeta.getTables(null, null, null, types);
        List<String> tableNames = new ArrayList<String>();
        try {
            while (rs.next()) {
                String tableName = rs.getString("TABLE_NAME");
                if(tableName.equals(UniqueIdTableTDG.TABLE_NAME)) continue;
                tableNames.add(tableName);

                truncTableStatements.add(truncTable(tableName));
                insertStatements.addAll(dumpTable(tableName));
            }
        } finally {
            try { rs.close(); } catch (SQLException e) { }
        }
        List<String> statements = new ArrayList<String>();
        statements.addAll(truncTableStatements);
        statements.addAll(insertStatements);

        long after = System.currentTimeMillis();

        System.out.println(String.format("Dumped %d rows from %d tables in %dms", insertStatements.size(), truncTableStatements.size(), (after-before)));
        return statements;
    }
}
