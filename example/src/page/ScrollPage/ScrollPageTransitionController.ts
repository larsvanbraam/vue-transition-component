import { TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';
import { IAbstractTransitionComponent } from '../../../../src';

export default class ScrollPageTransitionController extends AbstractVueTransitionController {

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string): void {
    timeline.fromTo(parent.$el, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionOutTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string): void {
    timeline.to(parent.$el, 0.5, { autoAlpha: 1 });
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string): void {
  }
}
