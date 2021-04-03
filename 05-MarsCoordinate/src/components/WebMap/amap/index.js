import map from './aMap.vue'

export default {
  map,
  
  install (Vue) {
    Vue.component(map.name, map)
  },
}
