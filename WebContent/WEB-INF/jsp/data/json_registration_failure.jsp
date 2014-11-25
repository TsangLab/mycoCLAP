<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>
<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<json:object>
    <json:property name="failure" value="true" />
    <json:object name="errors">
        <json:property name="reason" value="Registration failed: ${message}. Try again!" />
    </json:object>
</json:object>
