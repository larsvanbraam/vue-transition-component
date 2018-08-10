import { COMPONENT_ID } from 'vue-transition-component';
import HomePage from '../page/HomePage';
import RoutePaths from '../data/enum/RoutePaths';
import RouteNames from '../data/enum/RouteNames';

export default [
	{
		path: RoutePaths.HOME,
		component: HomePage,
		name: RouteNames.HOME,
		props: { [COMPONENT_ID]: RouteNames.HOME },
	},
];
