(function ($, Configuration) {
    var useTab = Configuration.tab;
    var referenceUrl = Configuration.url;
    var confId = Configuration.id;
    var fileId = Configuration.fileid;

    $(useTab).append('<link rel="stylesheet" type="text/css" href="/assets/javascripts/previewers/examples/stylesheet/3dhop.css">');

    var scripts = ["spidergl.js", "presenter.js", "nexus.js", "ply.js", "trackball_sphere.js",
                   "trackball_turntable.js", "trackball_turntable_pan.js", "trackball_pantilt.js"];

    for (index = 0; index < scripts.length; index++) 
    {
      //alert(index);

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = Configuration.previewer +  "/examples/js/" + scripts[index];
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
       style: 'background-image: url("/assets/javascripts/previewers/examples/skins/backgrounds/light.jpg")'
    }));


    $(useTab).append("HELLOOOOOOOOOOOOOOOOOOOOO");  

    setup3dhop();     

    $(useTab).append("HELLOOOOOOOOOOOOOOOOOOOOO");  

    var presenter = null;

    function setup3dhop() {
    presenter = new Presenter("draw-canvas");


    alert("Before");

   //presenter.setScene({});
        //      meshes: {
          //            "mesh_1" : { url: "/assets/javascripts/previewers/examples/models/gargo.nxz" }
            //  },
      //        modelInstances : {
       //              "instance_1" : { mesh : "mesh_1" }
       //       }
     // });
      
    
    alert("After");
    }




}(jQuery, Configuration));
