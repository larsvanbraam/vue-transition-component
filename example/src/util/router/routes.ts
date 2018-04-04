import HomePage from '../../page/HomePage';
import AboutPage from '../../page/AboutPage';

export default [
  {
    path: '/',
    component: HomePage,
    name: 'home',
  },
  {
    path: '/about',
    component: AboutPage,
    name: 'about',
  },
];
