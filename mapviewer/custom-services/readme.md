# Benutzerdefinierte Dienste im MapViewer

Bei benutzerdefinierten Diensten handelt es sich um (Leaflet) Plugins, die es ermöglichen, Karteninhalte
im Viewer einzubinden, die nicht im Lieferumfang von WebGIS enthalten sind.

**Achtung:** Es kann nicht garantiert werden, dass jedes Plugin fehlerfei mit WebGIS funktioniert.
Es gibt daher für diese Art von benutzerdefinierte Dienste **keinen Support**!

Um benuterdefinierte Dienste einzubinden sind in der Regel zwei Dinge notwendig:

* In portal.config wird eingetragen, welche zusätzlichen Javascript und CSS Dateien in eine Karte eingebunden werden

* In einer dieser Javascript Dateien (optional auch in der custom.js) werden dann die Plugins erstellt und in die
Karte eingefügt. Dazu konnen spezielle *WebGIS-Events* verwendet werden, zb ``before-map-add-services``, ``after-map-add-services``, ``viewer-map-created``

## portal.config

Hier wird eine neue Section eingefügt in der die die Keys ``add-css`` bzw. ``add-js`` für alle Karten oder 
für eine spezielle Karte angeführt werden.

```Xml
<section name="map:_all">  <!-- map:_all .. in alle Karte laden. map:Basis und Kataster ... in ein eine spezielle Karte, Groß/Kleischreibung beachten -->
    <add key="add-css" value="css files mit Beistrich getrennt" />   <!-- optional -->
    <add key="add-js" value="Javascript Files mit Beistrich getrennt" />
</section> 
```

## Javascript

Der Aufbau er Javascript Datei, die für das aufbauen der Services zuständig ist, kann in etwa wie folgt aufgebaut werden:

```Javascript
(function() {
    let _myBasemapService;

    // before first services is added to map (alternative: after-map-add-services)
    webgis.events.on('before-map-add-services', function (channel, sender, map) {
        _myBasemapService = map.addCustomService({ ... });
    });

    // if map viewer is loaded, set my services as visible basemap
    webgis.events.on('viewer-map-created', function(channel, sender, map) {
        if(_myBasemapService) {
            // turn off overlay basemaps (null => turn off, true => the overlay basemap)
            map.setBasemap(null, true);
            // show first custom base service
            map.setBasemap(_myBasemapService.id, false);
        }
    });
}());
```

In den hier angeführten Unterordneren finden sich Beispiele für ``portal.config`` und 
Javascript zum einfügen von benutzerdefinierten Dienste. 