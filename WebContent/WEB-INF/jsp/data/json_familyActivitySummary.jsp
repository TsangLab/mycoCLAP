<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<% pageContext.setAttribute("singleQuote", "\'"); %>
<% pageContext.setAttribute("newSingleQuote", "\\\'"); %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.sql.*"%>
    
[
	<c:forEach var='item' items="${familyActivitySummary}" varStatus="rowCounter">
		['${item.family}', '${item.activity}', '${item.characterizedEnzyme}', '${item.categories}']
		<c:if test="${not rowCounter.last}">,</c:if>
	</c:forEach>
 ]
 