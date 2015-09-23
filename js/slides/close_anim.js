

//Worst JS code, EVER! 

var pt = pt || {};

pt.close_anim = pt.close_anim || {};


pt.close_anim.thermo_info = {
		'-1': pt.anim_const.termo_hot,
		'0': pt.anim_const.termo_cold,
		'1': pt.anim_const.termo_mid,
		'2': pt.anim_const.termo_cold,
		'3': pt.anim_const.termo_hot,
        '4': pt.anim_const.termo_cold,    		
		'5': pt.anim_const.termo_cold        					
	};
    	
pt.close_anim.defects = [
        {n: 0, opt: [1,0,1,0,1,0,0]},
        {n: 1, opt: [1,1,1,1,1,0,1]},
        {n: 2, opt: [1,0,1,0,1,1,0]},
        {n: 3, opt: [1,1,1,1,1,0,1]},
        {n: 4, opt: [1,0,1,0,1,1,0]},
        {n: 5, opt: [1,1,1,1,1,0,1]},
        {n: 6, opt: [1,0,1,0,1,1,0]},
        {n: 7, opt: [1,1,1,1,1,0,1]},
        {n: 8, opt: [1,0,1,0,1,1,0]}        
];

pt.close_anim.arrow_angle = [    
        {n: 1, angle: [50, 50, 50 , 50,50 ,50,50]},
        
];



pt.close_anim.add_svgs = function(base) {
	
	base.append("svg:image")
   .attr('x',0)
   .attr('y',0)
   .attr('width', 128)
   .attr('height', 256)
   .attr("xlink:href","images/anim/thermometer.svg")
   
   	base.append("svg:image")
   .attr('x',-20)
   .attr('y',250)
   .attr('width', 200)
   .attr('height', 200)
   .attr("xlink:href","images/anim/wattmeter.svg")

    base.append("svg:defs").selectAll("marker")
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



		thermo_data = pt.close_anim.thermo_info[0]
   		base.append("rect")
			.attr("width" , thermo_data.w)
			.attr("height", thermo_data.h)
			.attr("x", thermo_data.x)
			.attr("y", thermo_data.y)
			.attr("class","thermorect");
}

 
pt.close_anim.set_stage = function(stage_label, number_of_lines, mid_point){

	var cur_lines = []
    middle_x = (pt.anim_const.end_point-pt.anim_const.start_point)/2.0 + pt.anim_const.start_point	
	for (var i=0; i<number_of_lines; i++) {

		
		var xval = pt.anim_const.start_point + 1.0*i*(pt.anim_const.end_point - pt.anim_const.start_point)/(number_of_lines-1);
		var mid_x = xval;
		var r_name = i;
		if (mid_point)
		{    
			if (xval < middle_x )
			{
				mid_x = 100 - (xval-pt.anim_const.start_point)/3.5;
				r_name = i;
			}
			else {
				mid_x = 800 - (xval-pt.anim_const.end_point)/3.5;
				r_name=i+4;
			}
		}
		var l1 = [[xval,pt.anim_const.high_y],[mid_x, pt.anim_const.mid_y], [xval,pt.anim_const.low_y]];
		
		var l_dic = {	r : r_name,
							data : l1
						};
		
		cur_lines.push(l_dic);
	
	}
	
	pt.close_anim.lines[stage_label] = cur_lines;

};


pt.close_anim.add_to_stage = function (stage_label, mids) {
	var added_lines = []
	for (var i=0; i<mids.length; i++)
	{
		var xval = (pt.anim_const.end_point - pt.anim_const.start_point)/2.0 + pt.anim_const.start_point;
		var mid_x = mids[i];
		var l1 = [[xval,pt.anim_const.high_y],[mid_x, pt.anim_const.mid_y], [xval,pt.anim_const.low_y]];
		var l_dic = {	r: i+4,
							data:l1
						};

		added_lines.push(l_dic);
	}
	pt.close_anim.lines[stage_label] = pt.close_anim.lines[stage_label].concat(added_lines);
}



pt.close_anim.add_loop = function (stage_label, starts, ends) {
	var added_lines = []
	for (var i=0; i<starts.length; i++)
	{
		start = starts[i];
		end = ends[i]; 
		midx = (start+end)/2;
		
		var l1 = [[start,pt.anim_const.mid_y],[midx, pt.anim_const.mid_y-100], [end,pt.anim_const.mid_y], [midx,pt.anim_const.mid_y+100]];
		var l_dic = {	r: i+50,
							data:l1,
							type:"loop"
						};

		added_lines.push(l_dic);
	}
	pt.close_anim.lines[stage_label] = pt.close_anim.lines[stage_label].concat(added_lines);
}








pt.close_anim.lineFunction = d3.svg.line()
                    .x(function(d) { return d[0]; })
                    .y(function(d) { return d[1]; })
                    .interpolate("basis");
