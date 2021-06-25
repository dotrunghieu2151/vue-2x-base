export default function auth({ next, context }) {
  const { to } = context;
  if (context.store && !context.store.getters['user/isLoggedIn']) {
    return next({ name: 'login', params: { redirect: to.name } });
  }
  return next();
}