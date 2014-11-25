<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
[    
    <c:forEach var="item" items="${searchTerm}"
        varStatus="rowCounter">   
            ['${item.cnt}', '${item.value}']
            <c:if test="${not rowCounter.last}">,</c:if> 
    </c:forEach>
 ]
