/* global d3 */

var pt = pt || {};

pt.slideIdToFunctions = {
  'example-loop-remove-result': {
    'init': function() {
      'use strict';
      pt.exampleLoop.init();
    },
    '-1': function() {
      'use strict';
      d3.json('../examples/data/example-2000.json', pt.exampleLoop.update);
    },
    0: function() {
      'use strict';
      d3.json('../examples/data/example-2005.json', pt.exampleLoop.update);
    }
  },

  'example-bind-result': {
    'init': function() {
      'use strict';
      pt.exampleBind.init();
    },
    '-1': function() {
      'use strict';
      d3.json('../examples/data/example-2000.json', pt.exampleBind.update);
    },
    0: function() {
      'use strict';
      d3.json('../examples/data/example-2005.json', pt.exampleBind.update);
    }
  },

  'pm' : {
     "init" : function () {},
     "update" : function(currentSlideId, currentFragment)  {
           switch(currentFragment)
           {
                case 0:
                    zoom.to({ element: document.getElementById("pmA"), pan: true });
                    console.log(document.getElementById("pmA"))
                    break;
                 case 1: 
                    zoom.out();
                    break;                    
                case 2:
                    zoom.out();
                    zoom.to({ element: document.getElementById("pmB"), pan: false })                    
                    break;
                 case 3:
                    zoom.out();
                    break;
                case 4:
                    zoom.to({ element: document.getElementById("pmC"), pan: false });
                    break;                
                 case 5:
                    zoom.out();
                    break;    
                  
           }
     },
    "out": function() {
        zoom.reset();
    }
  }, 
  'xy_models': {
    "init" :  function() {},
    "update": function(currentSlideId, currentFragment) {
            pt.switch_parts.update("fxy",currentSlideId, currentFragment,3);
        }   
  },
  
    'kt_info': {
    "init" :  function() {},
    "update": function(currentSlideId, currentFragment) {
            pt.switch_parts.update("ktres",currentSlideId, currentFragment,4);
        }   
  },  
  
    
    'firabove_info': {
    "init" :  function() {},
    "update": function(currentSlideId, currentFragment) {
            pt.switch_parts.update("fitabove",currentSlideId, currentFragment,6);
        }   
  }, 
      'KTtrans': {
    "init" :  function() {},
    "update": function(currentSlideId, currentFragment) {
            pt.switch_parts.update("KTtrans",currentSlideId, currentFragment,2);
        }   
  }, 
    'Decimation': {
    "init" :  function() {},
    "update": function(currentSlideId, currentFragment) {
            if (current_Fragment=-1)
            {
                pt.switch_parts.show_first("decimation",currentSlideId, currentFragment,2);
                    
            };
            if (currentFragment>1)
            {
                pt.switch_parts.update("decimation",currentSlideId, currentFragment,2);
             };
        }   
  }, 
    'open_anim': {
    "init" :  function() {
            pt.open_anim.init();
           },        
    "update": function(currentSlideId, currentFragment) {     
                   
            pt.open_anim.update(currentFragment);
        }   
  },
    'close_anim': {
    "init" :  function() {
            pt.close_anim.init();
           },        
    "update": function(currentSlideId, currentFragment) {     
                   
            pt.close_anim.update(currentFragment);
        }   
  }
    
};
