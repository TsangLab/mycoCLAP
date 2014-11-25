package clap.dom.model.role.impl;

import org.dsrg.soenea.domain.role.IRole;
import org.dsrg.soenea.domain.role.Role;

public class AdminRole extends Role implements IRole {
	
    private static final long ID = 3L;
    private static final String NAME = "AdminRole";
    
    public AdminRole() {
        super(ID, 1, NAME);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public Long getId() {
        return ID;
    }

    @Override
    public long getVersion() {
        return 1;
    }

}
