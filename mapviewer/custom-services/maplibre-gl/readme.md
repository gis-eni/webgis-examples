# Benutzerdefinierte Dienste: Maplibre Vector Tiles

In ``portal.config`` wird gezeigt, welche ``maplibre`` Scripts eingebunden werden müssen, 
um auf Vector Tilecaches zugreifen zu können.

In der Datei ``my-vector-tiles.js`` (die ebenfalls über die ``portal.config`` in die Karte eingebunden wird)
wird der Dienst erzeugt und in die Karte eingefügt:

```Javascript
(function() {
    let _firstCustomService;

    webgis.events.on('before-map-add-services', function (channel, sender, map) {

        _firstCustomService = map.addCustomService({
            name: 'VTC OSM Bright',
            frameworkElement: L.maplibreGL({style: 'http://localhost:8080/styles/osm-bright/style.json'}),
            isBasemap: true,
            fallback: 'vtc_fallback_osm_bright@custom',
            previewImageUrl: 'http://my-vector-tile-server/services/wmts/1.0.0/osm-bright/default/1x/16/22834/35141.png',
            onAdd: function(map, frameworkElement) {
                frameworkElement._update();
            }
        });

        map.addCustomService({
            ...
        });

        map.addCustomService({
            ...
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
```

Hier werden drei Basemap-Dienste eingebunden (vor allen anderen Kartendiensten => ``before-map-add-services``).
Ist die Karte im Viewer fertig aufgebaut (``viewer-map-created``), wir der erste Dienst sichtbar geschalten.

Der ``map.addCustomService`` Funktion werden folgende Werte übergeben:

* ``mame``: Der Name des Dienstes (scheint in der Basemap-Kachel auf)

* ``frameworkElement``: hier wird das eigentliche ``Leaflet-Layer`` Objekt erzeugt und übergeben

* ``isBasemap`` (optional): Beim Layer (Dienst) handelt es sich um eine Basemap

* ``fallback`` (optional): Prozesse die im WebGIS serverseitig laufen (zB Drucken), sehen benutzerdefinierten Dienste nicht. Diese existieren nur am Client. Ein Vector Tile Cache kann somit nicht gedruckt werden. Für diesen Fall kann hier ein beliebiger Dienst aus einem WebGIS CMS als *Fallback* verwendet werden. Dieser wird dann beispielsweise anstelle des VTC gedruckt. Dieser *Fallback-Dienst* muss sich zwingend in der aktuellen Karte befinden.

* ``previewImageUrl`` (optional): Hier kann die Url zu einem Bild angegeben werden, das in der Viewer-Oberfläche als Basemap-Kachel dargestellt wird.

* ``onAdd`` (optional): Hier kann eine Funktion angegeben werden, die aufgerufen wird, wenn der Basemap Dienst sichtbar geschalten wird. Bei den *Maplibre-Leaflet* Layer tritt das Problem auf, dass ein Dienst bei mehrmaligen
umschalten wieder auf der letzten Position angezeigt wird. Dies konnte um Zeitpunkt des Testens mit der Funktion ``frameworkElement._update()`` gelöst werden.