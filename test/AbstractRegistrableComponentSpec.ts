import { getApplication } from './util/app/App';
import ComponentType from '../lib/enum/ComponentType';
import { expect } from 'chai';
import {} from 'mocha';

describe('AbstractRegistrableComponentSpe', () => {
	let app: any;

	beforeEach(() => {
		// Create a new main app for every test
		app = getApplication();
	});

	it('should check if a component with componentId ChildComponentA exists', () => {
		return app.allComponentsReady
			.then(() => {
				console.log('check if it has a child', app.hasChild('ChildComponentA', ComponentType.TRANSITION_COMPONENT));
				expect(
					app.hasChild('ChildComponentA', ComponentType.TRANSITION_COMPONENT),
				).to.equal(true);
			});
	});

	it('should get ChildComponentA with the type set', () => {
		return app.allComponentsReady
			.then(() => {
				expect(
					app.getChild('ChildComponentA', ComponentType.TRANSITION_COMPONENT),
				).to.be.an('object');
			});
	});

	it('should get ChildComponentA without the type set', () => {
		return app.allComponentsReady
			.then(() => {
				expect(
					app.getChild('ChildComponentA'),
				).to.be.an('object');
			});
	});

	it('should fail while getting ChildComponentA', () => {
		return app.allComponentsReady
			.then(() => {
				expect(
					() => app.getChild('FooComponent'),
				).to.throw(Error);
			});
	});

	it('should fail while getting ChildComponentA with an incorrect type', () => {
		return app.allComponentsReady
			.then(() => {
				expect(
					() => app.getChild('ChildComponentA', ComponentType.PAGE_COMPONENT),
				).to.throw(Error);
			});
	});
});
