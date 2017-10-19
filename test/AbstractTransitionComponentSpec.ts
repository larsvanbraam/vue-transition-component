import { expect } from 'chai';
import {} from 'mocha';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';
import { getMountedComponent } from './util/app/App';
import ChildComponentA from './util/component/child-component-a/ChildComponentA';

describe('AbstractTransitionComponentSpec', () => {
	describe('destroy', () => {
		it('should destroy the component and dispose the timeline', () => {
			const component = getMountedComponent<IAbstractTransitionComponent>(ChildComponentA, {
				componentId: 'ChildComponentA',
			});
			// Destroy the component
			component.$destroy();
			// Check if it's null
			expect(component.transitionController).to.equal(null);
		});
	});
});
