import VueRouter from 'vue-router';
import Vue from 'vue';

import routes from './routes';

Vue.use(VueRouter);

let router:VueRouter = null;

const getRouter = () => {
  if (!router) {
    router = new VueRouter({
      routes,
      base: '/',
    });
  }

  return router;
};

export default getRouter;
