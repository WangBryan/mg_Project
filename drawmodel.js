
var country = $(this).attr("data-iso");
loaded_countries.push(country);
$.getJSON('json/odb_' + country + '.json', function(data){
	loaded_countries_data[country] = data;
    setCountryDataset(country);
	drawModal();
});

function setCountryDataset(iso3){
	//Recibe un código iso3 de un país
	//carga en la posición "iso3" de country_datasets los datos para el dataset del país dado.
		// Datos seleccionados
		var	selected_year_datasets = loaded_countries_data[iso3].years[selected_year].datasets;
		// Obtener los nombres de meta indicadores que tienen que ver con dataset
		var dataset_indicators_meta = _(indicators_meta).filter({component: 'DATASET_ASSESSMENT'}).map('indicator').value();
		dataset_indicators_meta.push("VALUE");
		country_datasets[iso3] = _.zipObject(dataset_indicators_meta, _.map(dataset_indicators_meta, function(meta_indicator) {
			return _.zipObject(_.keys(selected_year_datasets), _.map(selected_year_datasets, _.property(meta_indicator)));
		}));
	//});
}


function drawModal() {
	country_data = _.filter(table_data, {iso3:loaded_countries[0]});
	loadMeansSelectedCountry();
    //console.log(loaded_countries[0]);
	var g20_class;
	var g7_class;
	var iodch_class;
	var oecd_class;

	if(country_data[0].g7) {g7_class = "cicon-check c-check";} else g7_class = "cicon-cross txt-s c-error";
	if(country_data[0].g20) {g20_class = "cicon-check c-check";} else g20_class = "cicon-cross txt-s c-error";
	if(country_data[0].iodch) {iodch_class = "cicon-check c-check";} else iodch_class = "cicon-cross txt-s c-error";
	if(country_data[0].oecd) {oecd_class = "cicon-check c-check";} else oecd_class = "cicon-cross txt-s c-error";

	rank_change = country_data[0].odb_rank_change;

	if (rank_change == null) {
		rank_print = '<span class="txt-xxs cprimary uppc" data-localize="globals.new">New</span>';
	}else{
		if(rank_change<0){
			var rank_print = '<span class="arrow-down"></span> '+ Math.abs(rank_change);
		} else {
			var rank_print = '<span class="arrow-up"></span> ' + rank_change;
			if(rank_change == 0) {
				rank_print = '<span class="txt-xs c-g40">0</span>';
			}
		}
	}

	//Manipulamos la cifra para estilarla un poco
	if(country_data[0].odb % 1 != 0){
		var odbRaw = parseFloat(Math.round(country_data[0].odb * 100) / 100).toFixed(2); //country_data[0].odb;
		var odbDec = odbRaw.toString().split('.');
		var odbPrint = parseInt(odbDec[0]) + '<span class="txt-xs c-g40">.'+ parseInt(odbDec[1])+'</span>';
	}else{
		if(country_data[0].odb!=100){
			var odbPrint = country_data[0].odb+'<span class="txt-xs c-g40">.00</span>';
		}else{
			var odbPrint = country_data[0].odb;
		}
	}

	var headerModal = '<div class="container-fluid">' +
				'	<div class="row">' +
				'		<div class="col-md-12 txt-c p-xs-top p-m-bottom">' +
				'			<div class="cm-h-item cm-h-tit fleft txt-al displayib">' +
				'				<h4 class="no-m-bottom txt-l">' +
				'					<span class="flag-md-header"><img src="img/flags/' + country_data[0].iso2.toLowerCase() + '.svg" class="img-responsive"></span>' +
				'					<span class="ct-country"><span class="txt-m">' + country_data[0].name + '</span> <span class="txt-s c-g40 more-info displayb">' + country_data[0].region + '</span></span>' +
				'				</h4>' +
				' 			</div>' +
				'			<div class="cm-h-item cm-h-rdata fleft displayib">' +
				'				<ul class="ilist overfh displayib txt-al">' +
				'					<li class="il-item"><label class="uppc txt-s c-g40 p-s-top" data-localize="modal.income">Income</label><span class="displayb cinput-txt">' + country_data[0].income + '</span></li>' +
				'					<li class="il-item p-left-l"><label class="uppc txt-s c-g40 p-s-top" data-localize="modal.hdirank">HDI Rank</label><span class="displayb cinput-txt">' + country_data[0].hdi + '</span></li>' +
				'					<li class="il-item p-left-l"><label class="uppc txt-s c-g40 p-s-top">G20</label><span class="displayb cinput-txt"><span class="' + g20_class + '"></span></span></li>' +
				'					<li class="il-item p-left-l"><label class="uppc txt-s c-g40 p-s-top">G7</label><span class="displayb cinput-txt"><span class="' + g7_class + '"></span></span></li>' +
				'					<li class="il-item p-left-l"><label class="uppc txt-s c-g40 p-s-top">OECD</label><span class="displayb cinput-txt txt-c"><span class="' + oecd_class + '"></span></span></li>' +
				'					<li class="il-item p-left-l"><label class="uppc txt-s c-g40 p-s-top">IODCH</label><span class="displayb cinput-txt txt-c"><span class="' + iodch_class + '"></span></span></li>' +
				'				</ul>' +
				'			</div>' +
				'				<div class="cm-h-item cm-h-acc fright txt-ar p-s-top m-xs-top">'+
				'				<button class="ctn-icon cbtn-share"><span class="cicon-share txt-xl displayb"></span><span class="uppc txt-xs" data-localize="globals.share">share</span></button>'+
				'				<button class="ctn-icon close-cmodal-detail"><span class="cicon-cross txt-xl displayb"></span> <span class="uppc txt-xs" data-localize="globals.close">close</span></button>'+
				'			</div>'+
				'		</div>'+
				'	</div>'+
				'</div>'+
				'<div class="cm-h-data-resume bg-section p-s-top p-s-bottom">'+
				'	<div class="container-fluid">'+
				'		<div class="row">'+
				'			<div class="col-md-12 txt-c">'+
				'				<ul class="ilist overfh displayib ">'+
				'					<li class="il-item-resp"><label class="uppc txt-xs c-g40 p-s-top" data-localize="modal.odbrank">ODB Rank</label><span class="displayb cinput-txt txt-med m-xs-top">Bryan1' + country_data[0].odb_rank + '</span></li>'+
				'					<li class="il-item-resp"><label class="uppc txt-xs c-g40 p-s-top" data-localize="modal.odbs">ODB Score</label><span class="displayb cinput-txt txt-med m-xs-top">Bryan2' + odbPrint + ' </li>'+
				'					<li class="il-item-resp"><label class="uppc txt-xs c-g40 p-s-top" data-localize="indicators.readiness">Readiness</label>'+
				'						<span class="displayb m-s-top">'+
				'							<span class="displayib" data-labels="Bryan3' + country_data[0].readiness_data_labels + '" data-subindex="readiness" data-sparkline="' + country_data[0].readiness_data + ' ; column"></span><span class="data-sp data-readiness displayib txt-xl m-left">' + country_data[0].readiness + '</span>'+
				'						</span>'+
				'					</li>'+
				'					<li class="il-item-resp"><label class="uppc txt-xs c-g40 p-s-top" data-localize="indicators.implementation">Implementation</label>'+
				'						<span class="displayb m-s-top">'+
				'							<span class="displayib" data-labels="Bryan4' + country_data[0].implementation_data_labels + '" data-subindex="implementation" data-sparkline="' + country_data[0].implementation_data + ' ; column"></span><span class="data-sp data-implementation displayib txt-xl m-left">' + country_data[0].implementation + '</span>'+
				'						</span>'+
				'					</li>'+
				'					<li class="il-item-resp"><label class="uppc txt-xs c-g40 p-s-top" data-localize="indicators.impact">Impact</label>'+
				'						<span class="displayb m-s-top">'+
				'							<span class="displayib" data-labels="' + country_data[0].impact_data_labels + '" data-subindex="impact" data-sparkline="' + country_data[0].impact_data + ' ; column"></span><span class="data-sp data-impact displayib txt-xl m-left">' + country_data[0].impact + '</span>'+
				'						</span>'+
				'					</li>'+
				'					<li class="il-item-resp" class="displayb"><label class="uppc txt-xs c-g40 p-s-top" data-localize="modal.odbrankc">ODB Rank change</label><span class="displayb cinput-txt txt-med m-xs-top">' + rank_print + '</span></li>'+
				'				</ul>'+
				'			</div>'+
				'		</div>'+
				'	</div>'+
				'</div>';

	$("#cm-header").html(headerModal);

	var indicator_percentage = (parseInt(country_data[0].selected_indicator_value) * 100) / parseInt(selected_indicator_range_max);
	var svgFlag = country_data[0].iso2;

	
	if(country_data[0].selected_indicator_value!=null){
		var indicatorRaw = country_data[0].selected_indicator_value.toFixed(2);
	}else{
		var indicatorRaw = '<span class="txt-xs c-g40 uppc">NA</span>';
		var indicator_percentage = 0;
	}

	var contentModal = '<header class="ca-header txt-c">' +
						'		<h5 class="txt-al no-m-top no-m-bottom displayib c-obj">' +
						'			<span class="flag-md flag-country"><img src="img/flags/' + svgFlag.toLowerCase() + '.svg" class="adj-img-ca-h img-responsive"></span>' +
						'			<span class="ca-h-tit displayib m-xs-top">Bryan500' + country_data[0].name +
						'			 <span class="displayb uppc txt-s m-xs-top c-g40">' + selected_year + '</span>' +
						'			</span>' +
						'		</h5>' +
						'</header>' +
						'<div class="static-indicator r-pos">' +
						'	<h5 class="txt-m displayb si-tit-current">' + selected_indicator_name + '<span class="displayib fright txt-xl si-val-current">' + indicatorRaw + '</span></h5>' +
						'	<div class="indicator-cover">' +
						'		<div class="indicator-progress i-p-current" style="width:' + indicator_percentage + '%"></div>' +
						'	</div>' +
						'	<span class="indicator-st i-init txt-s c-g40">' + selected_indicator_range_min + '</span><span class="indicator-st i-end txt-s c-g40">' + selected_indicator_range_max + '</span>' +
						'</div>' +
						'<div class="ca-content ca-current m-xl-top txt-c">' +
						'	<div id ="grafica-modal"></div>' +
						'	<!--img src="img/ie-graphic-country.png" class="c-obj p-xxl-top"-->' +
						'</div>';
	$("#country-selected").html(contentModal);
	//CARGA DE DATOS DEL DETALLE PAÍS
    var firstCountryData = loaded_countries_data[loaded_countries[0]];
	//country_odb_series = _.map(firstCountryData.years, function(year){ return year.observations.ODB.value;});
	//country_readiness_series = _.map(firstCountryData.years, function(year){ return year.observations.READINESS.value;});
	//country_implementation_series = _.map(firstCountryData.years, function(year){ return year.observations.IMPLEMENTATION.value;});
	//country_impact_series = _.map(firstCountryData.years, function(year){ return year.observations.IMPACT.value;});
	country_years_series = _.keys(firstCountryData.years);

	var new_country_sindicator_series = _.map(firstCountryData.years, function(year){ return year.observations[selected_indicator].value;});
	var name_indicator = TrimLength(selected_indicator_name,25);

    drawDatasetTable();


	//Fin Implementation
	//Impact
	//Fin Impact

	var $div_linechart = $("#grafica-modal");
	var country_odb_chart = {
		credits: {
				enabled:false
		},
		chart: {
			height: 300,
			backgroundColor: null,
			borderWidth: 0,
			type: 'line',
			renderTo: $div_linechart[0]
		},
		title: {
        	text: '',
        	//x: -20 //center
        },
        subtitle: {
            text: '',
            //x: -20
        },
        xAxis: {
            categories: country_years_series//['2013', '2014', '2015']
        },
        yAxis: {
            title: {
                text: ''
            },
            min: selected_indicator_range_min,
			max: selected_indicator_range_max
        },
        /*tooltip: {
            valueSuffix: ''
        },*/
        legend: {
        	// width:'100%',
         //    layout: 'horizontal',
         //    align: 'center',
         //    verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: name_indicator,
            data: new_country_sindicator_series,
            color:'#000'
        }]

        // series: [{
        //     name: 'Readiness',
        //     data: country_readiness_series,
        //     color:'#F1C40F'
        // }, {
        //     name: 'Implementation',
        //     data: country_implementation_series,
        //     color:'#92EFDA'
        // }, {
        //     name: 'Impact',
        //     data: country_impact_series,
        //     color:'#CB97F9'
        // },{
        //     name: 'ODB',
        //     data: country_odb_series,
        //     color:'#000'
        // }]       
	};

	chart_country = new Highcharts.Chart(country_odb_chart);
	
	// if(selected_indicator != "ODB" && selected_indicator != "IMPLEMENTATION" && selected_indicator!="IMPACT" && selected_indicator != "READINESS") {
	// 	var new_country_sindicator_series_init = _.map(firstCountryData.years, function(year){ return year.observations[selected_indicator].value;});
	// 	var name_indicator = TrimLength(selected_indicator_name,25);
	//     chart_country.addSeries({
	//     	name: name_indicator,
	//     	data: new_country_sindicator_series_init,
	//     	color: '#FE13B4'
	//     });
	// }

    //Generamos las categorias e iniciamos la grafica polar
    polarOptions.xAxis.categories = country_data[0].components_data_labels;
    polarOptions.series[0].name = country_data[0].name;
	polarOptions.series[0].data = country_data[0].components_data;
	polarOptions.series[1].name = mean_current_region_data.name;
	polarOptions.series[1].data = mean_current_region_data.components_data;
    chart_init = new Highcharts.Chart(polarOptions);


	$(function () {
		/**
		 * Create a constructor for sparklines that takes some sensible defaults and merges in the individual
		 * chart options. This function is also available from the jQuery plugin as $(element).highcharts('SparkLine').
		 */
		Highcharts.SparkLine = function (a, b, c) {
			var hasRenderToArg = typeof a === 'string' || a.nodeName,
				options = arguments[hasRenderToArg ? 1 : 0],
				defaultOptions = {
					chart: {
						renderTo: (options.chart && options.chart.renderTo) || this,
						backgroundColor: null,
						borderWidth: 0,
						type: 'column',
						margin: [2, 0, 2, 0],
						width: 70,
						height: 40,
						style: {
							overflow: 'visible'
						},
						skipClone: true
					},
					title: {
						text: ''
					},
					credits: {
						enabled: false
					},
					xAxis: {
						labels: {
							enabled: false
						},
						title: {
							text: null
						},
						startOnTick: false,
						endOnTick: false,
						tickPositions: []
					},
					yAxis: {
						endOnTick: false,
						startOnTick: false,
						min: 0,
						max: 100,
						labels: {
							enabled: false
						},
						title: {
							text: null
						},
						tickPositions: [0]
					},
					legend: {
						enabled: false
					},
					tooltip: {
						backgroundColor: null,
						borderWidth: 0,
						shadow: false,
						useHTML: true,
						hideDelay: 0,
						shared: true,
						padding: 0,
						positioner: function (w, h, point) {
							return { x: point.plotX - w / 2, y: point.plotY - h };
						}
					},
					plotOptions: {
						series: {
							animation: false,
							lineWidth: 1,
							shadow: false,
							states: {
								hover: {
									lineWidth: 1
								}
							},
							marker: {
								radius: 1,
								states: {
									hover: {
										radius: 2
									}
								}
							},
							fillOpacity: 0.25
						},
						column: {
							color: '#FFE064',
							negativeColor: '#910000',
							borderColor: 'none'
						}
					}
				};

			options = Highcharts.merge(defaultOptions, options);

			return hasRenderToArg ?
				new Highcharts.Chart(a, options, c) :
				new Highcharts.Chart(options, b);
		};

		var start = +new Date(),
			$spans = $('.cmodal span[data-sparkline]'),
			fullLen = $spans.length,
			n = 0;

		// Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
		// can take some seconds, so we split the input into chunks and apply them in timeouts
		// in order avoid locking up the browser process and allow interaction.
		function doChunk() {
			var time = +new Date(),
				i,
				len = $spans.length,
				$span,
				stringdata,
				stringlabels,
				stringsubindex,
				subindex_colors = ["#FFCD00", "#6DF5D7", "#BE8FE7"],
				colums_color,
				labels = new Array(),
				arr,
				data,
				chart;

			for (i=0; i<len; i++) {
				$span = $($spans[i]);
				stringlabels = $span.data('labels');
				stringsubindex = $span.data('subindex');
				stringdata = $span.data('sparkline');
				arr = stringdata.split('; ');
				labels = [" "];
				labels = labels.concat(stringlabels.split(','));
				switch(stringsubindex){
					case "readiness": 	  colums_color = subindex_colors[0];
										  break;
					case "implementation":colums_color = subindex_colors[1];
										  break;
					case "impact":        colums_color = subindex_colors[2];
										  break;
				}

				//var labels = new Function("return [" + stringlabels + "];")();
				//var labels = (new Function("return [" + stringlabels+ "];")());
				//console.log(labels);
				data = $.map(arr[0].split(','), parseFloat);
				//console.log(data);
				//labels = $.map(stringlabels.split(','));
				chart = {};

				if (arr[1]) {
					chart.type = arr[1];
				}
				$span.highcharts('SparkLine', {
					series: [{
						data: data,
						color:colums_color,
						pointStart: 1
					}],
					xAxis: {
					   type: 'category',
					   // minRange: 1,
						categories: labels,//countries,
						lineColor:colums_color
						/*labels: {
							enabled:false
						}*/
					},
					tooltip: {
						headerFormat: '<span style="font-size: 10px">{point.x}:</span>',
						pointFormat: '<b>{point.y}</b>'
					},
					chart: chart
				});

				n += 1;

				// If the process takes too much time, run a timeout to allow interaction with the browser
				if (new Date() - time > 500) {
					$spans.splice(0, i + 1);
					setTimeout(doChunk, 0);
					break;
				}

			}
		}
		doChunk();
	});

	//Agregamos los paises a comparar si tenemos paises
	if(ctrIsoCompare.length != 0) {
		drawModalRegionMean (loaded_countries[0]);
        ctrIsoCompare.forEach(function(iso3c) {
            $.getJSON('json/odb_' + iso3c + '.json', function(data){
                loaded_countries_data[iso3c] = data;
                loaded_countries.push(iso3c);
                //Este igual se puede quitar ya
                //ctrIsoCompare.push(iso3c);
                //-----
                carousel_current_country = 0; //1;//loaded_countries.length-1;
                setCountryDataset(iso3c);
                drawModalCountryComp(iso3c,0);
                //Clonamos el pais
                if(carousel_current_country != 0) {
                	addCountrySpider();
                }
                drawDatasetTable();
                owl.trigger('refresh.owl.carousel');
            });
        });

    }else{
    	var OwlIsEmpty = $("div.owl-item div.country-area-empty").length;
    	if(OwlIsEmpty == 0) {
    		drawModalRegionMean (loaded_countries[0]);
		}
    }

    $(".cm-source-data").text(selected_indicator_source);
    $(".cm-source-data").attr("href",selected_indicator_source_url);

	setTimeout(function(){
	 	//console.log(loaded_countries);
	 	drawIndicatorsTableModal();
	 	$("[data-localize]").localize("lang/odb_labels", { language: LANG });
	},750)

	//Reinvocar la traduccion una vez que se ha pintado todo el modal	
    
}

