import { TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';
import { IAbstractTransitionComponent } from '../../../../src/lib/interface/IAbstractTransitionComponent';

export default class DummyComponentATransitionController extends AbstractVueTransitionController {
  /**
   * Use this method to setup your transition in timeline
   *
   * @protected
   * @method setupTransitionInTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupTransitionInTimeline(
    timeline:TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {
    timeline.fromTo(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        xPercent: 100,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: Expo.easeOut,
      },
    );
    timeline.add(this.getTimeline('infoBox'));
  }

  /**
   * Use this method to setup your transition out timeline
   *
   * @protected
   * @method setupTransitionOutTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupTransitionOutTimeline(
    timeline:TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {
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
   * Use this method to setup your looping timeline
   *
   * @protected
   * @method setupLoopingAnimationTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupLoopingAnimationTimeline(
    timeline:TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {}
}
