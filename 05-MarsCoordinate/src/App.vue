<template>
  <div id="app">
    <el-row style="display:none">
      <el-badge :value="zoom" class="item">
        <!-- <el-button size="small">Zoom</el-button> -->
        <!-- <el-input-number v-model="zoom" :min="6" :max="18" label="缩放级别"></el-input-number> -->
        <el-button-group>
          <el-button @click="zoom--" size="small" type="primary" icon="el-icon-minus"></el-button>
          <el-button @click="zoom++" size="small" type="primary" icon="el-icon-plus"></el-button>
        </el-button-group>
      </el-badge>
      <span>center: {{center}}</span>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="api in apiList" :key="api.label" style="margin-bottom: 20px">
          <el-card shadow="hover" class="box-card">
            <div slot="header">
              <span>{{ api.label }}</span>
            </div>
            <div>
              <component :is="'wm-' + api.name" :center.sync="center" :zoom.sync="zoom" :option="api.option"></component>
            </div>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      zoom: 16,
      center: [114.054689, 22.542545],
      apiList: [{
        name: 'amap',
        label: '高德地图API(高德地图)'
      }, {
        name: 'bmap',
        label: '百度地图API(百度地图)'
      }, {
        name: 'arcmap',
        label: 'ArcGIS API for JavaScript(hybrid)'
      }, {
        name: 'omap',
        label: 'OpenLayers(必应地图)',
        option: {
          id: 'omap1',
          type: 'bing'
        }
      }, {
        name: 'leaflet',
        label: 'Leaflet(天地图)',
        option: {
          id: 'leaflet2',
          type: 'tdt'
        }
      }, {
        name: 'leaflet',
        label: 'Leaflet(谷歌地图)',
        option: {
          id: 'leaflet3',
          type: 'gmap'
        }
      }, {
        name: 'leaflet',
        label: 'Leaflet(MapBox)',
        option: {
          id: 'leaflet1',
          type: 'mapbox'
        }
      }, {
        name: 'omap',
        label: 'OpenLayers(GeoQ)',
        option: {
          id: 'omap2',
          type: 'geoq'
        }
      }]
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.map {
  width: 100%;
  height: 400px;
}
.map-center {
  width: 10px;
  height: 10px;
  background-color: red;
}
.el-button-group .el-button:hover {
  z-index: auto;
}
.el-button--small, .el-button--small.is-round {
  padding: 8px;
}
.box-card .el-card__body {
  padding: 0;
}
</style>
