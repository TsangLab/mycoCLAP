// list of fields for search filter on search page
Ext.ns('MycoCLAP');

MycoCLAP.searchFieldsFilter = new Ext.data.ArrayStore({
    fields : ['value', 'text'],
    sortInfo : {
    	field : 'text',
    	direction : 'ASC'
    }
});

filterData = [
	['all', 'All'],
	['species', 'Species'],
	['host', 'Host (for recombinant expression)'],
	['ecnumber', 'EC number'],
	['family', 'CAZy family']];

