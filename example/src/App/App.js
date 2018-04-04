import AbstractRegistrableComponent from "../../../src/lib/mixin/AbstractRegistrableComponent";
import FlowManager from '../../../src/lib/util/FlowManager';

export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  methods: {
    handleAllComponentsReady() {
      this.isReady();
    },
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
};
