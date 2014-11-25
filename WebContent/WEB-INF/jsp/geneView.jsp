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
    <title>mycoCLAP Website</title>    
    <link rel="shortcut icon" href="${urlbase}css/images/iCubiqueIcon.png" />
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
<a name="top" ></a>
<div id="header">
    <table width="100%" >
        <tr valign="top">
            <td height="60" align="center"><h1><i>myco</i>CLAP - Characterized Lignocellulose-Active Proteins in Fungi</h1>
            </td>
        </tr>
    </table>
</div>

<c:choose>
<c:when test="${geneview[0].entryName == null || geneview[0].entryName == ''}">
	<p align="right"><a href="${urlbase}"><button type="button">HOME</button></a></p>
	<p align="center"><font size="3">The enzyme <b>${entryname}</b> you requested could not be found. It may not exist, or be removed.</font></p>
</c:when>
<c:otherwise>
<div>
	<table width="100%">
	    <tr>
	        <th height="60" width="95%"><font size="4"><b><c:out value="${geneview[0].entryName}"/></b></font></th>
	        <th height="60" align="right"><a href="${urlbase}"><button type="button">HOME</button></a></th>
	    </tr>
	</table>
</div>
<div id="toc">&nbsp;
    <a href="#section_name">Name and origin</a> &middot; 
    <a href="#section_properties">Biochemical properties</a> &middot; 
    <a href="#section_annotation">Enzyme annotation</a> &middot; 
    <a href="#section_literature">Literature</a> &middot; 
    <a href="#section_feature">Protein features</a> &middot; 
    <a href="#section_seq">Sequences</a> &middot;
    <a href="#section_crossrefs">Cross-refs</a> &middot;
    <a href="#section_history">Entry history</a>
