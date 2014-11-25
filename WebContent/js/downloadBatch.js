Ext.ns('MycoCLAP');

MycoCLAP.batchDownload = function (){
    var header = '';
    var headerField; 
    var tableId = MycoCLAP.currTableId;
    var dataType;
    var currType = '';
    
    var batchDownloadForm = new Ext.FormPanel({
        id : 'batchDownload-form',
        method : 'POST',
        standardSubmit : true,
        hide : true,
        url: urlbase+'?dispatcher=clap.app.dispatcher.DownloadBatchDispatcher&isSubmission=true'
    });  

    var tableIdField = new Ext.form.TextField({
        name : 'tableId',
        value : tableId
    });
    batchDownloadForm.add(tableIdField);
    
    var values = MycoCLAP.downloadsPanel.getForm().getValues(true); 

    if ( values ){
        value = values.replace(/\=on/g, '');
        value = value.replace(/%20/g, ' ');
        value = value.split("&");           
        
        for(var i=0; i < value.length; i++ ) { 
            
            if ( value[i].match('dataType') ) {
            	currType = value[i].replace(/dataType\=/, '');     
            	dataType = new Ext.form.TextField({ name:'dataType', value: currType});
            	batchDownloadForm.add(dataType);
            	
            	if ( currType == 'Dataset' ) {
            		header = 'entryName';
                    headerField = new Ext.form.TextField({name:'headers', value: header});
                    batchDownloadForm.add(headerField);            		
            	}
            } 
            else if ( currType == 'Dataset' && value[i] != 'All' ){
                header = value[i];
                headerField = new Ext.form.TextField({name:'headers', value: header});
                batchDownloadForm.add(headerField);
            }
        }
    }       
       
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
            items: [batchDownloadForm],
            renderTo : Ext.getBody()
        
        });

        batchDownloadForm.getForm().submit();
        batchDownloadForm.getForm().reset();
    });
};

/*
 * checkboxgroup Change listener
 */
var checkboxgroupChange = function(checkboxgroup ) {
    checkboxgroup.items.each(function(){
       if (this.checked == true && this.getName() == 'All'){
           checkboxgroup.items.each(function(){
               if (this.checked == false)
                   this.setValue(true);
           });  
       }
    });
};
  
/*
 * checkboxgroup afterRender listener
 */
var checkboxgroupAfterRender = function(checkboxgroup) {
    checkboxgroup.items.each(function(){
        this.on("check", function(self, checked){
            if(checked) {
                checkboxgroup.fireEvent('change', checkboxgroup, self.getRawValue());
            } else if (this.getName()=='All' && this.checked==false){
                checkboxgroup.fireEvent('change', checkboxgroup, checkboxgroup.reset());
            }
        });
    });     
};

