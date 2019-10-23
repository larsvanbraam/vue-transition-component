import { TimelineMax, Expo } from 'gsap';
import { IAbstractTransitionComponent } from '../../../../src/lib/interface/IAbstractTransitionComponent';
import AbstractVueTransitionController from '../../../../src/lib/util/AbstractVueTransitionController';

export default class DummyScrollComponentATransitionController extends AbstractVueTransitionController {
  /**
   * Use this method to setup your transition in timeline
   *
   * @protected
   * @method setupTransitionInTimeline
   * @param {TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupTransitionInTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string,
  ): void {
    if (id) {
      console.log(id);
    }
    const textContent = <HTMLElement>parent.$refs.textContent;
    const loopingTitle = <HTMLElement>parent.$refs.loopingTitle;
    const loopingAnimation = <HTMLElement>parent.$refs.loopingAnimation;

    timeline.from(parent.$refs.background, 1.2, { width: 0, ease: Expo.easeInOut, clearProps: 'width' });
    timeline.addLabel('afterBg', '-=0.6');

    timeline.from(textContent, 0.8, { opacity: 0 }, 'afterBg');
    timeline.from(textContent, 0.8, { y: 30, ease: Expo.easeOut, clearProps: 'all' }, 'afterBg');

    timeline.from(loopingTitle, 0.8, { opacity: 0 }, 'afterBg+=0.4');
    timeline.from(loopingTitle, 0.8, { y: 20, ease: Expo.easeOut }, 'afterBg+=0.4');

    timeline.from(loopingAnimation, 0.8, { opacity: 0 }, 'afterBg+=0.8');
    timeline.from(loopingAnimation, 0.8, { y: 20, ease: Expo.easeOut }, 'afterBg+=0.8');
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
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string): void {
    timeline.to(parent.$el, 0.8, { opacity: 0 });
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
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string): void {
    timeline.yoyo(true);

    timeline.to(parent.$refs.loopingAnimation, 1, { scale: .9, yPercent: 50, ease: Expo.easeInOut });
    timeline.to(parent.$refs.loopingAnimation, .5, { xPercent: 50, ease: Expo.easeInOut });
    timeline.to(parent.$refs.loopingAnimation, .5, { xPercent: -50, ease: Expo.easeInOut });

  }
}
