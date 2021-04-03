import mapboxgl from 'mapbox-gl';
import CitySelectorControl  from 'city-selector-control';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'city-selector-control/style.css';

import token from './access.token.js';
mapboxgl.accessToken = token;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [110.137343, 38.137451],
  zoom: 5
});

map.addControl(new CitySelectorControl ({
  theme: 'dark',
  placeholder: '全 国'
}), 'top-right');
