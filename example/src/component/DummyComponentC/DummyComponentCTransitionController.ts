import gsap, { Expo } from 'gsap';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';
import { IAbstractTransitionComponent } from '../../../../src';

export default class DummyComponentCTransitionController extends AbstractVueTransitionController {
  /**
   * @protected
   * @method setupTransitionInTimeline
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   */
  protected setupTransitionInTimeline(timeline: gsap.core.Timeline, parent: IAbstractTransitionComponent): void {
    timeline.fromTo(
      parent.$el,
      0.5,
      {
        autoAlpha: 0,
        xPercent: -100,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @protected
   * @method setupTransitionOutTimeline
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   */
  protected setupTransitionOutTimeline(timeline: gsap.core.Timeline, parent: IAbstractTransitionComponent): void {
    timeline.to(
      parent.$el,
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
  protected setupLoopingAnimationTimeline(timeline: gsap.core.Timeline): void {
  }
}
