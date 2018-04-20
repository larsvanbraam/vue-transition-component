import AbstractTransitionController, { TransitionDirection } from 'transition-controller';
import { TimelineLite, TimelineMax } from 'gsap';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import { IAbstractTransitionComponent } from '../interface/IAbstractTransitionComponent';

export default abstract class AbstractVueTransitionController extends AbstractTransitionController<
  IAbstractTransitionComponent
> {
  /**
   * @protected
   * @abstract getTimelineForComponent
   * @param {string | HTMLElement | T} component
   * @param {TransitionDirection} direction
   * @returns {gsap.TimelineLite | gsap.TimelineMax}
   */
  protected getTimelineForComponent(
    component: string | HTMLElement | IAbstractTransitionComponent,
    direction: TransitionDirection = TransitionDirection.IN,
  ): TimelineLite | TimelineMax {
    let instance: IAbstractTransitionComponent;

    if (isElement(component)) {
      instance = <IAbstractTransitionComponent>this.parentController.$children.find(
        child => child.$el === component,
      );
    } else if (isString(component)) {
      const instances = this.parentController.$children
        .map(
          (child: IAbstractTransitionComponent) => (child.componentId === component ? child : null),
        )
        .filter(value => value !== null);

      if (instances.length > 1) {
        throw new Error(
          `Found multiple components matching [${component}], use a unique ref when requesting a component with an id`,
        );
      }

      instance = instances.pop();
    } else {
      instance = <IAbstractTransitionComponent>component;
    }

    if (instance === undefined) {
      throw new Error(`The requested component [${component}] does not exist`);
    }

    if (direction === TransitionDirection.IN) {
      return instance.transitionController.transitionInTimeline;
    }

    return instance.transitionController.transitionOutTimeline;
  }
}
