<script type="text/javascript" src="${urlbase}js/searchFieldsInGridFilter.js"></script>
<script type="text/javascript" src="${urlbase}js/toolTip.js"></script>
<script type="text/javascript" src="${urlbase}js/displayDataTable.js.jsp"></script>
<script type="text/javascript" src="${urlbase}js/report.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.contentPanel = {
        id : 'content-panel',
        region : 'center', 
        layout : 'card',
        activeItem : 0,
        width: 1000,
        border : false,
        items : MycoCLAP.reportTable
};
MycoCLAP.searchFieldsFilter.loadData(filterData);
</script>

