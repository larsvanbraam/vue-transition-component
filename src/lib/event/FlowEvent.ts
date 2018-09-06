import { AbstractEvent } from 'seng-event';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';
import { IRoute } from '../interface/IRoute';

/**
 * ### FlowEvent
 * The FlowManager uses the seng-event module to dispatch events to notify parent classes about
 * certain events. The following events can be listened to.
 */
class FlowEvent extends AbstractEvent {
  /**
   * The flow start event indicates that the flow has started
   *
   * @public
   */
  public static START: string = EVENT_TYPE_PLACEHOLDER;

  /**
   * The data contains the target of the flow, this is used for detecting flows that end up at the same location.
   *
   * @public
   */
  public data: { to: IRoute; from: IRoute };

  /**
   * Provided the type + data to construct the flow event
   *
   * @param {string} type The type of the event. Event listeners will only be called if their eventType match this type.
   * @param {{to: IRoute; from: IRoute}} data The data that is linked to the event. It contains the from and to information.
   * @param {boolean} bubbles If true, the event will also go through a bubbling phase.
   * @param {boolean} cancelable Indicates if preventDefault can be called on this event. This will prevent the 'default
   * action' of the event from being executed. It is up to the EventDispatcher instance that dispatches the
   * event to stop the default action from executing when the dispatchEvent
   * method returns _false_
   * @param {boolean} If true, will set the [[timeStamp]] property of this event to the current time whenever
   * this event is dispatched.
   */
  constructor(
    type: string,
    data: { to: IRoute; from: IRoute },
    bubbles?: boolean,
    cancelable?: boolean,
    setTimeStamp?: boolean,
  ) {
    super(type, bubbles, cancelable, setTimeStamp);
    this.data = data;
  }

  /**
   * The clone method returns a cloned instance of the original event.
   *
   * @public
   */
  public clone(): FlowEvent {
    return new FlowEvent(this.type, this.data, this.bubbles, this.cancelable);
  }
}

generateEventTypes({ FlowEvent });

export default FlowEvent;
