import {
  ScrollTrackerComponentManager,
  IScrollTrackerComponentManagerOptions,
} from 'scroll-tracker-component-manager';
import { VueConstructor } from 'vue/types/vue';
import EventBus from 'vue';
import { ADD_COMPONENTS, REMOVE_COMPONENTS } from '../lib/eventbus/scrollTrackerEvents';
import { IAbstractScrollComponent } from '../lib/interface/IAbstractScrollComponent';

let eventBus: EventBus;

export interface IOptions {
  config?: IScrollTrackerComponentManagerOptions;
}

export const getEventBus = (): EventBus => {
  if (eventBus === undefined) {
    throw new Error('Plugin has not been initialized yet, cannot get eventBus');
  }
  return eventBus;
};

/**
 * DOCS: https://github.com/riccoarntz/scroll-tracker-component-manager/wiki
 */
const defaultOptions: IOptions = {
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
    inViewProgressEnabled: false,
    /**
     * When this is set to a container other than the window, you need to set the html/body tag to a fixed
     height(100%) and overflow: hidden. And set the container to a fixed height(100%) and overflow: auto.
     */
    container: window,
    setDebugLabel: true,
    debugBorderColor: 'red',
    scrollThrottle: 100,
    resizeDebounce: 100,
    /**
     * When this is enabled you should set the container(body) to a fixed height(100%).
     */
    enableSmoothScroll: false,
    smoothScrollOptions: {
      damping: 0.1,
      thumbMinSize: 20,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
      wheelEventTarget: null,
      plugins: {},
    },
  },
};

export default {
  install(Vue: VueConstructor, userOptions: IOptions = {}) {
    eventBus = new EventBus();

    // eslint-disable-next-line
    Vue.prototype.$scrollTracker = new ScrollTrackerComponentManager({
      ...defaultOptions.config,
      ...userOptions.config,
    });

    getEventBus().$on(
      ADD_COMPONENTS,
      (
        components: Array<IAbstractScrollComponent> | { [key: string]: IAbstractScrollComponent },
      ) => {
        Vue.prototype.$scrollTracker.addComponentsToScrollTrackers(components);
      },
    );

    getEventBus().$on(
      REMOVE_COMPONENTS,
      (
        components: Array<IAbstractScrollComponent> | { [key: string]: IAbstractScrollComponent },
      ) => {
        Vue.prototype.$scrollTracker.removeComponentsFromScrollTracker(components);
      },
    );
  },
};
