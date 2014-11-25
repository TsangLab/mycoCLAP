Ext.ns('MycoCLAP');

MycoCLAP.termEnzymeNameStore=[
    ['Species','Genus and species of the organism that produces the corresponding sequence'],
    ['Strain','The particular strain of the species producing the corresponging sequence'],
    ['Enzyme Name','This is the name the enzyme is most commonly referred to as.'],
    ['Enzyme Alias','What the enzyme is called in the article'],
    ['EC Systematic Name','The name of the enzyme recommended by BRENDA'],
    ['Gene Name','The standardized gene name is made up of three letters used to '
                    + 'represent the encoded enzyme' + "'" + 's activity. '
                    + 'See table for description. Following the activity is a number '
                    + 'representing which glycoside hydrolase family the enzyme is from. '
                    + 'This is followed by a letter to make each one is unique as '
                    + 'there may be many enzymes with the same activity from one organism. '
                    + 'The letter from the original gene name in the literature is kept '
                    + '(or the given number is converted into a letter) unless there are '
                    + 'multiple enzymes from the same organism using the same letter. '
                    + 'In this case, the letter is given to the enzyme that was '
                    + 'characterized first and any other enzymes are given the next '
                    + 'unclaimed letter.'],
    ['Gene Alias', 'What the gene is called in the article']
];

MycoCLAP.termBiochemicalPropertiesStore =[ 
    ['Host(for recombinant expression)','The organism used to express the recombinant protein. '
                    + '"Native" means the protein was secreted from its natural host'],
    ['Substrates','The substrates the enzyme activity assay was carried out on. pNP=p-nirtophenyl.'],
    ['pH Optimum','The optimum pH at which the enzyme acts on its substrate rounded to the nearest 0.5.'],
    ['pH Stability','The pH range the enzyme remains stable in'],
    ['Temperature Optimum (\u00B0C)','The temperature at which enzyme activity is highest'],
    ['Temperature Stability (\u00B0C)','The temperature after which the enzyme becomes unstable.'],
    ['Specific Activity','The specific activity of the enzyme on the respective substrate '
                    + 'represented in units per milligram (U/mg) which is equivalent to '
                    + '1 micromole per minute per milligram of protein.'],
    ['Activity Assay Conditions','Buffer (and amount of it) used in activity assay, pH and temperature in \u00B0C'],
    ['Substrate Specificity (%)','The activity of the enzyme on a substrate with respect '
                    + 'to the other substrates it was tested on, measured as a percentage '
                    + 'from purified sample or crude culture'],
    ['Km','The Michaelis Constant (kM) reflects the affinity of an enzyme for its substrate. '
                    + 'It is recorded in millimolars (mM) or milligrams per milliliter (mg/ml). '
                    + 'A large value indicates a high affinity of the enzyme for its substrate.'],
    ['kcat (s-1)','The catalytic rate of the enzyme. The maximum number of reactions the enzyme catalyzes per second'],
    ['Vmax', 'Maximum velocity at which an enzyme catalyzes a reaction'],
    ['Assay', 'The experiment carried out to test the activity of the enzyme.'],
    ['Kinetic Assay Conditions', 'Buffer (and amount of it), pH and temperature in \u00B0C, used in the assay determing the kinetic parameters (Km, kcat, Vmax) if done'],
    ['Isoelectric Point (experimental)','The isoelectric point obtained from isoelectric focusing (IEF).'],
    ['Isoelectric Point (predicted)','pI determined from the amino acid sequence'],
    ['Other Features','Comments having to do with enzyme activity; inhibitors, activators, '
                    + 'variations of the same gene, prepropeptides, etc.']
];

MycoCLAP.termAnnotationStore = [
    ['EC number','The Enzyme Commission (EC) number is a numerical classification of '
                    + 'enzymes based on the reactions they catalyze. EC numbers can be '
                    + 'explored on BRENDA '
                    + '(<a href="http://www.brenda-enzymes.org/" target="_blank">The Comprehensive Enzyme Information System</a>).'],
    ['GO (molecular function)','The <a href="http://www.geneontology.org/" target="_blank">gene ontology (GO)</a>' 
                    + ' code representing the molecular function the enzyme carries out.'],
    ['GO (biological process)','The <a href="http://www.geneontology.org/" target="_blank">gene ontology (GO)</a>'
                    + ' code of the biological process the enzyme participates in.'],
    ['GO (cellular component)','The <a href="http://www.geneontology.org/" target="_blank">gene ontology (GO)</a>'
                    + ' code representing the cellular compartment in the enzyme is active.'],
    ['Evidence for GO', '<p>IDA= inferred by direct assay</p>'
                    + '<p>IC= inferred by currator</p>'
                    + '<p>TAS= traceable author statement</p>'
                    + '<p>NAS= non-traceable author statement</p>'
                    + '<p>ND= not determined</p>'
                    + '<p>ISS= inferred by sequence similarity</p>']
];

