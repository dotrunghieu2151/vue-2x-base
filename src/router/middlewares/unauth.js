export default function unauth({ next, context }) {
  const { from, store } = context;
  if (store && store.getters['user/isLoggedIn']) {
    return next({ name: from.name || 'home' });
  }
  return next();
}