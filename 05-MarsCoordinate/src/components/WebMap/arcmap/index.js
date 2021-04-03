import map from './arcMap.vue'

export default {
  map,
  
  install (Vue) {
    Vue.component(map.name, map)
  },
}
