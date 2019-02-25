import DummyScrollComponentATransitionController from './DummyScrollComponentATransitionController';
import AbstractScrollComponent from '../../../../src/lib/mixin/AbstractScrollComponent';

export default {
  name: 'DummyScrollComponentA',
  extends: AbstractScrollComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyScrollComponentATransitionController(this);
      this.isReady();
    },
  },
};
