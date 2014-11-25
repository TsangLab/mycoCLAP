<?xml version="1.0" encoding="UTF-8" ?>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
    <link rel="shortcut icon" href="${urlbase}css/images/iCubiqueIcon.png" />
    
    <script type="text/javascript" language="Javascript">
		var urlbase = "${urlbase}";
	</script>
</head>

<body>
	<pre style="font-size:12px;">${data}</pre>	
</body>
</html>