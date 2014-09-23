"use strict";
/* global d3 */

var width = 760,
	height = 760,
	radius = Math.min(width, height) / 2,
	innerRadius = 80;

var color = d3.scale.category20();

var pie = d3.layout.pie()
	.startAngle(0)
	.sort(null)
	.value(function(d) {
		return 1;
	});

var svg = d3.select("#graph").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

var path = svg.selectAll("path");

var min, max, arc;

var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
	return d;
});

d3.csv("nantes.csv", type, function(error, data) {

	max = d3.max(data, function(d) {
		// console.log(d.federation, d.age, d.sex, d.ratio);
		return parseInt(d.ratio, 10);
	});
	min = d3.min(data, function(d) {
		return parseInt(d.ratio, 10);
	});

	var myscale = d3.scale.sqrt()
		.domain([min, max])
		.range([innerRadius, radius]);

	arc = d3.svg.arc()
		.outerRadius(function(d) {
			return myscale(d.data.ratio);
		})
		.innerRadius(innerRadius);

	var federations = d3.nest()
		.key(function(d) {
			return d.sex + '-' + d.age;
		})
		.entries(data);

	var sexes = d3.nest()
		.key(function(d) {
			return d.sex;
		})
		.entries(data);

	var ages = d3.nest()
		.key(function(d) {
			return d.age;
		})
		.entries(data);

	var label = d3.select("#all").selectAll("label")
		.data(federations)
		.enter().append("label");

	label.append("input")
		.attr("type", "radio")
		.attr("name", "all")
		.attr("value", function(d) {
			return d.key;
		})
		.attr("id", function(d) {
			return d.key;
		})
		.on("change", change)
		.filter(function(d, i) {
			return i;
		})
		.property("checked", true);

	label.append("span")
		.text(function(d) {
			return d.key;
		});

	var label = d3.select("#ages").selectAll("label")
		.data(ages)
		.enter().append("label");

	label.append("input")
		.attr("type", "radio")
		.attr("name", "age")
		.attr("class", "age")
		.attr("value", function(d) {
			return d.key;
		})
		.on("change", changeFilter)
		.filter(function(d, i) {
			return !i;
		})
		.property("checked", true);

	label.append("span")
		.text(function(d) {
			return d.key;
		});

	var label = d3.select("#sexes").selectAll("label")
		.data(sexes)
		.enter().append("label");

	label.append("input")
		.attr("type", "radio")
		.attr("name", "sex")
		.attr("class", "sex")
		.attr("value", function(d) {
			return d.key;
		})
		.on("change", changeFilter)
		.filter(function(d, i) {
			return !i;
		})
		.property("checked", true);

	label.append("span")
		.text(function(d) {
			return d.key;
		});

	jQuery("#sexes input, #ages input").on('click', function() {
		changeFilter();
	});

	function changeFilter() {
		var sex = d3.select(".sex:checked").attr('value');
		var age = d3.select(".age:checked").attr('value');
		console.log(sex + '-' + age);
		console.log(jQuery('#' + sex + '-' + age));
		jQuery('#' + sex + '-' + age).click();
	}

	function change(federation) {

		console.log(federation);

		var data0 = path.data(),
			data1 = pie(federation.values);

		path = path.data(data1, key);

		path.enter().append("path")
			.each(function(d, i) {
				this._current = findNeighborArc(i, data0, data1, key) || d;
			})
			.attr("class", "arc")
			.attr("fill", "#aaced3")
			.append("title")
			.text(function(d) {
				return d.data.federation;
			})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		path.exit()
			.datum(function(d, i) {
				return findNeighborArc(i, data1, data0, key) || d;
			})
			.transition()
			.duration(750)
			.attrTween("d", arcTween)
			.remove();

		path.transition()
			.duration(750)
			.attrTween("d", arcTween);
	}

	changeFilter();
});

function key(d) {
	return d.data.federation;
}

function type(d) {
	// d.count = +d.count;
	return d;
}

function findNeighborArc(i, data0, data1, key) {
	var d;
	return (d = findPreceding(i, data0, data1, key)) ? {
		startAngle: d.endAngle,
		endAngle: d.endAngle
	} : (d = findFollowing(i, data0, data1, key)) ? {
		startAngle: d.startAngle,
		endAngle: d.startAngle
	} : null;
}

// Find the element in data0 that joins the highest preceding element in data1.

function findPreceding(i, data0, data1, key) {
	var m = data0.length;
	while (--i >= 0) {
		var k = key(data1[i]);
		for (var j = 0; j < m; ++j) {
			if (key(data0[j]) === k) return data0[j];
		}
	}
}

// Find the element in data0 that joins the lowest following element in data1.

function findFollowing(i, data0, data1, key) {
	var n = data1.length,
		m = data0.length;
	while (++i < n) {
		var k = key(data1[i]);
		for (var j = 0; j < m; ++j) {
			if (key(data0[j]) === k) return data0[j];
		}
	}
}

function arcTween(d) {
	var i = d3.interpolate(this._current, d);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}