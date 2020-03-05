import { Direction } from 'scroll-tracker-component-manager';
import DummyScrollComponentATransitionController from './DummyScrollComponentATransitionController';
import AbstractScrollComponent from '../../../../src/lib/mixin/AbstractScrollComponent';

export default {
  name: 'DummyScrollComponentA',
  extends: AbstractScrollComponent,
  data() {
    return {
      progress: 0,
      direction: Direction.FORWARD,
    };
  },
  methods: {
    inViewProgress(progress) {
      this.direction = this.scrollDirection;
      this.progress = progress;
    },
    handleAllComponentsReady() {
      this.transitionController = new DummyScrollComponentATransitionController(this);
      this.isReady();
    },
  },
};
