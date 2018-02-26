import AbstractTransitionController, { TransitionDirection } from 'transition-controller';
import { TimelineLite, TimelineMax } from 'gsap';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import IAbstractTransitionComponent from '../interface/IAbstractTransitionComponent';

export default abstract class AbstractVueTransitionController extends AbstractTransitionController<
  IAbstractTransitionComponent
> {
  /**
   * @protected
   * @abstract getSubTimelineByComponent
   * @param {string | HTMLElement | T} component
   * @param {TransitionDirection} direction
   * @returns {gsap.TimelineLite | gsap.TimelineMax}
   */
  protected getSubTimelineByComponent(
    component: string | HTMLElement | IAbstractTransitionComponent,
    direction: TransitionDirection,
  ): TimelineLite | TimelineMax {
    let instance: IAbstractTransitionComponent;

    if (isElement(component)) {
      instance = <IAbstractTransitionComponent>this.parentController.$children.find(
        child => child.$el === component,
      );
    } else if (isString(component)) {
      instance = <IAbstractTransitionComponent>this.parentController.$children.find(
        (child: IAbstractTransitionComponent) => child.$_componentId === component,
      );
    } else {
      instance = <IAbstractTransitionComponent>component;
    }

    if (instance === undefined) {
      throw new Error('Unable to find the requested component timeline');
    }

    if (direction === TransitionDirection.IN) {
      return instance.transitionController.transitionInTimeline;
    }

    return instance.transitionController.transitionOutTimeline;
  }
}
