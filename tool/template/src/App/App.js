import { FlowManager, AbstractRegistrableComponent } from 'vue-transition-component';

export default {
  name: 'App',
  extends: AbstractRegistrableComponent,
  methods: {
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
  },
};
