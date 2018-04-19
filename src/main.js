// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'material-design-icons/iconfont/material-icons.css'
import '@/assets/styles/main.scss'
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false;
Vue.use(MuseUI);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
