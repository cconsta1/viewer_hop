(function ($, Configuration) {
    var useTab = Configuration.tab;
    var referenceUrl = Configuration.url;
    var confId = Configuration.id;
    var fileId = Configuration.fileid;

    for (const property in Configuration) 
    {
      alert(`${property}: ${Configuration[property]}`);
    }

    $(useTab).append('<link rel="stylesheet" type="text/css" href="/assets/javascripts/previewers/hop/stylesheet/3dhop.css">');

    var scripts = ["spidergl.js", "presenter.js", "nexus.js", "ply.js", "trackball_sphere.js",
                   "trackball_turntable.js", "trackball_turntable_pan.js", "trackball_pantilt.js", "init.js"];

    for (index = 0; index < scripts.length; index++) 
    {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = Configuration.previewer +  "/hop/js/" + scripts[index];
      $(useTab).append(s);
    }

   $(useTab).append($('<div/>', {
        id: '3dhop',
        class: 'tdhop',
        onmousedown: 'if (event.preventDefault) event.preventDefault()'
    }));

   $('.tdhop').append($('<div/>', {                                                                                                                                                                            
        id: 'tdhlg'                                                                                                                                      
    })); 

    $('.tdhop').append($('<canvas/>', {
       id: 'draw-canvas',
       style: 'background-image: url("/assets/javascripts/previewers/hop/skins/backgrounds/light.jpg")'
    }));
 
    $(useTab).append('<script> \n' +
    'var presenter = null; \n \n' +

    'function setup3dhop() { \n' +
	 'presenter = new Presenter("draw-canvas");  \n' +

	  'presenter.setScene({ \n' +

		  'meshes: { \n' +
			  "\"mesh_1\" : { url: " + "\"" + referenceUrl + "\"" + "} \n" +
		  '}, \n' +
		  'modelInstances : { \n' +
			  '"instance_1" : { mesh : "mesh_1" } \n' +
		  '} \n' +
	  '}); \n' +
    '}; \n' + 

    'init3dhop(); \n' +
  
    'setup3dhop(); \n' +

    'resizeCanvas(640,480); \n' +

    'document.getElementById(\'draw-canvas\').setAttribute(\'width\', document.body.clientWidth); \n' +
    'document.getElementById(\'draw-canvas\').setAttribute(\'height\', document.body.clientHeight); \n' +
    '</script>'
    );
  
}(jQuery, Configuration));
