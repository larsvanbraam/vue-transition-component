import AbstractPageTransitionComponent from './AbstractPageTransitionComponent';
import { getEventBus } from '../../lib/scrollTrackerPlugin';
import { REMOVE_COMPONENTS } from '../eventbus/scrollTrackerEvents';

export default {
  name: 'AbstractPageScrollComponent',
  extends: AbstractPageTransitionComponent,
  beforeDestroy() {
    getEventBus().$emit(REMOVE_COMPONENTS, this.scrollComponents);
  },
  beforeCreate() {
    this.scrollComponents = {};
  },
  methods: {
    onBeforeRouteUpdate(to, from) {
      if (to.path !== from.path) {
        getEventBus().$emit(REMOVE_COMPONENTS, this.scrollComponents);
        this.scrollComponents = {};
      }
    },
    handleScrollComponentReady(component) {
      // keep reference of the scroll-components
      if (component.addToScrollTracker) {
        this.scrollComponents[component.componentId] = component;
      }
    },
  },
};
