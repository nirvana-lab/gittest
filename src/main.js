import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import '@/assets/styles/lib.scss';
import dayjs from 'dayjs';
import router from '@/router';
import store from '@/store';
import App from './App.vue';
import components from './components';

window.moment = dayjs;

const dateformat = {
  install: (vm) => vm.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => dayjs(dataStr).format(pattern)),
};

Vue.config.productionTip = false;
Vue.use(SuiVue);
Vue.use(dateformat);
Vue.use(components);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
