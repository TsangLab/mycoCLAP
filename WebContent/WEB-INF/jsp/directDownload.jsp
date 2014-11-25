<?xml version="1.0" encoding="UTF-8" ?>
<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ taglib prefix="registry" uri="https://mycoclap.fungalgenomics.ca/taglibs/registry" %>
<%@ taglib prefix="auth" uri="https://mycoclap.fungalgenomics.ca/taglibs/auth" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.sql.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Content-Language" content="en-us" />    
    <title id='page-title'>mycoCLAP Website</title>    
    <link rel="shortcut icon" href="css/images/iCubiqueIcon.gif" />
    <link rel="stylesheet" type="text/css" href="${urlbase}css/format-geneView.css" />
    <link rel="stylesheet" type="text/css" href="${urlbase}css/colors-cubique.css" />
    <script type="text/javascript" src="${urlbase}lib/jquery/jquery-1.4.2.min.js">
    </script>

<script type="text/javascript" language="Javascript">
	var urlbase = "${urlbase}";
</script> 

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
    <table width="100%" >
        <tr height="60" valign="top">
            <td align="center"><h1><i>myco</i>CLAP - Characterized Lignocellulose-Active Proteins in Fungi</h1></font>
            </td>
        </tr>
    </table>
</div>
<div id= "content" class="file-list">
	<table width="100%">
	    <tr height="30">
	        <th align="right"><a href="${urlbase}"><button type="button">HOME</button></a></th>
	    </tr>
	</table>
	<h4>Here are direct links to download complete dataset files:</h4>
	<table width="600" RULES="ALL" border="2">
		<tr>
			<td>mycoCLAP data</td>
			<td><a href="${urlbase}clap/DirectDownload/mycoCLAP_data.txt">text</a></td>
			<td></td>
		</tr>
		<tr>
			<td>DNA sequences</td>
			<td><a href="${urlbase}clap/DirectDownload/mycoCLAP_DNASeqs.fasta">fasta</a></td>
			<td></td>
		</tr>
		<tr>
			<td>Protein sequences</td>
			<td><a href="${urlbase}clap/DirectDownload/mycoCLAP_proteinSeqs.fasta">fasta</a></td>
			<td><a href="${urlbase}clap/DirectDownload/mycoCLAP_proteinSeqs_pipeline.fasta">For gene annotation pipeline</a></td>
		</tr>
		<tr>
			<td>UniProt ID Mapping</td>
			<td><a href="${urlbase}clap/DirectDownload/UniProtID_EntryName_Mapping.txt">text</a></td>
		</tr>		
	</table>
	<br />
	${message}
</div>
</body>
</html>
