import * as Vue from 'vue';
import { Promise } from 'es6-promise';
import AbstractRegistrableComponent, { COMPONENT_ID } from '../../../src/lib/mixin/AbstractRegistrableComponent';
import IAbstractRegistrableComponent from '../../../src/lib/interface/IAbstractRegistrableComponent';
import IAbstractTransitionComponent from '../../../src/lib/interface/IAbstractTransitionComponent';
import IAbstractPageTransitionComponent from '../../../src/lib/interface/IAbstractPageTransitionComponent';
import AbstractTransitionController from '../../../src/lib/util/AbstractTransitionController';
import ChildComponentA from '../component/child-component-a/ChildComponentA';
import ChildComponentB from '../component/child-component-b/ChildComponentB';
import PageComponentA from '../page/page-component-a/PageComponentA';

/**
 * @description Return a test application with two dummy components
 * @returns {Vue}
 */
export const getApplication = () => {
	return new (<any>Vue)(
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
 * @returns {IAbstractPageTransitionComponent|IAbstractTransitionComponent|IAbstractRegistrableComponent}
 */
export const getMountedComponent = (
	component,
	propsData,
): IAbstractPageTransitionComponent | IAbstractTransitionComponent | IAbstractRegistrableComponent => {
	const constructor = (<any>Vue).extend(component);
	return <IAbstractPageTransitionComponent | IAbstractTransitionComponent | IAbstractRegistrableComponent>
		new constructor({ propsData }).$mount();
};

/**
 * @description get a child component based on it's componentId
 * @param {IAbstractRegistrableComponent} app
 * @param {string} componentId
 * @returns {Promise<IAbstractPageTransitionComponent|IAbstractTransitionComponent|IAbstractRegistrableComponent>}
 */
export const getChildComponent = (
	app: IAbstractRegistrableComponent,
	componentId: string,
): Promise<IAbstractPageTransitionComponent | IAbstractTransitionComponent | IAbstractRegistrableComponent> => {
	return new Promise((resolve) => {
		app.allComponentsReady.then(() => resolve(app.getChild(componentId)));
	});
};

/**
 * @description get a transition controller for a provided child component
 * @param {IAbstractRegistrableComponent} app
 * @param {string} componentId
 * @returns {Promise<AbstractTransitionController>}
 */
export const getTransitionController = (
	app: IAbstractRegistrableComponent,
	componentId: string,
): Promise<AbstractTransitionController> => {
	return new Promise((resolve) => {
		getChildComponent(app, componentId)
		.then((component:IAbstractTransitionComponent) => resolve(component.transitionController));
	});
};
