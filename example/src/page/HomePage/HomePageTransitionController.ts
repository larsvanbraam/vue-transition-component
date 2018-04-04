import { TimelineLite, TimelineMax } from 'gsap';
import AbstractVueTransitionController from "../../../../src/lib/util/AbstractVueTransitionController";

export default class HomePageTransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.fromTo(
      this.parentController.$el,
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      },
    );
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    console.log(timeline);
  }
}
