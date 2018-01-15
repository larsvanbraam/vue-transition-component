import { expect } from 'chai';
import {} from 'mocha';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';
import { getMountedComponent } from './util/app/App';
import ChildComponentA from './util/component/child-component-a/ChildComponentA';

describe('AbstractTransitionComponentSpec', () => {
	describe('transitionIn', () => {
		it('should transition in the component', (done) => {
			const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA, {
				componentId: 'ChildComponentA',
			});
			component.transitionIn()
      .then(() => done())
		});
	});
	describe('transitionOut', () => {
		it('should transition out the component', (done) => {
			const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA, {
				componentId: 'ChildComponentA',
			});

			component.transitionIn()
			.then(() => component.transitionOut())
			.then(() => done())
      .catch(reason => console.log('reason', reason));
		});
	});
	describe('destroy', () => {
		it('should destroy the component and dispose the timeline', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA, {
				componentId: 'ChildComponentA',
			});
			// Wait for all components to be ready
			component.allComponentsReady.then(() => {
				// Destroy the component
				component.$destroy();
				// Check if it's null
				expect(component.transitionController).to.equal(null);
			});
		});
	});
});
