<script type="text/javascript" src="${urlbase}js/newentry.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.contentPanel = {
        id : 'content-panel',
        region : 'center', 
        layout : 'card',
        activeItem : 0,
        width: 1000,
        border : false,
        items : MycoCLAP.newentryPanel
}
</script>