MycoCLAP.termExternalResourcesStore = [
    ['GenBank Protein ID','The protein ID issued by the GeneBank database which is part of the '
                    + '<a href="http://www.ncbi.nlm.nih.gov/" target="_blank">National Center for Biotechnology Information</a>.'],
    ['GenBank Gene ID','The nucleotide ID issued by the GeneBank database which is part of the '
                    + '<a href="http://www.ncbi.nlm.nih.gov/" target="_blank">National Center for Biotechnology Information</a>.'],
    ['UniProt ID','The protein ID issues to each enzyme by '
                    + '<a href="http://www.uniprot.org/" target="blank">UniProt</a>.'],
    ['JGI IDs','The protein ID issued by the '
                    + '<a href="http://genome.jgi-psf.org/" target="_blank">Joint Genome Institute</a>.'],
    ['BROAD IDs','The sequence ID issued by The Fungal Genome Initiative at the '
                    + '<a href="http://www.broadinstitute.org/science/projects/fungal-genome-initiative/fungal-genome-initiative" target="_blank">'
                    + 'Broad Institute of MIT and Harvard</a>.'],
    ['Literature PMID','Literature regarding enzyme characterization and properties from the PubMed database which is part of the U.S. '
                    + '<a href="http://www.ncbi.nlm.nih.gov/pubmed/" target="_blank">'
                    + 'National Library of Medicine and the National Institutes of Health</a>.'
                    + ' Literature represented by <b>CSFG</b> was obtained elsewhere.'],
    ['Structure PMID','Literature describing enzyme structure from the PubMed database which is part of the U.S. '
                    + '<a href="http://www.ncbi.nlm.nih.gov/pubmed/" target="_blank">'
                    + 'National Library of Medicine and the National Institutes of Health</a>.']
];

MycoCLAP.termProteinFeaturesStore = [
    ['CAZY Family','The glycoside hydrolase family the enzyme belongs to according to the '
                    + '<a href="http://www.cazy.org/" target="_blank">Carbohydrate Active Enzymes Database (CAZy)</a>.'],
    ['Signal Peptide','The length of amino acids of the signal peptide of the secreted protein'],
    ['Weigth in kDa (experimental)','Determined experimentally by PAGE, gel filtration, MS, etc.'],
    ['Weigth in kDa (predicted)','Calculated from amino acid composition'],
    ['Protein Length','The length of the protein, includes prepropeptide'],
    ['CBD', 'The carbohydrate binding module number of the enzyme' +"'" + 's carbohydrate binding domain (if it has one)'],
    ['Glycosylation','N- or O-glycosylation of the enzyme, must be experimentally determined, not potential sites determined from sequence']
];

MycoCLAP.termSequencesStore =[
['Protein Sequence','Protein sequence retrieved from UniProt by its UniProt ID'],
['DNA Sequence','DNA sequence retrieved from GenBank by its GenBank Gene ID']
];

MycoCLAP.termStore = new Ext.data.ArrayStore({
    fields: [
       {name: 'Term', type: 'string'},
       {name: 'Description', type: 'string'}
    ]
});

MycoCLAP.termGrid = new Ext.grid.GridPanel({
	layout: 'fit',
    store: MycoCLAP.termStore,
    columns: [
        {id:'term',header: '<b>Term</b>', width: 200, sortable: true, dataIndex: 'Term'},
        {id:'description', header: '<b>Description</b>', width: 200, sortable: true, dataIndex: 'Description'}
    ],
    stripeRows: true,
    rowNumberer: true, 
    loadMask : true,
    autoResize: true,
    columnLines : true,    
    autoExpandColumn: 'description',
    width: 700,
    height: 400,
    title: 'Term Description'
});

