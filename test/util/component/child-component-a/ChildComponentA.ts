import ChildComponentB from '../child-component-b/ChildComponentB';
import AbstractTransitionComponent from '../../../../src/lib/mixin/AbstractTransitionComponent';
import ChildComponentATransitionController from './ChildComponentATransitionController';

export default {
	name: 'ChildComponentA',
	extends: AbstractTransitionComponent,
	components: {
		ChildComponentB,
	},
	template: `<div>
		<ChildComponentB componentId="ChildComponentB" />
	</div>`,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ChildComponentATransitionController(this);
			this.isReady();
		},
	},
};
