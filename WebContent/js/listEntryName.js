// list of available fields in table for selected database
Ext.ns('MycoCLAP');

MycoCLAP.listEntryName = new Ext.data.ArrayStore({
    url : urlbase+'?dispatcher=clap.app.dispatcher.ListEntryNameDispatcher',
    fields : ['value', 'text'],
    sortInfo : {
    	field : 'text',
    	direction : 'ASC'
    }
});
