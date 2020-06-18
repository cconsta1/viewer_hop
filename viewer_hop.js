(function ($, Configuration) {
    var useTab = Configuration.tab;
    var referenceUrl = Configuration.url;
    var confId = Configuration.id;
    var fileId = Configuration.fileid;

    $(useTab).append('<link rel="stylesheet" type="text/css" href="/assets/javascripts/previewers/examples/stylesheet/3dhop.css">');

    var scripts = ["corto.js", "nexus.js", "trackball_pantilt.js", "trackball_turntable_pan.js", 
                   "trackball_rail.js", "trackball_sphere.js", "meco.js", "trackball_turntable.js", 
                   "ply.js", "spidergl.js", "presenter.js", "init.js", "jquery.js"];

   for (index = 0; index < scripts.length; index++) 
    {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = Configuration.previewer +  "/examples/js/" + scripts[index];
      $(useTab).append(s);
    }

   $(useTab).append( "1st loaded jQuery version ($): " + $.fn.jquery + "<br>" );

   $(useTab).append('<script>var $oldjQuery = $.noConflict(true);</script>')               

   $(useTab).append( "2nd loaded jQuery version ($): " + $oldjQuery.fn.jquery + "<br>" );

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
       style: 'background-image: url("/assets/javascripts/previewers/examples/skins/backgrounds/light.jpg")'
    }));

  /*  document.write( '<script type=\"text/javascript\">\n' );
    document.write( 'var presenter = null;\n' );
    document.write( '\n' );
    document.write( 'function setup3dhop() { \n' );
    document.write( '	presenter = new Presenter(\"draw-canvas\");\n' );
    document.write( '\n' );
    document.write( '	presenter.setScene({\n' );
    document.write( '		meshes: {\n' );
    document.write( '			\"Gargoyle\" : { url: \"/assets/javascripts/previewers/examples/models/singleres/gargo.ply\" }\n' );
    document.write( '		},\n' );
    document.write( '		modelInstances : {\n' );
    document.write( '			\"Model1\" : { mesh : \"Gargoyle\" }\n' );
    document.write( '}\n' );
    document.write( '});\n' );
    document.write( '}\n' );
    document.write( '\n' );
    document.write( '$oldjQuery(document).ready(function(){\n' );
    document.write( 'init3dhop();\n' );
    document.write( '\n' );
    document.write( 'setup3dhop();\n' );
    document.write( '});\n' );
    document.write( '</script>' );
*/

    
    $(useTab).append("<script type='text/javascript'>" +    
      "var presenter = null;" +

      "function setup3dhop() {" +
      "presenter = new Presenter('draw-canvas');" + 

      "presenter.setScene({" +
     		"meshes: {" +
			"'Gargoyle' : { url: '/assets/javascripts/previewers/examples/models/singleres/gargo.ply' }" +
		"}" +
	"});" +

       "}" +

       "$oldjQuery(document).ready(function($oldjQuery){" +                                                                                      
         "init3dhop();" +                                                                                              
         "setup3dhop();" +                                                                                             
         "resizeCanvas(600,600);" +
        "});" +   
      
       "</script>");

}(jQuery, Configuration));
