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
      element: '$el',
      enterViewThreshold: 'transitionInThreshold',
      componentId: 'componentId',
      setDebugLabel: true,
      debugBorderColor: 'red',
      resizeDebounce: 100,
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