</div>
<div id="sections">
    <div id="section_name" class="nice">       
        <div id="content-name" class="nice-content">
            <table>
                <tr>
			        <th colspan="2" bgcolor="#c0c0c0" align="left">
				         <b>Name and origin</b>
				         <div style="float:right" >
					         <span onclick="$('#content-name .sources').toggle();$('#content-name-body').slideToggle()">
					            <span class='show-sources sources'>Show</span>
					            <span class="hide-sources sources">Hide</span>&nbsp;|
					         </span>
	                         <a href="#top" class="goTop" >Top</a>
				         </div>
			        </th>
			    </tr>
                <tbody id="content-name-body">
                    <tr>
                        <td class="first-column">Gene Name</td>
                        <td>
                            <table>
                                <tr>
                                    <td width=150><b>Name:</b></td>                                    
                                    <td><c:out value="${geneview[0].geneName}"/></td>
                                </tr>
                                <tr>
                                    <td><b>Other given name:</b></td>
                                    <td><c:out value="${geneview[0].geneAlias}"/></td>
                                    <td></td>
                                </tr>
                            </table>
                        </td>  
                    </tr>
                    <tr> 
                       <td class="first-column">Protein names</td>
                       <td>
                            <table>
                                <tr>
                                    <td width=150><b>Common name:</b></td>
                                    <td>
                                    	<c:choose>
                                    		<c:when test="${geneview[0].commonName != null && geneview[0].commonName != ''}">
                                    			<c:out value="${geneview[0].commonName}"/>
                                    		</c:when>
                                    		<c:otherwise>
                                    			<c:out value="${geneview[0].enzymeName}"/>
                                    		</c:otherwise>	
                                    	</c:choose>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>EC systematic name:</b></td>
                                    <td><c:out value="${geneview[0].ecSystematicName}"/></td>
                                </tr>
                                <tr>
                                    <td><b>Other name:</b></td>
                                    <td><c:out value="${geneview[0].alternateName}"/></td>
                                </tr>
                            </table>
                    	</td>        
                    </tr>
                    <tr> 
				       <td class="first-column">Organism</td>
				       <td>
				            <table>
                                <tr>
                                    <td width=150><b>Species:</b></td>                                    
                                    <td><c:out value="${geneview[0].species}"/></td>
                                </tr>
                                <tr>
                                    <td><b>Strain:</b></td>
                                    <td><c:out value="${geneview[0].strain}"/></td>
                                </tr>
                                <tr>
                                    <td><b>Taxonomic identifier:</b></td>
                                    <td><c:out value="${geneview[0].taxonomic}"/></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Taxonomic lineage:</b></td>
                                    <td><c:out value="${geneview[0].phylogeny}"/></td>
                                    <td></td>
                                </tr>
                            </table>
				        </td>
				    </tr>

				    <tr> 
				       <td class="first-column">Enzyme activity</td>
				       <td><c:out value="${geneview[0].definition}"/></td>
				    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <div id="section_properties" class="nice">
        <div id="content-properties" class="nice-content">
            <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Biochemical properties</b>
                         <div style='float:right' >
                             <span onclick="$('#content-properties .sources').toggle();$('#content-properties-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>
                
                <tbody id="content-properties-body">
                    <tr class="subsection">
                        <th  colspan="2">General properties</th>
                    </tr>
			        <tr>
			            <td class="first-column">Expression host</td>
			            <td>
			                <table class="sub-table">
			                    <tr>
					                <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
			                        <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
			                            <td width="200"><c:out value="${item.host}"/></td>
						            </c:if>
						            </c:forEach>
				                </tr>
				            </table>
			            </td>
			        </tr>
			        <tr>
			            <td class="first-column">Substrate</td>
                        <td>
                           <table class="sub-table">
	                           <tr>
	                               <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
	                               <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
	                                   <td width="200"><c:out value="${item.substrates}"/></td>
	                               </c:if>
	                               </c:forEach>
	                           </tr>
                            </table>
                        </td>
			        </tr>
			        <tr>
	                	<td class="first-column">Assay</td>
	                    <td>
	                       <table class="sub-table">
                               <tr>
                                   <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                                   <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
                                       <td width="200"><c:out value="${item.assay}"/></td>
                                   </c:if>
                                   </c:forEach>
                              </tr>
                           </table>
	                    </td>
                  	</tr>
                  	<tr>
                    	<td class="first-column">Temperature Optimum(&deg;C)</td>
                      	<td>
                        	<table class="sub-table">
                            	<tr>
	                                 <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
	                                 <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
	                                     <td width="200">
	                                         <c:if test="${not empty item.temperatureOptimum}">
				                                 <c:out value="${item.temperatureOptimum}"/>
				                             </c:if>
	                                     </td>
	                                 </c:if>
	                                 </c:forEach>
                            	</tr>
                        	</table>
                    	</td>
                  	</tr>
                  <tr>
                      <td class="first-column">Temperature Stability(&deg;C)</td>
                      <td>
                         <table class="sub-table">
                             <tr>
                                 <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                                 <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
                                     <td width="200">
                                         <c:if test="${not empty item.temperatureStability == true}">
                                             <c:out value="${item.temperatureStability}"/>
                                         </c:if>
                                     </td>
                                 </c:if>
                                 </c:forEach>
                             </tr>
                         </table>
                      </td>
                  </tr>
                  <tr>
                      <td class="first-column">pH Optimum</td>
                      <td>
                         <table class="sub-table">
                             <tr>
                                 <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
	                                 <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
	                                     <td width="200">
	                                         <c:if test="${not empty item.phOptimum}">
				                                 <c:out value="${item.phOptimum}"/>
				                             </c:if>
	                                     </td>
	                                 </c:if>
                                 </c:forEach>
                             </tr>
                         </table>
                      </td>
                  </tr>
                  <tr>
                      <td class="first-column">pH Stability</td>
                      <td>
                         <table class="sub-table">
                             <tr>
                                 <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
	                                 <c:if test="${not empty item.temperatureOptimum || not empty item.phOptimum}">
	                                     <td width="200">
	                                         <c:if test="${not empty item.phStability}">
	                                             <c:out value="${item.phStability}"/>
	                                         </c:if>
	                                     </td>
	                                 </c:if>
                                 </c:forEach>
                             </tr>
                         </table>
                      </td>
                  </tr>
                  <tr class="subsection">
                  	<th colspan="2">Kinetic properties</th>
                  </tr>
                  <tr>
                  	<td />
                    <td>
                        <table class="sub-table">
                            <tr>
                                <td width="15%">Host</td>
                                <td width="15%">Substrate</td>
                                <td width="30%">Activity assay conditions</td>
                                <td width="10%">Specific activity</td>
                                <td width="10%">Relative activity(%)</td>
                                <td width="10%">Assay</td>
                                <td width="10%">Reference</td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                     <td class="first-column">Activity assay</td>
                     <td>
                         <table class="sub-table">
                            <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                            <c:if test="${not empty item.assay}">
	                        	<tr>
	                            	<td width="15%"><c:out value="${item.host}"/></td>	
	                                <td width="15%"><c:out value="${item.substrates}"/></td>
	                                <td width="30%">
	                                	<c:choose>
	                                		<c:when test="${fn:length(item.activityAssayConditions)>7 && fn:substring(item.activityAssayConditions, fn:length(item.activityAssayConditions)-1, fn:length(item.activityAssayConditions)) != '.'}">
			                                	<c:out value="${item.activityAssayConditions}."/>
		                                	</c:when>
		                                	<c:otherwise>
		                                		<c:out value="${item.activityAssayConditions}"/>
		                                	</c:otherwise>
	                                	</c:choose>	                                
	                                </td>
	                                <td width="10%"><c:out value="${item.specificActivity}"/></td>
                                    <td width="10%"><c:out value="${item.substrateSpecificity}"/></td>
                                    <td width="10%">
                                   		<c:choose>
                                   			<c:when test="${fn:endsWith(item.assay, '.')}">
                                   				<c:out value="${item.assay}"/>
                                   			</c:when>
                                   			<c:otherwise>
                                   				<c:out value="${item.assay}."/>
                                   			</c:otherwise>
                                   		</c:choose>
                                    </td>
                                    <td width="10%">
	                                    <c:if test="${not empty item.literaturePmid}">
	                                    	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
	                                    		<c:if test="${item.literaturePmid == lit.value}">
	                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
	                                    		</c:if>	
	                                    	</c:forEach>                        
	                                    </c:if> 
	                                </td>
	                            </tr>
                           </c:if>    
                           </c:forEach>
                     	</table>
                     </td>
                  </tr>
                  <tr><td colspan="2">&nbsp;</td></tr>
                  <tr>
                  	<td />
                    <td>
                        <table class="sub-table">
                            <tr>
                                <td width="15%">Host</td>
                                <td width="15%">Substrate</td>
                                <td width="30%">Activity assay conditions</td>
                                <td width="20%">Product formed</td>
                                <td width="10%">Product analysis</td>
                                <td width="10%">Reference</td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                     <td class="first-column">Product analysis</td>
                     <td>
                         <table class="sub-table">
                         	<c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                            <c:if test="${not empty item.productFormed || not empty item.productAnalysis}">
                            	<tr>
                                	<td width="15%"><c:out value="${item.host}"/></td>
	                                <td width="15%"><c:out value="${item.substrates}"/></td>
	                                <td width="30%">
	                                	<c:choose>
	                                		<c:when test="${fn:length(item.activityAssayConditions)>7 && fn:substring(item.activityAssayConditions, fn:length(item.activityAssayConditions)-1, fn:length(item.activityAssayConditions)) != '.'}">
			                                	<c:out value="${item.activityAssayConditions}."/>
		                                	</c:when>
		                                	<c:otherwise>
		                                		<c:out value="${item.activityAssayConditions}"/>
		                                	</c:otherwise>
	                                	</c:choose>
	                                </td>
	                                <td width="20%"><c:out value="${item.productFormed}"/></td>
	                                <td width="10%"><c:out value="${item.productAnalysis}"/></td>
	                                <td width="10%">
	                                    <c:if test="${not empty item.literaturePmid}">
	                                    	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
	                                    		<c:if test="${item.literaturePmid == lit.value}">
	                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
	                                    		</c:if>	
	                                    	</c:forEach>                                  
	                                    </c:if>  
	                                </td>
                            	</tr>
                         	</c:if>    
                            </c:forEach>
                         </table>
                     </td>
                  </tr>
                  <tr><td colspan="2">&nbsp;</td></tr>                  
                  <tr>
                  	<td />
                    <td>
                        <table class="sub-table">
                            <tr>
                                <td width="15%">Host</td>
                                <td width="15%">Substrate</td>
                                <td width="30%">Kinetic assay conditions</td>
                                <td width="10%">Km</td>
                                <td width="10%">Kcat(s-1)</td>
                                <td width="10%">Vmax</td>
                                <td width="10%">Reference</td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                     <td class="first-column">Kinetic assay</td>
                     <td>
                         <table class="sub-table">
                            <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                            <c:if test="${not empty item.kineticAssayConditions}">
	                            <tr>
	                                <td width="15%"><c:out value="${item.host}"/></td>
	                                <td width="15%"><c:out value="${item.substrates}"/></td>
	                                <td width="30%">
	                                	<c:choose>
	                                		<c:when test="${fn:length(item.kineticAssayConditions)>7 && fn:substring(item.kineticAssayConditions, fn:length(item.kineticAssayConditions)-1, fn:length(item.kineticAssayConditions)) != '.'}">
			                                	<c:out value="${item.kineticAssayConditions}."/>
		                                	</c:when>
		                                	<c:otherwise>
		                                		<c:out value="${item.kineticAssayConditions}"/>
		                                	</c:otherwise>
	                                	</c:choose>
	                                </td>
	                                <td width="10%"><c:out value="${item.km}"/></td>
	                                <td width="10%"><c:out value="${item.kcat}"/></td>
	                                <td width="10%"><c:out value="${item.vmax}"/></td>
	                                <td width="10%">
	                                    <c:if test="${not empty item.literaturePmid}">
	                                    	 <c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
	                                    		<c:if test="${item.literaturePmid == lit.value}">
	                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
	                                    		</c:if>	
	                                    	 </c:forEach>                            
	                                    </c:if>  
	                                </td>
	                            </tr>
                         	</c:if>    
                            </c:forEach>
                         </table>
                     </td>
                  </tr>
                  <tr><td colspan="2">&nbsp;</td></tr>
                  <tr>
                     <td class="first-column">Other features</td>
                     <td>
                         <table class="sub-table">
                            <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                              	<c:if test="${not empty item.otherFeatures}">
	                               <tr>
	                                   <td width="100%">- <c:out value="${item.otherFeatures}"/></td>
	                               </tr>
                          		</c:if>
                             </c:forEach> 
                         </table>
                     </td>
                 </tr>               
                </tbody>
            </table>
        </div>
    </div>    
    
    <div id="section_annotation" class="nice">
        <div id="content-annotation" class="nice-content">
            <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Enzyme annotation</b>
                         <div style='float:right' >
                             <span onclick="$('#content-annotation .sources').toggle();$('#content-annotation-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>            
                <tbody id="content-annotation-body">                    
                    <tr class="subsection">
                        <th colspan="2">Enzyme</th>
                    </tr>
                    <tr>
                        <td class="first-column">&nbsp;&nbsp;&nbsp;Enzyme commission</td>
                        <td>
                            <table>
                                <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
                                    <c:if test="${not empty item.ecNumber}">
	                                    <tr>
		                                    <td>
							                    <a href="http://au.expasy.org/enzyme/${item.ecNumber}" target="_blank">
							                    	<c:out value="${item.ecNumber}"/>
							                    </a>;
							                    <c:out value="${item.ecSystematicName}"/>
								            </td>
			                            </tr>
		                            </c:if>  
		                        </c:forEach>
                            </table>  
                        </td>
                    </tr>
                    <tr class="subsection">
                        <th colspan="2">Gene Ontology</th>
                    </tr>
                    <tr>
                        <td />
                        <td>
                            <table class="sub-table">
                                <tr>
                                    <td width="15%">GO ID</td>
				                    <td width="30%">Term</td>
				                    <td width="15%">Evidence</td>
				                    <td width="40%">Reference</td>
				                </tr>
				            </table>
				        </td>
                    </tr>
                    <tr>
                        <td class="first-column">&nbsp;&nbsp;&nbsp;Biological process</td>
                        <td>
                            <table class="sub-table">
								<c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
								    <tr>
								        <td width="15%">
				                            <a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=${item.goProcessId}" target="_blank">
				                                <c:out value="${item.goProcessId}"/>
				                            </a>
								        </td>
								        <td width="30%">  
								            <c:forEach var="goterm" items="${goannotation}" step="1" varStatus="rowCounter">
                                                 <c:if test="${item.goProcessId == goterm.goId}">
                                                     <c:out value="${goterm.termType}"/>
                                                 </c:if>    
                                            </c:forEach>  
								        </td>
								        <td width="15%"><c:out value="${item.goProcessEvidence}"/></td>								        
								        <td width="40">
								        	<c:if test="${not empty item.goProcessRef}">
								        		<c:set var="goLits" value="${fn:split(item.goProcessRef, ',')}"/>
								        		<c:forEach var="goLit" items="${goLits}" step="1" varStatus="goLitCounter">	
			                                    	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
			                                    		<c:if test="${fn:trim(goLit) == lit.value}">
			                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
			                                    		</c:if>	
			                                    	</c:forEach>
			                                    </c:forEach>                        
		                                    </c:if>
								        </td>
								    </tr>
							     </c:forEach>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">&nbsp;&nbsp;&nbsp;Molecular function</td>
                        <td>
                            <table class="sub-table">
                                <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
							        <tr>
							            <td width="15%">
					                        <a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=${item.goMolecularId}" target="_blank">
					                            <c:out value="${item.goMolecularId}"/>
					                        </a>
							             </td>
							             <td width="30%">  
							                <c:forEach var="goterm" items="${goannotation}" step="1" varStatus="rowCounter">
							                     <c:if test="${item.goMolecularId == goterm.goId}">
							                         <c:out value="${goterm.termType}"/>
							                     </c:if>    
							                </c:forEach>
							             </td>
							             <td width="15%"><c:out value="${item.goMolecularEvidence}"/></td>
							         	 <td width="40%">
								        	<c:if test="${not empty item.goMolecularRef}">
								        		<c:set var="goLits" value="${fn:split(item.goMolecularRef, ',')}"/>
		                                    	<c:forEach var="goLit" items="${goLits}" step="1" varStatus="goLitCounter">	
			                                    	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
			                                    		<c:if test="${fn:trim(goLit) == lit.value}">
			                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
			                                    		</c:if>
		                                    		</c:forEach>	
		                                    	</c:forEach>                        
		                                    </c:if>
								         </td>
							         </tr>
							    </c:forEach>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="first-column">&nbsp;&nbsp;&nbsp;Cellular component</td>
                        <td>
                            <table class="sub-table">
	                            <c:forEach var="item" items="${geneview}" step="1" varStatus="rowCounter">
	                               <tr>
	                                   <td width="15%">
									        <a href="http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=${item.goComponentId}" target="_blank">
						                       <c:out value="${item.goComponentId}"/>
						                    </a>
								        </td>
								        <td width="30%">
                                            <c:forEach var="goterm" items="${goannotation}" step="1" varStatus="rowCounter">
                                                 <c:if test="${item.goComponentId == goterm.goId}">
                                                     <c:out value="${goterm.termType}"/>
                                                 </c:if>    
                                            </c:forEach>  
                                        </td>
                                        <td width="15%"><c:out value="${item.goComponentEvidence}"/></td>
                                        <td width="40%">
								        	<c:if test="${not empty item.goComponentRef}">
								        		<c:set var="goLits" value="${fn:split(item.goComponentRef, ',')}"/>
		                                    	<c:forEach var="goLit" items="${goLits}" step="1" varStatus="goLitCounter">	
			                                    	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
			                                    		<c:if test="${fn:trim(goLit) == lit.value}">
			                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
			                                    		</c:if>	
			                                    	</c:forEach>
			                                    </c:forEach>                        
		                                    </c:if>
								        </td>
							         </tr>
							    </c:forEach>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>
    </div>
    
    <div id="section_literature" class="nice">
        <div id="content-literature" class="nice-content">
            <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Literature</b>
                         <div style='float:right' >
                             <span onclick="$('#content-literature .sources').toggle();$('#content-literature-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>            
                <tbody id="content-literature-body">
                	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
                		<c:forEach var="item" items="${litabstract}" step="1" varStatus="rowCounter">
	                   		<c:if test="${item.pubmedId == lit.value}">
		                         <tr class="subsection">
		                         	<th colspan="2">
		                                <div id="literature_ref${lit.key}"><c:out value="[${lit.key}] ${item.title}"/>&nbsp;&nbsp;
			                                <input type="button" value="PubMed" onclick="window.open('http://www.ncbi.nlm.nih.gov/pubmed/'+ ${item.pubmedId});"/>
			                                <c:if test="${auth:isRegistered(CurrentUser)}">     
			                                    <input type="button" value="PDF" onclick="window.open('${urlbase}clap/literatures/' + ${item.pubmedId});"/>
			                                </c:if>
		                                </div>
		                            </th>
		                         </tr>            
		                         <tr>
			                         <td class="first-column">Author</td>
		                             <td><c:out value="${item.author}"/></td>
			                     </tr>
			                     <tr>
			                         <td class="first-column">Journal</td>
		                             <td><c:out value="${item.source}"/></td>
			                     </tr>
			                     <tr>
			                         <td class="first-column">Address</td>
		                             <td><c:out value="${item.address}"/></td>
			                     </tr>
		                         <tr>
		                             <td class="first-column">Abstract</td>
			                         <td><c:out value="${item.litAbstract}"/></td>
		                         </tr>
	                    	</c:if>  
	                    </c:forEach> 
	                    
	                    <c:if test="${(fn:contains(lit.value, 'CSFG') == true ||
	                    			  fn:contains(lit.value, 'DOI') == true ||
	                    			  fn:contains(lit.value, 'http') == true ) }">
	                    	<tr class="subsection">
	                    		<th colspan="2">
	                    			<div id="literature_ref${lit.key}"><c:out value="[${lit.key}] "/>
			                          	<c:choose>
											<c:when test="${fn:contains(lit.value, 'CSFG') == true}"> 
											    <c:out value="${lit.value}"/>
											</c:when>                                                   
											<c:when test="${fn:contains(lit.value, 'DOI') == true}"> 
											     <c:set var="doiNum" value="${fn:replace(lit.value, 'DOI:', '')}" />
											     <a href="http://dx.doi.org/${doiNum}"  target="_blank">
											     <c:out value="${lit.value}"/></a> 
											</c:when>
											<c:when test="${fn:contains(lit.value, 'http') == true}"> 
											     <a href="${lit.value}"  target="_blank">
											     <c:out value="${lit.value}"/></a> 
											</c:when>
			                        	</c:choose> 
		                        	</div> 
		                    	</th>    
		                    </tr>		  
	                    </c:if>			  
                    
                    </c:forEach> 
                </tbody>
            </table>    
        </div>
    </div>   
    
    <div id="section_feature" class="nice">
           <div id="content_feature" class="nice-content">
               <table>
	               <tr>
	                    <th colspan="2" bgcolor="#c0c0c0" align="left">
	                         <b>Protein features</b>
	                         <div style='float:right' >
	                             <span onclick="$('#content_feature .sources').toggle();$('#content_feature-body').slideToggle()">
                                    <span class='show-sources sources'>Show</span>
	                                <span class="hide-sources sources">Hide</span>&nbsp;|
	                             </span>
	                             <a href="#top" class="goTop" >Top</a>
	                         </div>
	                    </th>
	               </tr>                          
                   <tbody id="content_feature-body">  
	                   <tr>
	                        <td class="first-column">Signal Peptide (Predicted)</td>
		                     <td>
		                         <c:set var="currentValue" value=""/>
						   		 <c:forEach var="item" items="${geneview}" varStatus="count">
		                              <c:if test="${not empty item.signalPeptidePredicted}">
		                                  <c:if test="${count.first == false && fn:length(currentValue)>=1}">
		                                      <c:out value=","/>
		                                  </c:if>
		                                  <c:out value="${item.signalPeptidePredicted}"/>
						      	  	  	  <c:set var="currentValue" value="${item.signalPeptidePredicted}"/>
		                              </c:if>
		                         </c:forEach>
		                     </td>
		                </tr>
		                <tr>
	                        <td class="first-column">N-Terminal (Experimental)</td>
		                     <td>
		                         <c:set var="currentValue" value=""/>
						   		 <c:forEach var="item" items="${geneview}" varStatus="count">
		                              <c:if test="${not empty item.nterminalExperimental}">
		                                  <c:if test="${count.first == false && fn:length(currentValue)>=1}">
		                                      <c:out value=","/>
		                                  </c:if>
		                                  <c:out value="${item.nterminalExperimental}"/>
								          <c:if test="${not empty item.literaturePmid}">
			                              	 <c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
			                              		<c:if test="${item.literaturePmid == lit.value}">
			                              			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
			                              		</c:if>	
			                              	 </c:forEach>                            
		                                  </c:if>  
						      	  	  	  <c:set var="currentValue" value="${item.nterminalExperimental}"/>
		                              </c:if>
		                         </c:forEach>
		                     </td>
		                </tr>
		                <tr>
		                     <td class="first-column">Structure PMID Reference</td>
				             <td>
				             	<c:forEach var="item" items="${geneview}" varStatus="count"> 
					                <c:if test="${not empty item.structurePmid}">
					                	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
                                    		<c:if test="${item.structurePmid == lit.value}">
                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
                                    		</c:if>	
                                    	</c:forEach>
					                </c:if>
						     	</c:forEach>     
				             </td>
                        </tr>
                        <tr>
		                     <td class="first-column">Sequence PMID Reference</td>
				             <td>
				             	<c:forEach var="item" items="${geneview}" varStatus="count"> 
					                <c:if test="${not empty item.sequencePmid}">
					                	<c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
                                    		<c:if test="${item.sequencePmid == lit.value}">
                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
                                    		</c:if>	
                                    	</c:forEach> 
					                </c:if>
						     	</c:forEach>     
				             </td>
                        </tr>
                        <tr>
                            <td class="first-column">CBD</td>
                             <td>
                                 <c:set var="currentValue" value=""/>
						   		 <c:forEach var="item" items="${geneview}" varStatus="count">
                                      <c:if test="${not empty item.cbd}">
                                          <c:if test="${count.first == false && fn:length(currentValue)>=1}">
                                              <c:out value=","/>
                                          </c:if>
                                          <c:out value="${item.cbd}"/>
                                          <c:set var="currentValue" value="${item.cbd}"/>
                                      </c:if>
                                 </c:forEach>
                             </td>
                        </tr>
                        <tr>
                            <td class="first-column">Glycosylation</td>
                             <td>
                                 <c:set var="currentValue" value=""/>
						   		 <c:forEach var="item" items="${geneview}" varStatus="count">
                                      <c:if test="${not empty item.glycosylation}">
                                          <c:if test="${count.first == false && fn:length(currentValue)>=1}">
                                              <c:out value=", "/>
                                          </c:if>
                                          <c:out value="${item.glycosylation}"/>
                                          <c:if test="${not empty item.literaturePmid}">
	                                    	 <c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
	                                    		<c:if test="${item.literaturePmid == lit.value}">
	                                    			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
	                                    		</c:if>	
	                                    	 </c:forEach>                            
	                                      </c:if>  
						      	  	  	  <c:set var="currentValue" value="${item.glycosylation}"/>
                                      </c:if>
                                 </c:forEach>
                             </td>
                        </tr>
					    <tr>
	                        <td class="first-column">CAZy family</td>
	                        <td><c:out value="${geneview[0].family}"/><br /></td>
	                    </tr>
	               </tbody> 
               </table>
           </div>
    </div>
              
	<div id="section_seq" class="nice">
	   <div id="content-seq" class="nice-content">
	       <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Sequences</b>
                         <div style='float:right' >
                             <span onclick="$('#content-seq .sources').toggle();$('#content-seq-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>
                
		        <tbody id="content-seq-body">
		            <tr>
		               <td class="first-column">Length</td>
		               <td><c:out value="${geneview[0].proteinLength}"/></td>
		            </tr>
		            <tr>
					   <td class="first-column">Molecular Weight in kDa (experimental)</td>
					   <td>
					   	   <c:set var="currentValue" value=""/>
						   <c:forEach var="item" items="${geneview}" varStatus="count">
						      <c:if test="${not empty item.molecularWtExperimental}">
						          <c:if test="${count.first == false && fn:length(currentValue)>=1}">
						              <c:out value=", "/>
						          </c:if>
						          <c:out value="${item.molecularWtExperimental}"/>
						          <c:if test="${not empty item.literaturePmid}">
	                              	 <c:forEach var="lit" items="${literatureMap}" step="1" varStatus="litCounter">
	                              		<c:if test="${item.literaturePmid == lit.value}">
	                              			<a href="#literature_ref${lit.key}"><button class="refButton">ref ${lit.key}</button></a>
	                              		</c:if>	
	                              	 </c:forEach>                            
                                  </c:if>  
						      	  <c:set var="currentValue" value="${item.molecularWtExperimental}"/>
						      </c:if>
						   </c:forEach>
					   </td>
		            </tr>  
                    <tr>
                       <td class="first-column">Molecular Weight in kDa (predicted)</td>
                       <td>
                           <c:set var="currentValue" value=""/>
						   <c:forEach var="item" items="${geneview}" varStatus="count">
                              <c:if test="${not empty item.molecularWtPredicted}">
                                  <c:if test="${count.first == false && fn:length(currentValue)>=1}">
                                      <c:out value=", "/>
                                  </c:if>
                                  <c:out value="${item.molecularWtPredicted}"/>
						      	  <c:set var="currentValue" value="${item.molecularWtPredicted}"/>
                              </c:if>
                           </c:forEach>
                       </td>
                    </tr>  
                    <tr>
                       <td class="first-column">Protein Sequence</td>
                       <td>                           
                           <c:if test="${geneview[0].proteinSequence != null}">
                                <c:choose>
                                    <c:when test="${geneview[0].uniprotId != ''}">
		                                <a href="http://www.uniprot.org/uniprot/${geneview[0].uniprotId}" target="_blank">
		                                <c:out value="${geneview[0].uniprotId}"/></a>  
	                                </c:when> 
	                                <c:when test="${geneview[0].genbankProteinId != ''}">
	                                   <c:forTokens var="proteinID" items="${geneview[0].genbankProteinId}" delims=";" >
			                                <a href="http://www.ncbi.nlm.nih.gov/protein/${proteinID}" target="_blank">
			                                    <c:out value="${proteinID}"/>
			                                </a>
			                           </c:forTokens>
	                                </c:when>
	                                <c:otherwise>
	                                   <c:out value="${geneview[0].proteinSeqId}"/>
	                                </c:otherwise>
                                </c:choose>                                     
                                <br />
                                <font face="courier new" size="3"><c:out value="${geneview[0].proteinSequence}"/></font>
                                <br />                                
                                <form action='http://blast.fungalgenomics.ca/blast_mycoclap.cgi' method='post' target='_blank'>
                                    <input type=hidden name='SEQUENCE' value='${geneview[0].proteinSequence}'/>
                                    <input type=hidden name='PROGRAM' value='blastp'/>
                                    <input type=hidden name='DATALIB' value='mycoCLAP_seqs.faa'/>
                                    <input type=hidden name='EXPECT' value='1E-3'/>
                                    <input type=hidden name='DESCRIPTIONS' value='10'/>
                                    <input type=hidden name='ALIGNMENTS' value='10'/>
                                    <input type=hidden name='OVERVIEW' value='on'/>
                                    <input type='submit' value='BLAST this sequence against mycoCLAP'/>
                                </form>
                                <form action='${urlbase}clap/GetGeneSequence' method='post' target='_blank'>
                                    <input type=hidden name='enzymeEntryId' value='${geneview[0].enzymeEntryId}'/>
                                    <input type=hidden name='proteinSeq' value='true'/>
                                    <input type=hidden name='dnaSeq' value='false'/>
                                    <input type='submit' value='GET FASTA'/>
                                </form>   
                           </c:if>
                       </td>                        
                    </tr>
		            <tr>
                       <td class="first-column">DNA Sequence</td>
                       <td>
                            <c:if test="${geneview[0].dnaSequence != null}">
                                <c:choose>
	                                <c:when test="${geneview[0].genbankGeneId != ''}">
		                                <c:if test="${fn:contains(geneview[0].genbankGeneId, 'http') == true}">
		                                    <a href="${geneview[0].genbankGeneId}" target="_blank">
		                                    <c:out value="${geneview[0].genbankGeneId}"/></a>
		                                </c:if>
		                                <c:if test="${fn:contains(geneview[0].genbankGeneId, 'http') == false}">
			                                <a href="http://www.ncbi.nlm.nih.gov/nuccore/${geneview[0].genbankGeneId}" target="_blank">
			                                <c:out value="${geneview[0].genbankGeneId}"/></a>
					                    </c:if>
					                </c:when>
					                <c:otherwise>
					                   <c:out value="${geneview[0].dnaSeqId}"/>
					                </c:otherwise> 
				                </c:choose>   
			                    <br />
			                    <font face="courier new" size="3"><c:out value="${geneview[0].dnaSequence}"/></font>
			                    <br />
                                <form action='http://blast.fungalgenomics.ca/blast_mycoclap.cgi' method='post'
                                    target='_blank'>
                                    <input type=hidden name='SEQUENCE' value='${geneview[0].dnaSequence}'/>
                                    <input type=hidden name='PROGRAM' value='blastn'/>
                                    <input type=hidden name='DATALIB' value='mycoCLAP_seqs.fna'/>
                                    <input type=hidden name='EXPECT' value='1E-3'/>
                                    <input type=hidden name='DESCRIPTIONS' value='10'/>
                                    <input type=hidden name='ALIGNMENTS' value='10'/>
                                    <input type=hidden name='OVERVIEW' value='on'/>
                                    <input type='submit' value='BLAST this sequence against mycoCLAP'/>
                                </form>
                                <form action='${urlbase}clap/GetGeneSequence' method='post' target='_blank'>
                                    <input type=hidden name='enzymeEntryId' value='${geneview[0].enzymeEntryId}'/>
                                    <input type=hidden name='proteinSeq' value='false'/>
                                    <input type=hidden name='dnaSeq' value='true'/>
                                    <input type='submit' value='GET FASTA'/>
                                </form> 
                            </c:if>
                       </td>
                    </tr>
		        </tbody>
	       </table>    
	   </div>
	</div>   

   <div id="section_crossrefs" class="nice">
       <div id="content-crossrefs" class="nice-content">
           <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Cross-references</b>
                         <div style='float:right' >
                             <span onclick="$('#content-crossrefs .sources').toggle();$('#content-crossrefs-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>                
                <tbody id="content-crossrefs-body">
                    <tr>
                       <td class="first-column">GenBank</td>
                       <td>
                            <c:if test="${fn:contains(geneview[0].genbankGeneId, 'http') == true}">
                                <a href="${geneview[0].genbankGeneId}" target="_blank">
                                <c:out value="${geneview[0].genbankGeneId}"/></a> 
                            </c:if>
                            <c:if test="${fn:contains(geneview[0].genbankGeneId, 'http') == false}">
                                <a href="http://www.ncbi.nlm.nih.gov/nuccore/${geneview[0].genbankGeneId}" target="_blank">
	                            <c:out value="${geneview[0].genbankGeneId}"/></a> 
	                        </c:if>
	                        <c:if test="${not empty geneview[0].otherGenbankGeneId}">
	                        	<c:out value=", "/>                                 
	                           	<a href="http://www.ncbi.nlm.nih.gov/nuccore/${geneview[0].otherGenbankGeneId}" target="_blank">
                                <c:out value="${geneview[0].otherGenbankGeneId}"/></a> 
	                        </c:if>
                       </td>
                    </tr>
                    <tr>
                       <td class="first-column">UniProt</td>
                       <td>
                            <a href="http://www.uniprot.org/uniprot/${geneview[0].uniprotId}" target="_blank">
                            <c:out value="${geneview[0].uniprotId}"/></a>
                            <c:if test="${not empty geneview[0].otherUniprotId}">
                               	<c:out value=", "/>                                 
                               	<a href="http://www.uniprot.org/uniprot/${geneview[0].otherUniprotId}" target="_blank">
                                <c:out value="${geneview[0].otherUniprotId}"/></a> 
                            </c:if> 
                       </td>
                    </tr>
                    <tr>
                       <td class="first-column">Protein</td>
                       <td>
                       		<c:forTokens var="proteinID" items="${geneview[0].genbankProteinId}" delims=";" >
                           		<a href="http://www.ncbi.nlm.nih.gov/protein/${proteinID}" target="_blank">
                                    <c:out value="${proteinID}"/>
                                </a>
                           </c:forTokens>
                       </td>
                    </tr>
                    <tr>
                       <td class="first-column">RefSeq Protein</td>
                       <td>
                           <c:forTokens var="refseqProteinID" items="${geneview[0].refseqProteinId}" delims=";" >
                                <a href="http://www.ncbi.nlm.nih.gov/protein/${refseqProteinID}" target="_blank">
                                    <c:out value="${refseqProteinID}"/>
                                </a>
                           </c:forTokens>
                       </td>
                    </tr>
                    <tr>
                       <td class="first-column">Broad</td>
                       <td><c:out value="${geneview[0].broadId}"/></td>
                    </tr>
                    <tr>
                       <td class="first-column">PDB</td>
                       <td>
                       		<c:set var="currentValue" value=""/>
	   		 				<c:forEach var="item" items="${geneview}" varStatus="count">
                                 <c:if test="${not empty item.pdbId}">
                                     <c:if test="${count.first == false && fn:length(currentValue)>=1}">
                                         <c:out value=","/>
                                     </c:if>
                                     <a href="http://www.pdb.org/pdb/explore/explore.do?structureId=${item.pdbId}" target="_blank">
                                     	<c:out value="${item.pdbId}"/>
									 </a>
                                     <c:set var="currentValue" value="${item.pdbId}"/>
                                 </c:if>
                            </c:forEach>
                    	</td>
                    </tr>
                </tbody>
           </table>    
       </div>
    </div> 
    
	<div id="section_history" class="nice">
       <div id="content-history" class="nice-content">
           <table>
                <tr>
                    <th colspan="2" bgcolor="#c0c0c0" align="left">
                         <b>Entry history</b>
                         <div style='float:right' >
                             <span onclick="$('#content-history .sources').toggle();$('#content-history-body').slideToggle()">
                                <span class='show-sources sources'>Show</span>
                                <span class="hide-sources sources">Hide</span>&nbsp;|
                             </span>
                             <a href="#top" class="goTop" >Top</a>
                         </div>
                    </th>
                </tr>
                <tbody id="content-history-body">
                    <tr>
                       <td class="first-column">Entry Name</td>
                       <td><c:out value="${geneview[0].entryName}"/></td>
                    </tr>
                    <tr>
                       <td class="first-column">Previous Entry Names</td>
                       <td>
                          <c:forEach var="item" items="${entrynamehistory}" varStatus="count">
                              <c:if test="${not empty item.usedEntryName}">
                                  <c:if test="${count.first == false}">
                                      <c:out value=","/>
                                  </c:if>
                                  <c:out value="${item.usedEntryName}"/>
                              </c:if>
                           </c:forEach>
                       </td>
                    </tr>
                    <tr>
                       <td class="first-column">Modification</td>
                       <td>
                       	  <table>
                       	  	  <tr>
								<td width="200">Date</td>
								<!-- <td>Enzyme Entry Id</td> -->
                       	  	  </tr>	
	                          <c:forEach var="item" items="${changelogginghistory}" varStatus="count">
	                              <c:if test="${not empty item.datetime}">
									<tr>
										<td width="200"><c:out value="${item.datetime}"/></td>
										<!-- <td>
											<c:out value="${item.enzymeEntryId}"/>
										</td> -->
	                                </tr>
	                              </c:if>
	                           </c:forEach>
                           </table>
                       </td>
                    </tr>
                </tbody>
           </table>    
       </div>
    </div>         
</div>
</c:otherwise>
</c:choose> 
</body>
</html>