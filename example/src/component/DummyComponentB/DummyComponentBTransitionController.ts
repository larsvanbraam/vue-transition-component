import { TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from "../../../../src/lib/util/AbstractVueTransitionController";

export default class DummyComponentBTransitionController extends AbstractVueTransitionController {
  /**
   * @protected
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionInTimeline(timeline: TimelineMax): void {
    timeline.fromTo(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        yPercent: 100,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @protected
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionOutTimeline(timeline: TimelineMax): void {
    timeline.to(
      this.parentController.$el,
      0.5,
      {
        scale: 2,
        autoAlpha: 0,
      },
    );
  }

  /**
   * @protected
   * @method setupLoopingAnimationTimeline
   * @param {TimelineMax} timeline
   * @description Use this method to setup your looping timeline
   **/
  protected setupLoopingAnimationTimeline(timeline:TimelineMax): void {
  }
}
