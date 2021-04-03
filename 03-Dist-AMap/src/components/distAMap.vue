<template>
  <div class="container">
    <div id="amap-container"></div>
    <div class="citySelect-container">
      <el-row>
        <el-select ref="$province" v-model="province" v-on:change="search(province, 'province')" placeholder="请选择省">
          <el-option
            v-for="item in provinceList"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-select ref="$city" v-model="city" v-on:change="search(city, 'city')" placeholder="请选择市">
          <el-option
            v-for="item in cityList"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-select ref="$district" v-model="district" v-on:change="search(district, 'district')" placeholder="请选择区">
          <el-option
            v-for="item in districtList"
            :key="item.adcode"
            :label="item.name"
            :value="item.adcode">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-select ref="$street" v-model="street" v-on:change="search(street, 'street')" placeholder="请选择街道">
          <el-option
            v-for="(item, index) in streetList"
            :key="index"
            :label="item.name"
            :value="item.adcode">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-col :span="12" style="text-align: left;">
          <!-- <el-checkbox v-model="toWGS" label="转WGS" border disabled></el-checkbox> -->
          <el-button icon="el-icon-close" v-on:click="clear" plain>清 空</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="primary" icon="el-icon-download" v-on:click="downloadGeoJson">下 载</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import {multiPolygon as TurfMultipolygon, polygon as TurfPolygon} from '@turf/helpers'