pt.close_anim.lineFunctionClose = d3.svg.line()
	.x(function(d) { return d[0]; })
	.y(function(d) { return d[1]; })
	.interpolate("basis-closed");

pt.close_anim.arrowFunction = d3.svg.line()
                    .x(function(d) { return d[0]; })
                    .y(function(d) { return d[1]; })
                    .interpolate("basis");

pt.close_anim.get_data = function(l) {   
	
	    l
	    .attr("d", function(d) { if (d.type == "loop" ) {return pt.close_anim.lineFunctionClose(d.data);} 
	    						else {return pt.close_anim.lineFunction(d.data);} })
	    .attr("id", function(d) {return d.r;})
	    .attr("data-loop", function(d) {return (d.type  == "loop") ? "loop" : "no_loop";});
	    ;
		
	
    
};



pt.close_anim.get_arrow_data = function(l) {
    var current_frag = pt.close_anim.current_fragment;        
    var pi = 3.1415;
    var basex = 0;
    var basey = 380;
    var r =50;
    l
    .attr("d", function(d) { 
            angle = d.angle[current_frag+1] * pi / 180.0; 
    
            return pt.close_anim.arrowFunction([[basex,basey],[basex+r*Math.cos(angle),basey-r*Math.sin(angle)]]);
            
             })
    ;
    
};



pt.close_anim.get_rect_data = function(l) {

    l
     .attr("height", function(d) { return d.h; })
     .attr("width", function(d) { return d.w; })
	  .attr("x", function(d) { return d.x; })
	  .attr("y", function(d) { return d.y; })
    ;
    
};




pt.close_anim.get_defect_data = function(l) 
{
    var current_frag = pt.close_anim.current_fragment;
    var stage_to_color = {0: pt.anim_const.color_normal, 1:pt.anim_const.color_sc};

    l
        .attr("d", function(d) {return pt.anim_const.defects[d.n]})
        .attr("fill", function(d) {return stage_to_color[d.opt[current_frag+1]];})
        ;      
};  





    	
pt.close_anim.init = function() {
    
    //Do only once.
    if (pt.close_anim.did_init != null)
    {
       return;
    }
    pt.close_anim.did_init  = true;
    pt.close_anim.lines  = {};



    var v_loc = pt.anim_const.vortex_loc
    pt.close_anim.set_stage(-1,12,false);
    //pt.close_anim.add_loop(-1,[v_loc[1]+20,v_loc[4]-20, v_loc[6]-20 ], [v_loc[1]+50, v_loc[4]-50, v_loc[6]-30]);
    pt.close_anim.set_stage(0,8,true);
    pt.close_anim.add_to_stage(0,[v_loc[0],v_loc[2] ,v_loc[4] ,v_loc[6]]);
    pt.close_anim.set_stage(1,8,true);
    pt.close_anim.add_to_stage(1,[v_loc[0],v_loc[2] ,v_loc[4] ,v_loc[6]]);
    pt.close_anim.add_loop(1,[(v_loc[1]+v_loc[2])/2, 	(v_loc[3]+v_loc[4])/2+40], 
    						 [(v_loc[2]+v_loc[3])/2, 	(v_loc[3]+v_loc[4])/2+70]);
    
    
    
    pt.close_anim.set_stage(2,8,true);
    pt.close_anim.add_to_stage(2,[v_loc[0],v_loc[2] ,v_loc[4] ,v_loc[6]]);
    pt.close_anim.set_stage(3,12,false);
    //pt.close_anim.add_loop(3,[v_loc[1]+40,v_loc[4]-40, v_loc[6]-20 ], [v_loc[1]+50, v_loc[4]-50, v_loc[6]-50]);
    
    pt.close_anim.set_stage(4,8,true);    
    pt.close_anim.add_to_stage(4,[v_loc[1],v_loc[3] ,v_loc[5] ,v_loc[7]]);
    pt.close_anim.set_stage(5,8,true); 
    pt.close_anim.add_to_stage(5,[v_loc[0],v_loc[2] ,v_loc[4] ,v_loc[6]]);

    
    pt.close_anim.svg = d3.select('.placeholder_close')
        .append('svg')
        .attr('width', pt.anim_const.tot_width)
        .attr('height', pt.anim_const.tot_hight);
        //.style('background','white');   
     
     pt.close_anim.add_svgs(pt.close_anim.svg);


};


