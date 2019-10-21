import {
  ScrollTrackerComponentManager,
  IScrollTrackerComponentManagerOptions,
} from 'scroll-tracker-component-manager';
import { Vue, VueConstructor } from 'vue/types/vue';
import { ADD_COMPONENTS, REMOVE_COMPONENTS } from './lib/eventbus/scrollTrackerEvents';
import { IAbstractScrollComponent } from './lib/interface/IAbstractScrollComponent';

let eventBus: Vue;

export interface IOptions {
  exposeToVue?: boolean;
  config?: IScrollTrackerComponentManagerOptions;
}

export const getEventBus = (): Vue => {
  if (eventBus === undefined) {
    throw new Error('Plugin has not been initialized yet, cannot get eventBus');
  }
  return eventBus;
};

const defaultOptions: IOptions = {
  exposeToVue: true,
  config: {
    // component settings
    element: '$el',
    enterView: 'enterView',
    leaveView: 'leaveView',
    beyondView: 'beyondView',
    inViewProgress: 'inViewProgress',
    inViewProgressThreshold: 'inViewProgressThreshold',
    enterViewThreshold: 'transitionInThreshold',
    hasEntered: 'hasEntered',
    currentViewProgress: 'currentViewProgress',
    componentId: 'componentId',

    // global settings
    container: window,
    inViewProgressEnabled: true,
    setDebugLabel: true,
    debugBorderColor: 'red',
    scrollThrottle: 100,
    resizeDebounce: 100,
  },
};

// define as empty object so we can export it
export const options: IOptions = {};

export default {
  install(Vue: VueConstructor, userOptions: IOptions = {}) {
    eventBus = new Vue();

    console.log(IScrollTrackerComponentManagerOptions);

    Object.assign(options, defaultOptions, userOptions);

    // Create the scroll tracker manager
    Vue.prototype.$scrollTracker = new ScrollTrackerComponentManager(options.config);

    getEventBus().$on(
      ADD_COMPONENTS,
      (
        components:
          | Array<IAbstractScrollComponent>
          | {
              [key: string]: IAbstractScrollComponent;
            },
      ) => {
        Vue.prototype.$scrollTracker.addComponentsToScrollTrackers(components);
      },
    );

    getEventBus().$on(
      REMOVE_COMPONENTS,
      (
        components:
          | Array<IAbstractScrollComponent>
          | {
              [key: string]: IAbstractScrollComponent;
            },
      ) => {
        Vue.prototype.$scrollTracker.removeComponentsFromScrollTracker(components);
      },
    );
  },
};
