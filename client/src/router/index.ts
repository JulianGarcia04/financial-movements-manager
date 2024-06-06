import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { Cookies, Loading } from 'quasar';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/AuthStore';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (from.fullPath === to.fullPath) {
      next();
    }

    try {
      Loading.show({
        message: 'Verificando sesión...',
      });

      const token = Cookies.get('auth');

      if (token == null) {
        Loading.hide();
        return next('/');
      }

      authStore.setToken(token);

      const verifyToken = await api.get(`token/decode/${token}`);

      authStore.setUserId(verifyToken.data._id);

      Loading.hide();
      next();
    } catch (error) {
      console.error(error);
      Cookies.remove('auth');
      next({
        name: 'login',
      });
    } finally {
      Loading.hide();
    }
  });

  return Router;
});
