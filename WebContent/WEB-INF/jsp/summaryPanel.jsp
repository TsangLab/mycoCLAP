<script type="text/javascript" src="${urlbase}js/summary.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.totalEnzymes = "${total}";
MycoCLAP.contentPanel = {
		id: 'content-panel',
		region : 'center',
		layout : 'card',
		activeItem : 0,
		border : false,
		title: 'Data Summary (<b>Total characterized enzymes: ' + MycoCLAP.totalEnzymes + '</b>)',
		items : MycoCLAP.summary
}
</script>