import AbstractRegistrableComponent from '../../../../src/lib/mixin/AbstractRegistrableComponent';

export default {
	name: 'ChildComponentC',
	extends: AbstractRegistrableComponent,
	template: `<div>ChildComponentC</div>`,
	methods: {
		handleAllComponentsReady() {
			this.isReady();
		},
	},
};