pt.close_anim.update =  function(segment) {

    if (pt.close_anim.did_init == null)
    {
            pt.close_anim.init();
    }
    if (pt.close_anim.intervalID!=null)
    {
        console.log("Remove interval");
        window.clearInterval(pt.close_anim.intervalID);
        pt.close_anim.intervalID = null;
    }    
    pt.close_anim.current_fragment = segment;
    var this_lines = pt.close_anim.lines[segment];



var paths = pt.close_anim.svg
    .selectAll('path.line')
    .data(this_lines, function(d) { return d.r; });

var defect_path = pt.close_anim.svg
    .selectAll('path.rectC')
    .data(pt.close_anim.defects, function(d) { return d.n; });
    
defect_path
        .transition()
        .duration(750)
       .call(pt.close_anim.get_defect_data)
       
defect_path.enter()
       .append("path")
       .attr("class","rectC")
       .call(pt.close_anim.get_defect_data)

var arrow_path = pt.close_anim.svg
    .selectAll('path.arrow')
     .data(pt.close_anim.arrow_angle, function(d) { return d.n; });

arrow_path
        .transition()
        .duration(750)
       .call(pt.close_anim.get_arrow_data)

arrow_path.enter()
       .append("path")
       	.attr("marker-end","url(#mark)")
    	.attr("stroke", "black")
    	.attr("stroke-width", "2")
    	.attr("class","arrow")
       .call(pt.close_anim.get_arrow_data)       


              
paths
    .transition()
    .duration(750)
    .call(pt.close_anim.get_data)
    .style('opacity', 1.0);

paths
    .enter()
    .append("path")
    .attr("class","line")
    .style('opacity', 0)
    .call(pt.close_anim.get_data)
    .transition()
    .duration(750)
    .style('opacity', 1.0);
  
paths
    .exit()
    .transition()
    .duration(750)
    .style("opacity",0)
    .remove();
    
    thremo_data = pt.close_anim.thermo_info[segment];
    var thermorect = pt.close_anim.svg.selectAll(".thermorect")
    					.data([thremo_data], function(d) { return "rect"; });;
    

    thermorect
        .transition()
    		.duration(750)
			.call(pt.close_anim.get_rect_data);



    
    var paths2 = pt.close_anim.svg
        .selectAll('path.line2')
        .data([], function(d) { return d.r; });    
        
paths2
    .exit()
    .transition()
    .duration(750)
    .style("opacity",0)
    .remove();        
    if (segment == 1)
    {
            console.log("Call fluc!");
            pt.close_anim.update_fluc(segment);
            //pt.close_anim.intervalID = window.setInterval( function() {pt.close_anim.animate_step(segment);},300);
            pt.close_anim.animate_step(segment);
            console.log("intervalid " + pt.close_anim.intervalID);

     
    }	
    	    
};


pt.close_anim.get_anim_data_step = function(data_lines)
{
       pt.close_anim.phase = pt.close_anim.phase || 0;
       pt.close_anim.phase += 1
       for (var i=0; i<data_lines.length;i++)
       {
            for (var k=0; k<data_lines[i].data.length; k++)
            {
                    data_lines[i].data[k][0] += 10 * Math.sin(k + pt.close_anim.phase);
            }
       }
  return data_lines;
}
pt.close_anim.get_anim_data = function(segment)
{
    var paths = pt.close_anim.svg
        .selectAll('path.line')
   
    fluc_data_lines = []

    for (var i=0; i<paths[0].length; i++)
    {
        var cur_path = paths[0][i];
        var line_data = []
        var d_type = cur_path.attributes["data-loop"].value;
        for (var j=0; j<cur_path.getTotalLength(); j+=20)
        {
           this_point = cur_path.getPointAtLength(j);
           line_data.push([this_point.x, this_point.y]);
        }
    	var l_dic = {	r : parseInt(cur_path.id),
    					data : line_data,
    					type: d_type,
    				};
        fluc_data_lines.push(l_dic);
    }
    return fluc_data_lines;
    
}

pt.close_anim.animate_step = function(segment)
{    
    fluc_data_lines = pt.close_anim.get_anim_data_step(pt.close_anim.fluc_data_lines);
    var paths2 = pt.close_anim.svg
    .selectAll('path.line2')
    .data(fluc_data_lines, function(d) { return d.r; });
    
    paths2
        .transition() 
        .duration(200)        
        .call(pt.close_anim.get_data)
        .style('opacity', 1.0)
        .each("end",function() {pt.close_anim.animate_step(segment);}) ;
 
}
   
pt.close_anim.update_fluc    = function(segment)
{

    pt.close_anim.fluc_data_lines = pt.close_anim.get_anim_data(segment);
    fluc_data_lines = pt.close_anim.get_anim_data_step(pt.close_anim.fluc_data_lines);
    var paths2 = pt.close_anim.svg
        .selectAll('path.line2')
        .data(fluc_data_lines, function(d) { return d.r; });

var paths = pt.close_anim.svg
    .selectAll('path.line')
    .data(pt.close_anim.lines[segment], function(d) { return d.r; });
paths2
    .enter()
    .append("path")
    .attr("class","line2")
    .style('opacity', 0)
    .call(pt.close_anim.get_data)
    .transition()
    .duration(750)
    .style('opacity', 0.0);
    
    
paths
    .transition()
    .duration(750)
    .call(pt.close_anim.get_data)
    .style('opacity', 0.0);


};