Ext.onReady(function() {

    Ext.QuickTips.init();  
    
    MycoCLAP.termDescriptionWin = new Ext.Window({
            layout:'fit',
            width: 700,
            height: 400,
            closable: false,
            resizable: true,
            plain: true,
            border: false,
            draggable: false,
            closeAction: 'hide',
            buttons: [
                {
                    text: 'Close',
                    handler: function() {
                    	MycoCLAP.termDescriptionWin.hide();
                    	MycoCLAP.termStore.remove();
                    }
                }
            ],
            items: [MycoCLAP.termGrid]
       });
    
}); 

/** description table on home page
 * 
 **/
var enzymeName = 'The name of the enzyme as well as the species/strain of the source organism. ' +
            'For each enzyme activity, <i>myco</i>CLAP employs a name that is most ' +
            'commonly used in the literature. The enzyme name reccommended by ' +
            '<a href="http://brenda-enzymes.org/" target="_blank">' +
            'The Comprehensive Enzyme Information System</a> is also given. ' +
            'As well, enzyme aliases can be used as search terms.';

var biochemicalProperties = 'This section records the experimentally determined properties ' +
                            'of the characterized proteins; including optimal temperature ' +
                            'and pH, temperature and pH stability, specific activity,  ' + 
                            'specific activity, substrate specificities as well as kinetic parameters ' +
                            'such as Km, kcat and Vmax.';
                            
var annotation = 'The standardized codes assigned to proteins based on experimental data. ' +
                'The two standardized system used are EC number ' +
                '(<a href="http://brenda-enzymes.org/" target="_blank"> ' +
                'The Comprehensive Enzyme Information System</a>) and GO terms ' + 
                '(<a href="http://www.geneontology.org/" target="_blank">' +
                'The Gene Ontology</a>).';   
                
var externalResources = 'This section provides links or ID numbers required to get information from ' +
                        'external resources. Sequence IDs from a variety of databases will allow ' +
                        'the protein and/or DNA sequence of a particular protein to be found. ' +
                        'Accession numbers for literature sources are also made available.';
                        
var proteinFeaturs = 'The information here includes protein data that does not fall under "biochemical". ' +
                     'The weight (kDa) or length of the protein for example. Structural features such as ' +
                     'signal peptides and protein domain are also included.';  
                    
var sequences = 'The nucleotide and/or amino acid sequences of the proteins included in <i>myco</i>CLAP.';                     
          
var description = [
['Enzyme Name',				enzymeName],
['Biochemical Properties',  biochemicalProperties],
['Annotation',              annotation],
['External Resources',      externalResources],
['Protein Features',        proteinFeaturs],
['Sequences',               sequences]
];

var store = new Ext.data.ArrayStore({
    fields: [
       {name: 'categories'},
       {name: 'description'}
    ]
});

Ext.onReady(function(){
    MycoCLAP.descriptionHelp = new Ext.grid.GridPanel({
       renderTo: 'description-help',
       layout: 'fit',
       height: 200,
       store: store,
       columns: [{
                id       :'categories',
                header   : 'Categories', 
                width    : 150, 
                sortable : true, 
                dataIndex: 'categories',
                renderer : function(value, metadata, record, rowIndex, colIndex, store) {
                                return '<a href="#">'+value+'</a>';                                
                }                
            },
            {
                id       : 'description',
                header   : 'Description', 
                width    : 1000, 
                sortable : true, 
                dataIndex: 'description'
            }
       ],
       stripeRows: true,
       autoExpandColumn: 'description', 
       autoResize: true,
   	   autoHeight: true,
       cls: 'hide-cb-header',
       viewConfig: {
            forceFit: true
       },
       listeners: {
            cellclick: function(grid, rowIndex, colIndex) {
                if (colIndex == 0) {
                    var record = grid.getStore().getAt(rowIndex);
                    var fieldname = grid.getColumnModel().getDataIndex(colIndex);
                    var data = record.get(fieldname);
                    fieldname = fieldname.replace(/ /, "");
                    data = data.replace(/ /, "");
                    
                    var termStore = "term" + data + "Store";
                    MycoCLAP.termStore.remove();
                    MycoCLAP.termStore.loadData(MycoCLAP[termStore]);
                    MycoCLAP.termDescriptionWin.show();
                }
            }
       }
    });
});    
    
// manually load local data
store.loadData(description);



