/* global d3 */
/* global syze */

jQuery(window).ready(function() {

	syze.sizes(768, 992);

	if (!jQuery('html').hasClass('lt992')) {

		jQuery(function() {
			jQuery('.share-item a').on('click', function(e) {
				var width = 575,
					height = 400,
					left = ($(window).width() - width) / 2,
					top = ($(window).height() - height) / 2,
					url = jQuery(this).attr('href'),
					opts = 'status=1' +
						',width=' + width +
						',height=' + height +
						',top=' + top +
						',left=' + left;
				window.open(url, 'share', opts);
				e.preventDefault();
				return false;
			});
		});

		var $label = jQuery('#graph__body div');
		var $labelTitle = jQuery('.graph__body__title span');
		var $labelNumber = jQuery('.graph__body__number');
		var $defaultMessage = jQuery('#default-message');

		var titles = {
			101: "Athlétisme",
			102: "Aviron",
			103: "Badminton",
			105: "Basketball",
			109: "Equitation",
			111: "Football",
			113: "Gymnastique",
			115: "Handball",
			117: "Judo, Jujitsu",
			119: "Natation",
			123: "Tennis",
			124: "Tennis de table",
			128: "Voile",
			132: "Golf",
			245: "Randonnée",
			246: "Roller"
		};

		var margin = 100,
			radius = 225,
			innerRadius = 65;

		jQuery('#graph').css('padding', (margin / 2) + 'px');

		var startAngle = 0;
		var pie = d3.layout.pie()
			.startAngle(startAngle * (Math.PI / 180))
			.sort(null)
			.value(function() {
				return 1;
			});

		var svg = d3.select("#graph").append("svg")
			.append("g")
			.attr("transform", "translate(225,225)");

		// svg.call(tip);

		var path = svg.selectAll("path");

		var min, max, arc;

		jQuery('.sport-icon').hover(function() {
			jQuery('.arc').attr('fill', '#aaced3');
			jQuery('.arc-id-' + jQuery(this).data('id')).attr('fill', '#000');
			var d = d3.select('.arc-id-' + jQuery(this).data('id')).data()[0];
			console.log(d);
			$defaultMessage.css('display', 'none');
			$labelTitle.text(titles[d.data.fed_2012]);
			$labelNumber.text(Math.round(d.data.ratio));
			$label.show();

		}, function() {
			jQuery('.arc').attr('fill', '#aaced3');
			hideLabel();
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

		function showLabel(d) {
			jQuery('.sport-icon').removeClass('hover');
			jQuery('.sport-id-' + d.data.fed_2012).addClass('hover');
			$defaultMessage.css('display', 'none');
			$labelTitle.text(titles[d.data.fed_2012]);
			$labelNumber.text(Math.round(d.data.ratio));
			$label.show();
		}

		function hideLabel() {
			jQuery('.sport-icon').removeClass('hover');
			$label.hide();
			$defaultMessage.css('display', 'table-cell');
		}

		d3.csv("nantes.csv", type, function(error, data) {

			max = d3.max(data, function(d) {
				return parseInt(d.ratio, 10);
			});
			min = d3.min(data, function(d) {
				return parseInt(d.ratio, 10);
			});

			var myscale = d3.scale.sqrt()
				.domain([min, max])
				.range([innerRadius, radius]);

			arc = d3.svg.arc()
			// .startAngle(function() {
			// 	return 12 * (Math.PI / 180);
			// })
			.outerRadius(function(d) {
				return myscale(d.data.ratio);
			})
				.innerRadius(innerRadius);

			var federations = d3.nest()
				.key(function(d) {
					return d.sex + '-' + d.age;
				})
				.entries(data);

			// var sexes = d3.nest()
			// 	.key(function(d) {
			// 		return d.sex;
			// 	})
			// 	.entries(data);

			// var ages = d3.nest()
			// 	.key(function(d) {
			// 		return d.age;
			// 	})
			// 	.entries(data);

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

			jQuery("#sexes input, #ages input").on('click', function() {
				changeFilter();
			});

			function changeFilter() {
				var sex = d3.select(".sex:checked").attr('value');
				var age = d3.select(".age:checked").attr('value');
				jQuery('#' + sex + '-' + age).click();
			}

			function change(federation) {

				hideLabel();

				var data0 = path.data(),
					data1 = pie(federation.values);

				path = path.data(data1, key);

				path
					.enter()
					.append("path")
					.each(function(d, i) {
						this._current = findNeighborArc(i, data0, data1, key) || d;
					})
					.attr('class', function(d) {
						return "arc arc-id-" + d.data.fed_2012;
					})
					.attr("fill", "#aaced3")
					.on('mouseenter', showLabel)
					.on('touchstart', showLabel)
					.on('mouseleave', hideLabel)
					.append("title")
					.text(function(d) {
						return d.data.federation;
					});

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

	}
});