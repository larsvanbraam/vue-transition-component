import VueTypes from 'vue-types';
import AbstractTransitionComponent from './AbstractTransitionComponent';

export default {
  name: 'AbstractScrollComponent',
  extends: AbstractTransitionComponent,
  props: {
    addToScrollTracker: VueTypes.bool.def(true),
    transitionInThreshold: VueTypes.number.def(0),
    inViewProgressThreshold: VueTypes.number.def(0),
  },
  data() {
    return {
      inView: false,
    };
  },
  created() {
    this.currentViewProgress = 0;
    this.hasEntered = false;
  },
  methods: {
    enterView() {
      this.inView = true;
      return this.transitionIn().then(() => this.startLoopingAnimation());
    },
    leaveView() {
      this.inView = false;
      this.stopLoopingAnimation();
    },
    beyondView() {
      if (!this.hasEntered) {
        this.transitionIn();
      }
    },
    // eslint-disable-next-line
    inViewProgress(progress) {},
  },
};
