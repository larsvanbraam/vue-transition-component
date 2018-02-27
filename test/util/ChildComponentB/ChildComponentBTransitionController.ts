import AbstractVueTransitionController from '../../../src/lib/util/AbstractVueTransitionController';
import { TimelineLite } from 'gsap';

class ChildComponentBTransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @description overwrite this method in the parent class
   */
  protected setupTransitionInTimeline(): void {
    this.transitionInTimeline.fromTo(this.parentController.$el, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 });
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @description overwrite this method in the parent class
   * */
  protected setupTransitionOutTimeline(): void {
    const timeline = new TimelineLite();
    timeline.to(document.createElement('div'), 0.1, { autoAlpha: 0 });

    this.transitionOutTimeline.to(this.parentController.$el, 0.1, { autoAlpha: 0 });
    this.transitionOutTimeline.add(timeline);
  }
}

export default ChildComponentBTransitionController;
