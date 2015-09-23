



var pt = pt || {};

pt.open_anim = pt.open_anim || {};


pt.open_anim.thermo_info = {
		'-1': pt.anim_const.termo_hot,
		'0': pt.anim_const.termo_cold,
		'1': pt.anim_const.termo_hot,
		'2': pt.anim_const.termo_cold,
		'3': pt.anim_const.termo_cold,
        '4': pt.anim_const.termo_cold,    		
		'5': pt.anim_const.termo_hot        					
	};
    	
pt.open_anim.defects = [
        {n: 0, opt: [1,0,1,0,0,0,1]},
        {n: 1, opt: [1,0,1,0,0,0,1]},
        {n: 2, opt: [1,0,1,0,0,0,1]},
        {n: 3, opt: [1,0,1,0,0,1,1]},
        {n: 4, opt: [1,0,1,0,0,0,1]},
        {n: 5, opt: [1,0,1,1,1,1,1]},
        {n: 6, opt: [1,0,1,0,0,0,1]},
        {n: 7, opt: [1,0,1,0,1,1,1]},
        {n: 8, opt: [1,0,1,0,0,0,1]}        
];

pt.open_anim.arrow_angle = [    
        {n: 1, angle: [-30, -30, -10,10,30,50,50]},
        
];



pt.open_anim.add_svgs = function(base) {
	
	base.append("svg:image")
   .attr('x',0)
   .attr('y',0)
   .attr('width', 128)
   .attr('height', 256)
   .attr("xlink:href","images/anim/thermometer.svg")
   
   /*	base.append("svg:image")
   .attr('x',-20)
   .attr('y',250)
   .attr('width', 200)
   .attr('height', 200)
   .attr("xlink:href","images/anim/wattmeter.svg")
*/
/*    base.append("svg:defs").selectAll("marker")
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
*/


		thermo_data = pt.open_anim.thermo_info[0]
   		base.append("rect")
			.attr("width" , thermo_data.w)
			.attr("height", thermo_data.h)
			.attr("x", thermo_data.x)
			.attr("y", thermo_data.y)
			.attr("class","thermorect");
}

 
pt.open_anim.set_stage = function(stage_label, number_of_lines, mid_point){

	var cur_lines = []
    middle_x = (pt.anim_const.end_point-pt.anim_const.start_point)/2.0 + pt.anim_const.start_point	
	for (var i=0; i<number_of_lines; i++) {

		
		var xval = pt.anim_const.start_point + 1.0*i*(pt.anim_const.end_point - pt.anim_const.start_point)/(number_of_lines-1);
		var mid_x = xval;
		r_name = i;
		if (mid_point)
		{    
			if (xval < middle_x )
			{
				mid_x = 100 - (xval-pt.anim_const.start_point)/3.5;
			}
			else {
				mid_x = 800 - (xval-pt.anim_const.end_point)/3.5;
				
			}
		}
	    if (xval > middle_x)
	    {  
	       r_name = i+4;
	    }
		var l1 = [[xval,pt.anim_const.high_y],[mid_x, pt.anim_const.mid_y], [xval,pt.anim_const.low_y]];
		var l_dic = {	r : r_name,
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
		var xval = (pt.anim_const.end_point - pt.anim_const.start_point)/2.0 + pt.anim_const.start_point;
		var mid_x = mids[i];
		var l1 = [[xval,pt.anim_const.high_y],[mid_x, pt.anim_const.mid_y], [xval,pt.anim_const.low_y]];
		var l_dic = {	r: i+4,
							data:l1
						};

		added_lines.push(l_dic);
	}
	pt.open_anim.lines[stage_label] = pt.open_anim.lines[stage_label].concat(added_lines);
}







pt.open_anim.lineFunction = d3.svg.line()
                    .x(function(d) { return d[0]; })
                    .y(function(d) { return d[1]; })
                    .interpolate("basis");

pt.open_anim.arrowFunction = d3.svg.line()
                    .x(function(d) { return d[0]; })
                    .y(function(d) { return d[1]; })
                    .interpolate("basis");

pt.open_anim.get_data = function(l) {    
    l
    .attr("d", function(d) { return pt.open_anim.lineFunction(d.data); })
    ;
    
};



pt.open_anim.get_arrow_data = function(l) {
    var current_frag = pt.open_anim.current_fragment;        
    var pi = 3.1415;
    var basex = 0;
    var basey = 380;
    var r =50;
    l
    .attr("d", function(d) { 
            angle = d.angle[current_frag+1] * pi / 180.0; 
    
            return pt.open_anim.arrowFunction([[basex,basey],[basex+r*Math.cos(angle),basey-r*Math.sin(angle)]]);
            
             })
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




pt.open_anim.get_defect_data = function(l) 
{
    var current_frag = pt.open_anim.current_fragment;
    var stage_to_color = {0: pt.anim_const.color_normal, 1:pt.anim_const.color_sc};

    l
        .attr("d", function(d) {console.log(pt.anim_const.defects[d.n][current_frag+1]); return pt.anim_const.defects[d.n]})
        .attr("fill", function(d) {console.log(stage_to_color[d.opt[current_frag+1]]);  return stage_to_color[d.opt[current_frag+1]];})
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



    var v_loc = pt.anim_const.vortex_loc
    pt.open_anim.set_stage(-1,8,false);
    pt.open_anim.set_stage(0,8,true);
    //pt.open_anim.set_stage(1,8,true);
    //pt.open_anim.add_to_stage(1,[v_loc[4]]);
    //pt.open_anim.set_stage(2,8,true);
    //pt.open_anim.add_to_stage(2,[v_loc[4],v_loc[0]]);
    //pt.open_anim.set_stage(3,8,true);
    //pt.open_anim.add_to_stage(3,[v_loc[4],v_loc[0] ,v_loc[6]]);
    //pt.open_anim.set_stage(4,8,true);
    //pt.open_anim.add_to_stage(4,[v_loc[4],v_loc[0] ,v_loc[6] ,v_loc[2]]);  
    pt.open_anim.set_stage(1,12,false);    


    
    pt.open_anim.svg = d3.select('.placeholder')
        .append('svg')
        .attr('width', pt.anim_const.tot_width)
        .attr('height', 500)
        .style('backgroudn','white');   
        
     pt.open_anim.add_svgs(pt.open_anim.svg);


};


pt.open_anim.update =  function(segment) {

    if (pt.open_anim.did_init == null)
    {
            pt.open_anim.init();
    }
    
    pt.open_anim.current_fragment = segment;
    var this_lines = pt.open_anim.lines[segment];

  /* pt.svg.append("path")
        .datum(thie_lines)
        .attr("class","line")
        .attr("d", pt.line)*/

var paths = pt.open_anim.svg
    .selectAll('path.line')
    // The unique key is the name.
    .data(this_lines, function(d) { return d.r; });

var defect_path = pt.open_anim.svg
    .selectAll('path.rectC')
    // The unique key is the name.
    .data(pt.open_anim.defects, function(d) { return d.n; });
    
defect_path
        .transition()
        .duration(750)
       .call(pt.open_anim.get_defect_data)
       
defect_path.enter()
       .append("path")
       .attr("class","rectC")
       .call(pt.open_anim.get_defect_data)

//var arrow_path = pt.open_anim.svg
//    .selectAll('path.arrow')
//     .data(pt.open_anim.arrow_angle, function(d) { return d.n; });

//arrow_path
//        .transition()
//        .duration(750)
//       .call(pt.open_anim.get_arrow_data)

//arrow_path.enter()
//       .append("path")
//       	.attr("marker-end","url(#mark)")
//    	.attr("stroke", "black")
//    	.attr("stroke-width", "2")
//    	.attr("class","arrow")
//       .call(pt.open_anim.get_arrow_data)       


              
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
    

    thermorect
        .transition()
    		.duration(750)
			.call(pt.open_anim.get_rect_data);
			    
};




