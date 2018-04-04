import DummyComponentATransitionController from "./DummyComponentATransitionController";
import AbstractTransitionComponent from "../../../../src/lib/mixin/AbstractTransitionComponent";
import DummyComponentB from "../DummyComponentB";

export default {
  name: 'DummyComponentA',
  extends: AbstractTransitionComponent,
  components: {
    DummyComponentB,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyComponentATransitionController(this);
      this.isReady();
    }
  },
};
