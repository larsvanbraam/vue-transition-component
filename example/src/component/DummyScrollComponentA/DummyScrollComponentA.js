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
    // eslint-disable-next-line
    inViewProgress(progress) {
      // this.$refs.progress.style.width = `${progress * 100}%`;
      this.progress = this.currentViewProgress;
    },
    handleAllComponentsReady() {
      this.transitionController = new DummyScrollComponentATransitionController(this);
      this.isReady();
    },
  },
};
