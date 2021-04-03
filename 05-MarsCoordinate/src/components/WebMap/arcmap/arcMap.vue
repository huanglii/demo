<template>
  <div id="arcmap" class="map"></div>
</template>

<script>
import markerPng from '@/assets/marker.png'
import esriLoader from 'esri-loader'
export default {
  name: 'wm-arcmap',
  props: {
    center: {
      type: Array,
      default: () => [0, 0],
      validator: value => value.length === 2,
    },
    zoom: {
      type: Number,
      default: 10,
    },
  },
  watch: {
    center (value) {
      // this.map.setCenter(value)
    },
    zoom (value) {
      // this.map.setZoom(value)
      this.view.zoom = value
    },
  },
  data () {
    return {
      map: undefined,
      view: undefined,
      marker: undefined,
      centerPoint: undefined
    }
  },
  methods: {
    initMap(){
      esriLoader.loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic'])
      .then(([Map, MapView, Graphic]) => {
        this.map = new Map({
          basemap: 'hybrid'
        });
        this.view = new MapView({
          map: this.map,
          container: 'arcmap',
          center: this.center,
          zoom: this.zoom
        });
        // point
        var point = {
          type: 'point',
          longitude: this.center[0],
          latitude: this.center[1]
        }
        var markerSymbol = {
          type: 'picture-marker',  // autocasts as new PictureMarkerSymbol()
          url: markerPng,
          width: '32px',
          height: '32px',
          xoffset: '0px',
          yoffset: '16px'
        }
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol
        })
        this.view.graphics.add(pointGraphic)
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<style lang="less" scoped>
  @import url('https://js.arcgis.com/4.8/esri/css/main.css');
</style>
