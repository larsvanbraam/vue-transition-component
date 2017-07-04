import { expect } from 'chai';
import ComponentType from '../src/lib/enum/ComponentType';
import * as Vue from 'vue';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';
import AbstractTransitionComponent from '../src/lib/mixin/AbstractTransitionComponent';
import AbstractTransitionController from '../src/lib/util/AbstractTransitionController';
import DummyChildTransitionController from './util/DummyChildTransitionController';
import DummyTransitionController from './util/DummyTransitionController';

describe('AbstractTransitionControllerSpec', () => {
	let dummyTransitionController: DummyTransitionController;
	let dummyChildComponent: any;
	let dummyChildTransitionController: DummyChildTransitionController;

	beforeEach(function () {
		dummyChildComponent = new Vue({
			name: 'ChildComponent',
			el: document.createElement('div'),
			extends: AbstractTransitionComponent,
			beforeCreate() {
				const self = <any>this;
				self.componentId = 'ChildComponent';
				self.componentType = ComponentType.TRANSITION_COMPONENT;
				self.transitionController = dummyChildTransitionController;
			},
		});
		dummyChildTransitionController = new DummyChildTransitionController(
			<IAbstractTransitionComponent>dummyChildComponent);
		dummyTransitionController = new DummyTransitionController(<IAbstractTransitionComponent>new Vue({
			name: 'DummyComponent',
			el: document.createElement('div'),
			extends: AbstractTransitionComponent,
			created() {
				this.$children.push(dummyChildComponent);
			},
		}));
	});

	describe('transitioning', () => {
		it('should transitionIn the component', () => {
			return dummyTransitionController.transitionIn();
		});

		it('should try and interrupt a transition in but wait for it to be completed', (done) => {
			dummyTransitionController.transitionIn();
			setTimeout(() => {
				dummyTransitionController.transitionOut()
					.then(() => done());
			}, 10);
		});

		it('should try and interrupt a transition in but not wait for it to be completed', (done) => {
			dummyTransitionController.transitionIn();
			setTimeout(() => {
				dummyTransitionController.transitionOut(true)
					.then(() => done());
			}, 10);
		});

		it('should not transition out since it\'s already transitioned out', () => {
			return dummyTransitionController.transitionOut();
		});

		it('should transition out the component', () => {
			return dummyTransitionController.transitionIn()
				.then(() => dummyTransitionController.transitionOut());
		});

		it('should try and interrupt a transition out but wait for it to be completed', (done) => {
			dummyTransitionController.transitionIn()
				.then(() => {
					dummyTransitionController.transitionOut();
					setTimeout(() => {
						dummyTransitionController.transitionIn()
							.then(() => done());
					}, 10);
				});
		});

		it('should try and interrupt a transition out but not wait for it to be completed', (done) => {
			dummyTransitionController.transitionIn()
				.then(() => {
					dummyTransitionController.transitionOut();
					setTimeout(() => {
						dummyTransitionController.transitionIn(true)
							.then(() => done());
					}, 10);
				});
		});

		it('should try and interrupt a transition in but not wait for it to be completed', (done) => {
			dummyTransitionController.transitionIn();
			setTimeout(() => {
				dummyTransitionController.transitionOut(true)
					.then(() => done());
			}, 10);
		});
	});

	describe('getSubTimeline', () => {
		it('should try to get a transition in sub-timeline', () => {
			expect(dummyTransitionController.getSubTimeline('ChildComponent', AbstractTransitionController.IN))
				.to.not.equal(undefined);
		});

		it('should throw an error because that component does not exist', () => {
			expect(() => dummyTransitionController.getSubTimeline('FooComponent', AbstractTransitionController.IN))
				.to.throw(Error);
		});

		it('should try to get a transition out sub-timeline', () => {
			expect(dummyTransitionController.getSubTimeline('ChildComponent', AbstractTransitionController.OUT))
				.to.not.equal(undefined);
		});
	});

	describe('getSubTimelineDuration', () => {
		it('should try to get a transition in sub-timeline duration', () => {
			expect(dummyTransitionController.getSubTimelineDuration('ChildComponent', AbstractTransitionController.IN))
				.to.equal(0.5);
		});

		it('should try to get a transition in sub-timeline duration', () => {
			expect(dummyTransitionController.getSubTimelineDuration('ChildComponent', AbstractTransitionController.OUT))
				.to.equal(1);
		});

	});

	describe('dispose', () => {
		it('should dispose the transition controller and mark it as disposed', () => {
			// Dispose the transition controller
			dummyTransitionController.dispose();
			expect(dummyTransitionController.isDisposed()).to.equal(true);
		});

		it('should dispose the child transition controller and mark it as disposed', () => {
			// Dispose the transition controller
			dummyChildTransitionController.dispose();
			expect(dummyChildTransitionController.isDisposed()).to.equal(true);
		});

		it('when it\'s still transitioning out should return a promise and dispose it when it\'s done', (done) => {
			// Trigger transition out
			dummyTransitionController.transitionIn()
				.then(() => {
					dummyTransitionController.transitionOut();

					// Dispose the controller
					dummyTransitionController.dispose();

					expect(dummyTransitionController.isDisposed()).to.equal(true);

					// Mark as done
					done();
				});
		});
	});
});