MycoCLAP.downloadConfig = [{
    bodyStyle: 'padding-left:3px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Enzyme Name',
        defaultType: 'checkbox', // each item will be a checkbox
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'enzyme-name-down',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'enzyme-name-download', autoHeight: true},
                {boxLabel: 'Species', name: 'species', checked: true, autoHeight: true},
                {boxLabel: 'Strain', name: 'strain', autoHeight: true}, 
                {boxLabel: 'Enzyme Name', name: 'enzymeName', checked: true, autoHeight: true}, 
                {boxLabel: 'Enzyme Alias', name: 'enzymeAlias', autoHeight: true},
                {boxLabel: 'EC Systematic Name', name: 'ecSystematicName', autoHeight: true}, 
                {boxLabel: 'Gene Name', name: 'geneName', autoHeight: true}, 
                {boxLabel: 'Gene Alias', name: 'geneAlias', autoHeight: true}
            ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
},{
    bodyStyle: 'padding-left:4px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Biochemical Properties',
        defaultType: 'checkbox',
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'biochemical-properties-down',
            hideLabel: true,
            columns: 1,
            items: [
                {boxLabel: 'All', name: 'All', id: 'biochemical-properties-download', autoHeight: true},
                {boxLabel: 'Host (for recombinant expression)', name: 'host', checked: true, autoHeight: true},
                {boxLabel: 'Substrates', name: 'substrates', checked: true, autoHeight: true},
                {boxLabel: 'Assay', name: 'assay', checked: true, autoHeight: true},
                {boxLabel: 'pH Optimum', name: 'phOptimum', checked: true, autoHeight: true},
                {boxLabel: 'pH Stability', name: 'phStability', autoHeight: true},
                {boxLabel: 'Temperature Optimum(\u00B0C)', name: 'temperatureOptimum', checked: true, autoHeight: true},
                {boxLabel: 'Temperature Stability(\u00B0C)', name: 'temperatureStability', autoHeight: true},
                {boxLabel: 'Specific Activity', name: 'specificActivity', checked: true, autoHeight: true},
                {boxLabel: 'Activity Assay Conditions', name: 'activityAssayConditions', autoHeight: true},
                {boxLabel: 'Substrate Specificity (%)', name: 'substrateSpecificity',  autoHeight: true},
                {boxLabel: 'Km', name: 'km', autoHeight: true},
                {boxLabel: 'kcat(s-1)', name: 'kcat', autoHeight: true},
                {boxLabel: 'Vmax', name: 'vmax', autoHeight: true},
                {boxLabel: 'Kinetic Assay Conditions', name: 'kineticAssayConditions', autoHeight: true},
                {boxLabel: 'Product Analysis', name: 'productAnalysis', autoHeight: true},
                {boxLabel: 'Product Formed', name: 'productFormed', autoHeight: true},
                {boxLabel: 'Isoelectric Point (experimental)', name: 'ipExperimental', autoHeight: true},
                {boxLabel: 'Isoelectric Point (predicted)', name: 'ipPredicted', autoHeight: true},
                {boxLabel: 'Other Features', name: 'otherFeatures', autoHeight: true}
            ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
}, {
    bodyStyle: 'padding-left:4px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Annotation',
        defaultType: 'checkbox',
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'annotation-down',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'annotation-download', autoHeight: true},
                {boxLabel: 'EC number', name: 'ecNumber', checked: true, autoHeight: true},
                {boxLabel: 'GO (molecular function)', name: 'goMolecularId', autoHeight: true},
                {boxLabel: 'GO (biological process)', name: 'goProcessId', autoHeight: true},
                {boxLabel: 'GO (cellular component)', name: 'goComponentId', autoHeight: true}
            ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
},{
    bodyStyle: 'padding-left:4px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'External Resources',
        defaultType: 'checkbox',
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'external-resources-down',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'external-resources-download', autoHeight: true},
                {boxLabel: 'GenBank Protein ID', name: 'genbankProteinId', checked: true, autoHeight: true},
                {boxLabel: 'GenBank Gene ID', name: 'genbankGeneId', autoHeight: true},
                {boxLabel: 'UniProt ID', name: 'uniprotId', checked: true, autoHeight: true},
                {boxLabel: 'RefSeq Protein ID', name: 'refseqProteinId', autoHeight: true},
                {boxLabel: 'JGI IDs', name: 'jgiId', autoHeight: true},
                {boxLabel: 'BROAD IDs', name: 'broadId', autoHeight: true},
                {boxLabel: 'Literature PMID', name: 'literaturePmid', checked: true, autoHeight: true},
                {boxLabel: 'Structure PMID', name: 'structurePmid', autoHeight: true},
                {boxLabel: 'Sequence PMID', name: 'sequencePmid', autoHeight: true},
                {boxLabel: 'PDB ID', name: 'pdbId', autoHeight: true},
                {boxLabel: 'Structure Determination Method', name: 'structureDeterminationMethod', autoHeight: true}
            ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
},{
    bodyStyle: 'padding-left:4px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Protein Features',
        defaultType: 'checkbox',
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'protein-features-down',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'protein-features-download', autoHeight: true},
                {boxLabel: 'CAZy Family', name: 'family', checked: true, autoHeight: true},
                {boxLabel: 'Signal Peptide (predicted)', name: 'signalPeptidePredicted', autoHeight: true},
                {boxLabel: 'N-Terminal (experimental)', name: 'nterminalExperimental', autoHeight: true},
                {boxLabel: 'Molecular Weight in kDa (experimental)', name: 'molecularWtExperimental', autoHeight: true},
                {boxLabel: 'Molecular Weight in kDa (predicted)', name: 'molecularWtPredicted', autoHeight: true},
                {boxLabel: 'Protein Length', name: 'proteinLength', autoHeight: true},
                {boxLabel: 'CBD', name: 'cbd', autoHeight: true},
                {boxLabel: 'Glycosylation', name: 'glycosylation', autoHeight: true}
            ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
},{
    bodyStyle: 'padding-left:4px; padding-top:5px;',
    items: {
        xtype: 'fieldset',
        title: 'Sequences',
        defaultType: 'checkbox',
        height: 550,
        items: {
            xtype: 'checkboxgroup',
            id: 'sequences-down',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'sequence-download', autoHeight: true},
                {boxLabel: 'Protein sequence', name: 'proteinSequence', autoHeight: true},
                {boxLabel: 'DNA sequence', name: 'dnaSequence', autoHeight: true}
             ],
            listeners: {          
                change: checkboxgroupChange, 
                afterRender: checkboxgroupAfterRender
            }
        }
    }
}];


