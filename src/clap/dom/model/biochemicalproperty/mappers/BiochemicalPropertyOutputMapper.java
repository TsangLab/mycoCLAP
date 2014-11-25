package clap.dom.model.biochemicalproperty.mappers;

import java.sql.SQLException;

import org.dsrg.soenea.domain.MapperException;
import org.dsrg.soenea.domain.mapper.GenericOutputMapper;
import org.dsrg.soenea.domain.mapper.LostUpdateException;

import clap.dom.model.biochemicalproperty.BiochemicalProperty;
import clap.dom.model.biochemicalproperty.tdg.BiochemicalPropertyTDG;

public class BiochemicalPropertyOutputMapper implements GenericOutputMapper<Long, BiochemicalProperty> {
	public void delete(BiochemicalProperty object) throws MapperException {
		try {
			int count = BiochemicalPropertyTDG.delete(object.getEnzymeEntryId());
			if(count == 0) throw new LostUpdateException("BiochemicalPropertyTDG: enzyme entry id " +
					object.getEnzymeEntryId());
			
		} catch (SQLException ee) {
			throw new MapperException("Could not delete BiochemicalProperty " + object.getEnzymeEntryId(), ee);
		}		
	}
	
	public void insert(BiochemicalProperty object) throws MapperException {
		try {
			BiochemicalPropertyTDG.insert(object.getId(), object.getEnzymeEntryId(), object.getSubstrates(),
					object.getHost(), object.getSpecificActivity(), object.getActivityAssayConditions(), 
					object.getSubstrateSpecificity(), object.getKm(), object.getKcat(), object.getVmax(),
					object.getAssay(), object.getKineticAssayConditions(), object.getProductAnalysis(), 
					object.getProductFormed(), object.getPhOptimum(), object.getPhStability(), 
					object.getTemperatureOptimum(), object.getTemperatureStability(), 
					object.getIpExperimental(), object.getIpPredicted(), object.getOtherFeatures());
		} catch (SQLException ee) {
			throw new MapperException("Could not insert " + object.getEnzymeEntryId(), ee);
		}
	}
	
	public void update(BiochemicalProperty object) throws MapperException{
		try {
			if (BiochemicalPropertyTDG.update(object.getId(), object.getEnzymeEntryId(), object.getSubstrates(),
					object.getHost(), object.getSpecificActivity(), object.getActivityAssayConditions(), 
					object.getSubstrateSpecificity(), object.getKm(), object.getKcat(), object.getVmax(),
					object.getAssay(), object.getKineticAssayConditions(), object.getProductAnalysis(), 
					object.getProductFormed(), object.getPhOptimum(), object.getPhStability(), 
					object.getTemperatureOptimum(), object.getTemperatureStability(), 
					object.getIpExperimental(), object.getIpPredicted(), object.getOtherFeatures()) == 0)
				throw new LostUpdateException("On Enzyme Entry id: " + object.getEnzymeEntryId());
		} catch (SQLException ee) {
			throw new MapperException("Could not update BiochemicalProperty " + object.getEnzymeEntryId(), ee);
		}
	}
	
}