
import aMap from './amap'
import bMap from './bmap'
import oMap from './oMap'
import arcMap from './arcmap'
import leaflet from './leaflet'

function plugin (Vue, options = {}) {
  // install components
  Vue.use(aMap, options)
  Vue.use(bMap, options)
  Vue.use(arcMap, options)
  Vue.use(leaflet, options)
  Vue.use(oMap, options)
}

export default plugin
/* eslint-disable indent */
export {
  plugin as install,
  // components
  aMap,
  bMap,
  arcMap,
  leaflet,
  oMap
}
