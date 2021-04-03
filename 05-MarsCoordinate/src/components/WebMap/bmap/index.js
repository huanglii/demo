import map from './bMap.vue'

export default {
  map,
  
  install (Vue) {
    Vue.component(map.name, map)
  },
}
