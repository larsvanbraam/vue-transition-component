/**
 * Enum that determines the page flow
 */
enum FlowType {
  /**
   * The flow will go normal, transition out --> transition in
   */
  NORMAL = 0,
  /**
   * The in and out transition will go at the same time
   */
  CROSS = 1,
}

export default FlowType;
