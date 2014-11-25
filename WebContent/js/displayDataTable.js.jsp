<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ taglib prefix="auth" uri="https://mycoclap.fungalgenomics.ca/taglibs/auth" %>
Ext.ns('MycoCLAP');

MycoCLAP.limit = 600;
MycoCLAP.fasta = false;

MycoCLAP.dataDownload = function (){
    var sm = MycoCLAP['tableGrid'].getSelectionModel().getSelections();
    var cnt = MycoCLAP['tableGrid'].getColumnModel().getColumnCount(false);
    var header = '';
    var rowDataId = '';
    var searchTerm = MycoCLAP.searchTerm;
    var searchScale = MycoCLAP.searchScale;
    var fieldMatch = MycoCLAP.fieldMatch;
    var rowDataIdField;    
    var headerField;    
    var fastaField;
    var downloadAll = false;        // test whether user selected data (rows) for download
    
    var dataDownloadForm = new Ext.FormPanel({
        id : 'dataDownload-form',
        method : 'POST',
        standardSubmit : true,
        hide : true,
        url: urlbase+'?dispatcher=clap.app.dispatcher.DownloadDataDispatcher'
    });  

    var searchTermField = new Ext.form.TextField({
        name : 'searchTerm',
        value : searchTerm
    });
     
    dataDownloadForm.add(searchTermField);
    
    var searchScaleField = new Ext.form.TextField({
        name : 'searchScale',
        value : searchScale
    });
    
    dataDownloadForm.add(searchScaleField);
    
    var fieldMatchField = new Ext.form.TextField({
        name : 'fieldMatch',
        value : fieldMatch
    });
    
    dataDownloadForm.add(fieldMatchField);

    if ( sm.length < 1 ) {
          downloadAll = true;   
    }    
    else {
	    for (i=0; i<=sm.length-1; i++) { 
	        rowDataId = sm[i].get('enzymeEntryId');
	        rowDataIdField = new Ext.form.TextField({name:'rowDataId', value:rowDataId});
	        dataDownloadForm.add(rowDataIdField);
	    }
	}
	
	var downloadAllField = new Ext.form.TextField({
	   name : 'downloadAll',
	   value : downloadAll
	});
 	
	dataDownloadForm.add(downloadAllField);
  
    // dataIndex starts from 1, the first two columns are enzymeEntryId, entryNameId
    // we exclude them from download file    
    for ( j = 3; j<=cnt-1; j++) {      
        if ( MycoCLAP['tableGrid'].getColumnModel().isHidden(j) == false ) {
            header = MycoCLAP['tableGrid'].getColumnModel().getDataIndex(j);
            headerField = new Ext.form.TextField({name:'header', value: header});
            dataDownloadForm.add(headerField);
        }   
    }
    
    fastaField = new Ext.form.TextField({ name:'fasta', value:MycoCLAP.fasta });   
    dataDownloadForm.add(fastaField);

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
            items: [dataDownloadForm],
            renderTo : Ext.getBody()        
        });

        dataDownloadForm.getForm().submit();
        dataDownloadForm.getForm().reset();
    })
}

MycoCLAP.showTable = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy({
                url : urlbase + '?dispatcher=clap.app.dispatcher.DisplayDataDispatcher&isSubmission=true',
                method : 'POST'
            }),
    reader : new Ext.data.JsonReader({
                id : 'id',
                root : 'data',
                totalProperty : 'total',
                fields : [
                        { name : 'enzymeEntryId' }, 
                        { name : 'entryNameId' }, 
                        { name : 'species' }, 
                        { name : 'strain' }, 
                        { name : 'entryName' }, 
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
                        { name : 'goProcessId' }, 
                        { name : 'goComponentId' }, 
                        { name : 'genbankGeneId' }, 
                        { name : 'uniprotId' },
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
                        { name : 'proteinSequence' },
                        { name : 'datetime' }
                       ]
            }),
    baseParams : {
        start : 0,
        limit : MycoCLAP.limit,
        searchScale : MycoCLAP.searchScale,
        term : MycoCLAP.searchTerm,
        header : MycoCLAP.header,
        fieldMatch : MycoCLAP.fieldMatch       
    },
    remoteSort : false
});

MycoCLAP.showTable.on('load', function() {
    if(MycoCLAP.showTable.getCount() == 0 ) {
        alert('No data found. Try your search on: ' + MycoCLAP.searchTerm + '*');
    }
});


