import AbstractTransitionComponent from '../../../../src/lib/mixin/AbstractTransitionComponent';
import ChildComponentBTransitionController from './ChildComponentBTransitionController';

export default {
	name: 'ChildComponentB',
	extends: AbstractTransitionComponent,
	template: `<div>ChildComponentB</div>`,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ChildComponentBTransitionController(this);
			this.isReady();
		},
	},
};
