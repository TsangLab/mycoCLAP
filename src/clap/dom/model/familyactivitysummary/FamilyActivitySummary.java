package clap.dom.model.familyactivitysummary;

public class FamilyActivitySummary {
	String family;
	String activity;
	Long characterizedEnzyme;
	String categories;
	
	public FamilyActivitySummary(String family, String activity, Long characterizedEnzyme) {
		
		String categories="";
		if (activity.matches(".*bifunctional.*"))
			categories = "Bifunctional Glycoside Hydrolases";
		else {
			if (family != "" && family != null)
				categories = family.replaceAll("[0-9]", "");
			
			if(categories.matches("GH/GH") || categories.matches("GH"))
				categories = "Glycoside Hydrolases"; 
			else if(categories.matches("CE"))
				categories = "Carbohydrate Esterases";
			else if(categories.matches("PL"))
				categories = "Polysaccharide Lyases";
			else if(categories.matches("AA"))
				categories = "Auxiliary Activities";
		}
		
		this.family = family;
		this.activity = activity;
		this.characterizedEnzyme = characterizedEnzyme;
		this.categories = categories;
	}
	
	public String getFamily() {return family;}
	public String getActivity() {return activity;}
	public Long getCharacterizedEnzyme() {return characterizedEnzyme;}
	public String getCategories() {return categories; }
	
}