MycoCLAP.filters = new Ext.ux.grid.GridFilters({
    local : true,
    filters : [{
                type : 'string',
                dataIndex : 'species'
            }, {
                type : 'string',
                dataIndex : 'strain'
            }, {
                type : 'string',
                dataIndex : 'entryName'
            }, {
                type : 'string',
                dataIndex : 'geneName'
            }, {
                type : 'string',
                dataIndex : 'geneAlias'
            }, {
                type : 'string',
                dataIndex : 'enzymeName'
            }, {
                type : 'string',
                dataIndex : 'enzymeAlias'
            }, {
                type : 'string',
                dataIndex : 'ecSystematicName'
            }, {
                type : 'string',
                dataIndex : 'family'
            }, {
                type : 'string',
                dataIndex : 'substrates'
            }, {
                type : 'string',
                dataIndex : 'host'
            }, {
                type : 'string',
                dataIndex : 'specificActivity'
            }, {
                type : 'string',
                dataIndex : 'activityAssayConditions'
            }, {
                type : 'string',
                dataIndex : 'substrateSpecificity'
            }, {
                type : 'string',
                dataIndex : 'km'
            }, {
                type : 'string',
                dataIndex : 'kcat'
            }, {
                type : 'string',
                dataIndex : 'vmax'
            }, {
                type : 'string',
                dataIndex : 'assay'
            }, {
                type : 'string',
                dataIndex : 'kineticAssayConditions'
            }, {
                type : 'string',
                dataIndex : 'productAnalysis'
            }, {
                type : 'string',
                dataIndex : 'productFormed'
            }, {
                type : 'string',
                dataIndex : 'phOptimum'
            }, {
                type : 'string',
                dataIndex : 'phStability'
            }, {
                type : 'string',
                dataIndex : 'temperatureOptimum'
            }, {
                type : 'string',
                dataIndex : 'temperatureStability'
            }, {
                type : 'string',
                dataIndex : 'ipExperimental'
            }, {
                type : 'string',
                dataIndex : 'ipPredicted'
            }, {
                type : 'string',
                dataIndex : 'otherFeatures'
            }, {
                type : 'string',
                dataIndex : 'ecNumber'
            }, {
                type : 'string',
                dataIndex : 'goMolecularId'
            }, {
                type : 'string',
                dataIndex : 'goProcessId'
            }, {
                type : 'string',
                dataIndex : 'goComponentId'
            }, {
                type : 'string',
                dataIndex : 'genbankGeneId'
            }, {
                type : 'string',
                dataIndex : 'uniprotId'
            }, {
                type : 'string',
                dataIndex : 'genbankProteinId'
            }, {
                type : 'string',
                dataIndex : 'refseqProteinId'
            }, {
                type : 'string',
                dataIndex : 'jgiId'
            }, {
                type : 'string',
                dataIndex : 'broadId'
            }, {
                type : 'string',
                dataIndex : 'literaturePmid'
            }, {
                type : 'string',
                dataIndex : 'structurePmid'
            }, {
                type : 'string',
                dataIndex : 'sequencePmid'
            }, {
                type : 'string',
                dataIndex : 'pdbId'
            }, {
                type : 'string',
                dataIndex : 'structureDeterminationMethod'
            }, {
                type : 'string',
                dataIndex : 'signalPeptidePredicted'
            }, {
                type : 'string',
                dataIndex : 'nterminalExperimental'
            }, {
                type : 'string',
                dataIndex : 'molecularWtExperimental'
            }, {
                type : 'string',
                dataIndex : 'molecularWtPredicted'
            }, {
                type : 'string',
                dataIndex : 'proteinLength'
            }, {
                type : 'string',
                dataIndex : 'cbd'
            }, {
                type : 'string',
                dataIndex : 'glycosylation'
            }, {
                type : 'string',
                dataIndex : 'dnaSequence'
            }, {
                type : 'string',
                dataIndex : 'proteinSequence'
            }, {
                type : 'string',
                dataIndex : 'datetime'
            }]
});


MycoCLAP.selectionModel = new Ext.grid.CheckboxSelectionModel({
   width : 25,
   cls : 'x-grid3-hd-checker',
   singleSelect : false
});     


