// the search toolbar can be used in any panel
Ext.ns('MycoCLAP');

MycoCLAP.searchToolBar = new Ext.Toolbar({
    height : 25,
    items : [{
		        text: '<b>Home</b>'
		    },'->',
            {
                text: 'Field',
                tooltip: 'Enter search term'
            },' ',
            {
            	xtype: 'combo',
		        id : 'fieldMatchOtherPanel',
		        store: MycoCLAP.searchFieldsFilter,
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
		        id : 'searchOtherPanel',
		        fieldLabel : 'Keyword',
		        name : 'SearchTerm',
		        allowBlank : true,
		        width: 300,
		        listeners: {
		                specialkey: function(field, el){
		                    if (el.getKey() == Ext.EventObject.ENTER)
		                        Ext.getCmp('search-table-other-panel').fireEvent('click');
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
                id: 'search-table-other-panel',
                listeners: {
                    click: function() {
			   			MycoCLAP['tableGrid'].removeAll();
			   			MycoCLAP.viewReport();
	                    
                    }
                }
            },'-', {
                xtype: 'tbbutton',
                text: 'Clear',
                listeners: {
                    click: function () {
                        Ext.getCmp('searchOtherPanel').reset();
                        Ext.getCmp('fieldMatchOtherPanel').reset();
                    }
                }
            } ]
});

MycoCLAP.viewReport = function() {       
    // get table column headers
    var header = 'entryName';
    var searchScale;
    var values = '';
    
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
    } 
    
    // search term with quote must be passed to server
    var term = Ext.getCmp('searchOtherPanel').getValue();
    term = term.replace(/\"/g, "\\\"");
    document.getElementById('dataView').action =urlbase+'clap/DataView';
    document.getElementById('dataView').elements['searchScale'].value=searchScale;
    document.getElementById('dataView').elements['header'].value=header;
	document.getElementById('dataView').elements['term'].value=term;
    document.getElementById('dataView').elements['fieldMatch'].value=Ext.getCmp('fieldMatchOtherPanel').getValue();
    document.getElementById('dataView').submit();
   
};
