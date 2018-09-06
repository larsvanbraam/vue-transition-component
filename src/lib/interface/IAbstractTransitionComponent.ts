import AbstractVueTransitionController from '../util/AbstractVueTransitionController';
import { IAbstractRegistrableComponent } from './IAbstractRegistrableComponent';

/**
 * The AbstractTransitionComponent is the base of all transitioning Vue.js components.
 * It contains the transition controller and will add the required transition methods to your component.
 */
export interface IAbstractTransitionComponent extends IAbstractRegistrableComponent {
  /**
   * This is the instance of the transition controller that contains your timelines.
   *
   * @public
   */
  transitionController: AbstractVueTransitionController;

  /**
   * Calling transition in will trigger transitionIn on your transition controller and
   * start the desired timeline.
   *
   * @public
   * @param {boolean} forceTransition Add this flag if you want to overwrite any active transitions
   * @returns {Promise<void>} A promise that will be resolved when the transition in is completed
   */
  transitionIn(forceTransition?: boolean): Promise<void>;

  /**
   * Calling transition out will trigger transitionOut on your transition controller and
   * start the desired timeline.
   *
   * @public
   * @method transitionOut
   * @param {boolean} forceTransition Add this flag if you want to overwrite any active transitions
   * @param {boolean} id This is the id of the transition out timeline that you want to play
   * @param {boolean} reset If the reset flag is set to true it will re-initialize the current timeline
   * @returns {Promise<void>} A promise that will be resolved when the transition out is completed
   */
  transitionOut(forceTransition?: boolean, id?: string, reset?: boolean): Promise<void>;

  /**
   * Start the looping animations on the current component
   *
   * @public
   * @param {boolean} id This is the id of the transition out timeline that you want to play
   * @param {boolean} reset If the reset flag is set to true it will re-initialize the current timeline
   */
  startLoopingAnimation(id?: string, reset?: boolean): void;

  /**
   * This will stop the current looping animation, keep in mind it will not reset it just stop at the current state.
   *
   * @public
   */
  stopLoopingAnimation(): void;
}
