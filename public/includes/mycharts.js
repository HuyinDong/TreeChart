	 

	/* ---------- Pie chart ---------- */

	var CVE_severity = c3.generate({
		bindto: '#VulnerabilitiesSeverity',
		data: {
			url: '/data/CVE_severity.json',
            mimeType: 'json',
			type : 'pie',
			onclick: function (d, i) { console.log("onclick", d, i); },
			onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		},
		donut: {
			title: "% of Exploits Type",
			label: {
				show: true
			}
		},
		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				  for (i = 0; i < d.length; i++) {
				    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				    if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  //bgcolor = '#f00';
				  //color = '#ff0';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + color + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		}
	});
	
	/* ---------- Donut chart ---------- */
	var exploittype = c3.generate({
		bindto: '#VulnerabilitiesType',
		data: {
			url: '/data/donut_exploittype.json',
            mimeType: 'json',
			type : 'donut',
			onclick: function (d, i) { console.log("onclick", d, i); },
			onmouseover: function (d, i) { console.log("onmouseover", d, i); },
			onmouseout: function (d, i) { console.log("onmouseout", d, i); }
		},
		donut: {
			title: "% of Exploits Type",
			label: {
				show: true
			}
		},
		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				for (i = 0; i < d.length; i++) {
				  if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				  if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  //bgcolor = '#f00';
				  //color = '#ff0';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + color + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		},		
	});


	
	/* ---------- CVE by year chart ---------- */

	var cve_year = c3.generate({ 
		bindto: '#cve_year',
		data: {
            url: '/data/CVE_year.json',
            mimeType: 'json', 
			x : 'Year',			 
			type: 'bar'	,		
			colors: {
				CVE: '#99FF66'
			}	
		},
		legend: {
			show: false
		},
	    axis : {
			x : {
				type : 'timeseries',
				color:  '#99FF66'				 
			}
		},
		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				for (i = 0; i < d.length; i++) {
				  if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				  if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  bgcolor = '#f00';
				  color = '#ff0';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		},
	 
		axis: {
			x: {
				type: 'category',
				tick: {
					rotate: 45,
					multiline: false
				},
				height: 35
			}
		} 	
	});
	

/* ---------- Exploits by year chart ---------- */

	var exploit_year = c3.generate({ 
		bindto: '#exploit_year',
		data: {
            url: '/data/Exploit_year.json',
            mimeType: 'json', 
			x : 'Year',			 
			type: 'bar'	,		
			colors: {
				Exploit: '#ff9999 '
			}	
		},
		legend: {
			show: false
		},
	    axis : {
			x : {
				type : 'timeseries',
				color:  '#99FF66'				 
			}
		},
		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				for (i = 0; i < d.length; i++) {
				  if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				  if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  bgcolor = '#f00';
				  color = '#ff0';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		},
	 
		axis: {
			x: {
				type: 'category',
				tick: {
					rotate: 45,
					multiline: false
				},
				height: 35
			}
		} 	
	});
	

/* ---------- Vulnerabilities Rank by Vendor Product_top.json ---------- */

	var vulnerabilities_vendor = c3.generate({ 
		bindto: '#vulnerabilities_vendor',
		data: {
            url: '/data/Vendor_top.json',
            mimeType: 'json', 
			x : 'Vendor',			 
			type: 'bar'	,		
			colors: {
				Vendor: 'red',
				Vulnerabilities: '#ffcc33'
			}	
		},
		legend: {
			show: false
		},
		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				for (i = 0; i < d.length; i++) {
				  if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				  if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  bgcolor = '#f00';
				  color = 'red';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		},	 
		axis: {
			x: {
				type: 'category',				
				tick: {
					rotate: 45,
					multiline: false
				},
				height: 45
			}
		} 	
	});
	

/* ---------- Vulnerabilities Rank by   Product  ---------- */

	var vulnerabilities_product = c3.generate({ 
		bindto: '#vulnerabilities_product',
		data: {
            url: '/data/Product_top.json',
            mimeType: 'json', 
			x : 'Product',			 
			type: 'bar'	,		
			colors: {
				Vulnerabilities: '#99ccff '
			}	
		},
		legend: {
			show: false
		},

		tooltip: {
			contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
				var $$ = this, config = $$.config,
				  titleFormat = config.tooltip_format_title || defaultTitleFormat,
				  nameFormat = config.tooltip_format_name || function (name) { return name; },
				  valueFormat = config.tooltip_format_value || defaultValueFormat,
				  text, i, title, value, name, bgcolor;
				for (i = 0; i < d.length; i++) {
				  if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

				  if (! text) {
					  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
					  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
				  }

				  name = nameFormat(d[i].name);
				  value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
				  bgcolor = '#f00';
				  color = '#ff0';

				  text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
				  text += "<td class='name green'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
				  text += "<td class='value green'>" + value + "</td>";
				  text += "</tr>";
				}
				return text + "</table>";
			}
		},
	 
		axis: {
			x: {
				type: 'category',
				tick: {
					rotate: 45,
					multiline: false
				},
				height: 45
			}
		} 	
	});
	
				