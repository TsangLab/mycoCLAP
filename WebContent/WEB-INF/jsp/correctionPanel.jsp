<script type="text/javascript" src="${urlbase}js/correction.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.listEntryName.load();
MycoCLAP.listFields.load();
MycoCLAP.contentPanel = {
        id : 'content-panel',
        region : 'center', 
        layout : 'card',
        activeItem : 0,
        width: 1000,
        border : false,
        items : MycoCLAP.correctionPanel
}
</script>