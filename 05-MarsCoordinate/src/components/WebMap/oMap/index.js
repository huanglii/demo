import map from './omap.vue'

export default {
  map,
  
  install (Vue) {
    Vue.component(map.name, map)
  },
}
