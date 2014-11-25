Ext.ns('MycoCLAP');

MycoCLAP.newentryPanel = {
    xtype: 'form',
    id : 'newentry-form',
    labelWidth: 150,
    url: urlbase+'?dispatcher=clap.app.dispatcher.NewentryDispatcher&isSubmission=true', 
    fileUpload: true,
    frame: true, 
    title: 'New Entry', 
    monitorValid: true,
    autoScroll: true,
    buttonAlign: 'center',
    anchor: '80',
    items:[{
            xtype: 'box', 
            height: 50,
            autoEl: { 
                tag: 'div',
                html: '<font size="3" face="Calibri">'+
                      '<p align="center"><b>New Data Submission</b></p>' +
                      '<p align="center" style="margin-top: 5px">'+
                      'You can submit new enzyme to mycoCLAP, ' +
                      'please fill in this form and the email will be sent to ' +
                      '<font color="#922339">mycoclap@concordia.ca</font></p>' +
                      '</font>'
            }
        },{
        layout: 'column',
        xtype: 'fieldset',
        title: 'required information (must filled)',
        collapsible: true,
        anchor: '95%',
        items: [{
            columnWidth: .7,
            layout: 'form',
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Species',
                name: 'species',
                anchor:'95%',
                allowBlank: false
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
                            Ext.getCmp('pubmed-id').reset();
                            Ext.getCmp('pubmed-id').disable();
                        }
                        if ( this.checked == true ) { 
                            Ext.getCmp('pubmed-id').enable();
                        }
                    }
                },{
                    boxLabel: 'Others', 
                    name: 'pubmed',
                    inputValue: 'no',
                    handler: function() { 
                        if ( this.checked == false ) { 
                            Ext.getCmp('literature-ref').disable();
                        }
                        if ( this.checked == true ) { 
                            Ext.getCmp('literature-ref').enable();
                            Ext.getCmp('literature-ref').setVisible(true); 
                        }
                    }
                }]
            },{
                xtype: 'textfield',
                fieldLabel: 'PubMed ID (if from PubMed)',
                id: 'pubmed-id',
                name: 'pmid',
                anchor: '95%',
                allowBlank: false
            },{
                xtype: 'fieldset',
                fieldLabel: 'Reference detail (if from other sources)',
                id: 'literature-ref',
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
            	xtype: 'textfield',
            	fieldLabel: 'Accession #',
            	name: 'accession',
            	anchor: '95%',
                allowBlank: false
            },{
            	xtype: 'combo',
            	fieldLabel: 'Source of sequence',
            	name: 'sourceofseq',            
                store: [[1, 'Gene ID(Gene Bank)'], [2, 'Uniprot ID'], [3, 'Protein IDs (GenBank)']],
                displayField: 'text',
                valueField: 'text',
                mode: 'local',
                disableKeyFilter: true,
                triggerAction: 'all',
                emptyText: 'Select the source of the Accesion #',
                selectOnFocus: true,
                anchor: '95%',
                allowBlank: false
            },{
            	xtype: 'radiogroup',
            	fieldLabel: 'Activity determinded by experimental assay',
            	name: 'activity',
            	anchor: '95',
            	columns: 1,
            	items: [
            	        {boxLabel: 'Yes', name: 'assay', inputValue: 'yes', checked: true},
            	        {boxLabel: 'No', name: 'assay', inputValue: 'no'}
            	        ]
            },{
                xtype: 'textarea',
                fieldLabel: 'Description',
                name: 'description',
                anchor:'95%'
            }]
        }]
    },{    	
        layout: 'column',
        xtype: 'fieldset',
        title: 'optional information',
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
            },{
                xtype: 'textfield',
                fieldLabel: 'Strain',
                name: 'strain',
                anchor:'95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Gene Name',
                name: 'genename',
                anchor:'95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Gene Alias',
                name: 'genealias',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Enzyme Name',
                name: 'enzymename',
                anchor:'95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Enzyme Alias',
                name: 'enzymealias',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'EC Systematic Name',
                name: 'ecsystemname',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'EC number',
                name: 'ecnumber',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Gene ID (GenBank)',
                name: 'geneid(genbank)',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'UniProt ID',
                name: 'uniprotid',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Protein IDs (GenBank)',
                name: 'proteinids(genbank)',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'RefSeq Protein ID',
                name: 'proteinid(refseq)',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'CAZy Family',
                name: 'family',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Substrate',
                name: 'substrate',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Host (for recombinant expression)',
                name: 'host',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Specific Activity',
                name: 'specificactivity',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Activity Assay Conditions',
                name: 'activityassayconditions',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Substrate Specificity (%)',
                name: 'substratespecificity',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Km',
                name: 'km',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'kcat (s-1)',
                name: 'kcat(s-1)',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Vmax',
                name: 'vmax',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Kinetic Assay Conditions',
                name: 'kineticassayconditions',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Product Analysis',
                name: 'productanalysis',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Product Formed',
                name: 'productformed',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Signal Peptide (predicted)',
                name: 'signalpeptidePredicted',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'N-Terminal (experimental)',
                name: 'nterminalExperimental',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'pH Optimum',
                name: 'pHoptimum',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'pH Stability',
                name: 'pHstability',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Temperature Optimum',
                name: 'tempoptimum',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Temperature Stability',
                name: 'tempstability',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Isoelectric Point(experimental)',
                name: 'ipexperimental',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Isoelectric Point (predicted)',
                name: 'ippredicted',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Molecular Weight in kDa (experimental)',
                name: 'weightinkdaexperimental',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Molecular Weight in kDa (predicted)',
                name: 'weightinkdapredicted',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Protein Length',
                name: 'proteinlength',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'CBD',
                name: 'cbd',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Glycosylation',
                name: 'glycosylation',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Other Features',
                name: 'otherfeatures',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'GO (molecular)',
                name: 'gomolecular',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Evidence for GO (molecular)',
                name: 'evidencegomolecular',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'GO (process)',
                name: 'goprocess',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Evidence for GO (process)',
                name: 'evidencegoprocess',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'GO (component)',
                name: 'gocomponent',
                anchor: '95%',
                allowBlank: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Evidence for GO (component)',
                name: 'evidencegocomponent',
                anchor: '95%',
                allowBlank: true
            }]
        }]
    },{
    	layout: 'column',
    	xtype: 'fieldset',
        title: 'User Info',
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
                value: 'New enzyme submission ',
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
            var form = Ext.getCmp('newentry-form');            
            var checkMail = form.getForm().findField('email').getValue();
            if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkMail) ) {
            
                  form.getForm().submit({ 
                        method: 'POST', 
                        waitTitle: 'Connecting', 
                        waitMsg: 'Sending mail...',
     
                        success: function(){ 
                              Ext.Msg.alert('Status', 'Mail sent Successful!', function(btn, text){
                                    if (btn == 'ok'){
                                        Ext.getCmp('newentry-form').getForm().reset();
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
                            Ext.getCmp('newentry-form').getForm().reset();
                        } 
                    }); 
            
            } else {
                alert("Invalid E-mail Address! Pleese re-enter.");
            }
         } 
    },{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('newentry-form').getForm().reset();
        }
    }] 		
};

