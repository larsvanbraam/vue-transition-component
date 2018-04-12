import { TimelineLite, TimelineMax, Expo } from 'gsap';
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
      0.5,
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(
      this.parentController.$el,
      0.5,
      {
        scale: 2,
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }

  /**
   * @public
   * @method setupLoopingAnimationTimeline
   * @param {TimelineMax} timeline
   * @description Use this method to setup your looping timeline
   **/
  protected setupLoopingAnimationTimeline(timeline:TimelineMax): void {
  }
}
