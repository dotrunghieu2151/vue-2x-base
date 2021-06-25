import Login from '@/pages/Login';
import unauth from '../middlewares/unauth';

export default {
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    middleware: unauth
  },
  props: true,
};