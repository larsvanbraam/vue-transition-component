import AbstractTransitionController from '../../src/lib/util/AbstractTransitionController';

class DummyTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.from(this.viewModel.$el, 0.5, { autoAlpha: 0 });
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionOutTimeline(): void {

	}
}

export default DummyTransitionController;