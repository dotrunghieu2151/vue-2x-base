import { lazyLoadView } from '../utils/lazy-load-view'

export default {
  path: '/login',
  name: 'login',
  component: () => lazyLoadView(import('@views/login.vue')),
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        // Redirect to the home page instead
        next({ name: 'home' })
      } else {
        // Continue to the login page
        next()
      }
    },
  },
}