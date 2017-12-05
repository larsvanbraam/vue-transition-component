import { getMountedComponent } from './util/app/App';
// import { expect } from 'chai';
import {} from 'mocha';
import IAbstractPageTransitionComponent from '../src/lib/interface/IAbstractPageTransitionComponent';
import PageComponentA from './util/page/page-component-a/PageComponentA';

describe('AbstractPageTransitionSpec', () => {
	describe('HijackTransitionIn', () => {
		it('should hijack the transition in', () => {
			const component = <IAbstractPageTransitionComponent>getMountedComponent(PageComponentA, {
				componentId: 'PageComponentA',
			});
			component.allComponentsReady
			.then(() => component.hijackTransitionIn())
			.then((release: () => void) => setTimeout(() => release(), 1));
		});
	});
});
