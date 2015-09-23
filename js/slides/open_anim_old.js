var pt = pt || {};

pt.open_anim = pt.open_anim || {};

 
pt.open_anim.set_stage = function(stage_label, number_of_lines, mid_point){

	var cur_lines = []
	for (var i=0; i<number_of_lines; i++) {

		
		var xval = pt.open_anim.start_point + 1.0*i*(pt.open_anim.end_point - pt.open_anim.start_point)/(number_of_lines-1);
		var mid_x = xval;
		if (mid_point)
		{
			if ((xval-pt.open_anim.start_point) < (pt.open_anim.end_point-pt.open_anim.start_point)/2.0 )
			{
				mid_x = 0;
			}
			else {
				mid_x = 800;
			}
		}
		var l1 = [[xval,pt.open_anim.high_y],[mid_x, pt.open_anim.mid_y], [xval,pt.open_anim.low_y]];
		var l_dic = {	r : xval,
							data : l1
						};
		
		cur_lines.push(l_dic);
	
	}
	
	pt.open_anim.lines[stage_label] = cur_lines;

};


pt.open_anim.add_to_stage = function (stage_label, mids) {
	var added_lines = []
	for (var i=0; i<mids.length; i++)
	{
		var xval = (pt.open_anim.end_point - pt.open_anim.start_point)/2.0 + pt.open_anim.start_point;
		var mid_x = mids[i];
		var l1 = [[xval,pt.open_anim.high_y],[mid_x, pt.open_anim.mid_y], [xval,pt.open_anim.low_y]];
		var l_dic = {	r: mid_x,
							data:l1
						};
		console.log(mid_x);
		added_lines.push(l_dic);
	}
	pt.open_anim.lines[stage_label] = pt.open_anim.lines[stage_label].concat(added_lines);
}







pt.open_anim.lineFunction = d3.svg.line()
                    .x(function(d) { return d[0]; })
                    .y(function(d) { return d[1]; })
                    .interpolate("basis");


pt.open_anim.get_data = function(l) {

    l
    .attr("d", function(d) { return pt.open_anim.lineFunction(d.data); })
    ;
    
};

pt.open_anim.get_rect_data = function(l) {

    l
     .attr("height", function(d) { return d.h; })
     .attr("width", function(d) { return d.w; })
	  .attr("x", function(d) { return d.x; })
	  .attr("y", function(d) { return d.y; })
    ;
    
};
pt.open_anim.init = function() {
    
    //Do only once.
    if (pt.open_anim.did_init != null)
    {
       return;
    }
    pt.open_anim.did_init  = true;
    pt.open_anim.lines  = {};

    pt.open_anim.thermo_info = {
    		'-1': {x:50, w:30, y:100, h:300},
    		'0': {x:50, w:30, y:300, h:100}, 
    		'1': {x:50, w:30, y:300, h:100},
    		'2': {x:50, w:30, y:100, h:300}			
    	};
    
    pt.open_anim.start_point = 100;
    pt.open_anim.end_point = 800;
    
    pt.open_anim.high_y = 10;
    pt.open_anim.mid_y  = 210;
    pt.open_anim.low_y = 410;

    pt.open_anim.set_stage(-1,10,false);
    pt.open_anim.set_stage(0,10,true);
    pt.open_anim.set_stage(1,10,true);
    pt.open_anim.add_to_stage(1,[153,444,600]);
    pt.open_anim.set_stage(2,13,false);

    
    pt.open_anim.svg = d3.select('.placeholder')
        .append('svg')
        .attr('width', 800)
        .attr('hight', 300)
        .style('backgroudn','white');   



pt.open_anim.svg.append("rect")
    .attr("width", 600)
    .attr("height", 100)
    .attr("x", 150)
    .attr("y", 150)
    .attr("class", "rectB")

    

    pt.open_anim.line = d3.svg.line()
              .interpolate("basis");
              

			
	pt.open_anim.svg.append("svg:image")
   .attr('x',0)
   .attr('y',0)
   .attr('width', 256)
   .attr('height', 512)
   .attr("xlink:href","images/anim/thermometer.svg")
   
   	pt.open_anim.svg.append("svg:image")
   .attr('x',600)
   .attr('y',200)
   .attr('width', 256)
   .attr('height', 256)
   .attr("xlink:href","images/anim/wattmeter.svg")

pt.open_anim.svg.append("svg:defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("svg:marker")
    .attr("id", "mark")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");


pt.open_anim.svg.append("path")	
	.attr("marker-end","url(#mark)")
	.attr("stroke", "black")
	.attr("stroke-width", "2")
	.attr("class","arrow")
	.attr("x", 10);

			thermo_data = pt.open_anim.thermo_info[0]
   		pt.open_anim.svg.append("rect")
			.attr("width" , thermo_data.w)
			.attr("height", thermo_data.h)
			.attr("x", thermo_data.x)
			.attr("y", thermo_data.y)
			.attr("class","thermorect");
    
};


pt.open_anim.update =  function(segment) {

    if (pt.open_anim.did_init == null)
    {
            pt.open_anim.init();
    }
    
    var this_lines = pt.open_anim.lines[segment];

  /* pt.svg.append("path")
        .datum(thie_lines)
        .attr("class","line")
        .attr("d", pt.line)*/

var paths = pt.open_anim.svg
    .selectAll('path.line')
    // The unique key is the name.
    .data(this_lines, function(d) { return d.r; });

paths
    .transition()
    .duration(750)
    .call(pt.open_anim.get_data)
    .style('opacity', 1.0);

paths
    .enter()
    .append("path")
    .attr("class","line")
    .style('opacity', 0)
    .call(pt.open_anim.get_data)
    .transition()
    .duration(750)
    .style('opacity', 1.0);
  
paths
    .exit()
    .transition()
    .duration(750)
    .style("opacity",0)
    .remove();
    
    thremo_data = pt.open_anim.thermo_info[segment];
    var thermorect = pt.open_anim.svg.selectAll(".thermorect")
    					.data([thremo_data], function(d) { return "rect"; });;
    
    console.log(thremo_data.h);
    thermorect
        .transition()
    		.duration(750)
			.call(pt.open_anim.get_rect_data);
			    
};




