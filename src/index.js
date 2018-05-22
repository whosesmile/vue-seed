import './less/index.less';
import Vue from 'vue';
import App from './components/app';

new Vue({
  data: { message: 'Hello World' },
  render: c => c(App),
}).$mount('#bootstrap');
