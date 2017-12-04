import { expect } from 'chai';
import {} from 'mocha';
import ComponentType from '../src/lib/enum/ComponentType';
import { getMountedComponent } from './util/app/App';
import ChildComponentA from './util/component/child-component-a/ChildComponentA';
import ChildComponentB from './util/component/child-component-b/ChildComponentB';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';

describe('AbstractRegistrableComponentSpec', () => {
	describe('hasChild', () => {
		it('check for ChildComponentA without a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.hasChild('ChildComponentA')).to.equal(false);
		});

		it('check for ChildComponentA with a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.hasChild('ChildComponentA', ComponentType.TRANSITION_COMPONENT)).to.equal(false);
		});

		it('check for ChildComponentB without a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.hasChild('ChildComponentB')).to.equal(true);
		});

		it('check for ChildComponentB with a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.hasChild('ChildComponentB', ComponentType.TRANSITION_COMPONENT)).to.equal(true);
		});
	});

	describe('getChild', () => {
		it('get a child with a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.getChild('ChildComponentB', ComponentType.TRANSITION_COMPONENT)).to.be.an('object');
		});

		it('get a child without a ComponentType', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(component.getChild('ChildComponentB')).to.be.an('object');
		});

		it('get a child with a ComponentType but fail because the type is incorrect', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(() => component.getChild('ChildComponentB', ComponentType.PAGE_COMPONENT)).to.throw(Error);
		});

		it('get a child with a ComponentType but fail because the component is not found', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentA,
				{
					componentId: 'ChildComponentA',
				},
			);
			expect(() => component.getChild('FooComponent')).to.throw(Error);
		});
	});

	describe('checkComponentsReady', () => {
		it('should check if all components are ready', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentB,
				{
					componentId: 'ChildComponentB',
				},
			);
			expect(component.$_checkComponentsReady()).to.be.undefined;
		});
	});

	describe('updateRegistrableComponents', () => {
		it('should do an async action and wait for the new components to be ready', () => {
			const component = <IAbstractTransitionComponent>getMountedComponent(
				ChildComponentB,
				{
					componentId: 'ChildComponentA',
				},
			);

			component.allComponentsReady
			.then(() => component.updateRegistrableComponents(release => setTimeout(() => release(), 1)))
			.then(result => expect(result).to.equal([]));
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
