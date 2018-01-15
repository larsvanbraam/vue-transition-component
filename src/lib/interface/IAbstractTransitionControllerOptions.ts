interface IAbstractTransitionControllerOptions {
  /**
   * @description When set to true we show logs in the flow
   */
  debug?: boolean;
  /**
   * @description When set to true the transition timelines use TimelineMax instead of TimelineLite
   */
  useTimelineMax?: boolean;
}

export default IAbstractTransitionControllerOptions;
