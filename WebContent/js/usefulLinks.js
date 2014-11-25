Ext.ns('MycoCLAP');

var usefulLinks = ['<div  style="margin-left:100px; margin-right:100px; margin-top:25px;">' +
                   '<font face="Calibri" size="4"><p style="margin-bottom:10px"><b>Here are some useful links to external resources</b></p>' +
                   '<table border="1"  cellpadding="2" cellspacing="0">' +
	                   '<tr>'+
	                   		'<th width="300">Links</th>' +	
	                   		'<th>Description</th>' +
	                   '</tr>' +		
	                   '<tr>' + 
			      	 		'<td><a href="http://www.brenda-enzymes.org/" target="_blank">BRENDA</a></td>' +
			      	 		'<td>The largest collection of enzymes and functional data available to the scientific community. Enzymes are classified according to The Enzyme Commission with E.C. numbers to represent their activities.</td>' +
			      	  '</tr>' +
			      	  '<tr>' + 
			         		'<td><a href="http://www.broadinstitute.org/scientific-community/science/projects/fungal-genome-initiative/fungal-genome-initiative" target="_blank">Fungal Genome Initiative (FGI)</a></td>' +
			         		'<td>An ongoing project at the Broad Institute associated with MIT and Harvard that produces/analyses fungal genomes sequence information relevant to medicine, agriculture and industry.</td>' +
			          '</tr>' +
			          '<tr>' + 
			      	 		'<td><a href="http://www.cazy.org/" target="_blank">Carbohydrate-Active enzymes (CAZy)</a></td>' +
			      	 		'<td>A database holding enzyme families that are active on carbohydrates. Included are: pectin lyases (PEs), carbohydrate esterases (CEs), glycoside transferases (GTs) and glycoside hydrolase (GHs) enzyme families. It holds both characterized and electronically annotated sequences as well as links to other databases.</td>' +
			      	  '</tr>' +
			      	  '<tr>' + 
			      	 		'<td><a href="http://www.ebi.ac.uk/Tools/msa/clustalw2/" target="_blank">ClustalW2</a></td>' +
			      	 		'<td>A computational tool used for comparison studies of DNA or protein sequences.</td>' +
			      	  '</tr>' +
					  '<tr>' + 
			      	 		'<td><a href="http://www.ncbi.nlm.nih.gov/genbank/" target="_blank">GenBank</a></td>' +
			      	 		'<td>A publically available gene sequence database maintained by the National Institute of Health.</td>' +
			      	  '</tr>' +
			      	  '<tr>' + 
			      	 		'<td><a href="http://www.geneontology.org/" target="_blank">The Gene Ontology</a></td>' +
			      	 		'<td>A bioinformatics project that provides a standardized vocabulary to describe the functionality and processes of gene products.</td>' +
			      	  '</tr>' +
				      '<tr>' + 
			      	 		'<td><a href="http://www.ebi.ac.uk/Tools/InterProScan/" target="_blank">InterProScan</a></td>' +
			      	 		'<td>Perl-based tool that uses a variety of protein signatures recognition methods to identify domains and/or sites in a protein query.</td>' +
			      	  '</tr>' +
			      	  '<tr>' + 
			         		'<td><a href="http://genome.jgi-psf.org/programs/fungi/index.jsf" target="_blank">Joint Genome Institute (JGI)</a></td>' +
			         		'<td>Run by the University of California for the U.S. Department of Energy.  It holds research and genomic data to support the development of clean energy generation and environmental clean up.  It holds several fungal genomes and individual sequence annotation data.</td>' +
			          '</tr>' +
			          '<tr>' + 
	                 		'<td><a href="http://www.ncbi.nlm.nih.gov/" target="_blank">National Center for Biotechnology Information (NCBI)</a></td>' +
	                 		'<td>The largest source of biochemistry, molecular biology and genetic data. It provides a variety of computational tools; links other databases and facilitates communication in the scientific community.</td>' +
	                  '</tr>' +
	                  '<tr>' + 
			      	 		'<td><a href="http://www.pdb.org/pdb/home/home.do" target="_blank">Protein Data Bank</a></td>' +
			      	 		'<td>An online resource for the studying of experimentally determined macromolecular structures such as proteins, DNA and complex assemblies.  It provides citations of structure-determining literature and 3D structure profiles.</td>' +
			      	  '</tr>' +
			      	  '<tr>' + 
	                   		'<td><a href="http://www.ncbi.nlm.nih.gov/pubmed" target="_blank">PubMed</a></td>' +
	                   		'<td>A biomedical/life sciences literature database providing citations from MEDLINE and scientific journals. Abstracts and/or a link to the full text from a literature repository or the publishers are provided with entries.</td>' +
	                   '</tr>' +
	                   '<tr>' + 
		              		'<td><a href="http://www.cbs.dtu.dk/services/SignalP/" target="_blank">SignalP</a></td>' +
		              		'<td>A computational tool that predicts the presence and location of a signal peptide when given a protein sequence.</td>' +
		               '</tr>' +
		               '<tr>' + 
		              		'<td><a href="http://www.uniprot.org/" target="_blank">UniProt</a></td>' +
		              		'<td>"The Universal Protein Resource". A database of protein sequences and annotation information. It provides literature citations and links to other databases.</td>' +
		               '</tr>' +
		               
		           '</table>' +
                   '</font></div>'];


MycoCLAP.usefulLinks = {
	xtype: 'panel',
	id: 'usefullink-panel',
	width: 200,
	autoScroll: true,
	preventBodyReset: true,
	html: usefulLinks,
	title: 'Useful Links'
};

 