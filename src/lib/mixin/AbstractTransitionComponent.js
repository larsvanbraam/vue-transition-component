import AbstractRegistrableComponent from './AbstractRegistrableComponent';

export default {
  name: 'AbstractTransitionComponent',
  extends: AbstractRegistrableComponent,
  beforeCreate() {
    this.transitionController = null;
  },
  methods: {
    transitionIn(forceTransition) {
      return this.allComponentsReady.then(() =>
        this.transitionController.transitionIn(forceTransition),
      );
    },
    transitionOut(forceTransition) {
      return this.transitionController.transitionOut(forceTransition);
    },
    startLoopingAnimation() {
      this.transitionController.startLoopingAnimation();
    },
    stopLoopingAnimation() {
      this.transitionController.stopLoopingAnimation();
    },
  },
  beforeDestroy() {
    if (this.transitionController) {
      this.transitionController.dispose();
      this.transitionController = null;
    }
  },
};
