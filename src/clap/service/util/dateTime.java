package clap.service.util;

public class dateTime {
	public static String currenttime() {
		
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf = new
		java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String currenttime = sdf.format(dt);
		
		return currenttime;
	}
}