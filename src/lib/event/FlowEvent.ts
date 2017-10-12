import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class FlowEvent extends AbstractEvent {
	public static START: string = EVENT_TYPE_PLACEHOLDER;

	public clone(): FlowEvent {
		return new FlowEvent(this.type, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ FlowEvent });

export default FlowEvent;
