import ScrollPageTransitionController from './ScrollPageTransitionController';
import DummyScrollComponentA from '../../component/DummyScrollComponentA/DummyScrollComponentA';
import AbstractPageScrollComponent from '../../../../src/lib/mixin/AbstractPageScrollComponent';
import { ADD_COMPONENTS } from '../../../../lib/eventbus/scrollTrackerEvents';
import { getEventBus } from '../../../../src';

export default {
  name: 'ScrollPage',
  components: {
    DummyScrollComponentA,
  },
  extends: AbstractPageScrollComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ScrollPageTransitionController(this);

      // When all components are ready we start adding the scrollComponents to the scroll tracker
      getEventBus().$emit(ADD_COMPONENTS, this.scrollComponents);

      this.isReady();
    },
  },
};
