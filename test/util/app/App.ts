import * as Vue from 'vue';
import AbstractRegistrableComponent, { COMPONENT_ID } from '../../../src/lib/mixin/AbstractRegistrableComponent';
import IAbstractTransitionComponent from '../../../src/lib/interface/IAbstractTransitionComponent';
import IAbstractRegistrableComponent from '../../../src/lib/interface/IAbstractRegistrableComponent';
import AbstractTransitionController from '../../../src/lib/util/AbstractTransitionController';
import ChildComponentA from '../component/child-component-a/ChildComponentA';
import ChildComponentB from '../component/child-component-b/ChildComponentB';
import PageComponentA from '../page/page-component-a/PageComponentA';

/**
 * @description Return a test application with two dummy components
 * @returns {Vue}
 */
export const getApplication = () => {
	return new Vue(
		{
			extends: AbstractRegistrableComponent,
			components: {
				ChildComponentA,
				ChildComponentB,
				PageComponentA,
			},
			propsData: {
				[COMPONENT_ID]: 'App',
			},
			template: `<div>
				<ChildComponentA componentId="ChildComponentA" />
				<ChildComponentB componentId="ChildComponentB" />
				<PageComponentA componentId="PageComponentA" />
			</div>`,
		},
	).$mount();
};

/**
 * @description mount a provided vue component and return the instance
 * @param component
 * @param propsData
 * @returns {IAbstractRegistrableComponent}
 */
export const getMountedComponent = <T extends IAbstractRegistrableComponent>(
	component,
	propsData,
): T => {
	const constructor = Vue.extend(component);
	return <T>new constructor({ propsData }).$mount();
};

/**
 * @description get a child component based on it's componentId
 * @param {IAbstractRegistrableComponent} app
 * @param {string} componentId
 * @returns {Promise<IAbstractTransitionComponent>}
 */
export const getChildComponent = <T extends IAbstractRegistrableComponent>(
	app: IAbstractRegistrableComponent,
	componentId: string,
): Promise<T> => {
	return app.allComponentsReady.then(() => app.getChild(componentId));
};

/**
 * @description get a transition controller for a provided child component
 * @param {IAbstractRegistrableComponent} app
 * @param {string} componentId
 * @returns {Promise<ChildComponentATransitionController>}
 */
export const getTransitionController = (
	app: IAbstractRegistrableComponent,
	componentId: string,
): Promise<AbstractTransitionController> => {
	return getChildComponent<IAbstractTransitionComponent>(
		app,
		componentId,
	)
	.then(component => component.transitionController);
};
