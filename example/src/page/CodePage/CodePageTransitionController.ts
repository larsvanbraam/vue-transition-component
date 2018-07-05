import { TimelineLite, TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';
import { IAbstractTransitionComponent } from '../../../../src/lib/interface/IAbstractTransitionComponent';

export default class CodepageTransitionController extends AbstractVueTransitionController {

  /**
   * @protected
   * @param {TimelineLite | TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionInTimeline(
    timeline: TimelineLite | TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {
    timeline.fromTo(
      parent.$el,
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
    // if a ref is provided you can use this to retrieve the subTimeline
    timeline.add(this.getTimeline('infoBoxA'));
    // You can also retrieve the subTimeline by providing a reference to the TransitionComponent
    timeline.add(
      this.getTimeline(<IAbstractTransitionComponent>parent.$refs.infoBoxB),
    );
    // If no ref is provided you can fetch the component by the ComponentName
    timeline.add(this.getTimeline('DummyComponentC'));
  }

  /**
   * @protected
   * @param {TimelineLite | TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionOutTimeline(
    timeline: TimelineLite | TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {
    timeline.to(parent.$el, 0.5, {
      scale: 2,
      autoAlpha: 0,
      ease: Expo.easeIn,
    });
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupLoopingAnimationTimeline(
    timeline:TimelineMax,
    parent:IAbstractTransitionComponent,
    id:string): void {}
}
