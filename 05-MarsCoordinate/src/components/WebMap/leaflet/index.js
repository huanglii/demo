import map from './leaflet.vue'

export default {
  map,
  
  install (Vue) {
    Vue.component(map.name, map)
  },
}
