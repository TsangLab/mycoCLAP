package clap.dom.model.mycoclapuser;

import java.util.Calendar;

import org.dsrg.soenea.domain.user.IUser;

public interface IMycoclapuser extends IUser {

    public abstract String getFirstname();

    public abstract String getLastname();

    public abstract String getEmail();

    public abstract Calendar getCreatedate();

}