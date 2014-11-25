Ext.ns('MycoCLAP');

Ext.override(Ext.form.TextField, {
    validateValue : function(value){
        if(Ext.isFunction(this.validator)){
            var msg = this.validator(value);
            if(msg !== true ){
                this.markInvalid(msg);
                return false;
            }
        }
        if(this.vtype){
            var vt = Ext.form.VTypes;
            if(!vt[this.vtype](value, this)){
                this.markInvalid(this.vtypeText || vt[this.vtype +'Text']);
                return false;
            }
        }
        if(this.regex && !this.regex.test(value)){
            this.markInvalid(this.regexText);
            return false;
        }
        if(value.length < 1 || value === this.emptyText){ // if it's blank
             if(this.allowBlank){
                 this.clearInvalid();
                 return true;
             }else{
                 this.markInvalid(this.blankText);
                 return false;
             }
        }
        if(value.length < this.minLength){
            this.markInvalid(String.format(this.minLengthText, this.minLength));
            return false;
        }
        if(value.length > this.maxLength){
            this.markInvalid(String.format(this.maxLengthText, this.maxLength));
            return false;
        }
        return true;
    }
});


MycoCLAP.updateType = 'insert';

var proxy = new Ext.data.HttpProxy({
    type: 'ajax',
    api: {
        read: urlbase + '?dispatcher=clap.app.dispatcher.UpdateDataDispatcher&type=read&isSubmission=true',
        create: urlbase + '?dispatcher=clap.app.dispatcher.InsertNewDataInGridDispatcher&isSubmission=true'
    }
});

var reader = new Ext.data.JsonReader({
    id : 'id',
    root : 'data',
    totalProperty : 'total',
    fields : [
            { name : 'enzymeEntryId' }, 
            { name : 'entryNameId' }, 
            { name : 'species' }, 
            { name : 'strain' }, 
            { name : 'entryName', allowBlank: false }, 
            { name : 'geneName' }, 
            { name : 'geneAlias' }, 
            { name : 'enzymeName' }, 
            { name : 'enzymeAlias' }, 
            { name : 'ecSystematicName' }, 
            { name : 'family' }, 
            { name : 'substrates' }, 
            { name : 'host' }, 
            { name : 'specificActivity' }, 
            { name : 'activityAssayConditions' }, 
            { name : 'substrateSpecificity' }, 
            { name : 'km' }, 
            { name : 'kcat' }, 
            { name : 'vmax' }, 
            { name : 'assay' }, 
            { name : 'kineticAssayConditions' }, 
            { name : 'productAnalysis' }, 
            { name : 'productFormed' }, 
            { name : 'phOptimum' }, 
            { name : 'phStability' }, 
            { name : 'temperatureOptimum' }, 
            { name : 'temperatureStability' }, 
            { name : 'ipExperimental' }, 
            { name : 'ipPredicted' }, 
            { name : 'otherFeatures' }, 
            { name : 'ecNumber' }, 
            { name : 'goMolecularId' }, 
            { name : 'goMolecularEvidence' },
            { name : 'goMolecularRef' },
            { name : 'goProcessId' }, 
            { name : 'goProcessEvidence' },
            { name : 'goProcessRef' },
            { name : 'goComponentId' }, 
            { name : 'goComponentEvidence' },
            { name : 'goComponentRef' },
            { name : 'genbankGeneId' }, 
            { name : 'otherGenbankGeneId' },
            { name : 'uniprotId' },
            { name : 'otherUniprotId' },
            { name : 'genbankProteinId' },
            { name : 'refseqProteinId' },
            { name : 'jgiId' },
            { name : 'broadId' },
            { name : 'literaturePmid' },
            { name : 'structurePmid' },
            { name : 'sequencePmid' },
            { name : 'pdbId' },
            { name : 'structureDeterminationMethod' },
            { name : 'signalPeptidePredicted' },
            { name : 'nterminalExperimental' },
            { name : 'molecularWtExperimental' },
            { name : 'molecularWtPredicted' },
            { name : 'proteinLength' },
            { name : 'cbd' },
            { name : 'glycosylation' },
            { name : 'dnaSequence' },
            { name : 'proteinSequence' }
           ]
});

var writer = new Ext.data.JsonWriter({
    encode : true,
    writeAllFields: false,
    root: 'data'
});

MycoCLAP.updateStore = new Ext.data.Store({
    proxy : proxy,        
    reader : reader,
    writer : writer,
    autoLoad : false,
    autoSave: false,
    remoteSort : false,
    autoSave : false    
});

