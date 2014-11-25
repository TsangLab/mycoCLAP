Ext.ns('MycoCLAP');

var aboutUs = ['<div  style="width:1050px; margin-left:100px; margin-right:100px; margin-top:25px;">' +
               '<font face="Calibri" size="4"><p><b>About Us</b></p>' +
               '<p><i>myco</i>CLAP is developed by the Fungal Genomics group of ' +
               '<a href="http://www.concordia.ca/" target="_blank">Concordia University</a>' +
               ' as part of the <a href="http://www.cellulosic-biofuel.ca/cbnwiki/Main_Page" target="_blank">' +
               'Cellulosic Biofuel Network</a> (supported by the ' +
               '<a href="http://www4.agr.gc.ca/AAFC-AAC/display-afficher.do?id=1195566837296&lang=eng" target="_blank">' +
               'Agriculture Bioproduct Innovation Program of ' +
               'Agriculture and Agri-Food Canada</a>), the Genozymes Project ' +
               '(supported by <a href="http://www.genomecanada.ca/" target="_blank">Genome Canada</a>' +
               ' and <a href="http://www.genomequebec.ca/" target="_blank">Genome Quebec</a>), and the ' +
               '<a href="http://www.nsercbioconversion.net/" target="_blank">Bioconversion Strategic Network</a>' +
               ' (supported by the <a href="http://www.nserc-crsng.gc.ca/" target="_blank">Natural ' +
               'Sciences Engineering Research Council of Canada</a>).</p>' +
               '<br />' +
               '<b>The team</b>' +
               '<table border="1" cellpadding="5">' +
               '</table>' +
               '<br />' +
               '<b>Former team members</b>' +
               '<table border="1" cellpadding="5">' +
               '<tr><td width="150">Shary Semarjit</td><td width="400">Biocurator</td></tr>' +
               '<tr><td width="150">Caitlin Murphy</td><td width="400">Biocurator</td></tr>' +
               '</table>' +
               '<br />' +
               '<b>Contact Us</b>' +
               '<p>To send us suggestions or ask general questions, please contact <a href="mailto:mycoclap@concordia.ca">mycoclap@concordia.ca</a></p>' +
               '</font></div>'];


MycoCLAP.aboutUs = {
	xtype: 'panel',
	id: 'aboutus-panel',
	width: 200,
	autoScroll : true,
    html: aboutUs,
	title: 'About Us'
};
 