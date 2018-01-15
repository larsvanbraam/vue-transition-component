import AbstractTransitionComponent from '../../../../src/lib/mixin/AbstractTransitionComponent.js';
import ChildComponentATransitionController from './ChildComponentATransitionController';
import ChildComponentB from '../child-component-b/ChildComponentB';

export default {
	name: 'ChildComponentA',
	extends: AbstractTransitionComponent,
	components: {
		ChildComponentB,
	},
	template: `<div>
		<ChildComponentB componentId="ChildComponentB"/>
	</div>`,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ChildComponentATransitionController(this);
			this.isReady();
		},
	},
};
