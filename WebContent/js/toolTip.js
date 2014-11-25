Ext.ns('MycoCLAP');

MycoCLAP.EntryNameTooltip = 'The standardized gene name followed by an underscore and a code representing the organism. The code is made from the first three letters of the genus followed by the first two letters of the species.';

MycoCLAP.SpeciesTooltip = 'Genus and species of the organism that produces the corresponding sequence';

MycoCLAP.StrainTooltip = 'The particular strain f the species producing the corresponging sequence';

MycoCLAP.GeneNameTooltip = 'The standardized gene name is made up of three letters used to represent the encoded enzyme' + "'" + 's activity. See table for description. Following the activity is a number representing which glycoside hydrolase family the enzyme is from. This is followed by a letter to make each one is unique as there may be many enzymes with the same activity from one organism. The letter from the original gene name in the literature is kept (or the given number is converted into a letter) unless there are multiple enzymes from the same organism using the same letter. In this case, the letter is given to the enzyme that was characterized first and any other enzymes are given the next unclaimed letter.';

MycoCLAP.GeneAliasTooltip = 'What the gene is called in the article';

MycoCLAP.EnzymeNameTooltip = 'This is the name the enzyme is most commonly referred to as.';

MycoCLAP.EnzymeAliasTooltip = 'What the enzyme is called in the article';

MycoCLAP.RecommendedEnzymeNameTooltip = 'The name of the enzyme recommended by BRENDA';

MycoCLAP.GeneIDTooltip = 'The nucleotide ID issued by the GeneBank database which is part of the National Center for Biotechnology Information. http://www.ncbi.nlm.nih.gov/';

MycoCLAP.UniprotIDTooltip = 'The protein ID issues to each enzyme by UniProt. http://www.uniprot.org/';

MycoCLAP.ProteinIDTooltip = 'The protein ID issued by the GeneBank database which is part of the National Center for Biotechnology Information. http://www.ncbi.nlm.nih.gov/';

MycoCLAP.RefSeqProteinIDTooltip = 'This only applies if the source organism is one of the RefSeq set.';

MycoCLAP.JGIIDTooltip = 'The protein ID issued by the Joint Genome Institute. http://genome.jgi-psf.org/';

MycoCLAP.BROADIDTooltip = 'The sequence ID issued by The Fungal Genome Initiative at the Broad Institute of MIT and Harvard. http://www.broadinstitute.org/science/projects/fungal-genome-initiative/fungal-genome-initiative';

MycoCLAP.LiteraturePMIDTooltip = 'Literature regarding enzyme characterization and propertiesfrom the PubMed database which is part of the U.S. '
                                + 'National Library of Medicine and the National Institutes of Health. http://www.ncbi.nlm.nih.gov/pubmed/ '
                                + 'Literature represented by <b>CSFG</b> was obtained elsewhere.';

MycoCLAP.SequencePMIDTooltip = 'Literature where the DNA sequence is referred to.';

MycoCLAP.SubstratesTooltip = 'The substrates the enzyme activity assay was carried out on. pNP=p-nirtophenyl.';

MycoCLAP.HostTooltip = 'The organism used to express the recombinant protein. "Native" means the protein was secreted from its natural host';

MycoCLAP.SpecificActivityTooltip = 'The specific activity of the enzyme on the respective substrate represented in units per milligram (U/mg) which is equivalent to 1 micromole per minute per milligram of protein.';

MycoCLAP.ActivityAssayConditionsTooltip = 'Buffer (and amount of it) used in activity assay, pH and temperature in \u00B0C';

MycoCLAP.KmTooltip = 'The Michaelis Constant (kM) reflects the affinity of an enzyme for its substrate. It is recorded in millimolars (mM) or milligrams per milliliter (mg/ml). A large value indicates a high affinity of the enzyme for its substrate.';

MycoCLAP.SubstrateSpecificityTooltip = 'The activity of the enzyme on a substrate with respect to the other substrates it was tested on, measured as a percentage from purified sample or crude culture';

MycoCLAP.KcatTooltip = 'The catalytic rate of the enzyme. The maximum number of reactions the enzyme catalyzes per second';

MycoCLAP.VmaxTooltip = 'Maximum velocity at which an enzyme catalyzes a reaction';