MycoCLAP.updateStore.on('load', function() {
    if(MycoCLAP.updateStore.getCount() == 0 ) {
        alert('No data found');
    }
});


MycoCLAP.updateSelectionModel = new Ext.grid.CheckboxSelectionModel({
   width : 25,
   cls : 'x-grid3-hd-checker',
   singleSelect : false
});     

MycoCLAP.updateColumn = new Ext.grid.ColumnModel([
        MycoCLAP.updateSelectionModel,
        {
            header : 'Enzyme Entry ID',
            width : 140,
            sortable : true,
            hidden : true,
            dataIndex : 'enzymeEntryId'
        }, {
            header : 'Entry Name ID',
            width : 140,
            sortable : true,
            hidden : true,
            dataIndex : 'entryNameId'
        }, {
            header : 'Entry Name',
            width : 100,
            sortable : true,
            dataIndex : 'entryName',
            filterable : true,
            tooltip : MycoCLAP.EntryNameTooltip,
            editor: {
                xtype: 'textfield',
                allowBlank: false /*,
                regex: /^[A-Z]+[0-9]+[A-Z]+[0-9]*\_[A-Z]+$/,
                regexText: '<b>Entry Name - WRONG FORMAT! should be CapLetters(+)Digits(+)CapLetters(+)Digits(*)_CapLetters(+)</b>'
*/            }  
        }, {
            header : 'Species',
            width : 140,
            sortable : true,
            dataIndex : 'species',
            tooltip : MycoCLAP.SpeciesTooltip,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            header : 'Strain',
            width : 100,
            sortable : true,
            dataIndex : 'strain',
            tooltip : MycoCLAP.StrainTooltip,
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        }, {
           header : 'Gene Name',
           width : 150,
           sortable : true,
           dataIndex : 'geneName',
           tooltip : MycoCLAP.GeneNameTooltip,
           editor: {
                xtype: 'textfield'
           }
        }, {
            header : 'Gene Alias',
            width : 80,
            sortable : true,
            dataIndex : 'geneAlias',
            tooltip : MycoCLAP.GeneAliasTooltip,
            editor: {
                 xtype: 'textfield'
            }
        }, {
            header : 'EC Systematic Name',
            width : 180,
            sortable : true,
            dataIndex : 'ecSystematicName',
            editor: {
                 xtype: 'textfield'
            }
        }, {
            header : 'Enzyme Name',
            width : 130,
            sortable : true,
            dataIndex : 'enzymeName',
            tooltip : MycoCLAP.EnzymeNameTooltip,
            editor: {
                 xtype: 'textfield'
            }
        }, {
            header : 'Enzyme Alias',
            width : 80,
            sortable : true,
            dataIndex : 'enzymeAlias',
            tooltip : MycoCLAP.EnzymeAliasTooltip,
            editor: {
                 xtype: 'textfield'
            }
        }, {
            header : 'CAZy Family',
            width : 80,
            sortable : true,
            dataIndex : 'family',
            tooltip : MycoCLAP.FamilyTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Host For Recombinant Expression',
            width : 150,
            sortable : true,
            dataIndex : 'host',
            tooltip : MycoCLAP.HostTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Substrates',
            width : 110,
            sortable : true,
            dataIndex : 'substrates',
            tooltip : MycoCLAP.SubstratesTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
          header : 'Assay',
          width : 120,
          sortable : true,                
          dataIndex : 'assay',
          tooltip : MycoCLAP.AssayTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Specific Activity',
            width : 100,
            sortable : true,
            dataIndex : 'specificActivity',
            tooltip : MycoCLAP.SpecificActivityTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Activity Assay Conditions',
            width : 150,
            sortable : true,        
            dataIndex : 'activityAssayConditions',
            tooltip : MycoCLAP.ActivityAssayConditionsTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Substrate Specificity(%)',
            width : 150,
            sortable : true,            
            dataIndex : 'substrateSpecificity',
            tooltip : MycoCLAP.SubstrateSpecificityTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Km',
            width : 80,
            sortable : true,          
            dataIndex : 'km',
            tooltip : MycoCLAP.KmTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Kcat(s-1)',
            width : 80,
            sortable : true,         
            dataIndex : 'kcat',
            tooltip : MycoCLAP.KcatTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Vmax',
            width : 80,
            sortable : true,        
            dataIndex : 'vmax',
            tooltip : MycoCLAP.VmaxTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Kinetic Assay Conditions',
            width : 120,
            sortable : true,             
            dataIndex : 'kineticAssayConditions',
            tooltip : MycoCLAP.KineticAssayConditionsTooltip,
            editor: {
                xtype: 'textfield'
            }
        }, {
            header : 'Product Analysis',
            width : 100,
            sortable : true,              
            dataIndex : 'productAnalysis',
            editor: {
                xtype: 'textfield'
            }
        }, {
          header : 'Product Formed',
          width : 100,
          sortable : true,            
          dataIndex : 'productFormed',
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'pH Optimum',
          width : 80,
          sortable : true,                
          dataIndex : 'phOptimum',
          tooltip : MycoCLAP.pHoptimumTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'pH Stability',
          width : 85,
          sortable : true,     
          dataIndex : 'phStability',
          tooltip : MycoCLAP.pHstabilityTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Temperature Optimum (\u00B0C)',
          width : 85,
          sortable : true,                 
          dataIndex : 'temperatureOptimum',
          tooltip : MycoCLAP.TempOptimumTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Temperature Stability (\u00B0C)',
          width : 100,
          sortable : true,        
          dataIndex : 'temperatureStability',
          tooltip : MycoCLAP.TempStabilityTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Isoelectric Point Experimental',
          width : 110,
          sortable : true,      
          dataIndex : 'ipExperimental',
          tooltip : MycoCLAP.IsoelectricPointExperimentalTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Isoelectric Point Predicted',
          width : 110,
          sortable : true,        
          dataIndex : 'ipPredicted',
          tooltip : MycoCLAP.IsoelectricPointPredictedTooltip,
          editor: {
              xtype: 'textfield' 
          }
        }, {
          header : 'Other Features',
          width : 200,
          sortable : true,               
          dataIndex : 'otherFeatures',
          tooltip : MycoCLAP.OtherFeatureTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'EC number',
          width : 70,
          sortable : true,                 
          dataIndex : 'ecNumber',
          tooltip : MycoCLAP.ECnumberTooltip,
          editor: {
              xtype: 'textfield' 
          }
        }, {
          header : 'GO (molecular function) ID',
          width : 100,
          sortable : true,              
          dataIndex : 'goMolecularId',
          tooltip : MycoCLAP.GOmolecularTooltip,
          editor: {
              xtype: 'textfield' 
          }
        }, {
          header : 'GO (molecular function) Evidence',
          width : 100,
          sortable : true,              
          dataIndex : 'goMolecularEvidence',
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'GO (molecular function) Ref',
            width : 100,
            sortable : true,              
            dataIndex : 'goMolecularRef',
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'GO (biological process) ID',
          width : 100,
          sortable : true,           
          dataIndex : 'goProcessId',
          tooltip : MycoCLAP.GOprocessTooltip,
          editor: {
              xtype: 'textfield',
              tooltip: 'GO:0000000'
          }
        }, {
          header : 'GO (biological process) Evidence',
          width : 100,
          sortable : true,           
          dataIndex : 'goProcessEvidence',
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'GO (biological process) Ref',
            width : 100,
            sortable : true,           
            dataIndex : 'goProcessRef',
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'GO (cellular component) ID',
          width : 100,
          sortable : true,            
          dataIndex : 'goComponentId',
          tooltip : MycoCLAP.GOcomponentTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'GO (cellular component) Evidence',
          width : 100,
          sortable : true,            
          dataIndex : 'goComponentEvidence',
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'GO (cellular component) Ref',
            width : 100,
            sortable : true,            
            dataIndex : 'goComponentRef',
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'Protein ID (Genbank)',
          width : 80,
          sortable : true,                 
          dataIndex : 'genbankProteinId',
          tooltip : MycoCLAP.ProteinIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'RefSeq Protein ID',
            width : 80,
            sortable : true,                 
            dataIndex : 'refseqProteinId',
            tooltip : MycoCLAP.RefSeqProteinIDTooltip,
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'Gene ID (Genbank)',
          width : 110,
          sortable : true,          
          dataIndex : 'genbankGeneId',
          tooltip : MycoCLAP.GeneIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Other Gene ID (Genbank)',
          width : 110,
          sortable : true,          
          dataIndex : 'otherGenbankGeneId',
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'UniProt ID',
          width : 80,
          sortable : true,         
          dataIndex : 'uniprotId',
          tooltip : MycoCLAP.UniprotIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Other UniProt ID',
          width : 80,
          sortable : true,         
          dataIndex : 'otherUniprotId',
          tooltip : MycoCLAP.UniprotIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'JGI ID',
          width : 70,
          sortable : true,             
          dataIndex : 'jgiId',
          tooltip : MycoCLAP.JGIIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'BROAD ID',
          width : 85,
          sortable : true,          
          dataIndex : 'broadId',
          tooltip : MycoCLAP.BROADIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Literature PMID',
          width : 85,
          sortable : true,                
          dataIndex : 'literaturePmid',
          tooltip : MycoCLAP.LiteraturePMIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Structure PMID',
          width : 85,
          sortable : true,         
          dataIndex : 'structurePmid',
          tooltip : MycoCLAP.StructurePMIDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'Sequence PMID',
            width : 85,
            sortable : true,         
            dataIndex : 'sequencePmid',
            tooltip : MycoCLAP.SequencePMIDTooltip,
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'PDB ID',
          width : 85,
          sortable : true,         
          dataIndex : 'pdbId',
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Structure Determination Method',
          width : 85,
          sortable : true,         
          dataIndex : 'structureDeterminationMethod',
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Signal Peptide (predicted)',
          width : 100,
          sortable : true,            
          dataIndex : 'signalPeptidePredicted',
          tooltip : MycoCLAP.SignalPeptidePredictedTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
            header : 'N-Terminal (experimental)',
            width : 100,
            sortable : true,            
            dataIndex : 'nterminalExperimental',
            editor: {
                xtype: 'textfield'
            }
          }, {
          header : 'Molecular Weight in kDa (experimental)',
          width : 80,
          sortable : true,         
          dataIndex : 'molecularWtExperimental',
          tooltip : MycoCLAP.WeightExperimentalTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Molecular Weight in kDa (predicted)',
          width : 80,
          sortable : true,            
          dataIndex : 'molecularWtPredicted',
          tooltip : MycoCLAP.WeightPredictedTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Protein Length',
          width : 80,
          sortable : true,               
          dataIndex : 'proteinLength',
          tooltip : MycoCLAP.ProteinLengthTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'CBD',
          width : 85,
          sortable : true,              
          dataIndex : 'cbd',
          tooltip : MycoCLAP.CBDTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Glycosylation',
          width : 85,
          sortable : true,             
          dataIndex : 'glycosylation',
          tooltip : MycoCLAP.GlycosylationTooltip,
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'DNA Sequence',
          width : 85,
          sortable : true,             
          dataIndex : 'dnaSequence',
          editor: {
              xtype: 'textfield'
          }
        }, {
          header : 'Protein Sequence',
          width : 85,
          sortable : true,             
          dataIndex : 'proteinSequence',
          editor: {
              xtype: 'textfield'
          }
        }
]);

