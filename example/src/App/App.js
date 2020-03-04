import Vue from 'vue';
import { Axis } from 'scroll-tracker-component-manager';
import AbstractRegistrableComponent from '../../../src/lib/mixin/AbstractRegistrableComponent';
import FlowManager from '../../../src/lib/util/FlowManager';
import ScrollTrackerPlugin from '../../../src/lib/scrollTrackerPlugin';

export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  data() {
    return {
      mobileMenuActive: false,
      pageName: null,
    };
  },
  watch: {
    $route(value) {
      this.pageName = value.name;
    },
  },
  mounted() {
    const enableSmoothScroll = true;

    if (enableSmoothScroll) {
      document.body.classList.add('is-smooth-scroll');
    }

    Vue.use(ScrollTrackerPlugin, {
      config: {
        enableSmoothScroll,
        axis: Axis.Y,
        container: this.$refs.container,
        inViewProgressEnabled: true,
      },
    });
  },
  methods: {
    handleAllComponentsReady() {
      this.pageName = this.$router.currentRoute.name;
      this.isReady();
    },
    handleToggleMenu() {
      this.mobileMenuActive = !this.mobileMenuActive;
    },
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
};