MycoCLAP.tableColumn = new Ext.grid.ColumnModel([
        MycoCLAP.selectionModel,
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
          renderer : function(value, metaData, record, rowIndex, colIndex, store) {
	           var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('entryName'),
	                   last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('entryName');
	                    metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
	/*                    if (first) {
	                        var i = rowIndex + 1;
	                        while (i < store.getCount() && value === store.getAt(i).get('entryName')) {
	                            i++;
	                        }
	                        var rowHeight = 20, padding = 6,
	                            height = (rowHeight * (i - rowIndex) - padding) + 'px';
	                        metaData.attr = 'style="height:' + height + ';line-height:' + height + ';"';
	                    }
	 *//*                   return first ? '<a href="' + urlbase 
	                        +  '?dispatcher=clap.app.dispatcher.GeneViewDispatcher&entryName='
	                        +  value + '" target="_blank">' + value + '</a>' : '';*/
	                        return first ? '<a href="' + urlbase 
	                        +  'clap/GeneView/'
	                        +  value + '" target="_blank">' + value + '</a>' : '';
            }
      }, {
          header : 'Species',
          width : 140,
          sortable : true,
          dataIndex : 'species',
          tooltip : MycoCLAP.SpeciesTooltip,
		  renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		            // refField is the value from the reference column (Entry Name)
		           var refField = store.getAt(rowIndex).get('entryName'); 
		           var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
		                        last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
		                    metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
		/*                    if (first) {
		                        var i = rowIndex + 1;
		                        while (i < store.getCount() && refField === store.getAt(i).get('entryName')) {
		                            i++;
		                        }
		//                        var rowHeight = 20, padding = 6,
		//                            height = (rowHeight * (i - rowIndex) - padding) + 'px';
		//                        metaData.attr = 'style="height:' + height + ';line-height:' + height + ';"';
		                    }
		*/                    return first ? value : '';
		    }
      }, {
        header : 'Strain',
        width : 100,
        sortable : true,
        hidden : true,
        dataIndex : 'strain',
        tooltip : MycoCLAP.StrainTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
         header : 'Gene Name',
         width : 150,
         sortable : true,
         hidden : true,
         dataIndex : 'geneName',
         tooltip : MycoCLAP.GeneNameTooltip,
         renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
          header : 'Gene Alias',
          width : 80,
          sortable : true,
          hidden : true,
          dataIndex : 'geneAlias',
          tooltip : MycoCLAP.GeneAliasTooltip,
          renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
         header : 'EC Systematic Name',
         width : 180,
         sortable : true,
         hidden : true,
         dataIndex : 'ecSystematicName',
         renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
          header : 'Enzyme Name',
          width : 130,
          sortable : true,
          dataIndex : 'enzymeName',
          tooltip : MycoCLAP.EnzymeNameTooltip,
          renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
          header : 'Enzyme Alias',
          width : 80,
          sortable : true,
          hidden : true,
          dataIndex : 'enzymeAlias',
          tooltip : MycoCLAP.EnzymeAliasTooltip,
          renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
          header : 'CAZy Family',
          width : 80,
          sortable : true,
          hidden : false,
          dataIndex : 'family',
          tooltip : MycoCLAP.FamilyTooltip,
          renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                 // refField is the value from the reference column (Entry Name)
                var refField = store.getAt(rowIndex).get('entryName'); 
                var first = !rowIndex || refField !== store.getAt(rowIndex - 1).get('entryName'),
                    last = rowIndex >= store.getCount() - 1 || refField !== store.getAt(rowIndex + 1).get('entryName');
                metaData.css += 'row-span' + (first ? ' row-span-first' : '') +  (last ? ' row-span-last' : '');
                return first ? value : '';
         }
      }, {
          header : 'Host For Recombinant Expression',
          width : 150,
          sortable : true,
          dataIndex : 'host',
          tooltip : MycoCLAP.HostTooltip
      }, {
          header : 'Substrates',
          width : 110,
          sortable : true,
          dataIndex : 'substrates',
          tooltip : MycoCLAP.SubstratesTooltip
      }, {
        header : 'Assay',
        width : 120,
        sortable : true,                
        dataIndex : 'assay',
        tooltip : MycoCLAP.AssayTooltip
      }, {
          header : 'Specific Activity',
          width : 100,
          sortable : true,
          dataIndex : 'specificActivity',
          tooltip : MycoCLAP.SpecificActivityTooltip
      }, {
        header : 'Activity Assay Conditions',
        width : 150,
        sortable : true,
        hidden : true,          
        dataIndex : 'activityAssayConditions',
        tooltip : MycoCLAP.ActivityAssayConditionsTooltip
      }, {
        header : 'Substrate Specificity(%)',
        width : 150,
        sortable : true,
        hidden : true,                  
        dataIndex : 'substrateSpecificity',
        tooltip : MycoCLAP.SubstrateSpecificityTooltip
      }, {
        header : 'Km',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'km',
        tooltip : MycoCLAP.KmTooltip
      }, {
        header : 'Kcat(s-1)',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'kcat',
        tooltip : MycoCLAP.KcatTooltip
      }, {
        header : 'Vmax',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'vmax',
        tooltip : MycoCLAP.VmaxTooltip
      }, {
        header : 'Kinetic Assay Conditions',
        width : 120,
        sortable : true,
        hidden : true,                  
        dataIndex : 'kineticAssayConditions',
        tooltip : MycoCLAP.KineticAssayConditionsTooltip
      }, {
        header : 'Product Analysis',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'productAnalysis'
      }, {
        header : 'Product Formed',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'productFormed'
      }, {
        header : 'pH Optimum',
        width : 80,
        sortable : true,                
        dataIndex : 'phOptimum',
        tooltip : MycoCLAP.pHoptimumTooltip
      }, {
        header : 'pH Stability',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'phStability',
        tooltip : MycoCLAP.pHstabilityTooltip
      }, {
        header : 'Temperature Optimum (\u00B0C)',
        width : 85,
        sortable : true,                 
        dataIndex : 'temperatureOptimum',
        tooltip : MycoCLAP.TempOptimumTooltip
      }, {
        header : 'Temperature Stability (\u00B0C)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'temperatureStability',
        tooltip : MycoCLAP.TempStabilityTooltip
      }, {
        header : 'Isoelectric Point Experimental',
        width : 110,
        sortable : true,
        hidden : true,                  
        dataIndex : 'ipExperimental',
        tooltip : MycoCLAP.IsoelectricPointExperimentalTooltip
      }, {
        header : 'Isoelectric Point Predicted',
        width : 110,
        sortable : true,
        hidden : true,                  
        dataIndex : 'ipPredicted',
        tooltip : MycoCLAP.IsoelectricPointPredictedTooltip
      }, {
        header : 'Other Features',
        width : 200,
        sortable : true,
          hidden : true,                  
        dataIndex : 'otherFeatures',
        tooltip : MycoCLAP.OtherFeatureTooltip
      }, {
        header : 'EC number',
        width : 70,
        sortable : true,                 
        dataIndex : 'ecNumber',
        tooltip : MycoCLAP.ECnumberTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var ecNum = value.replace(/EC /, "");
            return '<a href="http://au.expasy.org/enzyme/' + ecNum
                    + '" target="_blank">' + value + '</a>';
        }
      }, {
        header : 'GO (molecular function)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'goMolecularId',
        tooltip : MycoCLAP.GOmolecularTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(";");
            if (multiValue.length == 1)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + value + '</a>';
	        else if (multiValue.length == 3)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
	                    + multiValue[1] 
	                    + ';<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                        + multiValue[2] + '" target="_blank">' + multiValue[2] + '</a>';
	        else 
	        	if ( multiValue[1].match(/\d+/) )
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
		                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
		                    + '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
	                        + multiValue[1] + '" target="_blank">' + multiValue[1] + '</a>';
		        else     
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
		                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>'
		                    + multiValue[1];           
        }
      }, {
        header : 'GO (biological process)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'goProcessId',
        tooltip : MycoCLAP.GOprocessTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(";");
            if (multiValue.length == 1)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + value + '</a>';
	        else if (multiValue.length == 3)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
	                    + multiValue[1] 
	                    + ';<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                        + multiValue[2] + '" target="_blank">' + multiValue[2] + '</a>';
	        else 
	        	if ( multiValue[1].match(/\d+/) )
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
	                    + '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                        + multiValue[1] + '" target="_blank">' + multiValue[1] + '</a>';
		        else     
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
		                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>'
		                    + multiValue[1];  
        }
      }, {
        header : 'GO (cellular component)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'goComponentId',
        tooltip : MycoCLAP.GOcomponentTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(";");
            if (multiValue.length == 1)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + value + '</a>';
	        else if (multiValue.length == 3)
	            return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
	                    + multiValue[1] 
	                    + ';<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                        + multiValue[2] + '" target="_blank">' + multiValue[2] + '</a>';
	        else 
	        	if ( multiValue[1].match(/\d+/) )
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
	                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>;'
	                    + '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                        + multiValue[1] + '" target="_blank">' + multiValue[1] + '</a>';
		        else     
		        	return '<a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term='
		                    + multiValue[0] + '" target="_blank">' + multiValue[0] + '</a>'
		                    + multiValue[1];  
        }
      }, {
        header : 'Protein ID (Genbank)',
        width : 80,
        sortable : true,                 
        dataIndex : 'genbankProteinId',
        tooltip : MycoCLAP.ProteinIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(",");
            var res = "";
            for (i = 0; i < multiValue.length; i++) {
                var linkId = multiValue[i].replace(/^\s+|\s+$/g, '');
                res += '<a href="http://www.ncbi.nlm.nih.gov/protein/'
                        + linkId + '" target="_blank">' + multiValue[i]
                        + '</a>';
    
                if (i != multiValue.length - 1) {
                    res += ',';
                }
            }
            return res;
        }
      }, {
        header : 'RefSeq Protein ID',
        width : 80,
        sortable : true,                 
        dataIndex : 'refseqProteinId',
        tooltip : MycoCLAP.RefSeqProteinIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(",");
            var res = "";
            for (i = 0; i < multiValue.length; i++) {
                var linkId = multiValue[i].replace(/^\s+|\s+$/g, '');
                res += '<a href="http://www.ncbi.nlm.nih.gov/protein/'
                        + linkId + '" target="_blank">' + multiValue[i]
                        + '</a>';
    
                if (i != multiValue.length - 1) {
                    res += ',';
                }
            }
            return res;
        }
      }, {
        header : 'Gene ID (Genbank)',
        width : 110,
        sortable : true,
        hidden : true,                  
        dataIndex : 'genbankGeneId',
        tooltip : MycoCLAP.GeneIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {        
            if (value.match(/http/i)) {
                var geneID = value.replace(/^.*\/([0-9]+)\?.*$/, '$1'); 
                return '<a href="' + value + '" target="_blank">' + geneID + '</a>';
            }
            else {
                return '<a href="http://www.ncbi.nlm.nih.gov/nuccore/' + value
                        + '" target="_blank">' + value + '</a>';
            }
        }
      }, {
        header : 'UniProt ID',
        width : 80,
        sortable : true,               
        dataIndex : 'uniprotId',
        tooltip : MycoCLAP.UniprotIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(",");
            var res = "";
            for (i = 0; i < multiValue.length; i++) {
                var linkId = multiValue[i].replace(/^\s+|\s+$/g, '');
                res += '<a href="http://www.uniprot.org/uniprot/'
                        + linkId + '" target="_blank">' + multiValue[i]
                        + '</a>';
    
                if (i != multiValue.length - 1) {
                    res += ',';
                }
            }
            return res;
        }
      }, {
        header : 'JGI ID',
        width : 70,
        sortable : true,
        hidden : true,                  
        dataIndex : 'jgiId',
        tooltip : MycoCLAP.JGIIDTooltip
      }, {
        header : 'BROAD ID',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'broadId',
        tooltip : MycoCLAP.BROADIDTooltip
      }, {
        header : 'Literature PMID',
        width : 85,
        sortable : true,                
        dataIndex : 'literaturePmid',
        tooltip : MycoCLAP.LiteraturePMIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            <c:choose>
            <c:when test="${!auth:isRegistered(CurrentUser)}">
                if (value.match(/DOI/i)) {
                    var doiNum = value.replace(/^\s*DOI:\s*/i, "");
                    res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                    return res;       
                } else if (value.match(/CSFG/i)) {
                    if ( value.match(/http/i)) {
                        var res = value.replace(/^\s*CSFG.*?:/, "");
                        var csfg = value.replace(/:\s*http.*$/, "");
                        res = '<a href="' + res + '" target="_blank">' + csfg + '</a>';
                        return res;
                    } else {
                        return value;
                    }
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var multiValue = new Array();
                    multiValue = value.split(";");
                    var res = "";
                    for (i = 0; i < multiValue.length; i++) {
                        var pdf = multiValue[i];
                        res += '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                                + pdf + '" target="_blank">' + multiValue[i]
                                + '</a>';
            
                        if (i != multiValue.length - 1) {
                            res += ';';
                        }
                    }
                    return res;               
                }
            </c:when>
            <c:when test="${auth:isRegistered(CurrentUser)}">
                // for registered user, display the pdf file
                if (value.match(/DOI/i)) {
                        var doiNum = value.replace(/DOI:\s*/i, "");
                        res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                        return res;       
                } else if (value.match(/CSFG/i)) {
                    var pdf = value; // + ".pdf";                    
                    return '<a href="' + urlbase + 'clap/literatures/'  + pdf + '" target="_blank">'
                            + pdf + '</a>';
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var multiValue = new Array();
                    multiValue = value.split(";");
                    var res = "";
                    for (i = 0; i < multiValue.length; i++) {
                        var pdf = multiValue[i];
                        res += '<a href="'+urlbase+'clap/literatures/' + pdf + '" target="_blank">' 
                                + multiValue[i] + '</a>';
            
                        if (i != multiValue.length - 1) {
                            res += ';';
                        }
                    }
                    return res;    
                } 
            </c:when>
            <c:otherwise>
            Ext.Msg.alert('Warning!', 'Unable to get the literature!');
            </c:otherwise>
            </c:choose>
        }
      }, {
        header : 'Structure PMID',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'structurePmid',
        tooltip : MycoCLAP.StructurePMIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            <c:choose>
            <c:when test="${!auth:isRegistered(CurrentUser)}">
                if (value.match(/DOI/i)) {
                    var doiNum = value.replace(/DOI:\s*/i, "");
                    res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                    return res;       
                } else if (value.match(/CSFG/i)) {
                    if ( value.match(/http/i)) {
                        var res = value.replace(/^\s*CSFG.*?:/, "");
                        var csfg = value.replace(/:\s*http.*$/, "");
                        res = '<a href="' + res + '" target="_blank">' + csfg + '</a>';
                        return res;
                    } else {
                        return value;
                    }
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var multiValue = new Array();
                    multiValue = value.split(";");
                    var res = "";
                    for (i = 0; i < multiValue.length; i++) {
                        res += '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                                + multiValue[i] + '" target="_blank">' + multiValue[i]
                                + '</a>';       
                        if (i != multiValue.length - 1) {
                            res += ';';
                        }
                    }
                    return res;          
                } 
            </c:when>
            <c:when test="${auth:isRegistered(CurrentUser)}">
                // for registered user, display the pdf file
                if (value.match(/DOI/i)) {
                    var doiNum = value.replace(/DOI:\s*/i, "");
                    res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                    return res;       
                } else if (value.match(/CSFG/i)) {
                    var pdf = value;            
                    if ( value.match(/http/i)) {
                        pdf = value.replace(/:\s*http.*$/, "");
                    }
                    return '<a href="' + urlbase + 'clap/literatures/'  + pdf + '" target="_blank">'
                            + pdf + '</a>';
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var pdf = value;
                    return '<a href="'+urlbase+'clap/literatures/'  + pdf + '" target="_blank">'
                            + value + '</a>';
                }
            </c:when>
            <c:otherwise>
                Ext.Msg.alert('Warning!', 'Unable to get the literature!');
            </c:otherwise>
            </c:choose>
        }
      }, {
        header : 'Sequence PMID',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'sequencePmid',
        tooltip : MycoCLAP.SequencePMIDTooltip,
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            <c:choose>
            <c:when test="${!auth:isRegistered(CurrentUser)}">
                if (value.match(/DOI/i)) {
                    var doiNum = value.replace(/DOI:\s*/i, "");
                    res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                    return res;       
                } else if (value.match(/CSFG/i)) {
                    if ( value.match(/http/i)) {
                        var res = value.replace(/^\s*CSFG.*?:/, "");
                        var csfg = value.replace(/:\s*http.*$/, "");
                        res = '<a href="' + res + '" target="_blank">' + csfg + '</a>';
                        return res;
                    } else {
                        return value;
                    }
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var multiValue = new Array();
                    multiValue = value.split(";");
                    var res = "";
                    for (i = 0; i < multiValue.length; i++) {
                        res += '<a href="http://www.ncbi.nlm.nih.gov/pubmed/'
                                + multiValue[i] + '" target="_blank">' + multiValue[i]
                                + '</a>';       
                        if (i != multiValue.length - 1) {
                            res += ';';
                        }
                    }
                    return res;          
                } 
            </c:when>
            <c:when test="${auth:isRegistered(CurrentUser)}">
                // for registered user, display the pdf file
                if (value.match(/DOI/i)) {
                    var doiNum = value.replace(/DOI:\s*/i, "");
                    res = '<a href="http://dx.doi.org/' + doiNum +'" target="_blank">' +value +'</a>';  
                    return res;       
                } else if (value.match(/CSFG/i)) {
                    var pdf = value;            
                    if ( value.match(/http/i)) {
                        pdf = value.replace(/:\s*http.*$/, "");
                    }
                    return '<a href="' + urlbase + 'clap/literatures/'  + pdf + '" target="_blank">'
                            + pdf + '</a>';
                } else if (value.match(/http/i)) {
                    return '<a href="' + value + '" target="_blank">'
                            + value + '</a>';                
                } else if (value.match(/[0-9]*/)) {
                    var pdf = value;
                    return '<a href="'+urlbase+'clap/literatures/'  + pdf + '" target="_blank">'
                            + value + '</a>';
                }
            </c:when>
            <c:otherwise>
                Ext.Msg.alert('Warning!', 'Unable to get the literature!');
            </c:otherwise>
            </c:choose>
        }
      }, {
        header : 'PDB ID',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'pdbId',
        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
            var multiValue = new Array();
            multiValue = value.split(",");
            var res = "";
            for (i = 0; i < multiValue.length; i++) {
                var linkId = multiValue[i].replace(/^\s+|\s+$/g, '');
                res += '<a href="http://www.pdb.org/pdb/explore/explore.do?structureId='
                        + linkId + '" target="_blank">' + multiValue[i]
                        + '</a>';
    
                if (i != multiValue.length - 1) {
                    res += ',';
                }
            }
            return res;
        }
      }, {
        header : 'Structure Determination Method',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'structureDeterminationMethod'
      }, {
        header : 'Signal Peptide (predicted)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'signalPeptidePredicted',
        tooltip : MycoCLAP.SignalPeptidePredictedTooltip
      }, {
        header : 'N-Terminal (experimental)',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'nterminalExperimental'
      }, {
        header : 'Molecular Weight in kDa (experimental)',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'molecularWtExperimental',
        tooltip : MycoCLAP.WeightExperimentalTooltip
      }, {
        header : 'Molecular Weight in kDa (predicted)',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'molecularWtPredicted',
        tooltip : MycoCLAP.WeightPredictedTooltip
      }, {
        header : 'Protein Length',
        width : 80,
        sortable : true,
        hidden : true,                  
        dataIndex : 'proteinLength',
        tooltip : MycoCLAP.ProteinLengthTooltip
      }, {
        header : 'CBD',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'cbd',
        tooltip : MycoCLAP.CBDTooltip
      }, {
        header : 'Glycosylation',
        width : 85,
        sortable : true,
        hidden : true,                  
        dataIndex : 'glycosylation',
        tooltip : MycoCLAP.GlycosylationTooltip
      }, {
        header : 'DNA Sequence',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'dnaSequence'
      }, {
        header : 'Protein Sequence',
        width : 100,
        sortable : true,
        hidden : true,                  
        dataIndex : 'proteinSequence'
      }, {
        header : 'Date of Last Modification',
        width : 100,
        sortable : true,                
        dataIndex : 'datetime'
      }
]);