var uploadDataFileForm = {
    xtype : 'form',
    id : 'uploadFile-form',
    labelWidth: 120,
    url: urlbase+'?dispatcher=clap.app.dispatcher.InsertNewDataInFileDispatcher', 
    fileUpload: true,
    frame: true, 
    defaultType: 'textfield',
    monitorValid: true,
    buttonAlign: 'center',
    items:[{ 
            xtype: 'box', 
            autoEl: { 
                tag: 'div',
                html: '<font size="3" face="Calibri">'+
                      '<p align="center"><b>New Data Submission</b></p>' +
                      '<p align="center" style="margin-top: 5px">'+
                      'Please make sure the file only includes new data </p>' +
                      '<br />' +
                      '</font>'   
            }
        }, {
                xtype:'fileuploadfield', 
                id:'correction-upload',
                name: 'fileUpload',
                anchor: '95%',
                emptyText: 'Upload data in tab delimited text file...',
                tooltip: 'Please send tab delimited text file!',
                fieldLabel:'Please choose your file'
            }],
    buttons:[{
        text: 'Submit',
        formBind: true, 
        handler: function(){ 
            var form = Ext.getCmp('uploadFile-form');      
            
            form.getForm().submit({ 
                  method: 'POST', 
                  waitTitle: 'Connecting', 
                  waitMsg: 'Submit file...',
/*                  success: function(responseObj){ 
                        Ext.Msg.alert('Status', "Submit successful", function(btn, text){
                              if (btn == 'ok'){
                                  Ext.getCmp('uploadFile-form').getForm().reset();
                                  Ext.getCmp('uploadFile-win').hide();
                                  Ext.getCmp('updateGrid-panel').enable();
                                  MycoCLAP.listEntryName.reload();
                              }              
                        });
                   },*/
                  success: function(form, o) {
                	  obj = Ext.util.JSON.decode(o.response.responseText); 
                      Ext.Msg.alert('Submit file successful!', obj.message, function(btn, text){
                    	  if (btn == 'ok'){
                              Ext.getCmp('uploadFile-form').getForm().reset();
                              Ext.getCmp('uploadFile-win').hide();
                              Ext.getCmp('updateGrid-panel').enable();
                              MycoCLAP.listEntryName.reload();
                          } 
                      }); 
                  },
                  failure: function(form, action){                             
                      if(action.failureType == 'server'){ 
                          obj = Ext.util.JSON.decode(action.response.responseText); 
                          Ext.Msg.alert('Failed to submit file!', obj.message); 
                      }else{ 
                          Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                      } 
                      Ext.getCmp('uploadFile-form').getForm().reset();
                  } 
              });             
         } 
    },{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('uploadFile-form').getForm().reset();
        }
    },{
        text: 'Close',
        handler: function() {
            Ext.getCmp('uploadFile-form').getForm().reset();
            Ext.getCmp('uploadFile-win').hide();
            Ext.getCmp('updateGrid-panel').setTitle('Insert New Data');
            Ext.getCmp('updateGrid-panel').enable();
            Ext.getCmp('insert-data-button').disable();
            Ext.getCmp('update-data-button').enable();
            Ext.getCmp('data-file-button').enable();
            Ext.getCmp('literature-file-button').enable();
            Ext.getCmp('add-entry').show();
            Ext.getCmp('delete-entry').show();
            Ext.getCmp('delete-data').hide();
            Ext.getCmp('updateGrid-panel').getStore().removeAll();
            MycoCLAP.updateType = 'insert';
        }
    }]             
};

