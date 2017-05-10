$.getJSON('json/odb_2015.json', function (data) {
    columns_data = _(data.areas)
    .map(function(area, iso3){
        var current_country = _.find(window.countries, {iso3:iso3});
        if(area[selected_indicator] != null){
            return {name:current_country.name, y:area[selected_indicator].value, color:window.regions_colors[_.find(window.regions, {iso3:current_country.area}).name], region:_.find(window.regions, {iso3:current_country.area}).name, region_iso3:_.find(window.regions, {iso3:current_country.area}).iso3, income:current_country.income, hdi:current_country.hdi_rank, iodch:current_country.iodch, oecd:current_country.oecd, g20:current_country.g20, g7:current_country.g7, iso3:current_country.iso3};
        }
    })
    .compact()
    .sortBy("y")
    .reverse()
    .value();

    table_data = _(data.areas)
    .map(function(area, iso3){
        var current_country = _.find(window.countries, {iso3:iso3});

        if(area["ODB"] != null){
            if(selected_year>=2015){
                return {name:current_country.name, selected_indicator_value:area[selected_indicator].value, selected_indicator_rank:area[selected_indicator].rank, selected_indicator_range_max:selected_indicator_range_max, selected_indicator_range_min:selected_indicator_range_min, odb:area["ODB"].value, odb_rank:area["ODB"].rank, odb_rank_change:area["ODB"].rank_change, readiness:area["READINESS"].value, implementation:area["IMPLEMENTATION"].value, impact:area["IMPACT"].value, iso2:current_country.iso2, iso3:current_country.iso3, hdi:current_country.hdi_rank, income:current_country.income, g20:current_country.g20, g7:current_country.g7, iodch:current_country.iodch, oecd:current_country.oecd, region_iso3:current_country.area, region:_.find(window.regions, {iso3:current_country.area}).name, readiness_data:[area["GOVERNMENT_POLICIES"].value, area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value], implementation_data:[area["INNOVATION"].value, area["SOCIAL_POLICY"].value, area["ACCOUNTABILITY"].value], impact_data:[area["POLITICAL"].value, area["SOCIAL"].value, area["ECONOMIC"].value], readiness_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name], implementation_data_labels:[_.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name], impact_data_labels:[_.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name], components_data:[area["GOVERNMENT_POLICIES"].value, area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value,area["INNOVATION"].value,area["SOCIAL_POLICY"].value,area["ACCOUNTABILITY"].value,area["POLITICAL"].value,area["SOCIAL"].value, area["ECONOMIC"].value], components_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, _.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, _.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name]
            };
             
            }
            else{
                return 
                {
                	name:current_country.name, 
                	selected_indicator_value:area[selected_indicator].value, 
                	selected_indicator_rank:area[selected_indicator].rank, 
                	selected_indicator_range_max:selected_indicator_range_max, 
                	selected_indicator_range_min:selected_indicator_range_min, 
                	odb:area["ODB"].value, 
                	odb_rank:area["ODB"].rank, 
                	odb_rank_change:area["ODB"].rank_change, 
                	readiness:area["READINESS"].value, 
                	implementation:area["IMPLEMENTATION"].value, 
                	impact:area["IMPACT"].value, 
                	iso2:current_country.iso2, 
                	iso3:current_country.iso3, 
                	hdi:current_country.hdi_rank, 
                	income:current_country.income, 
                	g20:current_country.g20, 
                	g7:current_country.g7, 
                	iodch:current_country.iodch, 
                	oecd:current_country.oecd,
                	 region_iso3:current_country.area, 
                	 region:_.find(window.regions, {iso3:current_country.area}).name, 
                	 readiness_data:
                	 [
	                	 area["GOVERNMENT_ACTION"].value, 
	                	 area["REGULATORY_AND_CIVIL"].value, 
	                	 area["BUSINESS_AND_ENTREPRENEURSHIP"].value
	                 ], 
	                 implementation_data:
	                 [	 
	                 	 area["INNOVATION"].value, 
	                	 area["SOCIAL_POLICY"].value, 
	                	 area["ACCOUNTABILITY"].value
	                 ], 
	                 impact_data:
	                 [
	                 	area["POLITICAL"].value, 
	                	 area["SOCIAL"].value, 
	                	 area["ECONOMIC"].value
                	 ], 
                	 readiness_data_labels:
                	 [
                	 	_.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, 
                	 	_.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, 
                	 	_.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name
                	 ], 
                	 implementation_data_labels:
                	 [
                	 	_.find(window.indicators, {indicator:"INNOVATION"}).name,
                	 	 _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name,
                	 	  _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name
                	 ],
                	 impact_data_labels:
                	 [
                	 	_.find(window.indicators, {indicator:"POLITICAL"}).name,
                	 	 _.find(window.indicators, {indicator:"SOCIAL"}).name,
                	 	  _.find(window.indicators, {indicator:"ECONOMIC"}).name
                	 ],
                	 components_data:
                	 [
                	 	area["GOVERNMENT_ACTION"].value, 
                	 	area["REGULATORY_AND_CIVIL"].value, 
                	 	area["BUSINESS_AND_ENTREPRENEURSHIP"].value,
                	 	area["INNOVATION"].value,
                	 	area["SOCIAL_POLICY"].value,
                	 	area["ACCOUNTABILITY"].value,
                	 	area["POLITICAL"].value,
                	 	area["SOCIAL"].value, 
                	 	area["ECONOMIC"].value
                	 ], 
                	 components_data_labels:
                	 [
                	 	_.find(window.indicators,{indicator:"GOVERNMENT_POLICIES"}).name, 
                	 	_.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, 
                	 	_.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, 
                	 	_.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, 
                	 	_.find(window.indicators, {indicator:"INNOVATION"}).name, 
                	 	_.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, 
                	 	_.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, 
                	 	_.find(window.indicators, {indicator:"POLITICAL"}).name, 
                	 	_.find(window.indicators, {indicator:"SOCIAL"}).name, 
                	 	_.find(window.indicators, {indicator:"ECONOMIC"}).name
                	 ]
                	}; 
            }
        }
    })
    .compact()
    .sortBy("odb")
    .reverse()
    .value();

	var result = _.reduce(
		regions, function (result, region) {
    var countries_for_region = _(countries).filter({area: region.iso3}).map('iso3').value();
    var odb_data_filtered = _.filter(data.areas, function (value, area) {
        return _.includes(countries_for_region, area);
    });

    var stats = _.reduce(indicators, function (result, indicator) {
			result[indicator.indicator] = {
				mean: _(odb_data_filtered).map(indicator.indicator).map('value').mean()
			};
			return result;
		}, {});

		result [region.iso3] = stats;
		return result;
	}, {}
	);	
	
	mean_table_data = result;
