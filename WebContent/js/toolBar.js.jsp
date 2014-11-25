<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ taglib prefix="auth" uri="https://mycoclap.fungalgenomics.ca/taglibs/auth" %>
Ext.ns('MycoCLAP');

MycoCLAP.toolBar1 = new Ext.Toolbar({
    id: 'toolBar-1',
    autoHeight: true,
    items: [{
               xtype: 'button',
               text: '<b>Home</b>',
               handler : function() {
               		var redirect = urlbase;                		
               		if ( window.location == redirect)
               			Ext.getCmp('content-panel').layout.setActiveItem('start-panel');
               		else	
                    	window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'search-button',
               text: '<b>Search</b>',
               handler : function() {
               		var redirect = urlbase+'clap/Search'; 
               		if ( window.location == redirect )
               			Ext.getCmp('content-panel').layout.setActiveItem('report-panel');
               		else 	
                    	window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'downloads-button',
               text: '<b>Downloads</b>',
               handler : function() {
               		var redirect = urlbase+'clap/Download'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'summary-button',
               text: '<b>Data Summary</b>',
               handler : function() {
               		var redirect = urlbase+'clap/SummaryView'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'correction-button',
               text: '<b>Correction</b>',
               handler : function() {
               		var redirect = urlbase+'clap/Correction'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'newentry-button',
               text: '<b>New Entry</b>',
               handler : function() {
               		var redirect = urlbase+'clap/NewEntry'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'blast-button',
               text: '<b>BLAST</b>',
               handler : function() {
                    window.open('http://blast.fungalgenomics.ca/blast_mycoclap.html');
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'usefullink-button',
               text: '<b>Useful Links</b>',
               handler : function() {
               		var redirect = urlbase+'clap/UsefulLinks'; 
                    window.location = redirect;
               }
            },
            <c:if test="${!auth:isRegistered(CurrentUser)}">
            {
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'login-btn',
               text: '<b>Internal User (Login)</b>',
               handler : function() {
                   var redirect = urlbase+'clap/Login'; 
                    window.location = redirect;
               }
            },
            </c:if>
            <c:if test="${auth:isRegistered(CurrentUser)}">
            {
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               id: 'logout-bnt',
               text: '<b>Logout ${CurrentUser.username}</b>',
               handler : function() {
                   var redirect = urlbase+'clap/Logout'; 
                    window.location = redirect;
               }
            },
            </c:if>       
            <c:if test="${auth:isAdmin(CurrentUser)}">
            {
               xtype: 'tbseparator'
            },
            {
               xtype: 'button',
               text: '<b>New User Registration</b>',
               handler : function() {
                   MycoCLAP.registerWin.show();
               }
            },
            {
               xtype: 'tbseparator'
            },
            {
               xtype: 'button',
               text: '<b>Data Update</b>',
               handler : function() {
               		var redirect = urlbase+'clap/UpdateData'; 
                    window.location = redirect;
               },
               tooltip : 'Update/Create data...'
            },
            </c:if>
            {
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               text: '<b>About Us</b>',
               handler: function() {
               		var redirect = urlbase+'clap/AboutUs'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               text: '<b>Help</b>',
               handler: function() {
               		var redirect = urlbase+'clap/Help'; 
                    window.location = redirect;
               }
            },{
               xtype: 'tbseparator'
            },{
               xtype: 'button',
               text: '<b>Terms & Conditions</b>',
               handler: function() {
               		var redirect = urlbase+'clap/TermsAndConditions'; 
                    window.location = redirect;
               }
            }]
});


MycoCLAP.toolBar2 = new Ext.Toolbar({
    id: 'toolBar-2',
    hidden: false,
    autoHeight: true,
    items: [{
                text: 'Field',
                tooltip: 'Enter search term'
            },' ',
            {
            	xtype: 'combo',
		        id : 'fieldMatch',
		        store: MycoCLAP.searchFieldsFilter,
                fieldLabel : 'field',
		        name : 'fieldMatch',
		        displayField: 'text',
                valueField: 'value',
                typeAhead: false,
                allowBlank : true,
                mode: 'local',
                triggerAction: 'all',
                selectOnFocus: true,
                enablekeyEvents: true,
                value : 'all',	
                editable: false,
                width: 200
            },' ', 
            {
                text: 'Term',
            },' ',{
                xtype: 'field',
		        id : 'search',
		        fieldLabel : 'Keyword',
		        name : 'SearchTerm',
		        allowBlank : true,
		        value: searchTerm,
		        width: 300,
		        listeners: {
		                specialkey: function(field, el){
		                    if (el.getKey() == Ext.EventObject.ENTER)
		                        Ext.getCmp('search-table').fireEvent('click')
		                },
		                render: function() {
		                    this.el.set(
		                      {qtip: 'support BOOLEAN OPERATOR - <b>AND</b>, <b>&&</b>, <b>OR</b>, <b>||</b>, <b>NOT</b>, <b>!</b>, or combination of them'}
		                    );
		                }
		        }
		   },{
                xtype: 'tbbutton',
                text: 'Search',
                id: 'search-table',
                listeners: {
                    click: function() {
                        MycoCLAP.viewReport();  
                    }
                }
           },'-', {
                xtype: 'tbbutton',
                text: 'Clear',
                listeners: {
                    click: function () {
                        Ext.getCmp('search').reset();
                        Ext.getCmp('fieldMatch').reset();
                    }
                }
           }] 
});


MycoCLAP.btmToolBar = new Ext.Toolbar({
    id: 'btm-toolBar',
    hidden: false,
    autoHeight: true,
    items: [{
                xtype: 'tbbutton',
                text: '<b>CBioN</b>',
                handler : function() {
                    window.open('http://www.cellulosic-biofuel.ca/cbnwiki/Main_Page');
               }     
            },'-',
            {
                xtype: 'tbbutton',
                text: '<b>Genome Canada</b>',
                handler : function() {
                    window.open('http://www.genomecanada.ca/');
               }  
            },'-',
            {
                xtype: 'tbbutton',
                text: '<b>Genome Quebec</b>',
                handler : function() {
                    window.open('http://www.genomequebec.com/');
               }  
            },'-',
            {
                xtype: 'tbbutton',
                text: '<b>Concordia University</b>',
                handler : function() {
                    window.open('http://www.concordia.ca/');
               }  
            },'-',
            {
                xtype: 'tbbutton',
                text: '<b>NSERC</b>',
                handler : function() {
                    window.open('http://www.nserc-crsng.gc.ca/');
               }  
            }]
});