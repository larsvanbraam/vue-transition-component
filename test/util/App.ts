import Vue from 'vue/dist/vue.js';
import AbstractRegistrableComponent from '../../src/lib/mixin/AbstractRegistrableComponent';
import { IAbstractRegistrableComponent } from '../../src/lib/interface/IAbstractRegistrableComponent';
import { IAbstractTransitionComponent } from '../../src/lib/interface/IAbstractTransitionComponent';
import { IAbstractPageTransitionComponent } from '../../src/lib/interface/IAbstractPageTransitionComponent';
import ChildComponentA from './ChildComponentA/ChildComponentA';
import ChildComponentB from './ChildComponentB/ChildComponentB';
import PageComponentA from './PageComponentA/PageComponentA';

// Disable development logging
Vue.config.productionTip = false;

/**
 * @description Return a test application with two dummy components
 * @returns {Vue}
 */
export const getApplication = () => {
  return new Vue({
    name: 'App',
    extends: AbstractRegistrableComponent,
    components: {
      ChildComponentA,
      ChildComponentB,
      PageComponentA,
    },
    template: `<div>
				<ChildComponentA ref="ChildComponentA"/>
				<ChildComponentB ref="ChildComponentB" />
				<PageComponentA ref="PageComponentA" />
			</div>`,
  }).$mount();
};

/**
 * @description mount a provided vue component and return the instance
 * @param component
 * @param propsData
 * @returns {IAbstractPageTransitionComponent|IAbstractTransitionComponent|IAbstractRegistrableComponent}
 */
export const getMountedComponent = (
  component,
  propsData = {},
):
  | IAbstractPageTransitionComponent
  | IAbstractTransitionComponent
  | IAbstractRegistrableComponent => {
  const constructor = (<any>Vue).extend(component);
  return <
    | IAbstractPageTransitionComponent
    | IAbstractTransitionComponent
    | IAbstractRegistrableComponent>new constructor({ propsData }).$mount();
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
): Promise<
  IAbstractPageTransitionComponent | IAbstractTransitionComponent | IAbstractRegistrableComponent
> => {
  return new Promise(resolve => {
    app.allComponentsReady
      .then(() => resolve(app.$refs[componentId]))
      .catch(reason => console.log(reason));
  });
};