function loadMeansSelectedCountry(){
	current_area = _.find(window.countries, {iso3:loaded_countries[0]}).area;
	region_name = _.find(window.regions, {iso3:current_area}).name;

	var area = mean_table_data[current_area];
	var current_country = _.find(window.countries, {iso3:loaded_countries[0]});
	if(selected_year>=2015){
          mean_current_region_data = {name:_.find(window.regions, {iso3:current_area}).name, selected_indicator_value:area[selected_indicator].mean, selected_indicator_rank:area[selected_indicator].rank, selected_indicator_range_max:selected_indicator_range_max, selected_indicator_range_min:selected_indicator_range_min, odb:area["ODB"].mean, odb_rank:area["ODB"].rank, odb_rank_change:area["ODB"].rank_change, readiness:area["READINESS"].mean, implementation:area["IMPLEMENTATION"].mean, impact:area["IMPACT"].mean, iso2:current_country.iso2, iso3:current_country.iso3, hdi:current_country.hdi_rank, income:current_country.income, g20:current_country.g20, g7:current_country.g7, iodch:current_country.iodch, oecd:current_country.oecd, region_iso3:current_country.area, region:_.find(window.regions, {iso3:current_country.area}).name, readiness_data:[area["GOVERNMENT_POLICIES"].mean, area["GOVERNMENT_ACTION"].mean, area["REGULATORY_AND_CIVIL"].mean, area["BUSINESS_AND_ENTREPRENEURSHIP"].mean], implementation_data:[area["INNOVATION"].mean, area["SOCIAL_POLICY"].mean, area["ACCOUNTABILITY"].mean], impact_data:[area["POLITICAL"].mean, area["SOCIAL"].mean, area["ECONOMIC"].mean], readiness_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name], implementation_data_labels:[_.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name], impact_data_labels:[_.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name], components_data:[area["GOVERNMENT_POLICIES"].mean, area["GOVERNMENT_ACTION"].mean, area["REGULATORY_AND_CIVIL"].mean, area["BUSINESS_AND_ENTREPRENEURSHIP"].mean,area["INNOVATION"].mean,area["SOCIAL_POLICY"].mean,area["ACCOUNTABILITY"].mean,area["POLITICAL"].mean,area["SOCIAL"].mean, area["ECONOMIC"].mean], components_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, _.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, _.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name]};
                /*readiness_data:{policies:area["GOVERNMENT_POLICIES"].value, action:area["GOVERNMENT_ACTION"].value, civil:area["REGULATORY_AND_CIVIL"].value, business:area["BUSINESS_AND_ENTREPRENEURSHIP"].value}, implementation_data:{innovation:area["INNOVATION"].value, social:area["SOCIAL_POLICY"].value, accountability:area["ACCOUNTABILITY"].value}, impact_data:{political:area["POLITICAL"].value, social:area["SOCIAL"].value, economic:area["ECONOMIC"].value}};*/
            }
            else{
            mean_current_region_data = {name:_.find(window.regions, {iso3:current_area}).name, selected_indicator_value:area[selected_indicator].mean, selected_indicator_rank:area[selected_indicator].rank, selected_indicator_range_max:selected_indicator_range_max, selected_indicator_range_min:selected_indicator_range_min, odb:area["ODB"].mean, odb_rank:area["ODB"].rank, odb_rank_change:area["ODB"].rank_change, readiness:area["READINESS"].value, implementation:area["IMPLEMENTATION"].mean, impact:area["IMPACT"].mean, iso2:current_country.iso2, iso3:current_country.iso3, hdi:current_country.hdi_rank, income:current_country.income, g20:current_country.g20, g7:current_country.g7, iodch:current_country.iodch, oecd:current_country.oecd, region_iso3:current_country.area, region:_.find(window.regions, {iso3:current_country.area}).name, readiness_data:[area["GOVERNMENT_ACTION"].mean, area["REGULATORY_AND_CIVIL"].mean, area["BUSINESS_AND_ENTREPRENEURSHIP"].mean], implementation_data:[area["INNOVATION"].mean, area["SOCIAL_POLICY"].mean, area["ACCOUNTABILITY"].mean], impact_data:[area["POLITICAL"].mean, area["SOCIAL"].mean, area["ECONOMIC"].mean], readiness_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name], implementation_data_labels:[_.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name], impact_data_labels:[_.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name], components_data:[area["GOVERNMENT_ACTION"].mean, area["REGULATORY_AND_CIVIL"].mean, area["BUSINESS_AND_ENTREPRENEURSHIP"].mean,area["INNOVATION"].mean,area["SOCIAL_POLICY"].mean,area["ACCOUNTABILITY"].mean,area["POLITICAL"].mean,area["SOCIAL"].mean, area["ECONOMIC"].mean], components_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, _.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, _.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name]}; /*readiness_data:{action:area["GOVERNMENT_ACTION"].value, civil:area["REGULATORY_AND_CIVIL"].value, business:area["BUSINESS_AND_ENTREPRENEURSHIP"].value}, implementation_data:{innovation:area["INNOVATION"].value, social:area["SOCIAL_POLICY"].value, accountability:area["ACCOUNTABILITY"].value}, impact_data:{political:area["POLITICAL"].value, social:area["SOCIAL"].value, economic:area["ECONOMIC"].value}};*/
            }
}


