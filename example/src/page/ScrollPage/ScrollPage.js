import AbstractPageScrollComponent from '../../../../src/lib/mixin/AbstractPageScrollComponent';
import ScrollPageTransitionController from './ScrollPageTransitionController';
import DummyScrollComponentA from '../../component/DummyScrollComponentA/DummyScrollComponentA';
import { getEventBus } from '../../../../src/scrollTrackerPlugin';
import { ADD_COMPONENTS } from '../../../../src/lib/eventbus/scrollTrackerEvents';

export default {
  name: 'ScrollPage',
  extends: AbstractPageScrollComponent,
  components: {
    DummyScrollComponentA,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ScrollPageTransitionController(this);

      // When all components are ready we start adding the scrollComponents to the scroll tracker
      getEventBus().$emit(ADD_COMPONENTS, this.scrollComponents);

      this.isReady();
    },
  },
};
