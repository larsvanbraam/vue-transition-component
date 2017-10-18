import { getApplication, getChildComponent } from './util/app/App';
import { expect } from 'chai';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';
import {} from 'mocha';

describe('AbstractTransitionComponentSpec', () => {
	let app: any;

	beforeEach(() => {
		// Create a new main app for every test
		app = getApplication();
	});

	it('should destroy the component and dispose the timeline', () => {
		return getChildComponent<IAbstractTransitionComponent>(app, 'ChildComponentA')
			.then((component) => {
				// Destroy it
				component.$destroy();
				// Check if it's null
				expect(component.transitionController).to.equal(null);
			});
	});
});
