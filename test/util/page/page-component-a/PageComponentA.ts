import AbstractPageTransitionComponent from '../../../../src/lib/mixin/AbstractPageTransitionComponent.js';
import PageComponentATransitionController from './PageComponentATransitionController';

export default {
	name: 'PageComponentA',
	extends: AbstractPageTransitionComponent,
	template: `<div>PageAComponentA</div>`,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PageComponentATransitionController(this);
			this.isReady();
		},
	},
};
