
var map, markers = [], lines = [], polyLines = [], enabled = true, ploygons = [
    JSON.parse('[{"lng":150.4522705078125,"lat":-33.61461929233377},{"lng":149.7156552734375,"lat":-33.12671169772343},{"lng":148.8037900390625,"lat":-33.66786765688115},{"lng":150.0342587890625,"lat":-34.35542542586771}]'),
    JSON.parse('[{"lng":147.76832416534413,"lat":-33.390046432930625},{"lng":146.39503314971913,"lat":-33.210989780810145},{"lng":145.44471576690663,"lat":-34.052533961582846},{"lng":147.51014545440663,"lat":-34.40225248432612}]'),
    JSON.parse('[{"lng":147.051470703125,"lat":-35.01116334604772},{"lng":145.39253515625,"lat":-35.038153626519566},{"lng":145.3321103515625,"lat":-36.11930041166771},{"lng":146.97456640625,"lat":-36.14591988023087}]'),
    JSON.parse('[{"lng":144.36911776217423,"lat":-33.734694690779214},{"lng":143.77585604342423,"lat":-33.35928490054962},{"lng":142.93540194186173,"lat":-33.42807923820041},{"lng":142.68271639498673,"lat":-33.83969924813456},{"lng":142.92990877779923,"lat":-34.47154254557323},{"lng":143.86374666842423,"lat":-34.47154254557323},{"lng":143.57810213717423,"lat":-34.00379543675406},{"lng":143.99008944186173,"lat":-33.76666622923415}]'),
    JSON.parse('[{"lng":144.24265910793088,"lat":-35.36991052899276},{"lng":143.42417766261838,"lat":-35.114186953010105},{"lng":143.41319133449338,"lat":-35.33406816575153},{"lng":143.86363078761838,"lat":-35.53100418272234},{"lng":143.04514934230588,"lat":-35.794320476543426},{"lng":143.55601360011838,"lat":-36.10560137828495},{"lng":144.12180949855588,"lat":-35.98123620812213},{"lng":144.21519328761838,"lat":-35.70069727786913}]')
], mapPolygons = [];
window.inPoly = function(lat, lng){
    for(poly in mapPolygons){
            var exists = google.maps.geometry.poly.containsLocation(
                new google.maps.LatLng(lat, lng),
                mapPolygons[poly]
            );
            found = exists;
            // var resultPath = exists ? : google.maps.SymbolPath.CIRCLE;
            if(exists){
                return true;
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
    for(ploygon in ploygons){
        var ploy = new google.maps.Polygon({
            paths: ploygons[ploygon],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        mapPolygons.push(ploy);
        ploy.setMap(map);
    }

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
            var bermudaTriangle = new google.maps.Polygon({
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
                var marker = new google.maps.Marker({
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
                var polyLine = new google.maps.Polyline({
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
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
                marker.addListener('click', () => markerClicked(marker));
                markers.push(marker);
                lines.push(pos);
            }
        });*/
}
