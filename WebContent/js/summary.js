Ext.ns('MycoCLAP');

//MycoCLAP.familyActivitySummary = new Ext.data.ArrayStore({
//    url : urlbase+'?dispatcher=clap.app.dispatcher.FamilyActivitySummaryDispatcher&isSubmission=true',
//    fields : ['family', 'activity', 'characterizedEnzyme', 'categories'],
//    sortInfo : {
//    	field : 'family',
//    	direction : 'ASC'
//    }
//});
//MycoCLAP.familyActivitySummary.load();
//
//MycoCLAP.summary = new Ext.grid.GridPanel({
//	layout: 'fit',
//	store: MycoCLAP.familyActivitySummary,
//	id: 'summary-panel',
//	columns: [
//	          new Ext.grid.RowNumberer(),
//	          {
//	        	id:'family', 
//				header: '<b>Family</b>', 
//				width: 100, 
//				sortable: true, 
//		        dataIndex: 'family'
//		      }, {
//		    	id:'characterizedEnzyme',
//		    	header: '<b>Number of Enzyme Characterized</b>', 
//		    	width: 200, 
//		    	sortable: true, 
//		    	dataIndex: 'characterizedEnzyme',
//		    	tooltip: 'Total number of biochemically characterized enzymes collected for the family.'
//		      }, {
//		    	id:'activity', 
//		    	header: '<b>Activity</b>', 
//		    	width: 900, 
//		    	sortable: true, 
//		    	dataIndex: 'activity',
//		    	tooltip: 'Different types of activities the collected enzymes have for each family.'
//		      }, {
//			    	id:'categories', 
//			    	header: '<b>Categories</b>', 
//			    	width: 900, 
//			    	sortable: true, 
//			    	dataIndex: 'categories',
//			    	tooltip: 'Different types of activities the collected enzymes have for each family.'
//			      }],
//	stripRows: true,
//	autoResize: true,
//	stripeRows : true,
//    columnLines: true,
//	autoExpandcolumn: 'activity',
//    cls: 'grid-row-span',
//	loadMask: {msg: "Loading..."},
//	columnLines : true,
//	width: 1200,
//	title: 'Data Summary',
//	bbar : new Ext.PagingToolbar({
//	        pageSize : 200,
//	        store : MycoCLAP.familyActivitySummary,
//	        displayInfo : true,
//	        displayMsg : 'Total : {0} - {1} of {2}',
//		    emptyMsg : 'no data',
//		    items : [
//		            '-', {
//		                pressed: true,
//		                enableToggle:true,
//		                text: 'Download',
//		                cls: '',
//		                toggleHandler: 
//		                    function() {
//			                	var summaryDataDownload =new Ext.FormPanel({
//			                        method : 'POST',
//			                        standardSubmit : true,
//			                        hide : true,
//			                        url: urlbase+'?dispatcher=clap.app.dispatcher.FamilyActivitySummaryDispatcher&isDownload=true'
//			                    }); 
//			                	Ext.onReady(function() {
//			                        Ext.QuickTips.init();
//			                        
//			                        win = new Ext.Window({
//			                            layout:'form',
//			                            id: 'win',
//			                            width: 300,
//			                            height: 350,
//			                            autoHeight: true,
//			                            plain: true,
//			                            border: false,
//			                            draggable: false,
//			                            closeAction: 'hide',
//			                            items: [summaryDataDownload],
//			                            renderTo : Ext.getBody()        
//			                        });
//
//			                        summaryDataDownload.getForm().submit();
//			                        summaryDataDownload.getForm().reset();
//			                    });
//		                    } 
//		    }]
//	})
//});

MycoCLAP.totalEnzymes = 0;
// Using groupingView to group the rows by family type (GH, CE, PL, etc.)
MycoCLAP.familyActivitySummary = new Ext.data.ArrayStore({
    url : urlbase+'?dispatcher=clap.app.dispatcher.FamilyActivitySummaryDispatcher&isSubmission=true',
    fields : ['family', 'activity', 'characterizedEnzyme', 'categories'],
    sortInfo: {field: 'categories', direction: 'ASC'}
});
MycoCLAP.familyActivitySummary.load();

MycoCLAP.familyActivitySummaryGroup = new Ext.data.GroupingStore({
	groupField: 'categories',
	sortInfo: {field: 'categories', direction: 'ASC'},
	showGroupName: true,
	groupOnSort: true 
});

MycoCLAP.familyActivitySummary.on('load', function(store, records, options)
{
	store.each(function(eachItem) {
		MycoCLAP.familyActivitySummaryGroup.add(eachItem);
	});
});

MycoCLAP.summary = new Ext.grid.GridPanel({
	layout: 'fit',
	store: MycoCLAP.familyActivitySummaryGroup,
	id: 'summary-panel',
	columns: [
	          new Ext.grid.RowNumberer(),
	          {
	        	id:'family', 
				header: '<b>Family</b>', 
				width: 100, 
				sortable: true, 
		        dataIndex: 'family'
		      }, {
		    	id:'characterizedEnzyme',
		    	header: '<b>Number of Enzyme Characterized</b>', 
		    	width: 300, 
		    	sortable: true, 
		    	dataIndex: 'characterizedEnzyme',
		    	tooltip: 'Total number of biochemically characterized enzymes collected for the family.'
		      }, {
		    	id:'activity', 
		    	header: '<b>Activity</b>', 
		    	width: 800, 
		    	sortable: true, 
		    	dataIndex: 'activity',
		    	tooltip: 'Different types of activities the collected enzymes from each family have.'
		      }, {
		    	id:'categories', 
		    	header: '<b>Categories</b>', 
		    	width: 250, 
		    	sortable: true, 
		    	hidden: false,
		    	dataIndex: 'categories'
		      }],
	stripRows: true,
	autoResize: true,
	stripeRows : true,
    columnLines: true,
	autoExpandcolumn: 'activity',
    cls: 'grid-row-span',
	loadMask: {msg: "Loading..."},
	view: new Ext.grid.GroupingView({
        autoFill: true,
        hideGroupedColumn: false,
        headersDisabled: true,
        groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
    }),
//	title: 'Data Summary',
	bbar : new Ext.PagingToolbar({
        pageSize : 200,
        store : MycoCLAP.familyActivitySummary,
        displayInfo : true,
        displayMsg : 'Total : {0} - {1} of {2}',
	    emptyMsg : 'no data',
	    items : [
	            '-', {
	                pressed: true,
	                enableToggle:true,
	                text: 'Download',
	                cls: '',
	                toggleHandler: 
	                    function() {
		                	var summaryDataDownload =new Ext.FormPanel({
		                        method : 'POST',
		                        standardSubmit : true,
		                        hide : true,
		                        url: urlbase+'?dispatcher=clap.app.dispatcher.FamilyActivitySummaryDispatcher&isDownload=true'
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
		                            items: [summaryDataDownload],
		                            renderTo : Ext.getBody()        
		                        });

		                        summaryDataDownload.getForm().submit();
		                        summaryDataDownload.getForm().reset();
		                    });
	                    } 
	    }]
	})
});
