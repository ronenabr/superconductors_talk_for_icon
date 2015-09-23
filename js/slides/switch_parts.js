var pt = pt || {};

pt.switch_parts = pt.switch_parts || {};

pt.switch_parts.update = function(prefix,currentSlideId, frugment_id,max_frugments) {
    var current_frugment = prefix + frugment_id;
    if (frugment_id==-1)
	{
        for (var i=-1; i<max_frugments; i++)
        {
              var current_name = prefix + i;
              elem = document.getElementById(current_name);
              if (elem == null)
              {
                  continue;
              }
              
                 
                elem.style.display="block";
                return 0;
              

        }

	
	}
    for (var i=-1; i<max_frugments; i++)
    {
          var current_name = prefix + i;
          elem = document.getElementById(current_name);
          if (elem == null)
          {
              continue;
          }
          if (!(current_name == current_frugment))
          {          
            elem.style.display="none";
          }
          else {
               elem.style.display="block";
          }
    }
    

};

pt.switch_parts.show_first = function(prefix,currentSlideId, frugment_id,max_frugments) {
    var current_frugment = prefix + -1;
          elem = document.getElementById(current_frugment);
          elem.style.display="block";
          

    
    

};

	
