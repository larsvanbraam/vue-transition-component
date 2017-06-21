import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes } from 'seng-event/lib/util/eventTypeUtils';

class FlowEvent extends AbstractEvent {
	public static START: string = 'FlowEvent.START';

	public clone(): FlowEvent {
		return new FlowEvent(this.type, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ FlowEvent });

export default FlowEvent;
