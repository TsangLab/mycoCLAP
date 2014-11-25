Ext.ns('MycoCLAP');

var termsConditions = ['<div  style="width:750px; margin-left:150px; margin-right:250px; margin-top:40px;">' +
               '<font face="Calibri" size="4"><p><b>Terms and Conditions</b></p>' +
               '<p>The <i>myco</i>CLAP site is built, hosted, and maintained by ' +
               'the mycoCLAP team at Concordia University, and as such it is offered to ' +
               'the scientific community under the usual terms and conditions stated by ' +
               'Concordia University at the following <a href="http://graduatestudies.concordia.ca/legalnotice.php" target="_blank">' +
               'http://graduatestudies.concordia.ca/legalnotice.php</a>.' +
               '</p>' +
               '</font>' +
               '</div>'];


MycoCLAP.termsConditions ={
		xtype: 'panel',
		id: 'termsconditions-panel',
        width: 150,
    	height: 350,
        minSize: 100,
        maxSize: 300,
        autoScroll : true,
        preventBodyReset: true,
        html: termsConditions,
        title: 'Terms and Conditions'
};

 