MycoCLAP.AssayTooltip = 'The experiment carried out to test the activity of the enzyme.';

MycoCLAP.KineticAssayConditionsTooltip = 'buffer (and amount of it), pH and temperature in \u00B0C, used in the assay determing the kinetic parameters (Km, kcat, Vmax) if done';

MycoCLAP.pHoptimumTooltip = 'The optimum pH at which the enzyme acts on its substrate rounded to the nearest 0.5.';

MycoCLAP.pHstabilityTooltip = 'The pH range the enzyme remains stable in'; 
	
MycoCLAP.TempOptimumTooltip = 'The temperature at which enzyme activity is highest';

MycoCLAP.TempStabilityTooltip = 'The temperature after which the enzyme becomes unstable'; 

MycoCLAP.IsoelectricPointExperimentalTooltip = 'The isoelectric point obtained from isoelectric focusing (IEF).';

MycoCLAP.IsoelectricPointPredictedTooltip = 'pI determined from the amino acid sequence';

MycoCLAP.WeightExperimentalTooltip = 'Determined experimentally by PAGE, gel filtration, MS, etc.';

MycoCLAP.WeightPredictedTooltip = 'calculated from amino acid composition';

MycoCLAP.ProteinLengthTooltip = 'The length of the protein. Includes prepropeptide';

MycoCLAP.CBDTooltip = 'The carbohydrate binding module number of the enzyme' +"'" + 's carbohydrate binding domain (if it has one)';

MycoCLAP.GlycosylationTooltip = 'N- or O-glycosylation of the enzyme, must be experimentally determined, not potential sites determined from sequence';

MycoCLAP.OtherFeatureTooltip = 'Comments having to do with enzyme activity; inhibitors, activators, variations of the same gene, prepropeptides, etc.';

MycoCLAP.StructurePMIDTooltip = 'Literature describing enzyme structure from the PubMed database which is part of the U.S. National Library of Medicine and the National Institutes of Health. http://www.ncbi.nlm.nih.gov/pubmed/';

MycoCLAP.ECnumberTooltip = 'The Enzyme Commission (EC) number is a numerical classification of enzymes based on the reactions they catalyze. EC numbers can be explored on BRENDA (The Comprehensive Enzyme Information System. http://www.brenda-enzymes.org/';

MycoCLAP.GOmolecularTooltip = 'The gene ontology (GO) code representing the molecular function the enzyme carries out. ' 
                                + 'http://www.geneontology.org/';

MycoCLAP.EvidenceGOmolecularTooltip = 'IDA= inferred by direct assay<br/>'
                                       + 'IC= inferred by currator<br/>'
                                       + 'TAS= traceable author statement<br/>'
                                       + 'NAS= non-traceable author statement<br/>'
                                       + 'ND= not determined<br/>'
                                       + 'ISS= inferred by sequence similarity';

MycoCLAP.GOprocessTooltip = 'The gene ontology (GO) code of the biological process the enzyme participates in. '
                             + 'http://www.geneontology.org/';      

MycoCLAP.EvidenceGOprocessTooltip = 'IDA= inferred by direct assay<br/>'
                                       + 'IC= inferred by currator<br/>'
                                       + 'TAS= traceable author statement<br/>'
                                       + 'NAS= non-traceable author statement<br/>'
                                       + 'ND= not determined<br/>'
                                       + 'ISS= inferred by sequence similarity';
                                     
MycoCLAP.GOcomponentTooltip = 'The gene ontology (GO) code representing the cellular compartment in the enzyme is active. '
                                + 'http://www.geneontology.org/';
                                
MycoCLAP.EvidenceGOcomponentTooltip = 'IDA= inferred by direct assay<br/>'
                                       + 'IC= inferred by currator<br/>'
                                       + 'TAS= traceable author statement<br/>'
                                       + 'NAS= non-traceable author statement<br/>'
                                       + 'ND= not determined<br/>'
                                       + 'ISS= inferred by sequence similarity';

MycoCLAP.SignalPeptidePredictedTooltip = 'The length of amino acids of the signal peptide of the secreted prtein';

MycoCLAP.FamilyTooltip = 'The glycoside hydrolase family the enzyme belongs to according to the Carbohydrate Active Enzymes Database (CAZy). http://www.cazy.org/';                                     
 