import AbstractRegistrableComponent from '../../../src/lib/mixin/AbstractRegistrableComponent';
import FlowManager from '../../../src/lib/util/FlowManager';

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
