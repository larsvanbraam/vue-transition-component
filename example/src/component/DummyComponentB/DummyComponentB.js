import DummyComponentBTransitionController from "./DummyComponentBTransitionController";
import AbstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentB',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentBTransitionController(this);
      this.isReady();
    }
  },
};
