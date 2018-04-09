import { AbstractEvent } from 'seng-event';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';
import { IRoute } from '../interface/IRoute';

class FlowEvent extends AbstractEvent {
  public static START: string = EVENT_TYPE_PLACEHOLDER;
  public data: { to: IRoute };

  constructor(
    type: string,
    data: { to: IRoute },
    bubbles?: boolean,
    cancelable?: boolean,
    setTimeStamp?: boolean,
  ) {
    super(type, bubbles, cancelable, setTimeStamp);
    this.data = data;
  }

  public clone(): FlowEvent {
    return new FlowEvent(this.type, this.data, this.bubbles, this.cancelable);
  }
}

generateEventTypes({ FlowEvent });

export default FlowEvent;
