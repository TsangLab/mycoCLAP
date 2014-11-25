package clap.app.taglib.function;

import clap.dom.model.mycoclapuser.IMycoclapuser;
import clap.dom.model.role.impl.AdminRole;
import clap.dom.model.role.impl.UserRole;

public class Authority
{
    public static boolean isAdmin(IMycoclapuser user) {
        try {
            return user.hasRole(AdminRole.class);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public static boolean isRegistered(IMycoclapuser user) {
        try {
            return user.hasRole(UserRole.class);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
