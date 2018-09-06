import HomePage from '../../page/HomePage';
import CodePage from '../../page/CodePage';

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
];
