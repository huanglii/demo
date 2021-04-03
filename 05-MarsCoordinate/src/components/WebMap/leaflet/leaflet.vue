<template>
  <div :id="option.id" class="map">123</div>
</template>

<script>
import markerPng from '@/assets/marker.png'
import markerPng1 from '@/assets/marker1.png'
import L from 'leaflet'
export default {
  name: 'wm-leaflet',
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
    name: {
      type: String,
      default: 'leaflet'
    },
    option: {
      type: Object
    }
  },
  watch: {
    center (value) {
      this.map.setView(value[1], value[0], this.zoom)
    },
    zoom (value) {
      this.map.setZoom(value)
    },
  },
  data () {
    return {
      map: undefined
    }
  },
  methods: {
    initMap() {
      // WGS84
      let p1 = this.center
      this.centerPoint = L.latLng(p1[1], p1[0])
      // map
      this.map = L.map(this.option.id).setView(this.centerPoint, this.zoom)
      const mapType = {
        mapbox: {
          url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          attr: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        },
        gmap: {
          // url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          url: 'http://mt2.google.cn/vt/lyrs=s&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
          // url: 'http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0', // 腾讯
          // attr: '<img src="https://webapi.amap.com/theme/v1.3/autonavi.png" data-spm-anchor-id="0.0.0.i0.42e51c4eQXeFfe">'
          attr: '<span jstcache="185" class=" fineprint-item fineprint-padded fineprint-copyrights" style="" id="fineprint-copyrights" jsan="7.fineprint-item,7.fineprint-padded,7.fineprint-copyrights,0.id">图像 © 2018 CNES / Airbus，DigitalGlobe，地图数据 © 2018 Google</span><span jstcache="195" class="fineprint-item fineprint-padded" jsan="7.fineprint-item,7.fineprint-padded">中国</span><a id="fineprint-terms" href="javascript:void(0)" jsaction="fineprint.terms" class="fineprint-item fineprint-padded noprint">使用条款</a>'
        },
        tdt: {
          // url: 'http://t2.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}',
          url: 'http://t0.tianditu.gov.cn/DataServer?T=img_w&tk={tk}&x={x}&y={y}&l={z}',
          attr: '<img style="background-color:transparent;background-image:url(http://api.tianditu.gov.cn/v4.0/image/logo.png);filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image,src=http://api.tianditu.gov.cn/v4.0/image/logo.png);MozOpacity:1;opacity:1;" src="http://api.tianditu.gov.cn/v4.0/image/logo.png" width="53px" height="22px" opacity="0"><span style="display:inline;position:relative;bottom:4px;white-space:nowrap;padding:0 0 0 3px;">GS(2018)1432号 - 甲测资字1100471</span>'
        }
      }
      L.tileLayer(mapType[this.option.type].url, {
        attribution: mapType[this.option.type].attr,
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiaHVhbmdsaWkiLCJhIjoiY2pzNHBtendwMDZ2ZDQzbnVmZXdtMDlvdiJ9.GSija86yNNR4ssBtFFpx0g',
        tk: '98390210b003e812656026ef694bbbee'
      }).addTo(this.map)

      // marker
      let icon = L.icon({
        iconUrl: markerPng,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })
      L.marker(this.centerPoint, {icon: icon}).addTo(this.map)
      if(this.option.type === 'gmap') {
        // GCJ02
        let p2 = this.$coordtransform.wgs84togcj02(p1[0], p1[1])
        // marker
        let icon1 = L.icon({
          iconUrl: markerPng1,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
        L.marker(L.latLng(p2[1], p2[0]), {icon: icon1}).addTo(this.map)
        let c = L.latLng((p1[1] + p2[1]) / 2, (p1[0] + p2[0]) / 2)
        this.map.setView(c, this.zoom)
      }

      this.map.on('click', function(e) {
        console.log(e);
        alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      })
    }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<style lang="less" scoped>
  @import url('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
</style>
