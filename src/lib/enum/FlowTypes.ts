/**
 * @enum EventState
 * @description Possible values for flow of a page
 */
const enum FlowTypes {
	/**
	 * @property
	 * @description The flow will go normal, transition out --> transition in
	 */
	NORMAL,
	/**
	 * @property
	 * @description The in and out transition will go at the same time
	 */
	CROSS,
}

export default FlowTypes;
