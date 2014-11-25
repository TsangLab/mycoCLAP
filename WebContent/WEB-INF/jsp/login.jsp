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
<title id='page-title'>mycoCLAP Website</title>
<link rel="shortcut icon" href="${urlbase}css/images/iCubiqueIcon.png" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/ext-all-notheme.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}lib/ext-3.1.0/resources/css/xtheme-cubique.css" />
<link rel="stylesheet" type="text/css" href="${urlbase}css/colors-cubique.css" />

<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="${urlbase}lib/ext-3.1.0/ext-all-debug.js"></script>
<script type="text/javascript" language="Javascript">
	var urlbase = "${urlbase}";
</script> 

<!-- data -->
<script type="text/javascript" src="${urlbase}js/login.js"></script> 
<c:if test="${!isLogout && !auth:isRegistered(CurrentUser)}">
</c:if>

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
</body>
</html>