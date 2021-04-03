<template>
  <div id="amap" class="map"></div>
</template>

<script>
import markerPng from '@/assets/marker.png'
import markerPng1 from '@/assets/marker1.png'
export default {
  name: 'wm-amap',
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
      this.map.setCenter(value)
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
      // GCJ02
      // let p2 = CoordinateConvert.wgs2gcj(p1[0], p1[1])
      let p2 = this.$coordtransform.wgs84togcj02(p1[0], p1[1])
      let centerPoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]

      this.map = new AMap.Map('amap', {
        layers: [new AMap.TileLayer.Satellite()],
        center: centerPoint,
        zoom: this.zoom,
      })
      // WGS84
      let marker = new AMap.Marker({
        position: p1,
        offset: new AMap.Pixel(-16, -32),
        icon: markerPng,
      })
      // GCJ02
      let marker1 = new AMap.Marker({
        position: p2,
        offset: new AMap.Pixel(-16, -32),
        icon: markerPng1,
      })
      this.map.add(marker)
      this.map.add(marker1)
    }
  },
  mounted() {
    this.initMap()
  }
}
</script>

<style lang="less" scoped>

</style>
