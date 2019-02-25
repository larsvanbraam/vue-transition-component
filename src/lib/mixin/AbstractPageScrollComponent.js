import { ScrollTrackerComponentManager } from 'scroll-tracker-component-manager';
import AbstractPageTransitionComponent from './AbstractTransitionComponent';

export default {
  name: 'AbstractPageScrollComponent',
  extends: AbstractPageTransitionComponent,
  beforeDestroy() {
    if (this.scrollTrackerComponentManager) {
      this.scrollTrackerComponentManager.dispose();
    }
  },
  beforeCreate() {
    // Create the scroll tracker manager
    this.scrollTrackerComponentManager = new ScrollTrackerComponentManager({
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
      // smooth scroll settings
      enableSmoothScroll: false,
      smoothScrollOptions: {
        damping: 0.2,
        thumbMinSize: 20,
        renderByPixels: true,
        alwaysShowTracks: false,
        wheelEventTarget: null,
        continuousScrolling: true,
        plugins: {},
      },
    });
  },
  methods: {
    addToScrollTracker(component) {
      if (this.scrollTrackerComponentManager) {
        this.scrollTrackerComponentManager.addComponentToScrollTracker(component);
      } else {
        console.warn(`The scrollTrackerComponentManager is not created, make sure to enable this`);
      }
    },
  },
};
