webgis.events.on('viewer-map-created', function (channel, sender, map) {

    var customService = map.addCustomService({
        name: 'ESRI Basemap Topo',
        frameworkElement: L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', {
            apikey: 'esri-api-key'
        }),
        isBasemap: true
    }); 

    map.setBasemap(customService.id);
});