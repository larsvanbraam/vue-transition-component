import IAbstractTransitionComponent from './IAbstractTransitionComponent';
import FlowTypes from '../enum/FlowTypes';

interface IAbstractPageTransitionComponent extends IAbstractTransitionComponent {
	/**
	 * @property flow
	 * @description The flow of the page transition, see the FlowTypes file for the options
	 */
	flow: FlowTypes;
}

export default IAbstractPageTransitionComponent;
