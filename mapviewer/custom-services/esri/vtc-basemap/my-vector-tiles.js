(function() {
    let _customService;

    webgis.events.on('before-map-add-services', function (channel, sender, map) {
        _customService = map.addCustomService({
            name: 'ESRI Basemap Topo',
            frameworkElement: L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', {
                apikey: 'esri-api-key'
            }),
            isBasemap: true
        }); 

        map.setBasemap(customService.id);
    });

    webgis.events.on('viewer-map-created', function(channel, sender, map) {
        map.setBasemap(_customService.id);
    });
}());