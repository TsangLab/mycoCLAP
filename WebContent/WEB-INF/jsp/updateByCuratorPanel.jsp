<script type="text/javascript" src="${urlbase}js/toolTip.js"></script>
<script type="text/javascript" src="${urlbase}js/updateByCurator.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.listEntryName.load();
MycoCLAP.contentPanel = {
        id : 'content-panel',
        region : 'center', 
        layout : 'card',
        activeItem : 0,
        width: 1000,
        border : false,
        items : MycoCLAP.updateGrid
};
Ext.getCmp('updateGrid-panel').setTitle('Insert New Data');
Ext.getCmp('insert-data-button').disable();
Ext.getCmp('update-data-button').enable();
Ext.getCmp('data-file-button').enable();
Ext.getCmp('add-entry').show();
Ext.getCmp('delete-entry').show();
Ext.getCmp('delete-data').hide();
Ext.getCmp('updateGrid-panel').getStore().removeAll();  
MycoCLAP.updateType = 'insert';
</script>