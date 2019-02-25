import AbstractPageScrollComponent from '../../../../src/lib/mixin/AbstractPageScrollComponent';
import ScrollPageTransitionController from './ScrollPageTransitionController';
import DummyScrollComponentA from '../../component/DummyScrollComponentA/DummyScrollComponentA';

export default {
  name: 'ScrollPage',
  extends: AbstractPageScrollComponent,
  components: {
    DummyScrollComponentA,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ScrollPageTransitionController(this);
      this.isReady();
    },
  },
};
