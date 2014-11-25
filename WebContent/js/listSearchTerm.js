// list of available fields in table for selected database
Ext.ns('MycoCLAP');

MycoCLAP.listSearchTerm = new Ext.data.ArrayStore({
    url : urlbase+'?dispatcher=clap.app.dispatcher.ListSearchTermDispatcher',
    fields : ['value', 'text'],
    sortInfo : {
    	field : 'text',
    	direction : 'ASC'
    }
});

