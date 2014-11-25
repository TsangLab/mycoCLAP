package clap.dom.model.mycoclapuser;

import java.util.Calendar;
import java.util.List;

import org.dsrg.soenea.domain.DomainObjectCreationException;
import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.proxy.DomainObjectProxy;
import org.dsrg.soenea.domain.role.IRole;

import clap.dom.model.mycoclapuser.mappers.MycoclapuserInputMapper;

public class MycoclapuserProxy extends DomainObjectProxy<Long, Mycoclapuser> implements IMycoclapuser {
	
	public MycoclapuserProxy(Long id) {
        super(id);
    }

    @Override
    protected Mycoclapuser getFromMapper(Long id) throws MapperException, DomainObjectCreationException {
        return MycoclapuserInputMapper.find(id);
    }
    
    public String getFirstname() {
		return getInnerObject().getFirstname();
	}

	public String getLastname() {
		return getInnerObject().getLastname();
	}

	public String getEmail() {
		return getInnerObject().getEmail();
	}
	
	public Calendar getCreatedate() {
		return getInnerObject().getCreatedate();
	}

    @Override
    public String getPassword() {
        return getInnerObject().getPassword();
    }

    @Override
    public List<IRole> getRoles() {
        return getInnerObject().getRoles();
    }

    @Override
    public String getUsername() {
        return getInnerObject().getUsername();
    }

    @Override
    public boolean hasChangedPassword() {
        return getInnerObject().hasChangedPassword();
    }

    @Override
    public boolean hasRole(Class<? extends IRole> role) {
        return getInnerObject().hasRole(role);
    }

    @Override
    public void setPassword(String password) {
        getInnerObject().setPassword(password);
    }

    @Override
    public void setRoles(List<IRole> roles) {
        getInnerObject().setRoles(roles);
    }

    @Override
    public void setUsername(String username) {
        getInnerObject().setUsername(username);
    }

}
