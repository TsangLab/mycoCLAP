package clap.dom.command;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.command.CommandException;
import org.dsrg.soenea.domain.command.impl.Command;
import org.dsrg.soenea.domain.helper.Helper;
import org.dsrg.soenea.domain.mapper.DomainObjectNotFoundException;

import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.mycoclapuser.mappers.MycoclapuserInputMapper;


public class LoginCommand extends Command {
	
	public LoginCommand(Helper helper) {
		super(helper);
	}
	
	@Override
	public void execute() throws CommandException {
		try {
			String username = helper.getString("loginUsername");
			String password = helper.getString("loginPassword");			
			Boolean accessMycoClapService = false;
			Boolean accessMycoClapUser = false;
			Map<String, Boolean> accessMycoClap  = validateUser(accessMycoClapService, accessMycoClapUser, username, password);
			accessMycoClapService = accessMycoClap.get("***************");
			accessMycoClapUser = accessMycoClap.get("***************");
			Boolean loginSuccess = false;
		
			if( accessMycoClapService.booleanValue() && accessMycoClapUser.booleanValue())
			{
				IMycoclapuser user;
				
				try {
					user = MycoclapuserInputMapper.findUserByUsername(username);					
					if ( user != null) {
						loginSuccess = true;
						helper.setSessionAttribute("CurrentUser", user);
					} 
					else 
						loginSuccess = false;					
				} catch (DomainObjectNotFoundException e) {
					loginSuccess = false;
				}
								
				helper.setRequestAttribute("loginSuccess", loginSuccess);
			} else {
				throw new NotificationException("Invalid mycoCLAP user!");
			}
											
		} catch (MapperException e) {
			throw new CommandException(e);
		} 	
	}
	
	
	public static Map<String, Boolean> validateUser(boolean accessMycoClapService, Boolean accessMycoClapUser, String username, String password)
			throws NotificationException
	{ 
		/*
		 * access LDAP server with SSL
		 */
		String servicePassword = "***************";
		String serviceBase = "***************";
		String serviceDn = "***************";
		String userBase = "***************";
		String userDn = "***************";
		String ldapURL = "" ;
		
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, ldapURL);
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		
		try {
			/*
			 * Test enzymetrackerservice accout
			 */
			env.put(Context.SECURITY_PRINCIPAL, serviceDn);
			env.put(Context.SECURITY_CREDENTIALS, servicePassword);
			DirContext ctx = new InitialDirContext(env);
			Attributes attrs;
			String filter = "(***************)";
			SearchControls ctls = new SearchControls();
			ctls.setSearchScope(SearchControls.SUBTREE_SCOPE);
			ctls.setReturningAttributes(new String[] {"givenName"});
			ctls.setReturningObjFlag(true);
			NamingEnumeration enm = ctx.search(serviceBase, filter, ctls);
			
			while (enm.hasMore()) {
				SearchResult result = (SearchResult) enm.next();
				attrs = result.getAttributes();
				NamingEnumeration e = attrs.getAll();
				while (e.hasMore()) {
					Attribute attr = (Attribute) e.next();
					if (attr.toString().contains("givenName") && attr.toString().contains("mycoCLAP")) {
						accessMycoClapService = true;
						break;
					}
				}
			}
			ctx.close();
			
			if ( accessMycoClapService == false)
				throw new NotificationException("LDAP mycoCLAP service access failed!");
			
			/*
			 * mycoclap user password test
			 */
			env.put(Context.SECURITY_PRINCIPAL, userDn);
			env.put(Context.SECURITY_CREDENTIALS, password);
			ctx = new InitialDirContext(env);
			
			filter = "(&(objectClass=inetorgperson)(uid={0}))";
			ctls = new SearchControls();
			ctls.setSearchScope(SearchControls.SUBTREE_SCOPE);
			ctls.setReturningAttributes(new String[] {"uid", "cn", "memberOf"});
			ctls.setReturningObjFlag(true);
			enm = ctx.search(userBase,  filter, new String[] {username}, ctls);
			String mycoclapMembers;
			String[] listMembers;
	
			
			while (enm.hasMore()) {
				SearchResult result = (SearchResult) enm.next();
				attrs = result.getAttributes();
				NamingEnumeration<? extends Attribute> e = attrs.getAll();
				
				/*
				 * test if user belongs to mycoclapUsers
				 */				
				Attribute memberOf = attrs.get("memberOf");
				Attribute uidAttr = attrs.get("uid");
				String uid = (String) uidAttr.get();
				
				mycoclapMembers = memberOf.toString().replace("memberOf: ", "");
				listMembers = mycoclapMembers.split(",");  
				for (int i=0; i<listMembers.length; i++)	
					if( listMembers[i].contains("cn=**************")) 
						if (uid.equals(username)) {
							accessMycoClapUser = true;
							break;
						}
				
				if( accessMycoClapUser == false)
					throw new NotificationException("Not an LDAP mycoCLAP user!");
			}
			ctx.close();
		
		} catch(AuthenticationException e)
	    {
	        throw new NotificationException("Invalid LDAP user (authentication fail)!");
	    }
	    catch(NamingException e)
	    {
	        e.printStackTrace();
	        throw new NotificationException("Invalid LDAP user (naming fail)!");
	    }
	    env.clear();
	    Map<String, Boolean> accessMycoClap = new HashMap<String, Boolean>();
	    accessMycoClap.put("***************", accessMycoClapService);
	    accessMycoClap.put("***************", accessMycoClapUser);
	    return accessMycoClap;
	}
	

    public static String encryptPassword(String password) throws NoSuchAlgorithmException {
        /* encrypt password */
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        
        byte byteData[] = md.digest();
        
        /* convert the byte to hex format method 1 */
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        
        return sb.toString();
    }

}
