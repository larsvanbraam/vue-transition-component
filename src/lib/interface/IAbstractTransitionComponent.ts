import AbstractTransitionController from '../util/AbstractTransitionController';
import IAbstractRegistrableComponent from './IAbstractRegistrableComponent';

interface IAbstractTransitionComponent extends IAbstractRegistrableComponent {
	/**
	 * @public
	 * @property
	 * @description The transition controller for the component
	 */
	transitionController: AbstractTransitionController;
	/**
	 * @public
	 * @method transitionIn
	 * @description The main transitionIn method for the component
	 * @param { boolean } forceTransition
	 * @returns { Promise<any> }
	 */
	transitionIn: (forceTransition?: boolean) => Promise<any>;
	/**
	 * @public
	 * @method transitionOut
	 * @description The main transitionOut method for the component
	 * @param { boolean } forceTransition
	 * @returns { Promise<any> }
	 */
	transitionOut: (forceTransition?: boolean) => Promise<any>;
}

export default IAbstractTransitionComponent;
