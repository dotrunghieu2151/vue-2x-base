import { lazyLoadView } from '../utils/lazy-load-view';

export default {
  path: '/',
  name: 'home',
  component: () => lazyLoadView(import('@views/home.vue')),
};