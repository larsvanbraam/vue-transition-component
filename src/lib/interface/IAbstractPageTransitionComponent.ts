import FlowType from '../enum/FlowType';
import { IAbstractTransitionComponent } from './IAbstractTransitionComponent';

/**
 * Transition pages are basically the same as transition components the only difference is
 * they are linked to the vue-router and the transitionIn and transitionOut methods will be
 * called when the changes.
 */
export interface IAbstractPageTransitionComponent extends IAbstractTransitionComponent {
  /**
   * The promised used for hijacking the transition in
   *
   * @public
   */
  transitionInHijack: Promise<void>;

  /**
   * Sometimes you might want to hijack the page transitionIn, this method allows you to do it.
   * Call the method, do your pre-transitionIn code and release the flow.
   *
   * @public
   */
  hijackTransitionIn(): Promise<(release: () => void) => void>;

  /**
   * The flow of the page transition, see the FlowTypes file for the options
   *
   * @public
   */
  flow: FlowType;
}
