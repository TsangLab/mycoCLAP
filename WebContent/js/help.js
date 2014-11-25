Ext.ns('MycoCLAP');
var helphtml = ['<div  style="width:1050px; margin-left:100px; margin-right:100px; margin-top:25px;">' +
                    '<font face="Calibri" size="4">' +
                   '<p>' +
                       '<a href="#What is mycoCLAP?">What is <i>myco</i>CLAP?</a><br />' + 
                       '<a href="#What is the goal of <i>myco</i>CLAP?">What is the goal of <i>myco</i>CLAP?</a><br />' + 
                       '<a href="#What is a characterized glycoside hydrolase protein?">What is a characterized glycoside hydrolase protein?</a><br />' + 
                       '<a href="#How do I download sequences?">How do I download sequences?</a><br />' + 
                       '<a href="#How do I download <i>myco</i>CLAP data?">How do I download <i>myco</i>CLAP data?</a><br />' + 
                       '<a href="#How do I search the database?">How do I search the database?</a><br />' +
                       '<a href="#How do I run a sequence similarity search (BLAST)?">How do I run a sequence similarity search (BLAST)?</a><br />' +
                       '<a href="#How do I configure the data table?">How do I configure the data table?</a><br />' +    
                       '<a href="#How to update current data or submit new enzymes?">How to update current data or submit new enzyems?</a><br />' +
                   '</p>' +
                   
                   '<p>' +
                        '<a name="What is mycoCLAP?"><strong>What is <i>myco</i>CLAP?</strong></a><br />' +
                        '<i>myco</i>CLAP is a searchable resource for the knowledge and annotation of Characterized Lignocellulose-Active ' + 
                                'Proteins of fungal origin.' +
                   '</p>' +
                   '<p>' +
                        '<a name="What is the goal of <i>myco</i>CLAP?"><strong>What is the goal of <i>myco</i>CLAP?</strong></a><br />' +
                        'The goal of <i>myco</i>CLAP is to provide the most comprehensive collection of knowledge and data on ' + 
                        'fungal enzymes used for the decomposition of plant biomass. The purpose of this collection of data ' + 
                        'is to make the annotation process more efficient. Having a characterized set of these enzymes will ' + 
                        'decrease the occurrence of false positives in searching for homologues, drastically shorten ' + 
                        'the sorting process and expedite the identification of targets for further experimentation.' +
                   '</p>' +
                   '<p>' +
                        '<a name="What is a characterized glycoside hydrolase protein?"><strong>What is a characterized glycoside hydrolase protein?</strong></a><br />' +
                            'For <i>myco</i>CLAP, a "characterized glycoside hydrolase protein" refers to a protein that has satisfied the following criteria:<br />' + 
                            '1) The gene sequence has been deposited in a public repository.<br />' +
                            '2) The gene product has been assayed for a specific glycoside hydrolase activity.<br />' +
                            '3) The biochemical properties of the gene product have been reported in a peer-reviewed journal.' +
                   '</p>' + 
                   '<p>' +
                       '<a name="How do I download sequences?"><Strong>How do I download sequences?</strong></a><br />' +
                       'Download all the sequences in <i>myco</i>CLAP<br />' +
                       '1) Click the "<b>Download</b>" button on top toolbar.<br />' +
                       '2) Select type of sequences for download (Protein or DNA).<br />' +
                       '3) Click "<b>download</b>" button to save the file in your computer.<br /><br />' +
                       '<img src="../css/images/help/seq_download_1.jpg" alt="" width="100%"></img><br /><br />' +
                       'Download a set of sequences in <i>myco</i>CLAP (Protein only)<br />' +
                       '1) In data table, click the box on the first column to select data. If no data is selected, the whole dataset in the table will be downloaded.<br />' +
                       '2) Click "<b>FASTA</b>" button at the bottom of the table to save the file in your computer.<br /><br />' +
                       '<img src="../css/images/help/seq_download_2.jpg" alt="" width="100%"></img><br /><br />' +
                   '</p>' +
                   '<p>' +
                       '<a name="How do I download <i>myco</i>CLAP data?"><strong>How do I download <i>myco</i>CLAP data?</strong></a><br />' +
                       'Download all the data in <i>myco</i>CLAP<br />' +
                       '1) Click the "<b>Download</b>" button on top toolbar.<br />' +
                       '2) Choose radio button "Dataset(TEXT)".<br />' +
                       '3) Select fields to be included in the download file.<br />' +
                       '4) Click "<b>download</b>" button to save the file in your computer.<br /><br />' +
                       '<img src="../css/images/help/data_download_1.jpg" alt="" width="100%"></img><br /><br />' +
                       'Download a set of data in <i>myco</i>CLAP<br />' +
                       '1) In data table, click the box on the first column to select data. If no data is selected, the whole dataset in the table will be downloaded.<br />' +
                       '2) Click "<b>Download</b>" button at the bottom of the table to save the file in your computer.<br /><br />' +
                       '<img src="../css/images/help/data_download_2.jpg" alt="" width="100%"></img><br /><br />' +
                    
                   '</p>' +
                   '<p>' +
                        '<a name="How do I search the database?"><strong>How do I search the database?</strong></a><br />' +
                        'If you are not in the data table:<br />' +
                        '1) Enter your query in the <b>Term</b> field on search toolbar.<br />' +
                        '2) Click "<b>Search</b>" button or hit enter to display the data table.<br />' +
                        '3) Click "<b>Clear</b>" button to clear the content in search field.<br />' +
                        '4) Search terms can be applied on<br />' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;a. the entire database.<br />' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;b. only those selected fields on "Search" page by selecting the corresponding radio button.<br />' + 
                        '&nbsp;&nbsp;&nbsp;&nbsp;c. the field on the list in combobox.<br />' +
                        '<img src="../css/images/help/search.jpg" alt="" width="50%"></img><br /><br />' +
                        '<i>myco</i>CLAP supports Boolean operators in search term. Boolean operators must be in uppercase characters' +
                        'or use boolean operator symbols.' +
                        '<table style="border-collapse: collapse;" border="1" cellpadding="0" cellspacing="50" width="100%">' +
                        '<tr>' +                        
                        '<td><b>AND</b> or <b>&&</b></td><td> retrieve results that contain all the search terms.<br />e.g. <b>xylanse AND niger</b>, <b>xylanse && niger</b>, <b>xylanse niger</b></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td><b>NOT</b> or <b>!</b> or <b>-</b> </td><td>retrieves results that contain at least one of the search term.<br />e.g. <b>aspergillus NOT niger</b>, <b>aspergillus !niger</b>, <b>aspergillus -niger</b></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td><b>OR</b> or <b>||</b></td><td> excludes the retrieval of terms from your search.<br />e.g. <b>aspergillus OR trichoderma</b>, <b>aspergillus || trichoderma</b></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td><b>xyl*</b></td><td> find terms that begin with xyl, e.g. xyl3, xylan, xylose, xyloside, xylopyranoside</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td><b>"aspergillus niger"</b></td><td>retrieves results that contain the search term as a phrase.</td>' +
                        '</tr>' +
                        '</table>' +
                        '<br />' +
                        'If you are in the data table:<br />' +
                        'You can start a new search using search box on top of the data table.<br />' +
                        '<img src="../css/images/help/search_in_grid.jpg" alt="" width="100%"></img><br /><br />' +
                        'Or<br />' +
                        '1) Click the column header to start your search.<br />' +
                        '2) From drop-down box, move your mouse to the empty field next to "Filters" and type the search term.<br />' +
                        '3) The search will be done automatically.<br />' +
                        '<img src="../css/images/help/search_column.jpg" alt="" width="100%"></img><br /><br />' +
                   '</p>' +   
                   '<p>' +
                        '<a name="How do I run a sequence similarity search (BLAST)?"><strong>How do I run a sequence similarity search (BLAST)?</strong></a><br />' +
                        'If you are not in the data table:<br />' +
                        '1) Click the "<b>BLAST</b>" button on top of the toolbar.<br />' +
                        '2) On BLAST website, enter protein sequence into the form field or loading it from a file.<br />' +
                        '3) Click the "<b>Search</b>" button.<br />' +
                        '<img src="../css/images/help/blast_1.jpg" alt="" width="100%"></img><br /><br />' +
                        'If you are in the data table:<br />' +
                        '1) Click one of the "<b>Entry Name</b>" in the table to go to gene view page.<br />' +
                        '2) At gene view page, go to section "<b>Sequences</b>", then click "<b>BLAST this sequence against mycoCLAP</b>" button.<br />' +
                        '3) Enter protein sequence into the form field or loading it from a file.<br />' +
                        '4) Click the "<b>Search</b>" button.<br />' +
                        '<img src="../css/images/help/blast_2.jpg" alt="" width="80%"></img><br /><br />' +
                   '</p>' +   
                   '<p>' +
                        '<a name="How do I configure the data table?"><strong>How do I configure the data table?</strong></a><br />' +
                        'If you are in the <b>"Search"</b> page:<br />' +
                        '1) Go to section "Select fields to be displayed in search table".<br />' +
                        '2) Select the fields to be displayed in the result data table.<br />' +
                        '3) Click "<b>Search</b>" button or hit enter to show customized data table.<br /><br />' +
                        '<img src="../css/images/help/table_config_1.jpg" alt="" width="80%"></img><br /><br />' +
                        'If you are in the data table:<br />' +
                        '1) Click on any column header to display the drop-down box.<br />' +
                        '2) Click "Columns" from drop-down box.<br />' +
                        '3) Check/uncheck the columns to display/hide them in the table.<br /><br />' +
                        '<img src="../css/images/help/table_config_2.jpg" alt="" width="100%"></img><br />' +
                  '</p>' + 
                  '<p>' +
                  		'<a name="How to update current data or submit new enzymes?"><strong>How to updae current data or submit new enzymes?</strong></a><br />' +
                  		'1) Restrict access by authorized users only. Please login to the system using "<b>Internal User (Login)</b>" button on top of the menu.<br />' +
                  		'2) After login, click the "<b>Data Update</b>" button on top of the menu to start.<br />' +
                  		'3) At the bottom of the page, click<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;"<b>INSERT NEW DATA</b>" button (default) for submitting new enzymes<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;a. Click "Add Records" button to insert a row for new data.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;b. Fill the table with your data. Once finish, click "Save" to submit data.<br /><br />' + 
                  		'&nbsp;&nbsp;&nbsp;&nbsp;"<b>UPDATE</b>" button for updating current data<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;a. Select or type an enzyme name from the dropdown box on the top left of the table under title "Insert New Data"<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;b. Click "<b>Find</b>" to list all the entries of that enzyme.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;c. Click the field where the data need to be updated, type in new data.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;d. Once complete, click "<b>Save</b>" button to submit the updated data to database.<br /><br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;"<b>UPLOAD NEW DATA</b>" button for submitting new enzymes saved in tab delimited text file<br />' + 
                  		'&nbsp;&nbsp;&nbsp;&nbsp;a. Click "<b>DOWNLOAD TEMPLATE FILE</b>" button at the bottom of the page to get template file for your data.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;b. Add new enzyme data to template file.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;c. Click "UPLOAD NEW DATA" button at the bottom of the page to submit the data file.<br /><br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;Notes:<br />' + 
                  		'&nbsp;&nbsp;&nbsp;&nbsp;a. Sequences will be retrieved automatically from public databases (NCBI or Uniprot) if the seuqence ids are provided.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;b. Reference abstracts will be retrieved automatically from NCBI if PubMed ids are provided.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;c. For reference from sources other than PubMed (e.g. DOI, http link), curators will collect the information manually.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Fisrt, download template file from <i>myco</i>CLAP web site. Login to the web stie, then click "<b>Data Update</b>" button<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;on top of the menu, then click "<b>DOWNLOAD REFERENCE FILE</b>" button at the bottom of the page to download <br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;template file.<br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Then, add abstracts of each reference to template file and save your file. <br />' +
                  		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Finally, submit your file to database through "<b>UPLOAD NEW REFERENCE</b>" which is next to the download button.<br />' +
                  '</p>' +
                  '</font>' +
               '</div>'
             ];


MycoCLAP.helpPanel ={
        xtype: 'panel',
        id: 'help-panel',
        split: true,
        height: 350,
        minSize: 100,
        maxSize: 450,
        autoScroll : true,
        preventBodyReset: true,
        html: helphtml,
        title: 'Help'
};

