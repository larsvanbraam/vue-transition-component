import HomePage from '../../page/HomePage';
import CodePage from '../../page/CodePage';
import ScrollPage from '../../page/ScrollPage';

export default [
  {
    path: '/',
    component: HomePage,
    name: 'home',
  },
  {
    path: '/code',
    component: CodePage,
    name: 'code',
  },
  {
    path: '/scroll',
    component: ScrollPage,
    name: 'scroll',
  },
];
