import { AbstractTransitionComponent }from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

export default {
	name: '{{name_pc}}',
	extends: AbstractPageTransitionComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new {{name_pc}}TransitionController(this, this);
			this.isReady();
		},
	},
};
