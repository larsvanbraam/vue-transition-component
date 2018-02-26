import AbstractTransitionComponent from './AbstractTransitionComponent';

// TODO: Disabled because of ts imports inside of js files
import FlowType from '../enum/FlowType'; // eslint-disable-line
import FlowManager from '../util/FlowManager'; // eslint-disable-line

export default {
  name: 'AbstractPageTransitionComponent',
  extends: AbstractTransitionComponent,
  beforeCreate() {
    this.flow = FlowType.NORMAL;
    this.$_transitionInHijack = Promise.resolve();
  },
  methods: {
    hijackTransitionIn() {
      return new Promise(resolve => {
        this.$_transitionInHijack = new Promise(release => resolve(release));
      });
    },
  },
  /**
   * @description Before the route is entered we trigger the transition in
   * @param to
   * @param from
   * @param next
   */
  beforeRouteEnter(to, from, next) {
    /* istanbul ignore next */
    next(vm => {
      Promise.all([FlowManager.flowHijacked, vm.$_transitionInHijack]).then(() => {
        if (vm.$parent && vm.$parent.$_allComponentsReady) {
          vm.$parent.$_allComponentsReady.then(() => vm.transitionIn());
        } else {
          vm.transitionIn();
        }
      });
    });
  },
  /**
   * @description This method is triggered when we navigate to a sub-page of the current existing page
   * @param to
   * @param from
   * @param next
   */
  beforeRouteUpdate(to, from, next) {
    // Find the old reference and remove it
    /* istanbul ignore next */
    if (to.name === this.componentId) {
      const index = this.$_registeredComponents.findIndex(
        component => component.$_componentId === from.name,
      );
      if (index > -1) {
        this.$_registeredComponents.splice(index);
      }
    }
    // Release the before update hook
    next();
  },
  /**
   * @description This method handles the default page switches
   * @param to
   * @param from
   * @param next
   */
  beforeRouteLeave(to, from, next) {
    /* istanbul ignore next */
    to.matched.forEach((routeObject, index) => {
      if (index === to.matched.length - 1) {
        if (routeObject.beforeEnter) {
          routeObject.beforeEnter(to, from, guardResolveValue => {
            if (guardResolveValue === from.path) {
              next(false);
            } else {
              FlowManager.start(this, next, to);
            }
          });
        } else {
          FlowManager.start(this, next, to);
        }
      }
    });
  },
};
