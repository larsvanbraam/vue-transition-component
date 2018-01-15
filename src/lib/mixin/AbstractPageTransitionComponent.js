/* eslint-disable import/no-unresolved */
import AbstractTransitionComponent from './AbstractTransitionComponent';
import ComponentType from '../enum/ComponentType.ts';
import FlowType from '../enum/FlowType.ts';
import FlowManager from '../util/FlowManager.ts';
import { COMPONENT_ID } from '../mixin/AbstractRegistrableComponent';

export default {
  name: 'AbstractPageTransitionComponent',
  extends: AbstractTransitionComponent,
  beforeCreate() {
    this.componentType = ComponentType.PAGE_COMPONENT;
    this.flow = FlowType.NORMAL;
    this.transitionInHijack = Promise.resolve();
  },
  methods: {
    hijackTransitionIn() {
      return new Promise(resolve => {
        this.transitionInHijack = new Promise(release => resolve(release));
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
      Promise.all([FlowManager.flowHijacked, vm.transitionInHijack]).then(() => {
        if (vm.$parent && vm.$parent.allComponentsReady) {
          vm.$parent.allComponentsReady.then(() => vm.transitionIn());
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
      const index = this.registeredComponents.findIndex(
        component => component[COMPONENT_ID] === from.name,
      );
      if (index > -1) {
        this.registeredComponents.splice(index);
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
      if (index === 0 && routeObject.beforeEnter) {
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
    });
  },
};
