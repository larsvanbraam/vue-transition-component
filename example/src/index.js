import Vue from 'vue';
import App from './App';
import getRouter from './util/router';

const router = getRouter();

// Init new vue app
const app = new Vue({
  router,
  render: createElement => createElement(App),
});

app.$mount(document.body.querySelector('#app'));
