import AbstractTransitionController, { TransitionDirection } from 'transition-controller';
import { TimelineLite, TimelineMax } from 'gsap';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';

export default class AbstractVueTransitionController<T> extends AbstractTransitionController<T> {
  /**
   * @protected
   * @abstract getSubTimelineByComponent
   * @param {string | HTMLElement | T} component
   * @param {TransitionDirection} direction
   * @returns {gsap.TimelineLite | gsap.TimelineMax}
   */
  protected getSubTimelineByComponent(
    component: string | HTMLElement | T,
    direction: TransitionDirection,
  ): TimelineLite | TimelineMax {
    let instance: T;

    if (isElement(component)) {
      instance = this.parent.$children.find(child => child.$el === component);
    } else if (isString(component)) {
      instance = this.parent.$children.find(child => child.$_componentId === component);
    } else {
      instance = component;
    }

    if (direction === TransitionDirection.IN) {
      return instance.transitionController.transitionInTimeline;
    }
    return instance.transitionController.transitionOutTimeline;
  }
}
