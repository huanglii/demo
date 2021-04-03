<template>
  <div :id="option.id" class="map"></div>
</template>

<script>
import markerPng from '@/assets/marker.png'
import markerPng1 from '@/assets/marker1.png'
import {Map, View} from 'ol'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource, OSM, BingMaps, XYZ} from 'ol/source'
import {fromLonLat} from 'ol/proj'
import Feature from 'ol/Feature'
import {Point} from 'ol/geom'
import {Icon, Style} from 'ol/style'
export default {
  name: 'wm-omap',
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
    option: {
      type: Object
    }
  },
  watch: {
    center (value) {
      this.view.setCenter(new Point(fromLonLat(value)))
    },
    zoom (value) {
      this.view.setZoom(value)
    },
  },
  data () {
    return {
      map: undefined,
      view: undefined
    }
  },
  methods: {
    initMap(){
      // icon
      let iconFeature = new Feature({
        geometry: new Point(fromLonLat(this.center))
      })
      let iconStyle = new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
          anchor: [0.5, 32],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: markerPng
        }))
      })
      iconFeature.setStyle(iconStyle)
      // view
      this.view = new View({
        center: fromLonLat(this.center),
        zoom: this.zoom
      })
      // source
      const source = {
        bing: new BingMaps({
          key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
          imagerySet: 'Aerial'
        }),
        geoq: new XYZ({
          url: 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
        })
      }
      let vectorSource = new VectorSource({
        features: [iconFeature]
      })
      this.map = new Map({
        target: this.option.id,
        layers: [
          new TileLayer({
            preload: Infinity,
            source: source[this.option.type]
          }),
          new VectorLayer({
            source: vectorSource
          })
        ],
        view: this.view
      })
      if(this.option.type === 'geoq') {
        let p1 = this.center
        let p2 = this.$coordtransform.wgs84togcj02(p1[0], p1[1])
        let iconFeature1 = new Feature({
          geometry: new Point(fromLonLat(p2))
        })
        let iconStyle1 = new Style({
          image: new Icon(({
            anchor: [0.5, 32],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: markerPng1
          }))
        })
        iconFeature1.setStyle(iconStyle1)
        vectorSource.addFeature(iconFeature1)
        let c = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
        this.view.setCenter(fromLonLat(c))
      }
    }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<style lang="less" scoped>
  @import 'ol/ol.css';
</style>
