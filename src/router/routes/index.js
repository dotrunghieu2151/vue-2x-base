import home from './home'
import login from './login'
import _404 from '@/pages/_404';

export default [
  home,
  login,
  {
    path: '/404',
    name: '404',
    component: _404,
    props: true,
  },
  {
    path: '*',
    redirect: '404',
  },
]

