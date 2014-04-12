require(["esri/map", "dojo/domReady!"],function(Map){
   var map = new Map("map", {
      center: [30.2831529,-97.7447276],
      zoom: 3,
      basemap: "topo"
    });
});