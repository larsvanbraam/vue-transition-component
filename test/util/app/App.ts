import * as Vue from 'vue';
import AbstractRegistrableComponent, { COMPONENT_ID } from '../../../lib/mixin/AbstractRegistrableComponent';
import ChildComponentA from '../component/child-component-a/ChildComponentA';
import ChildComponentB from '../component/child-component-b/ChildComponentB';
import ChildComponentC from '../component/child-component-c/ChildComponentC';
import PageComponentA from '../page/page-component-a/PageComponentA';
import IAbstractTransitionComponent from '../../../lib/interface/IAbstractTransitionComponent';
import IAbstractRegistrableComponent from '../../../lib/interface/IAbstractRegistrableComponent';
import AbstractTransitionController from '../../../lib/util/AbstractTransitionController';

/**
 * @description Return a test application with two dummy components
 * @returns {Vue}
 */
export const getApplication = () => {
	return new Vue({
		extends: AbstractRegistrableComponent,
		components: {
			ChildComponentA,
			ChildComponentB,
			ChildComponentC,
			PageComponentA,
		},
		propsData: {
			[COMPONENT_ID]: 'App',
		},
		template: `<div>
				<ChildComponentA componentId="ChildComponentA" />
				<ChildComponentB componentId="ChildComponentB" />
				<ChildComponentC componentId="ChildComponentC" />
				<PageComponentA componentId="PageComponentA" />
			</div>`,
	}).$mount();
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
	return getChildComponent<IAbstractTransitionComponent>(app, componentId)
		.then(component => component.transitionController);
};
