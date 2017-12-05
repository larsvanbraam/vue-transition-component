import { Promise } from 'es6-promise';
import AbstractTransitionController from '../util/AbstractTransitionController';
import IAbstractRegistrableComponent from './IAbstractRegistrableComponent';

interface IAbstractTransitionComponent extends IAbstractRegistrableComponent {
	/**
	 * @public
	 * @property transitionController
	 * @description The transition controller for the component
	 */
	transitionController: AbstractTransitionController;
	/**
	 * @public
	 * @method transitionIn
	 * @description The main transitionIn method for the component
	 * @param forceTransition Add this flag if you want to overwrite any active transitions
	 * @returns A promise that will be resolved when the transition in timeline is completed
	 */
	transitionIn(forceTransition?: boolean):Promise<void>;
	/**
	 * @public
	 * @method transitionOut
	 * @description The main transitionOut method for the component
	 * @param forceTransition Add this flag if you want to overwrite any active transitions
	 * @returns A promise that will be resolved when the transition in timeline is completed
	 */
	transitionOut(forceTransition?: boolean):Promise<void>;
}

export default IAbstractTransitionComponent;
