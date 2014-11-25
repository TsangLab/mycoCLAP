package clap.app.taglib.function;

public class Registry
{
    public static String getString(String key) {
        try {
            return org.dsrg.soenea.service.Registry.getProperty(key);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
