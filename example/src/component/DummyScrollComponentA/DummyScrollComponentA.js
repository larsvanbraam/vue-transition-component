import DummyScrollComponentATransitionController from './DummyScrollComponentATransitionController';
import AbstractScrollComponent from '../../../../src/lib/mixin/AbstractScrollComponent';

export default {
  name: 'DummyScrollComponentA',
  extends: AbstractScrollComponent,
  data() {
    return {
      progress: 0,
    };
  },
  methods: {
    inViewProgress(progress) {
      this.progress = progress;
    },
    handleAllComponentsReady() {
      this.transitionController = new DummyScrollComponentATransitionController(this);
      this.isReady();
    },
  },
};