import FileSaver from 'file-saver'
// const CoordinateConvert = require('coordinate-convert')
let map
let districtSearch
let geoBounds = []
export default {
  name: 'DistAMap',
  data () {
    return {
      province: '',
      city: '',
      district: '',
      street: '',
      provinceList: [],
      cityList: [],
      districtList: [],
      streetList: [],
      toWGS: false
    }
  },
  methods: {
    // 初始化
    init () {
      map = new AMap.Map('amap-container', {
        zoom: 14,
        center: [116.397428, 39.90923],
        mapStyle: 'amap://styles/whitesmoke'
      })
      // 初始化行政区划搜索
      AMap.service('AMap.DistrictSearch', () => {
        // 在对象初始化的时候设定
        districtSearch = new AMap.DistrictSearch({
          subdistrict: 1, // 返回下一级行政区
          showbiz: false // 最后一级返回街道信息
        })
      })
      // 初始化省列表
      this.searchDistrict('中国')
    },
    // 获取边界和下级城市数据
    getData (data, level, isAll) {
      if (level) {
        // 清空下一级的下拉列表
        this.clearSelectList(level)
      }
      // 边界
      if (data.boundaries) {
        geoBounds.push({
          code: data.adcode,
          name: data.name,
          boundaries: data.boundaries
        })
        const len = data.boundaries.length
        for (let i = 0; i < len; i++) {
          const polygon = new AMap.Polygon({
            strokeWeight: 1,
            strokeColor: '#CC66CC',
            fillColor: '#CCF3FF',
            fillOpacity: 0.5,
            path: data.boundaries[i]
          })
          polygon.setMap(map)
        }
        map.setFitView() // 地图自适应
      }
      // 下级城市
      if (!isAll) {
        this.addSubList(data.adcode, data.districtList)
      }
    },
    clear () {
      map.clearMap()
      map.setZoomAndCenter(14, [116.397428, 39.90923])
      geoBounds = []
      this.province = ''
      this.cityList = []
      this.city = ''
      this.districtList = []
      this.district = ''
      this.streetList = []
      this.street = ''
    },
    // 清空列表
    clearSelectList (level) {
      if (level === 'province') {
        this.cityList = []
        this.city = ''
        this.districtList = []
        this.district = ''
        this.streetList = []
        this.street = ''
      } else if (level === 'city') {
        this.districtList = []
        this.district = ''
        this.streetList = []
        this.street = ''
      } else if (level === 'district') {
        this.streetList = []
        this.street = ''
      }
    },
    // 添加下级城市
    addSubList (adcode, subList) {
      const l = subList[0].level
      const all = {adcode: adcode, name: l === 'province' ? '全国' : '全部' }
      if (l === 'province') {
        this.provinceList = subList
        this.provinceList.unshift(all)
      } else if (l === 'city') {
        this.cityList = subList
        this.cityList.unshift(all)
      } else if (l === 'district') {
        this.districtList = subList
        this.districtList.unshift(all)
      } else if (l === 'street') {
        this.streetList = subList
        this.streetList.unshift(all)
      }
    },
    // 根据adcode搜索(change事件)
    search (adcode, level) {
      // 清除地图
      map.clearMap()
      geoBounds = []
      districtSearch.setLevel(level)
      districtSearch.setExtensions('all')
      if (level === 'province' && adcode.endsWith('100000')) {
        // 全国
        for (let i = 1; i < this.provinceList.length; i++) {
          const code = this.provinceList[i].adcode
          this.searchDistrict(code, level, true)
        }
      } else if (level === 'city' && adcode.endsWith('0000')) {
        // 全部市
        for (let i = 1; i < this.cityList.length; i++) {
          const code = this.cityList[i].adcode
          this.searchDistrict(code, level, true)
        }
      } else if (level === 'district' && adcode.endsWith('00')) {
        // 全部区
        for (let i = 1; i < this.districtList.length; i++) {
          const code = this.districtList[i].adcode
          this.searchDistrict(code, level, true)
        }
      } else {
        // 单个城市
        this.searchDistrict(adcode, level, false)
      }
    },
    // 行政区查
    searchDistrict (adcode, level, isAll) {
      const loading = this.$loading({ })
      districtSearch.search(adcode, (status, result) => {
        loading.close()
        if (status === 'complete') {
          this.getData(result.districtList[0], level, isAll)
        }
      })
    },
    downloadGeoJson () {
      const b = geoBounds // 边界坐标
      if (b.length === 0) {
        this.$message({
          type: 'error',
          center: true,
          message: '当前未选择城市，无法下载'
        })
        return
      }
      // 保存文件
      const blob = new Blob([JSON.stringify(this.getGeoJson(b))], {
        type: 'text/plain;charset=utf-8'
      })
      const fileName = this.generateFileName()
      FileSaver.saveAs(blob, fileName)
    },
    generateFileName () {
      const dLabel = this.$refs.$district.selectedLabel
      const cLabel = this.$refs.$city.selectedLabel
      const pLabel = this.$refs.$province.selectedLabel
      const fileName = `${pLabel}${cLabel}${dLabel}.geojson`
      return fileName.replace('全部', '')
    },
    getGeoJson (data) {
      // 边界GeoJson
      let result = {
        'type': 'FeatureCollection',
        'features': []
      }
      for (let i = 0; i < data.length; i++) {
        const p = data[i]
        let geom = {}
        let prop = {code: p.code, name: p.name}
        const b = p.boundaries
        if (b.length > 1) {
          geom = TurfMultipolygon(this.getCoods(b), prop)
        } else {
          geom = TurfPolygon(this.getCoods(b), prop)
        }
        result['features'].push(geom)
      }
      return result
    },
    getCoods (b) {
      let coods = []
      if (b.length > 1) {
        for (let i = 0; i < b.length; i++) {
          coods[i] = []
          for (let j = 0; j < b[i].length; j++) {
            const cood = b[i][j]
            // coods[i].push(this.toWGS ? CoordinateConvert.gcj2wgs(cood.lng, cood.lat) : [cood.lng, cood.lat])
            coods[i].push([cood.lng, cood.lat])
          }
        }
      } else {
        for (let i = 0; i < b[0].length; i++) {
          const cood = b[0][i]
          // coods.push(this.toWGS ? CoordinateConvert.gcj2wgs(cood.lng, cood.lat) : [cood.lng, cood.lat])
          coods.push([cood.lng, cood.lat])
        }
      }
      return [coods]
    }
  },
  mounted () {
    this.init() // 初始化
  }
}
</script>

<style scoped>
  .container, #amap-container {
    width: 100%;
    height: 100%;
  }
  .citySelect-container {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 9;
  }
  .el-row {
    margin-bottom: 8px;
  }
</style>
