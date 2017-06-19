import AbstractTransitionController from '../../src/lib/util/AbstractTransitionController';
import { TimelineLite } from 'gsap';

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
		const timeline = new TimelineLite()
		timeline.to(document.createElement('div'), 0.5, { autoAlpha: 0 });

		this.transitionOutTimeline.to(this.viewModel.$el, 0.5, { autoAlpha: 0 });
		this.transitionOutTimeline.add(timeline);
	}
}

export default DummyTransitionController;