MycoCLAP.tableGrid = new Ext.grid.GridPanel({
    id : 'tableGrid-panel',
    xtype : 'grid',
    region : 'center',
    layout : 'fit',
    margins : '5 5 5 2',
    bodyStyle : 'padding:0px',
    // Let IE can still calculate dimensions after a resize when the tab is not active.
    // With display mode, if the tab is rendered but hidden,
    // IE will mess up the layout on show:
    hideMode : Ext.isIE ? 'offsets' : 'display',
    baseCls: 'hide-cb-header',
    cls: 'grid-row-span',

    store : MycoCLAP.showTable,
    colModel : MycoCLAP.tableColumn,
    selModel: new Ext.grid.CheckboxSelectionModel({singleSelect:false}),
    loadMask : {msg: "Loading..."},
    autoResize: true,
    stripeRows : true,
    columnLines : true,
    
    plugins : MycoCLAP.filters,
    
    tbar: new Ext.Toolbar({
        height : 30,
        items : [{
                    xtype: 'tbspacer',
                    width: 10
                },
	            {
	                tag: 'div',
	                id: 'searchTerm',
	                style: 'float:right;'
	            },'->',
	            {
	                text: 'Field',
	                tooltip: 'Enter search term'
	            },' ',
	            {
	            	xtype: 'combo',
			        id : 'fieldMatchInGrid',
			        store: MycoCLAP.searchFieldsInGridFilter,
	                fieldLabel : 'field',
			        name : 'fieldMatch',
			        displayField: 'text',
	                valueField: 'value',
	                typeAhead: false,
	                allowBlank : false,
	                mode: 'local',
	                triggerAction: 'all',
	                selectOnFocus: true,
	                enablekeyEvents: true,
	                editable: false,
	                value : 'all',
	                width: 200
	            },' ', 
	            {
	                text: 'Term'
	            },' ',{
	                xtype: 'field',
			        id : 'searchInGrid',
			        fieldLabel : 'Keyword',
			        name : 'SearchTerm',
			        allowBlank : true,
			        width: 300,
			        listeners: {
			                specialkey: function(field, el){
			                    if (el.getKey() == Ext.EventObject.ENTER)
			                        Ext.getCmp('search-table-in-grid').fireEvent('click')
			                },
			                render: function() {
			                    this.el.set(
			                      {qtip: 'support BOOLEAN OPERATOR - <b>AND</b>, <b>&&</b>, <b>OR</b>, <b>||</b>, <b>NOT</b>, <b>!</b>, or combination of them'}
			                    );
			                }
			            }
			   }, {
	                xtype: 'tbbutton',
	                text: 'Search',
	                id: 'search-table-in-grid',
	                listeners: {
	                    click: function() {
	                    	MycoCLAP['tableGrid'].removeAll();
	                        MycoCLAP.viewReportInGrid();  
	                    }
	                }
	            },'-', {
	                xtype: 'tbbutton',
	                text: 'Clear',
	                listeners: {
	                    click: function () {
	                        Ext.getCmp('searchInGrid').reset();
	                        Ext.getCmp('fieldMatchInGrid').reset();
	                    }
	                }
	            } ]
    }),
    
    bbar : new Ext.PagingToolbar({
        pageSize : MycoCLAP.limit,
        store : MycoCLAP.showTable,
        displayInfo : true,
        displayMsg : 'Total : {0} - {1} of {2}',
        emptyMsg : 'no data',
        plugins : MycoCLAP.filters,
        items : [
                '-', {
                    pressed: true,
                    enableToggle:true,
                    text: 'Download',
                    cls: '',
                    toggleHandler: 
                        function() {
                            MycoCLAP.fasta = false;
                            MycoCLAP.dataDownload();
                        } 
                },
                '-', {
                    pressed: true,
                    enableToggle:true,
                    text: 'FASTA',
                    cls: '',
                    toggleHandler:
                        function() {
                            MycoCLAP.fasta = true; 
                            MycoCLAP.dataDownload();
                        } 
                }
            ]
    })
});


