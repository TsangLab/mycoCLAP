<script type="text/javascript" src="${urlbase}js/searchFieldsInGridFilter.js"></script>
<script type="text/javascript" src="${urlbase}js/toolTip.js"></script>
<script type="text/javascript">
	Ext.ns('MycoCLAP');
	var searchTerm = "${searchTerm}";
	var header ="${header}";
	var fieldMatch = "${fieldMatch}";
	var searchScale = "${searchScale}";
	var columnFilters = "${columnFilters}";
	MycoCLAP.searchTerm = searchTerm;
	MycoCLAP.header = header;
	MycoCLAP.fieldMatch = fieldMatch;
	MycoCLAP.searchScale = searchScale;
</script>
<script type="text/javascript" src="${urlbase}js/displayDataTable.js.jsp"></script>
<script type="text/javascript" src="${urlbase}js/report.js"></script>
<script type="text/javascript">	
	MycoCLAP.searchFieldsFilter.loadData(filterData);
	MycoCLAP.contentPanel = {
	        id : 'content-panel',
	        region : 'center', 
	        layout : 'card',
	        activeItem : 0,
	        width: 1000,
	        border : false,
	        items : MycoCLAP.tableGrid
	};
	MycoCLAP.tableGrid.store.load({
	    params : {
			'header' : header,
			'term' : searchTerm,
	       	'fieldMatch' : fieldMatch,
	       	'searchScale' : searchScale
	    },
	    plugins : MycoCLAP.filters
	}); 	
	
	Ext.getCmp('searchInGrid').setValue(searchTerm);
	Ext.getCmp('fieldMatchInGrid').setValue(fieldMatch);
	MycoCLAP.term = searchTerm;
	MycoCLAP.searchMsg = MycoCLAP.term;
	MycoCLAP.fieldMatch = fieldMatch;
	if (MycoCLAP.fieldMatch != 'All')
		MycoCLAP.searchMsg = MycoCLAP.term + ' on ' + MycoCLAP.fieldMatch;
	if (columnFilters != null)
		MycoCLAP.reportColumnFilters(columnFilters);
</script>