var uploadDataFileWin = new Ext.Window({
    id: 'uploadFile-win',
    layout:'form',
    width: 500,
    height: 400,
    autoHeight: true,
    closable: false,
    resizable: false,
    plain: true,
    border: false,
    draggable: false,
    closeAction: 'hide',
    items: [uploadDataFileForm]     
});

var uploadRefFileForm = {
	    xtype : 'form',
	    id : 'uploadRefFile-form',
	    labelWidth: 120,
	    url: urlbase+'?dispatcher=clap.app.dispatcher.InsertNewReferenceInFileDispatcher', 
	    fileUpload: true,
	    frame: true, 
	    defaultType: 'textfield',
	    monitorValid: true,
	    buttonAlign: 'center',
	    items:[{ 
	            xtype: 'box', 
	            autoEl: { 
	                tag: 'div',
	                html: '<font size="3" face="Calibri">'+
	                      '<p align="center"><b>New Reference Submission</b></p>' +
	                      '<p align="center" style="margin-top: 5px">'+
	                      'Please make sure the file only includes new data </p>' +
	                      '<br />' +
	                      '</font>'   
	            }
	        }, {
	                xtype:'fileuploadfield', 
	                id:'ref-upload',
	                name: 'fileUpload',
	                anchor: '95%',
	                emptyText: 'Upload reference in tab delimited text file...',
	                tooltip: 'Please send tab delimited text file!',
	                fieldLabel:'Please choose your file'
	            }],
	    buttons:[{
	        text: 'Submit',
	        formBind: true, 
	        handler: function(){ 
	            var form = Ext.getCmp('uploadRefFile-form');      
	            
	            form.getForm().submit({ 
	                  method: 'POST', 
	                  waitTitle: 'Connecting', 
	                  waitMsg: 'Submit file...',
	                  success: function(form, o) {
	                	  obj = Ext.util.JSON.decode(o.response.responseText); 
	                      Ext.Msg.alert('Submit file successful!', obj.message, function(btn, text){
	                    	  if (btn == 'ok'){
	                              Ext.getCmp('uploadRefFile-form').getForm().reset();
	                              Ext.getCmp('uploadRefFile-win').hide();
	                              Ext.getCmp('updateGrid-panel').enable();
	                              MycoCLAP.listEntryName.reload();
	                          } 
	                      }); 
	                  },
	                  failure: function(form, action){                             
	                      if(action.failureType == 'server'){ 
	                          obj = Ext.util.JSON.decode(action.response.responseText); 
	                          Ext.Msg.alert('Failed to submit file!', obj.message); 
	                      }else{ 
	                          Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
	                      } 
	                      Ext.getCmp('uploadRefFile-form').getForm().reset();
	                  } 
	              });             
	         } 
	    },{
	        text: 'Cancel',
	        handler: function() {
	            Ext.getCmp('uploadRefFile-form').getForm().reset();
	        }
	    },{
	        text: 'Close',
	        handler: function() {
	            Ext.getCmp('uploadRefFile-form').getForm().reset();
	            Ext.getCmp('uploadRefFile-win').hide();
	            Ext.getCmp('updateGrid-panel').setTitle('Insert New Data');
	            Ext.getCmp('updateGrid-panel').enable();
	            Ext.getCmp('insert-data-button').disable();
	            Ext.getCmp('update-data-button').enable();
	            Ext.getCmp('data-file-button').enable();
	            Ext.getCmp('literature-file-button').enable();
	            Ext.getCmp('add-entry').show();
	            Ext.getCmp('delete-entry').show();
	            Ext.getCmp('delete-data').hide();
	            Ext.getCmp('updateGrid-panel').getStore().removeAll();
	            MycoCLAP.updateType = 'insert';
	        }
	    }]             
	};

