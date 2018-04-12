import AbstractVueTransitionController from '../../../src/lib/util/AbstractVueTransitionController';
import {TimelineLite, TimelineMax} from "gsap";

class ChildComponentATransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @description overwrite this method in the parent class
   */
  protected setupTransitionInTimeline(timeline:TimelineLite): void {
    timeline.fromTo(this.parentController.$el, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 });
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @description overwrite this method in the parent class
   * */
  protected setupTransitionOutTimeline(timeline: TimelineLite): void {}

  /**
   * @public
   * @method stopLoopingAnimation
   * @description Stop the looping animations on the current component
   */
  protected setupLoopingAnimationTimeline(timeline: TimelineMax): void {}
}

export default ChildComponentATransitionController;
