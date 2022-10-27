webgis.events.on('viewer-map-created', function (channel, sender, map) {

    var activeService = map.addCustomService({
        name: 'VTC OSM Bright',
        frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/osm-bright/style.json'}),
        isBasemap: true
    });

    map.addCustomService({
        name: 'VTC Dark Matter',
        frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/dark-matter/style.json'}),
        isBasemap: true
    });

    map.addCustomService({
        name: 'VTC Positron',
        frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/klokantech-basic/style.json'}),
        isBasemap: true
    });

    map.setBasemap(null, true);        // turn off overlay basemaps (null => turn off, true => the overlay basemap)
    map.setBasemap(activeService.id);  // show first custom 
});