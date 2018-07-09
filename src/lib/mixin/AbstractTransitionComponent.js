import AbstractRegistrableComponent from './AbstractRegistrableComponent';

export default {
  name: 'AbstractTransitionComponent',
  extends: AbstractRegistrableComponent,
  beforeCreate() {
    this.transitionController = null;
  },
  destroy() {
    if (this.transitionController) {
      this.transitionController.dispose();
      this.transitionController = null;
    }
  },
  methods: {
    transitionIn(forceTransition) {
      return this.allComponentsReady.then(() =>
        this.transitionController.transitionIn(forceTransition),
      );
    },
    transitionOut(forceTransition, id, reset) {
      return this.transitionController.transitionOut(forceTransition, id, reset);
    },
    startLoopingAnimation(id, reset) {
      this.transitionController.startLoopingAnimation(id, reset);
    },
    stopLoopingAnimation() {
      this.transitionController.stopLoopingAnimation();
    },
  },
};
