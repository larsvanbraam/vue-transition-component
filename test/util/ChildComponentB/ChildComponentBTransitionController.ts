import AbstractVueTransitionController from '../../../src/lib/util/AbstractVueTransitionController';
import { TimelineMax } from 'gsap';

class ChildComponentBTransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @description overwrite this method in the parent class
   */
  protected setupTransitionInTimeline(): void {
    this.transitionInTimeline.fromTo(
      this.parentController.$el,
      0.1,
      { autoAlpha: 0 },
      { autoAlpha: 1 },
    );
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @description overwrite this method in the parent class
   * */
  protected setupTransitionOutTimeline(timeline: TimelineMax): void {
    const subTimeline = new TimelineMax();
    subTimeline.to(document.createElement('div'), 0.1, { autoAlpha: 0 });

    timeline.to(this.parentController.$el, 0.1, { autoAlpha: 0 });
    timeline.add(subTimeline);
  }

  /**
   * @public
   * @method stopLoopingAnimation
   * @description Stop the looping animations on the current component
   */
  protected setupLoopingAnimationTimeline(timeline: TimelineMax): void {}
}

export default ChildComponentBTransitionController;
