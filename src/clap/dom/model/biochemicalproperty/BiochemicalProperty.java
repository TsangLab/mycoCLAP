package clap.dom.model.biochemicalproperty;

import org.dsrg.soenea.domain.DomainObject;

public class BiochemicalProperty extends DomainObject<Long>{
	
	Long enzymeEntryId;
	String substrates;
	String host;
	String specificActivity;
	String activityAssayConditions;
	String substrateSpecificity;
	String km;
	String kcat;
	String vmax;
	String assay;
	String kineticAssayConditions;
	String productAnalysis;
	String productFormed;
	String phOptimum;
	String phStability;
	String temperatureOptimum;
	String temperatureStability;
	String ipExperimental;
	String ipPredicted;
	String otherFeatures;
	
	public BiochemicalProperty(Long id, Long enzymeEntryId, String substrates, 
			String host, String specificActivity,
			String activityAssayConditions, String substrateSpecificity,
			String km, String kcat, String vmax, String assay,
			String kineticAssayConditions, 
			String productAnalysis, String productFormed,
			String phOptimum, String phStability,
			String temperatureOptimum, String temperatureStability,
			String ipExperimental, String ipPredicted,
			String otherFeatures) {
		super(id, 0);
		this.enzymeEntryId = enzymeEntryId;
		this.substrates = substrates;
		this.host = host;
		this.specificActivity = specificActivity;
		this.activityAssayConditions = activityAssayConditions;
		this.substrateSpecificity = substrateSpecificity;
		this.km = km;
		this.kcat = kcat;
		this.vmax = vmax;
		this.assay = assay;
		this.kineticAssayConditions = kineticAssayConditions;
		this.productAnalysis = productAnalysis;
		this.productFormed = productFormed;
		this.phOptimum = phOptimum;
		this.phStability = phStability;
		this.temperatureOptimum = temperatureOptimum;
		this.temperatureStability = temperatureStability;
		this.ipExperimental = ipExperimental;
		this.ipPredicted = ipPredicted;
		this.otherFeatures = otherFeatures;
	}

	public Long getEnzymeEntryId() {	return enzymeEntryId;}
	public void setEnzymeEntryId(Long enzymeEntryId) {this.enzymeEntryId = enzymeEntryId;}
	
	public String getSubstrates() {	return substrates;}
	public void setSubstrates(String substrates) {this.substrates = substrates;}
	
	public String getHost() {return host;	}
	public void setHost(String host) {this.host = host;	}
	
	public String getSpecificActivity() {return specificActivity;	}
	public void setSpecificActivity(String specificActivity) {this.specificActivity = specificActivity;	}
	
	public String getActivityAssayConditions() { return activityAssayConditions;	}
	public void setActivityAssayConditions(String activityAssayConditions) {this.activityAssayConditions = activityAssayConditions;	}
	
	public String getSubstrateSpecificity() { return substrateSpecificity;	}
	public void setSubstrateSpecificity(String substrateSpecificity) {this.substrateSpecificity = substrateSpecificity;	}
	
	public String getKm() {	return km;	}
	public void setKm(String km) {this.km = km;	}
	
	public String getKcat() { return kcat;	}
	public void setKcat(String kcat) {this.kcat = kcat;	}
	
	public String getVmax() {	return vmax;	}
	public void setVmax(String vmax) {this.vmax = vmax;	}
	
	public String getAssay() { return assay;	}
	public void setAssay(String assay) {this.assay = assay;	}
	
	public String getKineticAssayConditions() { return kineticAssayConditions;	}
	public void setKineticAssayConditions(String kineticAssayConditions) {this.kineticAssayConditions = kineticAssayConditions;	}
	
	public String getProductAnalysis() { return productAnalysis;	}
	public void setProductAnalysis(String productAnalysis) {this.productAnalysis = productAnalysis;	}
	
	public String getProductFormed() { return productFormed;	}
	public void setProductFormed(String productFormed) {this.productFormed = productFormed;	}
	
	public String getPhOptimum() { return phOptimum;	}
	public void setPhOptimum(String phOptimum) {this.phOptimum = phOptimum;	}
	
	public String getPhStability() { return phStability;	}
	public void setPhStability(String phStability) {this.phStability = phStability;	}
	
	public String getTemperatureOptimum() { return temperatureOptimum;	}
	public void setTemperatureOptimum(String temperatureOptimum) {this.temperatureOptimum = temperatureOptimum;	}
	
	public String getTemperatureStability() { return temperatureStability;	}
	public void setTemperatureStability(String temperatureStability) {this.temperatureStability = temperatureStability;	}
	
	public String getIpExperimental() { return ipExperimental;	}
	public void setIpExperimental(String ipExperimental) {this.ipExperimental = ipExperimental;	}
	
	public String getIpPredicted() { return ipPredicted;	}
	public void setIpPredicted(String ipPredicted) {this.ipPredicted = ipPredicted;	}
	
	public String getOtherFeatures() { return otherFeatures;	}
	public void setOtherFeatures(String otherFeatures) {this.otherFeatures = otherFeatures;	}
	
}