var uploadRefFileWin = new Ext.Window({
    id: 'uploadRefFile-win',
    layout:'form',
    width: 500,
    height: 400,
    autoHeight: true,
    closable: false,
    resizable: false,
    plain: true,
    border: false,
    draggable: false,
    closeAction: 'hide',
    items: [uploadRefFileForm]     
});


MycoCLAP.updateGrid = new Ext.grid.EditorGridPanel({
    id : 'updateGrid-panel',
    title : 'Insert New Data',
    region : 'center',
    margins : '5 5 5 2',
    bodyStyle : 'padding:0px',
    hideMode : Ext.isIE ? 'offsets' : 'display',

    store : MycoCLAP.updateStore,
    colModel : MycoCLAP.updateColumn,
    selModel: new Ext.grid.CheckboxSelectionModel({singleSelect:false}),
    loadMask : true,
    autoResize: true,
    stripeRows : true,
    columnLines : true,
    clicksToEdit: 1,
    
    tbar: new Ext.Toolbar({
        height : 30,
        items : [{
                    xtype: 'combo',
                    id: 'list-entry',
                    name: 'Find Records',
                    store: MycoCLAP.listEntryName,
                    fieldLabel : 'Keyword',
                    name : 'SearchTerm',
                    displayField: 'text',
                    valueField: 'text',
                    typeAhead: false,
                    allowBlank : true,
                    mode: 'local',
                    triggerAction: 'all',
                    selectOnFocus: true,
                    enablekeyEvents: true,
                    emptyText: 'Select an Entry Name for update...',
                    anchor:'95%',
                    width: 220,
                    doQuery: MycoCLAP.comboDoQuery,
                    listeners: {
                        specialkey: function(field, el){
                            if (el.getKey() == Ext.EventObject.ENTER) 
                                Ext.getCmp('find-entry').fireEvent('click');
                        }
                    }                                
                },{
                    text: 'Find',
                    id: 'find-entry',
                    tooltip: 'click to find the search enzyme',
                    handler: function() {
                          findEntry();
                    }                   
                },{
                    text: 'Add Records',
                    iconCls: 'icon-add',
                    id: 'add-entry',
                    tooltip: 'click to insert a row for new data',
                    handler: function() {
                       // empty record
                       var mycoCLAPdata = MycoCLAP.updateGrid.getStore().recordType;
                        MycoCLAP.updateGrid.stopEditing();
                        MycoCLAP.updateStore.insert(0, new mycoCLAPdata());
                        MycoCLAP.updateGrid.startEditing(0, 0);
                    }                   
                },{
                    text: 'Delete',
                    id: 'delete-entry',
                    iconCls: 'icon-delete',
                    tooltip: 'remove entry from table only, not from database',
                    handler: function() {
                        deleteNewEntry();
                    }
                    
                },{
                    text: 'Delete',
                    id: 'delete-data',
                    iconCls: 'icon-delete',
                    tooltip: 'click to delete data from database',
                    handler: function() {
                            deleteDbData();   
                    }    
                },{
                    text: 'Save',
                    iconCls: 'icon-save',
                    tooltip: 'click to submit new data to database',
                    handler: 
                        function() {
                            if ( MycoCLAP.updateType == 'insert' )
                                saveNewData();
                                
                            if ( MycoCLAP.updateType == 'modify' )
                                saveModifyData();    
                        }
                }]
    }),
    
    bbar : new Ext.Toolbar({
        items : [{
                    text: '<b>INSERT NEW DATA</b>',
                    id: 'insert-data-button',
                    cls: '',
                    handler: function() {
                        Ext.getCmp('insert-data-button').disable();
                        Ext.getCmp('update-data-button').enable();
                        Ext.getCmp('data-file-button').enable();
                        Ext.getCmp('literature-file-button').enable();
                        Ext.getCmp('updateGrid-panel').setTitle('Insert New Data');
                        Ext.getCmp('add-entry').show();
                        Ext.getCmp('delete-entry').show();
                        Ext.getCmp('delete-data').hide();
                        Ext.getCmp('updateGrid-panel').getStore().removeAll();
                        MycoCLAP.updateType = 'insert';
                    }
                },'-',{
                    text: '<b>UPDATE</b>',
                    id: 'update-data-button',
                    handler: function() {
                        Ext.getCmp('insert-data-button').enable();
                        Ext.getCmp('update-data-button').disable();
                        Ext.getCmp('data-file-button').enable();
                        Ext.getCmp('literature-file-button').enable();
                        Ext.getCmp('updateGrid-panel').setTitle('Update Data');
                        Ext.getCmp('add-entry').hide();
                        Ext.getCmp('delete-entry').hide();
                        Ext.getCmp('delete-data').show();
                        MycoCLAP.updateType = 'modify';
                    }
                 },'-',{
                    text: '<b>UPLOAD NEW DATA</b>',
                    id: 'data-file-button',
                    handler: function() {
                        uploadDataFileWin.show();
                        Ext.getCmp('updateGrid-panel').disable();
                        Ext.getCmp('updateGrid-panel').getStore().removeAll();
                    }
                 },'-',{
			        text: '<b>DOWNLOAD TEMPLATE FILE</b>',
			        handler: function() {
			            requestUploadTemplate('dataFile');
			         }
			    },'-',{
                    text: '<b>UPLOAD NEW REFERENCE</b>',
                    id: 'literature-file-button',
                    handler: function() {
                        uploadRefFileWin.show();
                        Ext.getCmp('updateGrid-panel').disable();
                        Ext.getCmp('updateGrid-panel').getStore().removeAll();
                    }
                 },'-',{
			        text: '<b>DOWNLOAD REFERENCE FILE</b>',
			        handler: function() {
			            requestUploadTemplate('literatureFile');
			         }
			    }]
    })
});

