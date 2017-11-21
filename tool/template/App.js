import { FlowManager } from 'vue-transition-component';

export default {
	name: 'App',
	methods: {
		onLeave(element, done) {
			FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
		},
	},
};
