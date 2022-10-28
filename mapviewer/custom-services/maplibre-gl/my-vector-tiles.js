webgis.events.on('viewer-map-created', function (channel, sender, map) {

    var activeService = map.addCustomService({
        name: 'VTC OSM Bright',
        frameworkElement: L.maplibreGL({style: 'http://localhost:8080/styles/osm-bright/style.json'}),
        isBasemap: true
    });

    map.addCustomService({
        name: 'VTC Dark Matter',
        frameworkElement: L.maplibreGL({style: 'http://localhost:8080/styles/dark-matter/style.json'}),
        isBasemap: true
    });

    map.addCustomService({
        name: 'VTC Klokantech',
        frameworkElement: L.maplibreGL({style: 'http://localhost:8080/styles/klokantech-basic/style.json'}),
        isBasemap: true
    });

    map.setBasemap(null, true);        // turn off overlay basemaps (null => turn off, true => the overlay basemap)
    map.setBasemap(activeService.id);  // show first custom

});