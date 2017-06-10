import AbstractEvent from 'seng-event/lib/AbstractEvent';

class TransitionEvent extends AbstractEvent {
	public static TRANSITION_IN_START: string = 'TransitionEvent.TRANSITION_IN_START';
	public static TRANSITION_IN_COMPLETE: string = 'TransitionEvent.TRANSITION_IN_COMPLETE';
	public static TRANSITION_OUT_START: string = 'TransitionEvent.TRANSITION_OUT_START';
	public static TRANSITION_OUT_COMPLETE: string = 'TransitionEvent.TRANSITION_OUT_COMPLETE';

	public clone(): TransitionEvent {
		return new TransitionEvent(this.type, this.bubbles, this.cancelable);
	}
}

export default TransitionEvent;