import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store';
import { nextMiddlewareFactory } from './utils/next-middleware-factory';

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } if (to.hash) {
      // smooth scroll animation if url has hash
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ selector: to.hash, behavior: 'smooth', offset: { y: 60 } })
        }, 100)
      })
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// Before each route, check middleware
router.beforeEach((to, from, next) => {
  if (to.meta?.middleware) {
    const middlewares = Array.isArray(to.meta.middleware)
      ? [...to.meta.middleware]
      : [to.meta.middleware];

    const context = {
      from,
      router,
      to,
      store,
    };
    const middleware = middlewares.shift();
    const nextMiddleware = nextMiddlewareFactory(context, middlewares, next);

    return middleware({ context, next: nextMiddleware });
  }

  return next();
})

// beforeResoulve hook to fetch api data before entering route
router.beforeResolve(async (to, from, next) => {
  try {
    // For each matched route...
    for (const route of to.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta?.beforeResolve) {
          const context = {
            from,
            router,
            to,
            store,
          };
          route.meta.beforeResolve(context, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (from.name === args[0].name) {
                // Complete the animation of the route progress bar.
                // NProgress.done()
              }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

export default router