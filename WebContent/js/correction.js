Ext.ns('MycoCLAP');

MycoCLAP.correctionPanel = {
    xtype: 'form',
    id : 'correction-form',
    labelWidth: 150,
    url: urlbase+'?dispatcher=clap.app.dispatcher.CorrectionDispatcher&isSubmission=true',
    fileUpload: true,
    frame: true, 
    title: 'Correction', 
    monitorValid: true,
    autoScroll: true,
    buttonAlign: 'center',
    items:[{
            xtype: 'box', 
            height: 50,
            autoEl: { 
                tag: 'div',
                html: '<font size="3" face="Calibri">'+
                      '<p align="center"><b>Please help us to improve the database</b></p>' +
                      '<p align="center" style="margin-top: 5px">'+
                      'To correct the data in mycoCLAP, ' +
                      'please fill in this form and the email will be sent to ' +
                      '<font color="#922339">mycoclap@concordia.ca</font></p>' +
                      '</font>'
            }
        },{
        layout: 'column',
        xtype: 'fieldset',
        title: 'details',
        collapsible: true,
        anchor: '95%',
        items: [{
            columnWidth: .7,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'combo',
                id: 'listEntryName',
                store: MycoCLAP.listEntryName,
                fieldLabel: 'Entry Name of the gene to be corrected',
                name: 'entryname',
                displayField: 'text',
                valueField: 'text',
                typeAhead: false,
                mode: 'local',
                triggerAction: 'all',
                selectOnFocus: true,
                emptyText: 'Select an Entry Name...',
                anchor:'95%',
                allowBlank: false,
                doQuery: MycoCLAP.comboDoQuery
            },{
                xtype: 'radiogroup',
                fieldLabel: 'Literature source',
                columns: 1,
                anchor: '95%',
                items: [{
                    boxLabel: 'PubMed', 
                    name: 'pubmed', 
                    inputValue: 'yes',
                    checked: true,
                    handler: function() { 
                        if ( this.checked == false ) { 
                            Ext.getCmp('pubmed-id-corr').reset();
                            Ext.getCmp('pubmed-id-corr').disable();
                        }
                        if ( this.checked == true ) { 
                            Ext.getCmp('pubmed-id-corr').enable();
                        }
                    }
                },{
                    boxLabel: 'Others', 
                    name: 'pubmed',
                    inputValue: 'no',
                    handler: function() { 
                        if ( this.checked == false ) { 
                            Ext.getCmp('literature-ref-corr').disable();
                        }
                        if ( this.checked == true ) { 
                            Ext.getCmp('literature-ref-corr').enable();
                            Ext.getCmp('literature-ref-corr').setVisible(true); 
                        }
                    }
                }]
            },{
                xtype: 'textfield',
                fieldLabel: 'PubMed ID (if from PubMed)',
                id: 'pubmed-id-corr',
                name: 'pmid',
                anchor: '95%',
                allowBlank: false
            },{
                xtype: 'fieldset',
                fieldLabel: 'Reference detail (if from other sources)',
                id: 'literature-ref-corr',
                name: 'literatureRef',
                disabled: true,
                labelWidth: 80,
                anchor: '95%',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Author',
                    name: 'author',
                    anchor: '95%',
                    disabled: true,
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Title',
                    name: 'title',
                    anchor: '95%',
                    disabled: true,
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Affiliation',
                    name: 'affiliation',
                    anchor: '95%',
                    disabled: true,
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Journal',
                    name: 'journal',
                    anchor: '95%',
                    disabled: true,
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Year',
                    name: 'year',
                    anchor: '95%',
                    disabled: true,
                    allowBlank: false
                }],
                listeners: {
                    enable: function(p) {
                        p.items.each(function(i) {
                           if(i instanceof Ext.form.Field) {
                               i.enable();
                           }
                        }, this);
                    },
                    disable: function(p) {
                        p.items.each( function(i) {
                            if( i instanceof Ext.form.Field) {
                                i.disable();
                                i.reset();  
                            }   
                        }, this);   
                    }
                }
            },{
                xtype: 'combo',
                store: MycoCLAP.listFields,
                fieldLabel: 'Update in Field',
                name: 'field',
                displayField: 'text',
                valueField: 'text',
                allowBlank: false,
                typeAhead: false,
                mode: 'local',
                triggerAction: 'all',
                selectOnFocus: true,
                emptyText: 'Select a field...',
                anchor:'95%',
                doQuery: MycoCLAP.comboDoQuery                
            },{
                xtype: 'textfield',
                fieldLabel: 'Updated value',
                id: 'updated-value',
                name: 'updatedvalue',
                anchor: '95%',
                allowBlank: false
            }]
        }]
    },{     
        layout: 'column',
        xtype: 'fieldset',
        title: 'optional information',
        border: false,
        collapsible: true,
        collapsed: true,
        anchor: '95%',
        items: [{
            columnWidth: .7,
            layout: 'form',
            border: false,
            items: [{
                xtype:'fileuploadfield', 
                id:'correction-upload',
                name: 'fileUpload',
                anchor: '95%',
                emptyText: 'Upload a pdf file...',
                fieldLabel:'Please attach a copy of the article in pdf format'
            }]
        }]
    },{
        layout: 'column',
        xtype: 'fieldset',
        title: 'User Info',
        border: false,
        collapsible: true,
        anchor:'95%',
        items:[{
            columnWidth: .7,
            layout: 'form',
            border: false,
            items: [{
                xtype:'textfield',
                fieldLabel: 'First Name',
                name: 'first',
                anchor:'95%',
                allowBlank: false
            },{
                xtype:'textfield',
                fieldLabel: 'Last Name',
                name: 'last',
                anchor:'95%',
                allowBlank: false
            },{
                xtype:'textfield',
                fieldLabel: 'Subject',
                name: 'subject',
                value: 'Request for data correction',
                anchor:'95%',
                allowBlank: false
            },{
                xtype:'textfield',
                fieldLabel: 'Email',
                name: 'email',
                vtype:'email',
                anchor:'95%',
                allowBlank: false
            },{
                xtype:'htmleditor',
                fieldLabel:'Your message',
                name: 'message',
                height:200,
                anchor:'95%'
            }]
        }]
    }],
  
    buttons:[{
        text: 'Send',
        formBind: true, 
        handler: function(){ 
            var form = Ext.getCmp('correction-form');
            var checkMail = form.getForm().findField('email').getValue();
            if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkMail) ) {
            
                  form.getForm().submit({ 
                        method: 'POST', 
                        waitTitle: 'Connecting', 
                        waitMsg: 'Sending mail...',
                        scope: this,
                        success: function(r, o){
                              Ext.Msg.alert('Status', 'Mail sent Successful!', function(btn, text){
                                    if (btn == 'ok'){
                                        Ext.getCmp('correction-form').getForm().reset();
                                    }              
                              });
                         },
     
                        failure: function(form, action){                             
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Failed to send email!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                            Ext.getCmp('correction-form').getForm().reset();
                        } 
                    }); 
            
            } else {
                alert("Invalid E-mail Address! Pleese re-enter.");
            }
         } 
    },{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('correction-form').getForm().reset();
        }
    }] 

};

