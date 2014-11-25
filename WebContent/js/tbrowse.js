Ext.ns('MycoCLAP');
//
// This is the main layout definition.
//
Ext.onReady(function() {

	Ext.QuickTips.init();

	MycoCLAP.incompleteErrorMessage = "The record is not completed. Please enter the required data before save.";
    Ext.Ajax.timeout = 90000;       // change the 30 second default to 60 seconds

    /*
     * Main layout
     */ 
	MycoCLAP.viewport =new Ext.Viewport({
		layout : 'border',
		items : [{
					xtype : 'box',
					region : 'north',
					applyTo : 'header',
					height : 40
				}, 
				new Ext.Panel({
					layout: 'border',
				    region: 'center',
				    collapsible: false,
				    split: true,
				    tbar: MycoCLAP.toolBar1,
				    items: [{
		            	    region : 'center', 
                            width: 400,
                            minSize : 175,
                            maxSize : 400,
                            layout : 'fit',
                            margins : '0 0 0 0',
                            border : true,
                            items : MycoCLAP.contentPanel
				            }
				        ]
				})
				],
		renderTo : Ext.getBody()
	});
    
	if (Ext.get('searchTerm') != null)
		Ext.get('searchTerm').update('Search results of <font size="4"><span style="color:brown;"><b>\'' + MycoCLAP.searchMsg + '\'</b></span></font>');

});
