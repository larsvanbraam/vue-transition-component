import DummyComponentCTransitionController from "./DummyComponentCTransitionController";
import AbstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";

export default {
  name: 'DummyComponentC',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentCTransitionController(this);
      this.isReady();
    }
  },
};
