import IAbstractTransitionComponent from './IAbstractTransitionComponent';
import FlowType from '../enum/FlowType';

interface IAbstractPageTransitionComponent extends IAbstractTransitionComponent {
	/**
	 * @property flow
	 * @description The flow of the page transition, see the FlowTypes file for the options
	 */
	flow: FlowType;
}

export default IAbstractPageTransitionComponent;
