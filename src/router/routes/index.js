import store from '@store'
import home from './home'
import login from './login'
import logout from './logout'

export default [
  home,
  login,
  logout,
  // {
  //   path: '/profile/:username',
  //   name: 'username-profile',
  //   component: () => lazyLoadView(import('@views/profile.vue')),
  //   meta: {
  //     authRequired: true,
  //     // HACK: In order to share data between the `beforeResolve` hook
  //     // and the `props` function, we must create an object for temporary
  //     // data only used during route resolution.
  //     tmp: {},
  //     beforeResolve(routeTo, routeFrom, next) {
  //       store
  //         // Try to fetch the user's information by their username
  //         .dispatch('users/fetchUser', { username: routeTo.params.username })
  //         .then((user) => {
  //           // Add the user to `meta.tmp`, so that it can
  //           // be provided as a prop.
  //           routeTo.meta.tmp.user = user
  //           // Continue to the route.
  //           next()
  //         })
  //         .catch(() => {
  //           // If a user with the provided username could not be
  //           // found, redirect to the 404 page.
  //           next({ name: '404', params: { resource: 'User' } })
  //         })
  //     },
  //   },
  //   // Set the user from the route params, once it's set in the
  //   // beforeResolve route guard.
  //   props: (route) => ({ user: route.meta.tmp.user }),
  // },

  {
    path: '/404',
    name: '404',
    component: require('@views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

