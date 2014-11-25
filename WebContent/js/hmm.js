Ext.ns('MycoCLAP');

MycoCLAP.hmmPanel = {       
    xtype: 'form',
    id: 'hmm-form',
    labelAlign: 'top',
    url: urlbase+'?dispatcher=clap.app.dispatcher.HmmDispatcher', 
    title: 'HMM search',
    bodyStyle:'padding:20px 50px 20px 50px',
    height: 200,
    autoHeight: true,
    standardSubmit: true,
    buttonAlign: 'left',
    items: [{
                xtype:'textarea',
                id: 'seq-input',
                fieldLabel: 'Sequence',
                name: 'sequence', value: 'KLNHM',
                anchor:'95%'
            },{
                xtype:'fileuploadfield', 
                id:'file-upload',
                name: 'fileUpload',
                width: 200,
                emptyText: 'Select a fasta file...',
                fieldLabel:'File',
                name: 'fileupload'
            }],
    
    buttons: [{
            text: '',
            hidden: true
    },{
        text: 'Submit',
        pageX: 10,
        formBind: true, 
        handler: function(){ 
            var form = Ext.getCmp('hmm-form');
            
            if (Ext.getCmp('file-upload').getValue(true) ) {
            	Ext.getCmp('seq-input').disabled = true;
            	alert(Ext.getCmp('file-upload').getValue(true));
            	form.getForm().fileUpload = true;
            }
            
            if (Ext.getCmp('seq-input').getValue(true) ) {
            	Ext.getCmp('file-upload').disabled = true;
            }
            
            if ( form.getForm().isValid()) {
                form.getForm().submit({ 
                    method: 'POST', 
                    waitTitle: 'Connecting', 
                    waitMsg: 'Sending mail...',
                 
                    success: function(){ 
                        Ext.Msg.alert('Status', 'Hmm search is done!', function(btn, text){
                            if (btn == 'ok'){
                                Ext.getCmp('hmm-form').getForm().reset();
                            }              
                        });
                    },
                 
                   failure: function(form, action){                                 
                        if(action.failureType == 'server'){ 
                    	   Ext.Msg.alert('Failed to search HMM database!', 'Please try again!');
                        }else{ 
                            Ext.Msg.alert('Warning!', 'Authentication server is unreachable'); 
                        } 
                        Ext.getCmp('hmm-form').getForm().reset();
                    } 
                }); 
            }
         } 
    },{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('hmm-form').getForm().reset();
//            Ext.getCmp('hmm-win').hide();
        }
    }]
};
