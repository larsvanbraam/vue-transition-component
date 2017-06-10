import AbstractTransitionController from '../util/AbstractTransitionController';
import IAbstractRegistrableComponent from './IAbstractRegistrableComponent';

interface IAbstractTransitionComponent extends IAbstractRegistrableComponent
{
	/**
	 * @public
	 * @property
	 * @description The transition controller for the component
	 */
	transitionController:AbstractTransitionController;
	/**
	 * @public
	 * @method transitionInStart
	 * @description Before the transitionIn starts this method will be triggered
	 * @returns { void }
	 */
	transitionInStart:() => void;
	/**
	 * @public
	 * @method transitionIn
	 * @description The main transitionIn method for the component
	 * @returns { Promise<any> }
	 */
	transitionIn:() => Promise<any>;
	/**
	 * @public
	 * @method transitionInComplete
	 * @description After the transitionIn is complete this method will be triggered
	 */
	transitionInComplete:() => void;
	/**
	 * @public
	 * @method transitionOutStart
	 * @description Before the transitionOut starts this method will be triggered
	 * @returns { void }
	 */
	transitionOutStart:() => void;
	/**
	 * @public
	 * @method transitionOut
	 * @description The main transitionOut method for the component
	 * @returns { Promise<any> }
	 */
	transitionOut:() => Promise<any>;
	/**
	 * @public
	 * @method transitionOutComplete
	 * @description After the transitionOut is complete this method will be triggered
	 * @returns { void }
	 */
	transitionOutComplete:() => void;
}

export default IAbstractTransitionComponent;
