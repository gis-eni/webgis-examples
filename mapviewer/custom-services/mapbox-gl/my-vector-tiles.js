(function() {
    let _firstCustomService;

    webgis.events.on('after-map-add-services', function (channel, sender, map) {

        _firstCustomService = map.addCustomService({
            name: 'VTC OSM Bright',
            frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/osm-bright/style.json'}),
            isBasemap: true,
            fallback: 'vtc_fallback_osm_bright@custom',
            previewImageUrl: 'http://my-vector-tile-server/services/wmts/1.0.0/osm-bright/default/1x/16/22834/35141.png'
        });

        map.addCustomService({
            name: 'VTC Dark Matter',
            frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/dark-matter/style.json'}),
            isBasemap: true,
            previewImageUrl: 'http://my-vector-tile-server/services/wmts/1.0.0/dark-matter/default/1x/16/22834/35141.png'
        });

        map.addCustomService({
            name: 'VTC Klokantech',
            frameworkElement: L.mapboxGL({style: 'http://my-vector-tile-server/styles/klokantech-basic/style.json'}),
            isBasemap: true,
            fallback: 'geoland_bm@default',
            previewImageUrl: 'http://my-vector-tile-server/services/wmts/1.0.0/klokantech-basic/default/1x/16/22834/35141.png'
        });
    });

    webgis.events.on('viewer-map-created', function(channel, sender, map) {
        if(_firstCustomService) {
            // turn off overlay basemaps (null => turn off, true => the overlay basemap)
            map.setBasemap(null, true);
            // show first custom base service
            map.setBasemap(_firstCustomService.id, false);
        }
    });
}());