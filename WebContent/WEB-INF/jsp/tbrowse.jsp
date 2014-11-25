<?xml version="1.0" encoding="UTF-8" ?>
<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ taglib prefix="registry" uri="https://mycoclap.fungalgenomics.ca/taglibs/registry" %>
<%@ taglib prefix="auth" uri="https://mycoclap.fungalgenomics.ca/taglibs/auth" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Language" content="en-us" />
<title>mycoCLAP Website</title>
<link rel="shortcut icon" href="${urlbase}css/images/iCubiqueIcon.png" />

<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/ext-all-notheme.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/xtheme-cubique.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}css/colors-cubique.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/ux/css/ux-all.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/ux/gridfilters/css/GridFilters.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/ux/gridfilters/css/RangeMenu.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/ux/css/Ext.ux.form.LovCombo.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/ux/css/fileuploadfield.css" />

<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/adapter/ext/ext-base.js"></script>
<!-- <script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ext-all-debug.js"></script> -->
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ext-all.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/ux-all-debug.js"></script>

<!-- extensions -->
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/menu/RangeMenu.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/menu/ListMenu.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/GridFilters.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/Filter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/StringFilter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/DateFilter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/ListFilter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/NumericFilter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/gridfilters/filter/BooleanFilter.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/overridecheckboxGroup.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/FileUploadField.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/Ext.ux.util.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/Ext.ux.form.LovCombo.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ux/Ext.ux.DynamicGridPanel.js"></script>

<!-- data -->
<script type="text/javascript" language="Javascript">
var urlbase = "${urlbase}";
var searchTerm = "${searchTerm}";
</script>
<script type="text/javascript" src="${urlbase}js/comboBoxDoQuery.js"></script>
<script type="text/javascript" src="${urlbase}js/listEntryName.js"></script>
<script type="text/javascript" src="${urlbase}js/listFields.js"></script>
<script type="text/javascript" src="${urlbase}js/searchFieldsFilter.js"></script>
<script type="text/javascript" src="${urlbase}js/register.js"></script>
<script type="text/javascript" src="${urlbase}js/toolBar.js.jsp"></script>
<jsp:include page="${innerTemplate}"></jsp:include>
<script type="text/javascript" charset="utf-8" src="${urlbase}js/tbrowse.js"></script>

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23464305-2']);
  _gaq.push(['_setDomainName', '.fungalgenomics.ca']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</head>

<body> 
<div id="header">
    <table width="100%" bgcolor=#D0D4C5>
	    <tr>
		    <td style="padding-top: 5px"><h1><i>myco</i>CLAP - Characterized Lignocellulose-Active Proteins of Fungal Origin</h1>
		    </td>
	    </tr>
    </table>
</div>
<div id="dataViewSection">
	<form id="dataView" method="post" action="clap/DataView">
		<input type='hidden' name='term'/>
		<input type='hidden' name='searchScale'/>
		<input type='hidden' name='header'/>
		<input type='hidden' name='fieldMatch'/>
		<input type='hidden' name='columnFilters'/>
		<a href="javascript: MycoCLAP.viewReport()">Submit</a>
	</form>
</div>

</body>
</html>