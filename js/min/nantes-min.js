function key(e){return e.data.federation}function type(e){return e}function findNeighborArc(e,t,a,n){var r;return(r=findPreceding(e,t,a,n))?{startAngle:r.endAngle,endAngle:r.endAngle}:(r=findFollowing(e,t,a,n))?{startAngle:r.startAngle,endAngle:r.startAngle}:null}function findPreceding(e,t,a,n){for(var r=t.length;--e>=0;)for(var i=n(a[e]),l=0;r>l;++l)if(n(t[l])===i)return t[l]}function findFollowing(e,t,a,n){for(var r=a.length,i=t.length;++e<r;)for(var l=n(a[e]),d=0;i>d;++d)if(n(t[d])===l)return t[d]}function arcTween(e){var t=d3.interpolate(this._current,e);return this._current=t(0),function(e){return arc(t(e))}}function showLabel(e){jQuery(".sport-icon").removeClass("hover"),jQuery(".sport-id-"+e.data.fed_2012).addClass("hover"),$defaultMessage.css("display","none"),$labelTitle.text(titles[e.data.fed_2012]),$labelNumber.text(Math.round(e.data.ratio)),$label.show()}function hideLabel(){jQuery(".sport-icon").removeClass("hover"),$label.hide(),$defaultMessage.css("display","table-cell")}if($(window).width()>960){jQuery(function(){jQuery(".share-item a").on("click",function(e){var t=575,a=400,n=($(window).width()-t)/2,r=($(window).height()-a)/2,i=jQuery(this).attr("href"),l="status=1,width="+t+",height="+a+",top="+r+",left="+n;return window.open(i,"share",l),e.preventDefault(),!1})});var $label=jQuery("#graph__body div"),$labelTitle=jQuery(".graph__body__title span"),$labelNumber=jQuery(".graph__body__number"),$defaultMessage=jQuery("#default-message"),titles={101:"Athlétisme",102:"Aviron",103:"Badminton",105:"Basketball",109:"Equitation",111:"Football",113:"Gymnastique",115:"Handball",117:"Judo, Jujitsu",119:"Natation",123:"Tennis",124:"Tennis de table",128:"Voile",132:"Golf",245:"Randonnée",246:"Roller"},margin=100,radius=225,innerRadius=65;jQuery("#graph").css("padding",margin/2+"px");var startAngle=0,pie=d3.layout.pie().startAngle(startAngle*(Math.PI/180)).sort(null).value(function(){return 1}),svg=d3.select("#graph").append("svg").append("g").attr("transform","translate(225,225)"),path=svg.selectAll("path"),min,max,arc;jQuery(".sport-icon").hover(function(){jQuery(".arc").attr("fill","#aaced3"),jQuery(".arc-id-"+jQuery(this).data("id")).attr("fill","#000");var e=d3.select(".arc-id-"+jQuery(this).data("id")).data()[0];console.log(e),$defaultMessage.css("display","none"),$labelTitle.text(titles[e.data.fed_2012]),$labelNumber.text(Math.round(e.data.ratio)),$label.show()},function(){jQuery(".arc").attr("fill","#aaced3"),hideLabel()}),d3.csv("/nantes-sports/nantes.csv",type,function(e,t){function a(){var e=d3.select(".sex:checked").attr("value"),t=d3.select(".age:checked").attr("value");jQuery("#"+e+"-"+t).click()}function n(e){hideLabel();var t=path.data(),a=pie(e.values);path=path.data(a,key),path.enter().append("path").each(function(e,n){this._current=findNeighborArc(n,t,a,key)||e}).attr("class",function(e){return"arc arc-id-"+e.data.fed_2012}).attr("fill","#aaced3").on("mouseenter",showLabel).on("touchstart",showLabel).on("mouseleave",hideLabel).append("title").text(function(e){return e.data.federation}),path.exit().datum(function(e,n){return findNeighborArc(n,a,t,key)||e}).transition().duration(750).attrTween("d",arcTween).remove(),path.transition().duration(750).attrTween("d",arcTween)}max=d3.max(t,function(e){return parseInt(e.ratio,10)}),min=d3.min(t,function(e){return parseInt(e.ratio,10)});var r=d3.scale.sqrt().domain([min,max]).range([innerRadius,radius]);arc=d3.svg.arc().outerRadius(function(e){return r(e.data.ratio)}).innerRadius(innerRadius);var i=d3.nest().key(function(e){return e.sex+"-"+e.age}).entries(t),l=d3.select("#all").selectAll("label").data(i).enter().append("label");l.append("input").attr("type","radio").attr("name","all").attr("value",function(e){return e.key}).attr("id",function(e){return e.key}).on("change",n).filter(function(e,t){return t}).property("checked",!0),l.append("span").text(function(e){return e.key}),jQuery("#sexes input, #ages input").on("click",function(){a()}),a()})}