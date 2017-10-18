import { getApplication, getChildComponent, getTransitionController } from './util/app/App';
import { expect } from 'chai';
import {} from 'mocha';
import { Promise } from 'es6-promise';
import AbstractTransitionController from '../src/lib/util/AbstractTransitionController';
import IAbstractTransitionComponent from '../src/lib/interface/IAbstractTransitionComponent';

describe('AbstractTransitionControllerSpec', () => {
	let app: any;

	beforeEach(() => {
		// Create a new main app for every test
		app = getApplication();
	});

	describe('transitioning', () => {
		it('should transitionIn the component', () => {
			return getTransitionController(app, 'ChildComponentA')
				.then(controller => controller.transitionIn())
				.then(result => expect(result).to.be.undefined);
		});

		it('should try and interrupt a transition in but wait for it to be completed', () => {
			let transitionController;

			getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => transitionController.transitionIn())
				.then(() => {
					transitionController.transitionOut();
					// interrupt the out animation with a new in animation
					return new Promise((resolve) => {
						setTimeout(() => transitionController.transitionIn().then(() => resolve()), 1);
					});
				})
				.then((result) => {
					expect(result).to.be.undefined;
				});
		});

		it('should try and interrupt a transition in but not wait for it to be completed', () => {
			let transitionController;

			getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => transitionController.transitionIn())
				.then(() => {
					transitionController.transitionOut();
					// interrupt the out animation with a new in animation
					return new Promise((resolve) => {
						setTimeout(() => transitionController.transitionIn(true).then(() => resolve()), 1);
					});
				})
				.then((result) => {
					expect(result).to.be.undefined;
				});
		});

		it('should not transition out since it\'s already transitioned out', () => {
			return getTransitionController(app, 'ChildComponentA')
				.then(controller => controller.transitionOut())
				.then(result => expect(result).to.be.undefined);
		});

		it('should transition out the component', () => {
			let transitionController;

			return getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => transitionController.transitionIn())
				.then(() => transitionController.transitionOut())
				.then(result => expect(result).to.be.undefined);
		});

		it('should try and interrupt a transition out but wait for it to be completed', () => {
			let transitionController;

			getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => {
					transitionController.transitionIn();
					// interrupt the out animation with a new in animation
					return new Promise((resolve) => {
						setTimeout(() => transitionController.transitionOut().then(() => resolve()), 1);
					});
				})
				.then(result => expect(result).to.be.undefined);
		});

		it('should try and interrupt a transition out but not wait for it to be completed', () => {
			let transitionController;

			getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => {
					transitionController.transitionIn();
					// interrupt the out animation with a new in animation
					return new Promise((resolve) => {
						setTimeout(() => transitionController.transitionOut(true).then(() => resolve()), 1);
					});
				})
				.then(result => expect(result).to.be.undefined);
		});
	});

	describe('SubTimelines', () => {
		it('should try to get a transition in sub-timeline', () => {
			getTransitionController(app, 'ChildComponentA')
				.then(transitionController => transitionController.getSubTimeline('ChildComponentB'))
				.then(timeline => expect(timeline).to.be.a('object'));
		});

		it('should throw an error because that component does not exist', () => {
			getTransitionController(app, 'ChildComponentA')
				.then(controller => controller.getSubTimeline('FooComponent'))
				.catch(result => expect(result).to.be.an('error'));
		});

		it('should try to get a transition out sub-timeline', () => {
			getTransitionController(app, 'ChildComponentA')
				.then(controller => controller.getSubTimeline('ChildComponentB', AbstractTransitionController.OUT))
				.then(timeline => expect(timeline).to.be.a('object'));
		});

		it('should try to get the sub-timeline duration', () => {
			getTransitionController(app, 'ChildComponentA')
				.then(controller => controller.getSubTimelineDuration('ChildComponentB', AbstractTransitionController.IN))
				.then(duration => expect(duration).to.equal(0.1));
		});
	});

	describe('Disposing', () => {
		it('should dispose the transition controller and mark it as disposed', () => {
			let transitionController;
			getTransitionController(app, 'ChildComponentA')
				.then(controller => transitionController = controller)
				.then(() => transitionController.dispose())
				.then(() => expect(transitionController.isDisposed()).to.equal(true));
		});

		it('when it\'s still transitioning out should return a promise and dispose it when it\'s done', () => {
			getTransitionController(app, 'ChildComponentA')
				.then((controller) => {
					return controller.transitionIn()
						.then(() => {
							controller.transitionOut();
							controller.dispose();
							expect(controller.isDisposed()).to.equal(true);
						});
				});
		});
	});
});
