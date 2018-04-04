import AbstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent';
import AboutPageTransitionController from "./AboutPageTransitionController";

export default {
  name: 'AboutPage',
  extends: AbstractPageTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new AboutPageTransitionController(this);
      this.isReady();
    }
  },
};
