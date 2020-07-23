(function ($, Configuration) {
    var useTab = Configuration.tab;
    var referenceUrl = Configuration.url;
    var confId = Configuration.id;
    var fileId = Configuration.fileid;

    // print all attributes of Configuration object

    /*for (const property in Configuration) 
    {
      alert(`${property}: ${Configuration[property]}`);
    }*/

    // add 3dhop.css to previewer

    $(useTab).append('<link rel="stylesheet" type="text/css" href="/assets/javascripts/previewers/hop/stylesheet/3dhop.css">');

    // scripts  holds all the  3dhop files

    var scripts = ["spidergl.js", "presenter.js", "nexus.js", "ply.js", "trackball_sphere.js",
                   "trackball_turntable.js", "trackball_turntable_pan.js", "trackball_pantilt.js", "init.js"];

    // load 3dhop into the current tab

    for (index = 0; index < scripts.length; index++) 
    {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = Configuration.previewer +  "/hop/js/" + scripts[index];
      $(useTab).append(s);
    }

   // load various 3dhop attributes (such as the background image) for 3dhop

   $(useTab).append($('<div/>', {
        id: '3dhop',
        class: 'tdhop',
        onmousedown: 'if (event.preventDefault) event.preventDefault()'
    }));

   $('.tdhop').append($('<div/>', {                                                                                                                                                                            
        id: 'tdhlg'                                                                                                                                      
    })); 


   $('.tdhop').append($('<div/>', {                                                                           
        id: 'toolbar'                                                                                          
    }));

   $("#toolbar").append("<img id='home' title='Home'  src='/assets/javascripts/previewers/hop/skins/dark/home.png'/><br/>");
   $("#toolbar").append("<img id='zoomin' title='Zoom In'  src='/assets/javascripts/previewers/hop/skins/dark/zoomin.png'/><br/>");
   $("#toolbar").append("<img id='zoomout' title='Zoom Out'  src='/assets/javascripts/previewers/hop/skins/dark/zoomout.png'/><br/>");
   $("#toolbar").append("<img id='light_on' title='Disable Light Control'  src='/assets/javascripts/previewers/hop/skins/dark/lightcontrol_on.png' style='position:absolute; visibility:hidden;'/>");   
   $("#toolbar").append("<img id='light' title='Enable Light Control'  src='/assets/javascripts/previewers/hop/skins/dark/lightcontrol.png'/><br/>");
   $("#toolbar").append("<img id='measure' title='Enable Measuring Tool'  src='/assets/javascripts/previewers/hop/skins/dark/measure.png'/><br/>"); 
   $("#toolbar").append("<img id='full_on' title='Exit Full Screen'  src='/assets/javascripts/previewers/hop/skins/dark/full_on.png' style='position:absolute; visibility:hidden;'/>");
   $("#toolbar").append("<img id='full' title='Full Screen'  src='/assets/javascripts/previewers/hop/skins/dark/full.png'/>"); 

   $('.tdhop').append($('<canvas/>', {
       id: 'draw-canvas',
       style: 'background-image: url("/assets/javascripts/previewers/hop/skins/backgrounds/light.jpg")'
   }));

   $(document).ready(function(){
	init3dhop();

	setup3dhop(referenceUrl);

        resizeCanvas(640,480); 

        moveToolbar(20,20);
    });
  
}(jQuery, Configuration));

var presenter = null;
 
function setup3dhop(address) {      
        presenter = new Presenter("draw-canvas");
 
        presenter.setScene({
                meshes: {
                        "mesh_1" : {                             
                                     url: address, 
                                     mType: "ply"
                                   }                      
                },                                        
                modelInstances : {                        
                        "instance_1" : { mesh : "mesh_1" }
                }
        });  
}

function actionsToolbar(action) {
	if(action=='home') presenter.resetTrackball(); 
	else if(action=='zoomin') presenter.zoomIn();
	else if(action=='zoomout') presenter.zoomOut(); 
	else if(action=='light' || action=='light_on') { presenter.enableLightTrackball(!presenter.isLightTrackballEnabled()); lightSwitch(); } 
	else if(action=='full'  || action=='full_on') fullscreenSwitch(); 
}
