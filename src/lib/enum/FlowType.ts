/**
 * Enum that determines the page flow
 */
enum FlowType {
  /**
   * The flow will go normal, transition out --> transition in
   */
  NORMAL,
  /**
   * The in and out transition will go at the same time
   */
  CROSS,
}

export default FlowType;
