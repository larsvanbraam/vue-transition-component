import AbstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent';
import HomePageTransitionController from './HomePageTransitionController';

export default {
  name: 'HomePage',
  extends: AbstractPageTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this);
      this.isReady();
    },
  },
};
