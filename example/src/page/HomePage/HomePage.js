import hljs from "highlight.js";
import HomePageTransitionController from './HomePageTransitionController';
import AbstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent';

export default {
  name: 'HomePage',
  extends: AbstractPageTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this);
      this.$el.querySelectorAll('pre').forEach(code => hljs.highlightBlock(code));
      this.isReady();
    },
  },
};