function saveNewData() {
    var data = [];
    var modifiedRecords = MycoCLAP.updateStore.getModifiedRecords();
    for (var n=0; n < modifiedRecords.length; n++) {
        if ( modifiedRecords[n].get('enzymeEntryId') != null ) {
            alert('Only new records will be added into the database! To update the entry, please go to \'UPDATE\' page!');
            
        } else if ( MycoCLAP.updateStore.getById(modifiedRecords[n].id).isValid() ) {
            data.push(modifiedRecords[n].getChanges());
        } else {
              alert(Ext.encode(modifiedRecords[n].getChanges()) + " - " + MycoCLAP.incompleteErrorMessage);
         } 
    }    
     
    if ( modifiedRecords == 0) {
        alert('No new record inserted!');
    } else {                
	    Ext.Ajax.request({
	       url: urlbase + '?dispatcher=clap.app.dispatcher.InsertNewDataInGridDispatcher',
	       method: 'POST',
	       params: {"data":Ext.encode(data)},
	       success: function(responseObj) {
	           var obj = Ext.util.JSON.decode(responseObj.responseText);
	           Ext.Msg.alert('Adding new data!', obj.message);
               MycoCLAP.updateStore.reload();
	           MycoCLAP.listEntryName.reload();
	       },
	       failure: function(action, responseObj){ 
	           var obj = Ext.util.JSON.decode(responseObj.responseText);
	           if(action.failureType == 'server'){ 
	              Ext.Msg.alert('Add new data failed!', obj.message); 
	           }else{ 
	              Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
	           } 
	       } 
	    }); 
    }
}

