import { IAbstractTransitionComponent } from './IAbstractTransitionComponent';

/**
 * The AbstractScrollComponent is the base of all scroll Vue.js components.
 * it contains methods that are triggered via the scroll-tracker-component manager that are executed on leave/enter
 * of the component in the view.
 */
export interface IAbstractScrollComponent extends IAbstractTransitionComponent {
  /**
   * Where we will store the progress of its visibility.
   */
  currentViewProgress: number;
  /**
   * By default set to false. Will be set to value if it has passed the viewport once already.
   */
  hasEntered: boolean;
  /**
   */
  inView: boolean;

  /**
   * Is triggered when the component is within the viewport.
   */
  enterView(): void;

  /**
   * Is triggered when the component has left the viewport.
   */
  leaveView(): void;

  /**
   * Is triggered everytime it is already scrolled passed a component, or when you would load a page while the
   * scrollbar is already at the bottom or passed a component.
   */
  beyondView(): void;

  /**
   * Is triggered every time the scroll-position changes and your component is within the viewport. This method will
   * have the parameter progress which is a number between 0-1
   * @param progress
   */
  inViewProgress(progress: number): void;
}
