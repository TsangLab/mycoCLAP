<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
[    
    <c:forEach var="item" items="${columnHeaders}"
        varStatus="rowCounter">   
            ['${item.id}', '${item.columnHeader}']
            <c:if test="${not rowCounter.last}">,</c:if> 
    </c:forEach>
 ]