MycoCLAP.viewReportInGrid = function() {
    /**
     * remove data from previous table and load data to current selected table
     */
    MycoCLAP.tableGrid.store.removeAll();       
    
    // get table column headers
    var header = 'entryName';
    var searchScale;
  	var values = '';
  	  
    if ( values.length > 1 ){   
        value = values.replace(/\=on/g, ''); 
        value = value.replace(/%20/g, ' ');
        value = value.split("&");  
    
        searchScale = value[0].replace(/searchScale\=/, '');
    
        var colCount = MycoCLAP['tableColumn'].getColumnCount(); 
        
        for(i=4; i < colCount; i++) { 
            MycoCLAP['tableColumn'].setHidden(i, true);
        }

        for(i=1; i < value.length; i++ ) {      // omit the first value which is searchScale
        	if ( value[i] != 'All' ) { 
        		if ( header == '' ) {
            		header += value[i];
            	} else {
            		header += '&header=' + value[i];
            	}
        	}
        }
    } 

      if (MycoCLAP.tableGrid.filters != null ) {
              MycoCLAP['tableGrid'].filters.clearFilters();
      }
    
        // load data for the grid
       MycoCLAP['tableGrid'].store.baseParams['term'] = Ext.getCmp('searchInGrid').getValue();
       MycoCLAP['tableGrid'].store.baseParams['fieldMatch'] = Ext.getCmp('fieldMatchInGrid').getValue();
       MycoCLAP['tableGrid'].store.baseParams['header'] = header;
       MycoCLAP['tableGrid'].store.baseParams['searchScale'] = searchScale;

       MycoCLAP.tableGrid.store.load({
         params : {
         	'header' : header,
            'term' : Ext.getCmp('searchInGrid').getValue(),
            'fieldMatch' : Ext.getCmp('fieldMatchInGrid').getValue(),
            'searchScale' : searchScale
         },
         plugins : MycoCLAP.filters
    }); 
    
    MycoCLAP.searchTerm = Ext.getCmp('searchInGrid').getValue();
    MycoCLAP.searchScale = searchScale;
    MycoCLAP.fieldMatch = Ext.getCmp('fieldMatchInGrid').getValue();
    
    MycoCLAP.searchMsg = MycoCLAP.searchTerm;
    if (MycoCLAP.fieldMatch != 'All')
    	MycoCLAP.searchMsg = MycoCLAP.searchTerm + ' on ' + MycoCLAP.fieldMatch;
    
    Ext.get('searchTerm').update('Search results of <font size="4"><span style="color:brown;"><b>\'' + MycoCLAP.searchMsg + '\'</b></span></font>');

    Ext.getCmp('content-panel').layout.setActiveItem('tableGrid-panel');
    MycoCLAP['tableGrid'].removeAll();
};