$.getJSON('json/odb_' + selected_year + '.json', function (data) {
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
                return {name:current_country.name, selected_indicator_value:area[selected_indicator].value, selected_indicator_rank:area[selected_indicator].rank, selected_indicator_range_max:selected_indicator_range_max, selected_indicator_range_min:selected_indicator_range_min, odb:area["ODB"].value, odb_rank:area["ODB"].rank, odb_rank_change:area["ODB"].rank_change, readiness:area["READINESS"].value, implementation:area["IMPLEMENTATION"].value, impact:area["IMPACT"].value, iso2:current_country.iso2, iso3:current_country.iso3, hdi:current_country.hdi_rank, income:current_country.income, g20:current_country.g20, g7:current_country.g7, iodch:current_country.iodch, oecd:current_country.oecd, region_iso3:current_country.area, region:_.find(window.regions, {iso3:current_country.area}).name, readiness_data:[area["GOVERNMENT_POLICIES"].value, area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value], implementation_data:[area["INNOVATION"].value, area["SOCIAL_POLICY"].value, area["ACCOUNTABILITY"].value], impact_data:[area["POLITICAL"].value, area["SOCIAL"].value, area["ECONOMIC"].value], readiness_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name], implementation_data_labels:[_.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name], impact_data_labels:[_.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name], components_data:[area["GOVERNMENT_POLICIES"].value, area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value,area["INNOVATION"].value,area["SOCIAL_POLICY"].value,area["ACCOUNTABILITY"].value,area["POLITICAL"].value,area["SOCIAL"].value, area["ECONOMIC"].value], components_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, _.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, _.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name]};
                /*readiness_data:{policies:area["GOVERNMENT_POLICIES"].value, action:area["GOVERNMENT_ACTION"].value, civil:area["REGULATORY_AND_CIVIL"].value, business:area["BUSINESS_AND_ENTREPRENEURSHIP"].value}, implementation_data:{innovation:area["INNOVATION"].value, social:area["SOCIAL_POLICY"].value, accountability:area["ACCOUNTABILITY"].value}, impact_data:{political:area["POLITICAL"].value, social:area["SOCIAL"].value, economic:area["ECONOMIC"].value}};*/
            }
            else{
                return {name:current_country.name, selected_indicator_value:area[selected_indicator].value, selected_indicator_rank:area[selected_indicator].rank, selected_indicator_range_max:selected_indicator_range_max, selected_indicator_range_min:selected_indicator_range_min, odb:area["ODB"].value, odb_rank:area["ODB"].rank, odb_rank_change:area["ODB"].rank_change, readiness:area["READINESS"].value, implementation:area["IMPLEMENTATION"].value, impact:area["IMPACT"].value, iso2:current_country.iso2, iso3:current_country.iso3, hdi:current_country.hdi_rank, income:current_country.income, g20:current_country.g20, g7:current_country.g7, iodch:current_country.iodch, oecd:current_country.oecd, region_iso3:current_country.area, region:_.find(window.regions, {iso3:current_country.area}).name, readiness_data:[area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value], implementation_data:[area["INNOVATION"].value, area["SOCIAL_POLICY"].value, area["ACCOUNTABILITY"].value], impact_data:[area["POLITICAL"].value, area["SOCIAL"].value, area["ECONOMIC"].value], readiness_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name], implementation_data_labels:[_.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name], impact_data_labels:[_.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name], components_data:[area["GOVERNMENT_ACTION"].value, area["REGULATORY_AND_CIVIL"].value, area["BUSINESS_AND_ENTREPRENEURSHIP"].value,area["INNOVATION"].value,area["SOCIAL_POLICY"].value,area["ACCOUNTABILITY"].value,area["POLITICAL"].value,area["SOCIAL"].value, area["ECONOMIC"].value], components_data_labels:[_.find(window.indicators, {indicator:"GOVERNMENT_POLICIES"}).name, _.find(window.indicators, {indicator:"GOVERNMENT_ACTION"}).name, _.find(window.indicators, {indicator:"REGULATORY_AND_CIVIL"}).name, _.find(window.indicators, {indicator:"BUSINESS_AND_ENTREPRENEURSHIP"}).name, _.find(window.indicators, {indicator:"INNOVATION"}).name, _.find(window.indicators, {indicator:"SOCIAL_POLICY"}).name, _.find(window.indicators, {indicator:"ACCOUNTABILITY"}).name, _.find(window.indicators, {indicator:"POLITICAL"}).name, _.find(window.indicators, {indicator:"SOCIAL"}).name, _.find(window.indicators, {indicator:"ECONOMIC"}).name]}; /*readiness_data:{action:area["GOVERNMENT_ACTION"].value, civil:area["REGULATORY_AND_CIVIL"].value, business:area["BUSINESS_AND_ENTREPRENEURSHIP"].value}, implementation_data:{innovation:area["INNOVATION"].value, social:area["SOCIAL_POLICY"].value, accountability:area["ACCOUNTABILITY"].value}, impact_data:{political:area["POLITICAL"].value, social:area["SOCIAL"].value, economic:area["ECONOMIC"].value}};*/
            }
        }
    })
    .compact()
    .sortBy("odb")
    .reverse()
    .value();

	var result = _.reduce(regions, function (result, region) {
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
	}, {});	
	
	mean_table_data = result;
	console.log(mean_table_data);
	

//Custom Search para la tabla - ahora está oculta-
$('#cinput-table-search').keyup(function(){
  table.search($(this).val()).draw() ;
})