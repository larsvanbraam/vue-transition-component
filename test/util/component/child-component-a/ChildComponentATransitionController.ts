import AbstractTransitionController from '../../../../src/lib/util/AbstractTransitionController';

class ChildComponentATransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(this.viewModel.$el, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 });
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionOutTimeline(): void {

	}
}

export default ChildComponentATransitionController;