MycoCLAP.downloadsPanel = new Ext.FormPanel({
    id : 'downloads-panel',
    title : 'Downloads',
    frame : true,  
    bodyStyle:'padding:5px 5px 0',
    autoScroll: true,
    items: [{
            xtype: 'box', 
            height: 50,
            autoEl: { 
                tag: 'div',
                html: '<font size="2" face="Calibri">'+
                      '<p style="margin-top: 5px">'+
                      '* To download a subset of data, use the "Search" function to define ' +
                      'the dataset for download. </p>' + 
                      '<p style="margin-top: 5px">* To download information related ' +
                      'to all the genes in this database, use the links below, or ' +
                      '<a href="' + urlbase +  'clap/DirectDownload' +
                      '" target="_blank">click here</a></p>' +
                      '</font>'
            }
        },{
            xtype: 'fieldset',
            title: 'Downloads',
            autoHeight: true,
            labelWidth: 1,                
            collapsible: false,
            items: [{
                xtype: 'radiogroup',
                columns: 1,
                items: [{
                    boxLabel: 'Protein sequence (FASTA)',
                    name: 'dataType', 
                    inputValue: 'ProteinSequence',
                    handler: function() {
                    	if(this.checked) {
                            Ext.getCmp('config-download').disable();
                            Ext.getCmp('config-download').collapse(true);
                        }
                    }
                },{ 
                    boxLabel: 'DNA sequence (FASTA)',
                    name: 'dataType',
                    inputValue: 'DNASequence',
                    handler: function() {
                        if(this.checked) {
                            Ext.getCmp('config-download').disable();
                            Ext.getCmp('config-download').collapse(true);
                        }
                    }
                },{
                    boxLabel: 'Dataset (TEXT)', 
                    id: 'data-set',
                    name: 'dataType',
                    inputValue: 'Dataset',
                    handler: function() {
                    	if(this.checked) {
                    		Ext.getCmp('config-download').enable();
                            Ext.getCmp('config-download').expand(true);
                    	}
                    }
                },{
                   xtype: 'button',
                   id: 'proSeq-button',
                   text: '<b>Download</b>',
                   boxMaxWidth: 100,
                   handler : function() {
                        MycoCLAP.batchDownload();
                   }
                }]
            }] 
        },{
            xtype: 'fieldset',
            title : 'Select fields',
            id: 'config-download',
            autoHeight: true,
            layout: 'form',
            collapsed: true,
            collapsible: true,
            frame: false,
            items: [{
                    layout : 'column',
                    border: false,
                    defaults: {
                        columnWidth: '.166',
                        border : false
                    },
                    items: MycoCLAP.downloadConfig
                }]
        }]
});