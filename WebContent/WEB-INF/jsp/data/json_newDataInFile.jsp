<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<% pageContext.setAttribute("singleQuote", "\'"); %>
<% pageContext.setAttribute("newSingleQuote", "\\\'"); %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.sql.*"%>
{
    'data' : [
	    <c:forEach var="item" items="${dataSet}" varStatus="rowCounter">   
	       {'enzymeEntryId' : '${item.enzymeEntryId}',
           'entryNameId' : '${item.entryNameId}',
           'species' : '${item.species}',
           'strain' : '${item.strain}',
           'entryName' : '${item.entryName}'
	       }<c:if test="${not rowCounter.last}">,</c:if> 
	    </c:forEach>
    ]
}