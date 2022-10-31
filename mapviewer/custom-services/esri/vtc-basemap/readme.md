# Benutzerdefinierte Dienste: Esri (Vector) Tiles

In ``portal.config`` wird gezeigt, welche ``Esri-Leaflet`` Scripts eingebunden werden müssen, 
um auf ESRI Dienste zugreifen zu können.

In der Datei ``my-vector-tiles.js`` (die ebenfalls über die ``portal.config`` in die Karte eingebunden wird)
wird der Dienst erzeugt und in die Karte eingefügt:

```
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
```

Ist der Viewer fertig aufgebaut (``viewer-map-createed``) wird der Dienst als aktiver Basemap Hintergrund 
festgelegt.

