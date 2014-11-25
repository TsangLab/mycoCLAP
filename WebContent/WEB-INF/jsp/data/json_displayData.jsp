<%@ include file="/WEB-INF/jsp/include.jsp" %>
<%@ page trimDirectiveWhitespaces="true" %>
<% pageContext.setAttribute("singleQuote", "\'"); %>
<% pageContext.setAttribute("newSingleQuote", "\\\'"); %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.sql.*"%>

{    
    'total' : ${total},
    'data' : [
        <c:forEach var="item" items="${dataset}"
                       varStatus="rowCounter">
          {'enzymeEntryId' : '${item.enzymeEntryId}',
           'entryNameId' : '${item.entryNameId}',
           'species' : '${fn:replace(item.species, singleQuote, newSinglQuote)}',
           'strain' : '${item.strain}',
           'entryName' : '${item.entryName}',
           'geneName' : '${item.geneName}',
           'geneAlias' : '${item.geneAlias}',
           'enzymeName' : '${item.enzymeName}',
           'ecSystematicName' : '${item.ecSystematicName}',
           'enzymeAlias' : '${item.enzymeAlias}',
           'family' : '${item.family}',
           'substrates' : '${fn:replace(item.substrates, singleQuote, newSingleQuote)}',
           'host' : '${fn:replace(item.host, singleQuote, newSingleQuote)}',
           'specificActivity' : '${item.specificActivity}',
           'activityAssayConditions' : '${fn:replace(item.activityAssayConditions, singleQuote, newSingleQuote)}',
           'substrateSpecificity' : '${item.substrateSpecificity}',
           'km' : '${item.km}',
           'kcat' : '${item.kcat}',
           'vmax' : '${item.vmax}',
           'assay' : '${item.assay}',
           'kineticAssayConditions' : '${fn:replace(item.kineticAssayConditions, singleQuote, newSingleQuote)}',
           'productAnalysis' : '${fn:replace(item.productAnalysis,singleQuote, newSingleQuote)}',
           'productFormed' : '${fn:replace(item.productFormed, singleQuote, newSingleQuote)}',
           'phOptimum' : '${item.phOptimum}',
           'phStability' : '${item.phStability}',
           'temperatureOptimum' : '${item.temperatureOptimum}',
           'temperatureStability' : '${item.temperatureStability}',
           'ipExperimental' : '${item.ipExperimental}',
           'ipPredicted' : '${item.ipPredicted}',
           'otherFeatures' : '${fn:replace(item.otherFeatures, singleQuote, newSingleQuote)}',
           'ecNumber' : '${item.ecNumber}',
           'goMolecularId' : '${item.goMolecularId}<c:if test="${not empty item.goMolecularEvidence}">; ${item.goMolecularEvidence}</c:if>
           										<c:if test="${not empty item.goMolecularRef}">; ${item.goMolecularRef}</c:if>',
           'goProcessId' : '${item.goProcessId}<c:if test="${not empty item.goProcessEvidence}">; ${item.goProcessEvidence}</c:if>
           										<c:if test="${not empty item.goProcessRef}">; ${item.goProcessRef}</c:if>',
           'goComponentId' : '${item.goComponentId}<c:if test="${not empty item.goComponentEvidence}">; ${item.goComponentEvidence}</c:if>
           											<c:if test="${not empty item.goComponentRef}">; ${item.goComponentRef}</c:if>',
           'genbankGeneId' : '${item.genbankGeneId}<c:if test="${not empty item.otherGenbankGeneId}">, ${item.otherGenbankGeneId}</c:if>',
           'uniprotId' : '${item.uniprotId}<c:if test="${not empty item.otherUniprotId}">, ${item.otherUniprotId}</c:if>',
           'genbankProteinId' : '${item.genbankProteinId}',
           'refseqProteinId' : '${item.refseqProteinId}',
           'jgiId' : '${item.jgiId}',
           'broadId' : '${item.broadId}',
           'literaturePmid' : '${fn:replace(item.literaturePmid, singleQuote, newSingleQuote)}',
           'structurePmid' : '${fn:replace(item.structurePmid, singleQuote, newSingleQuote)}',
           'sequencePmid' : '${fn:replace(item.sequencePmid, singleQuote, newSingleQuote)}',
           'pdbId' : '${item.pdbId}',
           'structureDeterminationMethod' : '${item.structureDeterminationMethod}',
           'signalPeptidePredicted' : '${item.signalPeptidePredicted}',
           'nterminalExperimental' : '${item.nterminalExperimental}',
           'molecularWtExperimental' : '${item.molecularWtExperimental}',
           'molecularWtPredicted' : '${item.molecularWtPredicted}',
           'proteinLength' : '${item.proteinLength}',
           'cbd' : '${item.cbd}',
           'glycosylation' : '${item.glycosylation}',
           'dnaSequence' : '<c:if test="${not empty item.dnaSeqId}">${item.dnaSeqId}:</c:if>${item.dnaSequence}',
           'proteinSequence' : '<c:if test="${not empty item.proteinSeqId}">${item.proteinSeqId}:</c:if>${item.proteinSequence}',
           'datetime' : '${item.datetime}'
          }<c:if test="${not rowCounter.last}">,</c:if>    
        </c:forEach>  
    ]
}