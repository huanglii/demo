<template>
  <div id="bmap" class="map"></div>
</template>

<script>
import markerPng from '@/assets/marker.png'
import markerPng1 from '@/assets/marker1.png'
export default {
  name: 'wm-bmap',
  props: {
    center: {
      type: Array,
      default: () => [0, 0],
      validator: value => value.length === 2,
    },
    zoom: {
      type: Number,
      default: 10,
    }
  },
  watch: {
    center (value) {
      this.map.setCenter(new BMap.Point(value[0], value[1]))
    },
    zoom (value) {
      this.map.setZoom(value)
    },
  },
  data () {
    return {
      map: undefined,
      marker: undefined,
      centerPoint: undefined
    }
  },
  methods: {
    initMap() {
      // WGS84
      let p1 = this.center
      // GCJ02
      let p2_0 = this.$coordtransform.wgs84togcj02(this.center[0], this.center[1])
      let p2 = this.$coordtransform.gcj02tobd09(p2_0[0], p2_0[1])
      let centerPoint = new BMap.Point((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)

      // map
      this.map = new BMap.Map('bmap', {
        mapType: BMAP_SATELLITE_MAP
      })
      this.map.enableScrollWheelZoom()
      this.map.centerAndZoom(centerPoint, this.zoom)
      // marker1
      var icon = new BMap.Icon(markerPng, new BMap.Size(32, 32), {
        anchor: new BMap.Size(16, 32)
      });
      this.marker = new BMap.Marker(new BMap.Point(p1[0], p1[1]), {icon: icon})
      this.map.addOverlay(this.marker)
      // marker1
      var icon1 = new BMap.Icon(markerPng1, new BMap.Size(32, 32), {
        anchor: new BMap.Size(16, 32)
      });
      this.marker1 = new BMap.Marker(new BMap.Point(p2[0], p2[1]), {icon: icon1})
	    this.map.addOverlay(this.marker1)
    }
  },
  mounted(){
    this.initMap()
  }
}
</script>

<style lang="less" scoped>

</style>
