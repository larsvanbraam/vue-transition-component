import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';
import { Route } from 'vue-router';

class FlowEvent extends AbstractEvent  {
	public static START: string = EVENT_TYPE_PLACEHOLDER;

	constructor(type: string, public data:{to:Route;}, bubbles?: boolean, cancelable?: boolean, setTimeStamp?: boolean) {
		super(type, bubbles, cancelable, setTimeStamp);
	}

	public clone(): FlowEvent {
		return new FlowEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ FlowEvent });

export default FlowEvent;
