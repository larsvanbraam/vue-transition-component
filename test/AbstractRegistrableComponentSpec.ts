import { expect } from 'chai';
import {} from 'mocha';
import ComponentType from '../src/lib/enum/ComponentType';
import { getMountedComponent } from './util/app/App';
import ChildComponentA from './util/component/child-component-a/ChildComponentA';
import ChildComponentB from './util/component/child-component-b/ChildComponentB';

describe('AbstractRegistrableComponentSpec', () => {
	describe('hasChild', () => {
		it('check for ChildComponentA without a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.hasChild('ChildComponentA')).to.equal(false);
		});

		it('check for ChildComponentA with a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.hasChild('ChildComponentA', ComponentType.TRANSITION_COMPONENT)).to.equal(false);
		});

		it('check for ChildComponentB without a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.hasChild('ChildComponentB')).to.equal(true);
		});

		it('check for ChildComponentB with a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.hasChild('ChildComponentB', ComponentType.TRANSITION_COMPONENT)).to.equal(true);
		});
	});

	describe('hasChild', () => {
		it('get a child with a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.getChild('ChildComponentB', ComponentType.TRANSITION_COMPONENT)).to.be.an('object');
		});

		it('get a child without a ComponentType', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(component.getChild('ChildComponentB')).to.be.an('object');
		});

		it('get a child with a ComponentType but fail because the type is incorrect', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(() => component.getChild('ChildComponentB', ComponentType.PAGE_COMPONENT)).to.throw(Error);
		});

		it('get a child with a ComponentType but fail because the component is not found', () => {
			const component = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA' });
			expect(() => component.getChild('FooComponent')).to.throw(Error);
		});
	});

	describe('checkComponentsReady', () => {
		it('should check if all components are ready', () => {
			const component = getMountedComponent(ChildComponentB, { componentId: 'ChildComponentB' });
			expect(component.checkComponentsReady()).to.be.undefined;
		});
	});

	// describe('componentReady', () => {
	// 	it('should register a new component', () => {
			// const componentA1 = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA1' });
			// const componentA2 = getMountedComponent(ChildComponentA, { componentId: 'ChildComponentA2' });
			// expect(componentA1.componentReady(componentA2)).to.be.undefined;
		// });
	// });
});
