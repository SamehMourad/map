var map, mapPolygons = [], ready = false;

function init(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://server:8080/areas');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            polygons = JSON.parse(xhr.responseText);
            ready = true;
            initMap();
        }
    }
    xhr.send();
}

function inPoly(lat, lng){
    for(poly in mapPolygons){
            var exists = google.maps.geometry.poly.containsLocation(
                new google.maps.LatLng(lat, lng),
                mapPolygons[poly]
            );
            // var resultPath = exists ? : google.server.SymbolPath.CIRCLE;
            if(exists){
                const area = mapPolygons[poly].area
                return {'id': area.id,'name': area.name};
                break;
            }
        }
    return false;
}
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    for(polygon in polygons){
        var poly = new google.maps.Polygon({
            paths: polygons[polygon].points,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        poly.area = polygons[polygon];
        mapPolygons.push(poly);
        poly.addListener('click', function(e){
            console.log({lat: e.latLng.lat(), lng: e.latLng.lng()});
        })
        poly.setMap(map);
        // console.log(poly);
    }
    map.addListener('click', function(e){
        console.log(e);
    })

    /*map.addListener('click', function (e) {
        function markerClicked(marker){
            if(!enabled) return;
            const index = markers.findIndex(mk => mk === marker);
            if(markers.length < 3 || index > 0) return;
            var last = markers[markers.length - 1];
            const markerLine = [
                {'lng': marker.position.lng(), 'lat': marker.position.lat()},
                {'lng': last.position.lng(), 'lat': last.position.lat()}
            ];
            var bermudaTriangle = new google.server.Polygon({
                paths: lines,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                editable: true
            });
            for(poly in polyLines){
                polyLines[poly].setMap(null);
            }
            for(marker in markers){
                markers[marker].setMap(null);
            }
            enabled = false;
            bermudaTriangle.setMap(map);
        }
            var pos = {'lng': e.latLng.lng(), 'lat': e.latLng.lat()};
            if (markers.length) {
                if(!enabled) return;
                var last = markers[markers.length - 1];
                var marker = new google.server.Marker({
                    position: pos,
                    map: map
                });
                marker.addListener('click', () => markerClicked(marker));
                markers.push(marker);

                var lastPos = {'lng': last.position.lng(), 'lat': last.position.lat()}
                var line = [
                    pos,
                    lastPos
                ];
                var polyLine = new google.server.Polyline({
                    path: line,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                polyLine.setMap(map);
                polyLines.push(polyLine)
                lines.push(pos);
            } else {
                var marker = new google.server.Marker({
                    position: pos,
                    map: map
                });
                marker.addListener('click', () => markerClicked(marker));
                markers.push(marker);
                lines.push(pos);
            }
        });*/
}