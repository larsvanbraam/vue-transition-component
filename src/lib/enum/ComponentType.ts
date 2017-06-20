/**
 * Enum that determines the type of a component
 */
enum ComponentType {
	/**
	 * The flow will go normal, transition out --> transition in
	 */
	REGISTRABLE_COMPONENT = 0,
	/**
	 * The in and out transition will go at the same time
	 */
	TRANSITION_COMPONENT = 1,
	/**
	 * The in and out transition will go at the same time
	 */
	PAGE_COMPONENT = 2,
}

export default ComponentType;
