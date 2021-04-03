// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'

Vue.config.productionTip = false
// key: 'ae0f2a17a665c09576e0321b2e3d0876',
Vue.use(ElementUI);

import { aMap, bMap, oMap, arcMap, leaflet } from './components/WebMap'
Vue.use(aMap)
Vue.use(bMap)
Vue.use(arcMap)
Vue.use(leaflet)
Vue.use(oMap)


import coordtransform from 'coordtransform'
Vue.prototype.$coordtransform = coordtransform

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
