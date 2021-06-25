import Home from '@/pages/Home';
import auth from '../middlewares/auth';

export default {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    // custom middleware hook, check router/index.js
    middleware: auth,
    // custom beforeResolve hook, check router/index.js
    beforeResolve(context, next) {
      const { store } = context;
      // prefetch data before entering route
      store.dispatch('tasks/loadMoreTasks');
      next();
    },
  },
}