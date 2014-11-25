Ext.ns('MycoCLAP');

MycoCLAP.forgotpasswordForm = {
    xtype: 'form',
    id: 'forgotpassword-form',
    title: 'Recover password', 
    url: urlbase+'?dispatcher=clap.app.dispatcher.RequestPasswordResetDispatcher', 
    frame: true, 
    labelWidth: 70,
    buttonAlign: 'center',
    items:[{
            xtype: 'textfield',
            id: 'forgotpassword-user',
            fieldLabel:'Username', 
            name:'username', 
            width: 200,
            allowBlank:false 
           },{
            xtype: 'textfield',
            id: 'forgotpassword-email',
            fieldLabel:'Email', 
            name:'email', 
            width: 200,
            allowBlank:false 
           }],
    buttons:[{ 
                text: 'Submit',
                formBind: false,    
                handler: function(){
                        Ext.getCmp('forgotpassword-form').getForm().submit({ 
                        method: 'POST', 
                        waitTitle: 'Connecting', 
                        waitMsg: 'Sending request...',
     
                        success: function(){ 
                            Ext.Msg.alert('Password recover successfully!', 'An email has been sent to you'); 
                            Ext.getCmp('login-form').enable();
                            Ext.getCmp('forgotpassword-form').getForm().reset();
                            MycoCLAP.forgotpasswordWin.hide();     
                         },
     
                        failure: function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Password recover failed!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                            Ext.getCmp('forgotpassword-form').getForm().reset();
                        } 
                    }); 
                }, 
                tooltip: 'Request for password reset.'
            },{
                text: 'Cancel',
                formBind: false,
                handler: function(){                    
                    Ext.getCmp('login-form').enable();
                    Ext.getCmp('forgotpassword-form').getForm().reset();
                    MycoCLAP.forgotpasswordWin.hide();
                 } 
            }]
};

MycoCLAP.forgotpasswordWin = new Ext.Window({
    layout:'form',
    width: 350,
    height: 350,
    autoHeight: true,
    closable: false,
    resizable: false,
    plain: true,
    border: false,
    draggable: true,
    closeAction: 'hide',
    items: [MycoCLAP.forgotpasswordForm]
});
 
// Create a variable to hold our EXT Form Panel. 
// Assign various config options as seen.	 
MycoCLAP.loginForm = {
	xtype: 'form',
	id : 'login-form',
    labelWidth: 70,
    url: urlbase+'?dispatcher=clap.app.dispatcher.LoginDispatcher&isSubmission=true', 
    frame: true, 
    title: 'Please Login', 
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
                html: '<h1 style="padding-top: 5px" width="300" align="center"><i>myco</i>CLAP'+
                      '</h1>' + 
                      '<h4 style="padding-top: 10px; padding-left: 5px; padding-bottom: 15px" width="300" align="left">' +
                      'Login is required to access full articles of the literature cited' +
                      '</h4>'
                        
            }
        },{ 
        	xtype: 'textfield',
        	id: 'login-user',
            fieldLabel:'Username', 
            name:'loginUsername', 
            width: 150,
            allowBlank:false 
        },{ 
        	xtype: 'textfield',
        	id: 'login-pwd',
            fieldLabel:'Password', 
            name:'loginPassword', 
            inputType:'password', 
            width: 150,
            allowBlank:false 
        }],
 
    buttons:[{
            text: 'Login',
            formBind: true,	
            handler: function(){ 
    		  Ext.getCmp('login-form').getForm().submit({ 
                    method: 'POST', 
                    waitTitle: 'Connecting', 
                    waitMsg: 'Sending data...',
 
                    success: function(){
						var redirect = urlbase; 
                        window.location = redirect;         
                     },
 
                    failure: function(form, action){ 
                        if(action.failureType == 'server'){ 
                            obj = Ext.util.JSON.decode(action.response.responseText); 
                            Ext.Msg.alert('Login Failed!', obj.errors.reason); 
                        }else if (action.failureType == "connect") {
                            if (action.response.statusText) {
                         	     Ext.Msg.alert('Connect failed error: ' +action.response.status + ' ' + action.response.statusText);
	                         } else {
	                         	     Ext.Msg.alert('Form send failed. Could not connect to server.');
	                         }
                        } else{                         
                        	obj = Ext.util.JSON.decode(action.response.responseText); 
                        	Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                        } 
                        Ext.getCmp('login-form').getForm().reset();
                    } 
                }); 
             } 
        },{ 
            text: 'Forgot password',
            formBind: false,    
            handler: function(){
                MycoCLAP.forgotpasswordWin.show();
                Ext.getCmp('login-form').disable();
            }, 
            tooltip: 'Request for password recovering.'
        }] 
};
 
Ext.onReady(function() {
	Ext.QuickTips.init();
	
	win = new Ext.Window({
        layout:'form',
        width: 300,
        height: 350,
        autoHeight: true,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        draggable: false,
        closeAction: 'hide',
        items: [MycoCLAP.loginForm]
	});
	win.show();
});
