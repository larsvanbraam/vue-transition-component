import { AbstractTransitionController } from 'vue-transition-component';
import { TimelineLite, TimelineMax } from 'gsap';

export default class {{name_pc}}TransitionController extends AbstractTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {TimelineLite | TimelineMax} timeline
   * @description Use this method to setup your transition in timeline
   **/
  protected setupTransitionInTimeline(timeline:TimelineLite|TimelineMax): void {
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {TimelineLite | TimelineMax} timeline
   * @description Use this method to setup your transition out timeline
   **/
  protected setupTransitionOutTimeline(timeline:TimelineLite|TimelineMax): void {
  }
}
