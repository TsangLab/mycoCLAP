// list of available fields in table for selected database
Ext.ns('MycoCLAP');

MycoCLAP.listFields = new Ext.data.ArrayStore({
    url : urlbase+'?dispatcher=clap.app.dispatcher.ListFieldsDispatcher',
    fields : ['value', 'text'],
    sortInfo : {
    	field : 'text',
    	direction : 'ASC'
    }
});
