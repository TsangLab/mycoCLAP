<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
[    
    <c:forEach var="item" items="${allEntryDescription}"
        varStatus="rowCounter">   
            ['${item.id}', '${item.entryName}']
            <c:if test="${not rowCounter.last}">,</c:if> 
    </c:forEach>
 ]
