import hljs from "highlight.js";
import AbstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent';
import HomePageTransitionController from './HomePageTransitionController';

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
