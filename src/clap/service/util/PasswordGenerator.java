/**
  * @author Brendan Asselstine
  * @date Apr 29, 2009
**/

package clap.service.util;

public class PasswordGenerator   {

	public static String generate(int length) {
		String password = "";
		for (int i = 0; i < length; i++)
			password += randomAlpha();
		return password;
	}
	
	public static char randomAlpha() {
		int test = (int) (Math.random() * 3);
		if (test > 1) 
			return randomLetter();
		else
			return randomNumber();
	}
	
	public static char randomLetter() {
		int test = (int) (Math.random() * 2);
		if (test > 1)
			return (char) (65 + Math.random()*26);
		else
			return (char) (97 + Math.random()*26);
	}
	
	public static char randomNumber() {
		return (char) (48 + Math.random() * 10);
	}
	
}
