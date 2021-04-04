export default {
  path: '/logout',
  name: 'logout',
  meta: {
    authRequired: true,
    beforeResolve(routeTo, routeFrom, next) {
      store.dispatch('auth/logOut')
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        (route) => route.meta.authRequired
      )
      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
    },
  },
},