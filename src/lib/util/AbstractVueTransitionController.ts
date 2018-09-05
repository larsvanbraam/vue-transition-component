import AbstractTransitionController from 'transition-controller';
import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import { IAbstractTransitionComponent } from '../interface/IAbstractTransitionComponent';

export default abstract class AbstractVueTransitionController extends AbstractTransitionController<
  IAbstractTransitionComponent
> {
  /**
   * This method finds a component based on a string, a html element or the instance.
   *
   * @protected
   * @param {string | HTMLElement | IAbstractTransitionComponent} component The selector for the component
   * @returns {IAbstractTransitionComponent} The instance of the component you requested
   */
  protected getComponent(
    component: string | HTMLElement | IAbstractTransitionComponent,
  ): IAbstractTransitionComponent {
    let instance: IAbstractTransitionComponent;

    if (isElement(component)) {
      instance = <IAbstractTransitionComponent>this.parentController.$children.find(
        child => child.$el === component,
      );
    } else if (isString(component)) {
      const instances = (<Array<IAbstractTransitionComponent>>this.parentController.$children)
        .map(
          (child: IAbstractTransitionComponent) => (child.componentId === component ? child : null),
        )
        .filter((child: IAbstractTransitionComponent) => child !== null);

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

    return instance;
  }
}
