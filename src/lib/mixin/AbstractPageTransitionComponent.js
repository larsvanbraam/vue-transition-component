import AbstractTransitionComponent from './AbstractTransitionComponent';
import FlowType from '../enum/FlowType';
import FlowManager from '../util/FlowManager';

export default {
  name: 'AbstractPageTransitionComponent',
  extends: AbstractTransitionComponent,
  beforeCreate() {
    this.flow = FlowType.NORMAL;
    this.transitionOnRouteUpdate = false;
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
   * @param to The route we are about to enter
   * @param from The route we left
   * @param next The method that releases the vue-router flow
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
   * @param to The route we are about to enter
   * @param from The route we left
   * @param next The method that releases the vue-router flow
   */
  beforeRouteUpdate(to, from, next) {
    // Find the old reference and remove it
    /* istanbul ignore next */
    if (to.name === this.componentId) {
      const index = this.registeredComponents.findIndex(
        component => component.componentId === from.name,
      );
      if (index > -1) {
        this.registeredComponents.splice(index);
      }
    }

    // - What we want: trigger a transition-out/in if you are changing the param of a child router-view.
    // - How to achieve: Not setting a :key to this router-view will not destroy the component and therefore we can
    // trigger a transitionOut and transitionIn again. But sometimes we don't want this, therefore is requires the flag 'transitionOnRouteUpdate'
    // - SideNote: if a :key is set to the router-view it will be destroyed && created again and therefore we can
    // run the transitionOut/In.
    if (
      to.matched[to.matched.length - 1].components.default.name === this.componentId &&
      !this._isDestroyed &&
      this.transitionOnRouteUpdate
    ) {
      this.transitionOut()
        .then(() => next())
        .then(() => {
          this.$nextTick(() => this.transitionIn());
        });
    } else {
      // Release the before update hook
      next();
    }
  },
  /**
   * @description This method handles the default page switches
   * @param to The route we are about to enter
   * @param from The route we left
   * @param next The method that releases the vue-router flow
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
              FlowManager.start(this, next, to, from);
            }
          });
        } else {
          FlowManager.start(this, next, to, from);
        }
      }
    });
  },
};
