import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class TransitionEvent extends AbstractEvent {
	public static TRANSITION_IN_START: string = EVENT_TYPE_PLACEHOLDER;
	public static TRANSITION_IN_COMPLETE: string = EVENT_TYPE_PLACEHOLDER;
	public static TRANSITION_OUT_START: string = EVENT_TYPE_PLACEHOLDER;
	public static TRANSITION_OUT_COMPLETE: string = EVENT_TYPE_PLACEHOLDER;

	public clone(): TransitionEvent {
		return new TransitionEvent(this.type, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ TransitionEvent });

export default TransitionEvent;