function saveModifyData() {
    var data = [];
    var modifiedRecords = MycoCLAP.updateStore.getModifiedRecords();
    
    for (var n=0; n < modifiedRecords.length; n++) {
        var enzymeEntryId = modifiedRecords[n].get('enzymeEntryId');
        var index = MycoCLAP.updateStore.find('enzymeEntryId', enzymeEntryId);
        
        if (MycoCLAP.updateStore.getById(modifiedRecords[n].id).isValid()) {    
              data.push(MycoCLAP.updateStore.getAt(index).data);
        } else {
              alert(Ext.encode(modifiedRecords[n].getChanges()) + " - " + MycoCLAP.incompleteErrorMessage);
        }
    }
    
    if ( modifiedRecords.length == 0 ) {
        alert('No modified data!');
    } else {
	    Ext.Ajax.request({
	        url: urlbase + '?dispatcher=clap.app.dispatcher.UpdateDataDispatcher&type=modify&isSubmission=true',
	        method: 'POST',
	        params: {"data":Ext.encode(data)},
	        success: function(responseObj) {
	            MycoCLAP.updateStore.getAt(index).commit();
	            var obj = Ext.util.JSON.decode(responseObj.responseText);
	            Ext.Msg.alert('Update data!', obj.message);
	            MycoCLAP.updateStore.reload();
	        },
	        failure: function(action, responseObj){ 
	            var obj = Ext.util.JSON.decode(responseObj.responseText);
	            if(action.failureType == 'server'){ 
	                Ext.Msg.alert('Add new data failed!', obj.message); 
	            }else{ 
	                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
	            } 
	        } 
	    });   
    }
}

