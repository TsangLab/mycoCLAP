<script type="text/javascript" src="${urlbase}js/searchFieldsInGridFilter.js"></script>
<script type="text/javascript" src="${urlbase}js/termDescriptionTable.js"></script>
<script type="text/javascript" src="${urlbase}js/displayDataTable.js.jsp"></script>
<script type="text/javascript" src="${urlbase}js/searchToolBar.js"></script>
<script type="text/javascript">
Ext.ns('MycoCLAP');
MycoCLAP.searchFieldsFilter.loadData(filterData);
/*
 * ================ Start page config =======================
 */
// The default start page, also a simple example of a FitLayout.
MycoCLAP.homePanel = new Ext.Panel({
    id : 'start-panel',
//    title : 'Home',
    layout : 'fit',
    autoScroll : true,
    bodyStyle : 'padding:25px',
    contentEl : 'start-div', // pull existing content from the page
    tbar: MycoCLAP.searchToolBar
});

MycoCLAP.contentPanel = {
        id : 'content-panel',
        region : 'center', 
        layout : 'card',
        activeItem : 0,
//        width: 1000,
        border : false,
        items : MycoCLAP.homePanel
};

</script>
<div style="display:none;" >
<!-- Start page content -->
<div id="start-div">
    <div style="margin-left:25px;">  
        <font face="Calibri" size="4">
        <p>
            <i>myco</i>CLAP is a searchable database of fungal genes encoding
			lignocellulose-active proteins that have been biochemically characterized.
			All the biochemical properties and functional annotations described in
			<i>myco</i>CLAP are manually curated and are based on experimental evidence
			reported in published literature. The aim of <i>myco</i>CLAP is to provide data on
			solely characterized proteins to facilitate the functional annotation of
			novel lignocellulose-active proteins. The current version of <i>myco</i>CLAP
			contains a comprehensive set of fungal glycoside hydrolases, carbohydrate esterases 
			and polysaccharide lyases. (<a id="configuration-table" href="${urlbase}clap/Search">Database Search</a>)
        </p>
        <br />
        <p><b>Corrections and New Entries</b></p>
        <p style="margin-top: 5px">
            We seek your help in ensuring the data recorded in <i>myco</i>CLAP are 
            correct and complete. Please use the forms in "Correction" to
            amend data, and "New Entry" to add new genes and biochemical data.                 
        </p> 
        <br />
        <p><b>Searching <i>myco</i>CLAP</b></p>
        <p style="margin-top: 5px">
            Examples of search terms listed below can be used to retrieve
            relevant information. The user can customize the search results 
            by choosing the features provided in the "Table". Also, the selected 
            features and entries can be downloaded in a format that is 
            compatible with most worksheets.
        </p>               
        <p style="margin-top: 5px"><u>Examples of keyword search</u></p>
        <p style="margin-top: 5px">Species - <a id="species-search" href="${urlbase}clap/Search?term=Aspergillus niger">Aspergillus niger</a></p>
        <p>Enzyme Name - <a id="enzymeName-search" href="${urlbase}clap/Search?term=Xylanase">Xylanase</a></p>
        <p>Protein ID - <a id="protienId-search" href="${urlbase}clap/Search?term=AAC41684">AAC41684</a></p>
        <p>Entry Name - <a href="${urlbase}clap/GeneView/XYL3A_ASPJA" target="_blank">XYL3A_ASPJA</a></p>
        <br />

        <p><b>Description</b></p>
        <p style="margin-top: 5px">
           <i>myco</i>CLAP database provides detailed information on gene 
           and protein sequences, biochemical properties, annotation, 
           protein features, and links to external resources. The data are 
           organized in the six categories described below.
        </p>
        <br />
        <div id = "description-help"></div><br />       
        <p><b>Reference</b></p>      
        <p style="margin-top: 5px">
           When using the <i>myco</i>CLAP database, please cite the following:
        </p>
        <p>
        	<a href="http://database.oxfordjournals.org/content/2011/bar020.full">
        	Curation of characterized glycoside hydrolases of Fungal origin</a>
        </p>
        <p>Caitlin Murphy, Justin Powlowski, Min Wu, Greg Butler and Adrian Tsang</p>
        <p>Database (2011) 2011:bar020 doi: 10.1093/database/bar020</p>
        </font>
    </div>
    <div style="margin-left:25px;"> 
    <br />
    <br />
        <p>Supported by 
            <a href="http://www.genomecanada.ca/" target="_blank">
                <img src="${urlbase}css/images/GenomeCanadaColor.jpg" alt="GenomeCanadaLogo" align=middle width="100" height="70"></img>
            </a>
            <a  href="http://www.genomequebec.ca/" target="_blank">
                <img src="${urlbase}css/images/GenomeQuebecColor.jpg" alt="GenomeQuebecLogo" align=middle width="100" height="70"></img>
            </a>
            <a href="http://www.cellulosic-biofuel.ca/cbnwiki/Main_Page" target="_blank">
                <img src="${urlbase}css/images/CBioN_sm.jpg" alt="CBioNLogo" align=middle width="80" height="70"></img>
            </a> 
            <a href="http://www.nsercbioconversion.net/" target="_blank">
                <img src="${urlbase}css/images/Bioconversion.jpg" alt="BioconversionLogo" align=middle width="110" height="100"></img>
            </a>    
        </p>
    </div>
</div>
</div>


