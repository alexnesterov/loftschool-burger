ymaps.ready(init);
  var myMap,
      myPlacemark;

  function init(){
    myMap = new ymaps.Map("map", {
      center: [59.938183,30.333675],
      zoom: 12,
      controls: ['zoomControl']
    });

    var coords = [
        [59.929482,30.305350],
        [59.899148,30.283673],
        [59.921218,30.452244],
        [59.964272,30.304320]
    ],
        myCollection = new ymaps.GeoObjectCollection();
    // или myCollection = new ymaps.GeoObjectArray(...);

    for (var i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/images/icons/map-marker.svg',
        iconImageSize: [46, 58]
      }));
    }

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
  }
