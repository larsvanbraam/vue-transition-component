import {
  AbstractPageScrollComponent,
  getEventBus,
  ADD_COMPONENTS,
} from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

// @vue/component
export default {
  name: '{{name_pc}}',
  extends: AbstractPageScrollComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new {{name_pc}}TransitionController(this);

      // When all components are ready we start adding the scrollComponents to the scroll tracker
      getEventBus().$emit(ADD_COMPONENTS, this.scrollComponents);

      this.isReady();
    },
  },
};
