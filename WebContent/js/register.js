Ext.ns('MycoCLAP');

Ext.QuickTips.init();

MycoCLAP.registerForm = {
	xtype: 'form',
	id : 'register-form',
    labelWidth: 70,
    url: urlbase+'?dispatcher=clap.app.dispatcher.UserRegistrationDispatcher&isRegistration=true', 
    frame: true, 
    title: 'New user info', 
    defaultType: 'textfield',
	monitorValid: true,
	buttonAlign: 'center',
    items:[{ 
    		xtype: 'box', 
    		autoEl: { 
    			tag: 'div',
                html: '<table><tr>'+
                      '<td style="padding-left: 5px" width="300px" align="center"><img src="'+urlbase+'css/images/iCubiqueLogo_white.gif" height="60px" />'+
                      '</td>' +
                      '</tr>' +
                      '</table>'   
    		}
        },{ 
            xtype: 'box', 
            autoEl: { 
                tag: 'div',
                html: '<table><tr>'+
                      '<td style="padding-top: 5px" width="300" align="center"><h1><i>myco</i>CLAP</h1>'+
                      '</td>' +
                      '</tr>' +
                      '</table>'   
            }
        },{ 
            xtype: 'textfield',
            id: 'register-firstname',
            fieldLabel:'First Name', 
            name:'Firstname', 
            width: 150,
            allowBlank:false 
        },{ 
            xtype: 'textfield',
            id: 'register-lastname',
            fieldLabel:'Last Name', 
            name:'Lastname', 
            width: 150,
            allowBlank:false 
        },{ 
            xtype: 'textfield',
            id: 'register-email',
            fieldLabel:'Email', 
            name:'Email', 
            width: 150,
            allowBlank:false 
        },{ 
            xtype: 'textfield',
            id: 'register-user',
            fieldLabel:'Username', 
            name:'newUsername', 
            width: 150,
            allowBlank:false 
        },{ 
            xtype: 'textfield',
            id: 'register-pwd',
            fieldLabel:'Password', 
            name:'newPassword', 
            inputType:'password', 
            width: 150,
            allowBlank:false 
        },{
            xtype: 'textfield',
            id: 'register-pwd-confirm',
            fieldLabel:'Confirm Password', 
            name:'confirmPassword', 
            inputType:'password', 
            width: 150,
            allowBlank:false         
        },{
        	xtype: 'combo',
        	id: 'register-userrole',
        	fieldLabel: 'Userrole',
        	name: 'Userrole',
        	store: new Ext.data.SimpleStore({
        		fields: ['role', 'name'],
        		data: [
        		       ["1", "guest"], ["2", "user"], ["3", "admin"]
        		       ]
        	}),
        	displayField: 'name',
        	valueField: 'role',
        	selectOnFocus: true,
        	mode: 'local',
        	typeAhead: true,
        	editable: false,
        	width: 150,
        	allowBlank: false
        }],
 
    buttons:[{ 
                text: 'Save',
                formBind: true,	
                handler: function(){ 
        		  Ext.getCmp('register-form').getForm().submit({ 
                        method: 'POST', 
                        waitTitle: 'Connecting', 
                        waitMsg: 'Sending data...',
     
                        success: function(){ 
                        	Ext.Msg.alert('Status', 'Register Successful!');
                        	Ext.getCmp('register-form').getForm().reset();
                        	MycoCLAP.registerWin.hide();
                         },
     
                        failure: function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Register Failed!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                        } 
                    }); 
                 } 
            },{
            	text: 'Close',
                handler:function(){
                	Ext.getCmp('register-form').getForm().reset();
                    MycoCLAP.registerWin.hide();
                }                
            }] 
};
  

MycoCLAP.registerWin = new Ext.Window({
    layout:'form',
    width: 300,
    height: 350,
    autoHeight: true,
    closable: true,
    resizable: false,
    plain: true,
    border: false,
    draggable: false,
    closeAction: 'hide',
        items: [MycoCLAP.registerForm]
});