function deleteDbData() {
	var data = [];
    var deletedRecords = MycoCLAP.updateGrid.getSelectionModel().getSelections();
    
    for (var n=0; n < deletedRecords.length; n++) {
    	var enzymeEntryId = deletedRecords[n].get('enzymeEntryId');
    	
    	if (MycoCLAP.updateStore.getById(deletedRecords[n].id).isValid() ) {
    		data.push(enzymeEntryId);
    	} else {
    		alert(deletedRecords[n].get('entryName') + " - Invalid data for deletion! ");
    	}
    }
    
    if ( deletedRecords.length == 0 ) {
        alert('Please select data to be deleted!');
        return;
    } else {        
        Ext.Msg.show( {
            title: 'Delete Entry?',
            msg: 'Are you sure you want to remove the entry from the database?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: urlbase + '?dispatcher=clap.app.dispatcher.DeleteDataDispatcher',
                        method: 'POST',
                        params: {"data": data},
                        success: function(responseObj) {
                            var obj = Ext.util.JSON.decode(responseObj.responseText);
                            Ext.Msg.alert('Delete data!', obj.message);
                            MycoCLAP.updateStore.reload();
                            MycoCLAP.listEntryName.reload();
                        },
                        failure: function(action, responseObj){ 
                            var obj = Ext.util.JSON.decode(responseObj.responseText);
                            if(action.failureType == 'server'){ 
                                Ext.Msg.alert('Delete data failed!', obj.message); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                        } 
                    });   
                }
            }
        });
    }  
}

function deleteNewEntry() {
    var record = MycoCLAP.updateGrid.getSelectionModel().getSelected();
    
    if ( !record ) {
        alert('Please select a record to be removed.');
    } else { 
        alert('Only the unsaved new entry can be removed! If you want to remove the entry from database, please go to \'Update Data\' site.');
        MycoCLAP.updateStore.remove(record);
        MycoCLAP.updateStore.reload();
    }
}

function findEntry() {
    MycoCLAP.updateGrid.store.removeAll();
    MycoCLAP.updateGrid.store.load({
        params : {
            'entryName' : Ext.getCmp('list-entry').getValue()
        }
    });
}

function requestUploadTemplate(requestFile) {
    var requestUploadTemplateForm = new Ext.FormPanel({
        id : 'requestUploadTemplateFile-form',
        method : 'POST',
        standardSubmit : true,
        hide : true,
        url: urlbase+'?dispatcher=clap.app.dispatcher.RequestUploadTemplateDispatcher&requestFile=' + requestFile
    });  
    
    Ext.onReady(function() {
        Ext.QuickTips.init();
        
        win = new Ext.Window({
            layout:'form',
            id: 'win',
            width: 300,
            height: 350,
            autoHeight: true,
            plain: true,
            border: false,
            draggable: false,
            closeAction: 'hide',
            items: [requestUploadTemplateForm],
            renderTo : Ext.getBody()
        
        });

        requestUploadTemplateForm.getForm().submit();
        requestUploadTemplateForm.getForm().reset();
    });    
}

