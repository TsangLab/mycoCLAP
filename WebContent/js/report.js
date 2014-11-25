Ext.ns('MycoCLAP');

MycoCLAP.reportColumnFilters = function(values) 
{
    var value;
    var currCol;
           
    if ( values ){
        value = values.replace(/\=on/g, '');
        value = value.replace(/%20/g, ' ');
        value = value.split("&");      
      
        var colCount = MycoCLAP['tableColumn'].getColumnCount();
                
        for(var i=4; i < colCount; i++) { 			// column index 3 is 'Entry Name', always display
        	MycoCLAP['tableColumn'].setHidden(i, true);
        }
 
        for(var i=1; i < value.length; i++ ) {     	// omit the first value which is the searchScale
            if ( value[i] != 'All' && MycoCLAP['tableColumn'].findColumnIndex(value[i]) ) {
                currCol = MycoCLAP['tableColumn'].findColumnIndex(value[i]);
                MycoCLAP['tableColumn'].setHidden(currCol, false);
            }
        }
    } 
};


MycoCLAP.viewReport = function() {
    // get table column headers
    var header = 'entryName';
    var searchScale;
    var values = MycoCLAP.reportTable.getForm().getValues(true); 
    values += '&datetime=on';
    
    if ( values.length > 1 ){   
        value = values.replace(/\=on/g, ''); 
        value = value.replace(/%20/g, ' ');
        value = value.split("&");  
 
        searchScale = value[0].replace(/searchScale\=/, '');

        for(var i=1; i < value.length; i++ ) {      // omit the first value which is searchScale
        	if ( value[i] != 'All' ) { 
        		if ( header == '' ) {
            		header += value[i];
            	} else {
            		header += '&header=' + value[i];
            	}
        	}
        }
        
        header += '&header=' + 'datetime';
    } 
    
    var term = Ext.getCmp('search').getValue();
    term = term.replace(/\"/g, "\\\"");
    document.getElementById('dataView').action =urlbase+'clap/DataView';
    document.getElementById('dataView').elements['searchScale'].value=searchScale;
    document.getElementById('dataView').elements['header'].value=header;
    document.getElementById('dataView').elements['term'].value=term;
    document.getElementById('dataView').elements['fieldMatch'].value=Ext.getCmp('fieldMatch').getValue();
    document.getElementById('dataView').elements['columnFilters'].value=values;
    document.getElementById('dataView').submit();
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

MycoCLAP.tableConfig = [{
    bodyStyle: 'padding-left:3px; padding-top:5px;',
    id: 'config-table',
    items: {
        xtype: 'fieldset',
        title: 'Enzyme Name',
        defaultType: 'checkbox', // each item will be a checkbox
        height: 700,
        items: {
        	xtype: 'checkboxgroup',
        	id: 'enzyme-name',
            hideLabel: true,
            columns: 1,        	
        	items: [
                {boxLabel: 'All', name: 'All', id: 'enzyme-name-all', autoHeight: true},
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
        height: 700,
        items: {
            xtype: 'checkboxgroup',
            id: 'biochemical-properties',
            hideLabel: true,
            columns: 1,
            items: [
                {boxLabel: 'All', name: 'All', id: 'biochemical-properties-all', autoHeight: true},
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
        height: 700,
        items: {
            xtype: 'checkboxgroup',
            id: 'annotation',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'annotation-all', autoHeight: true},
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
        height: 700,
        items: {
            xtype: 'checkboxgroup',
            id: 'external-resources',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'external-resources-all', autoHeight: true},
                {boxLabel: 'GenBank Protein ID', name: 'genbankProteinId', checked: true, autoHeight: true},
                {boxLabel: 'GenBank Gene ID', name: 'genbankGeneId', autoHeight: true},
                {boxLabel: 'UniProt ID', name: 'uniprotId', checked: true, autoHeight: true},
                {boxLabel: 'RefSeq Protein ID', name: 'refseqProteinId',autoHeight: true},
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
        height: 700,
        items: {
            xtype: 'checkboxgroup',
            id: 'protein-features',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'protein-features-all', autoHeight: true},
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
        height: 700,
        items: {
            xtype: 'checkboxgroup',
            id: 'sequences',
            hideLabel: true,
            columns: 1,         
            items: [
                {boxLabel: 'All', name: 'All', id: 'sequence-all', autoHeight: true},
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


MycoCLAP.reportTable = new Ext.FormPanel({
    id : 'report-panel',
    title : 'Search',
    frame : true,
    autoScroll : true, 
    layout : 'fit',
    labelWidth : 160,
    border : false,
    tbar : MycoCLAP.toolBar2,
    items : [{
                xtype: 'fieldset',
                title: '<b>Your search will run on</b>',
                autoHeight: true,
                labelWidth: 1,                
                collapsible: false,
                items: [{
                    xtype: 'radiogroup',
                    columns: 1,
                    items: [{
                        boxLabel: 'The entire dataset',
                        name: 'searchScale', 
                        inputValue: 'EntireDataset',
                        checked: true
                    },{ 
                        boxLabel: 'The following selected fields',
                        name: 'searchScale',
                        inputValue: 'SelectedFields'
                    }]
                }]
            },{
                xtype: 'fieldset',
                title : '<b>Select fields to be displayed in search table</b>',
                id: 'config-report',
                autoHeight: true,
                layout: 'form',
                frame: false,
                items: [{
                        layout : 'column',
                        border: false,
                        defaults: {
                            columnWidth: '.166',
                            border : false
                        },
                        items: MycoCLAP.tableConfig
                    }]
            }],
    buttons : [{
            text: 'Reset',
            handler: function(){
                MycoCLAP.reportTable.getForm().reset();
            }
    	}]
});


