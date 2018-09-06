import AbstractTransitionComponent from '../../../src/lib/mixin/AbstractTransitionComponent';
import ChildComponentATransitionController from './ChildComponentATransitionController';
import ChildComponentB from '../ChildComponentB/ChildComponentB';

export default {
  name: 'ChildComponentA',
  extends: AbstractTransitionComponent,
  components: {
    ChildComponentB,
  },
  template: `<div>
    <ChildComponentB ref="ChildComponentB"/>
	</div>`,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ChildComponentATransitionController(this);
      this.isReady();
    },
  },
};
