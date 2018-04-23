import { TimelineLite, TimelineMax, Expo } from 'gsap';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';
import { IAbstractTransitionComponent } from '../../../../src/lib/interface/IAbstractTransitionComponent';

export default class CodepageTransitionController extends AbstractVueTransitionController {
  /**
   * @protected
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
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
    // if a ref is provided you can use this to retrieve the subTimeline
    timeline.add(this.getTimeline('infoBoxA'));
    // You can also retrieve the subTimeline by providing a reference to the TransitionComponent
    timeline.add(
      this.getTimeline(<IAbstractTransitionComponent>this.parentController.$refs.infoBoxB),
    );
    // If no ref is provided you can fetch the component by the ComponentName
    timeline.add(this.getTimeline('DummyComponentC'));
  }

  /**
   * @protected
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(this.parentController.$el, 0.5, {
      scale: 2,
      autoAlpha: 0,
      ease: Expo.easeIn,
    });
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
