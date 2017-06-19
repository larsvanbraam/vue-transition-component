import { TimelineLite, TweenLite, Tween, Animation } from 'gsap';
import { Promise } from 'es6-promise';
import EventDispatcher from 'seng-event';
import IAbstractTransitionComponent from '../interface/IAbstractTransitionComponent';
import TransitionEvent from '../event/TransitionEvent';

/**
 * @class AbstractTransitionController
 * @description This class is used by all components that you want to be transition in/out
 *
 * When extending the AbstractTransitionController a transition out timeline is not required. If it's not provided it
 * will reverse the transition in timeline when transition out is triggered.
 */
abstract class AbstractTransitionController extends EventDispatcher {
	public static IN: string = 'AbstractTransitionController.IN';
	public static OUT: string = 'AbstractTransitionController.OUT';
	protected static FORWARD: string = 'AbstractTransitionController.FORWARD';
	protected static REVERSED: string = 'AbstractTransitionController.REVERSED';

	/**
	 * @type { IAbstractTransitionComponent }
	 * @protected
	 * @description The viewModel is typed as 'any' because we modify the original Vue instance
	 */
	protected viewModel: IAbstractTransitionComponent;
	/**
	 * @type { TimelineLite }
	 * @protected
	 * @description The transition timelines are used for creating the transition in and transition out timelines
	 */
	protected transitionInTimeline: TimelineLite = new TimelineLite({
		paused: true,
		onStart: () => {
			this._isHidden = false;
		},
		onComplete: this.handleTransitionComplete.bind(
			this,
			AbstractTransitionController.IN,
			AbstractTransitionController.FORWARD,
		),
		onReverseComplete: this.handleTransitionComplete.bind(
			this,
			AbstractTransitionController.OUT,
			AbstractTransitionController.REVERSED,
		),
	});
	protected transitionOutTimeline: TimelineLite = new TimelineLite({
		paused: true,
		onStart: () => {
			this._isHidden = true;
		},
		onComplete: this.handleTransitionComplete.bind(
			this,
			AbstractTransitionController.OUT,
			AbstractTransitionController.FORWARD,
		),
	});

	/**
	 * @type {boolean}
	 * @private
	 * @description Check if the component is currently in the transitionedOut state, this is to avoid calling the
	 * transition out method when it's already transitioned out.
	 */
	public _isHidden: boolean = true;
	/**
	 * @type { ()=>void }
	 * @private
	 * @description Resolve methods are used for resolving the transitionIn/transitionOut promises
	 */
	private _transitionInResolveMethod: () => void;
	private _transitionOutResolveMethod: () => void;
	/**
	 * @type { Promise<void> }
	 * @private
	 * @description Transition promises are there so you can wait for the transitionIn/transitionOut to be completed
	 * before you do other stuff.
	 */
	private _transitionInPromise: Promise<void> = null;
	private _transitionOutPromise: Promise<void> = null;

	/**
	 * @private
	 * @description When set to true it will show logs!
	 * @type {boolean}
	 */
	private _debug:boolean = false;

	constructor(viewModel: IAbstractTransitionComponent, debug:boolean = false) {
		super();
		this.viewModel = viewModel;
		this._debug = debug;
		this.init();
	}

	/**
	 * @public
	 * @method transitionIn
	 * @returns { Promise<any> }
	 */
	public transitionIn(): Promise<void> {
		// Notify about the transition in start
		this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_START));

		// Kill the transitionOut Promise
		this._transitionOutPromise = null;
		this._transitionOutResolveMethod = null;

		// Remove the paused state from transitionIn Timeline
		this.transitionInTimeline.paused(false);

		// Make sure the transitionOut is paused in case we clicked the transitionIn while
		// the transitionOut was not finished yet.
		this.transitionOutTimeline.paused(true);

		// Only allow the transition in if the element is hidden
		if (this._transitionInPromise === null && this._isHidden) {
			this._transitionInPromise = new Promise<void>((resolve: () => void) => {
				if (this.transitionInTimeline.duration() === 0) {
					if(this._debug) {
						console.info('[AbstractTransitionController] This block does not have transition, so resolve' +
							' right away');
					}
					resolve();
				} else {
					this._transitionInResolveMethod = resolve;
					this.transitionInTimeline.restart();
				}
			});
		}

		if (this._transitionInPromise === null) {
			if (this._debug) {
				console.error('[AbstractTransitionController] Transition in was triggered when the it\'s already' +
					' visible');
			}
			return Promise.resolve();
		}

		return this._transitionInPromise;
	}

	/**
	 * @public
	 * @method transitionOut
	 * @returns {Promise<any>}
	 */
	public transitionOut(): Promise<void> {
		// Notify about the transition out start
		this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_OUT_START));

		// Kill the _transitionInPromise
		this._transitionInPromise = null;
		this._transitionInResolveMethod = null;

		// If we do have a transitionOut make sure the transitionIn is paused in case we clicked the
		// transitionOut while the transitionIn was not finished yet.
		if (this.transitionOutTimeline.getChildren().length > 0) {
			this.transitionOutTimeline.paused(false);
			this.transitionInTimeline.paused(true);
		} else {
			// We don't have a transitionOutTimeline, so we are reversing it, therefore removing the paused state.
			this.transitionInTimeline.paused(false);
		}

		// Only allow the transition out if the element is not hidden
		if (this._transitionOutPromise === null && !this._isHidden) {
			this._isHidden = true;

			this._transitionOutPromise = new Promise<void>((resolve: () => void) => {
				this._transitionOutResolveMethod = resolve;
				if (this.transitionOutTimeline.getChildren().length > 0) {
					this.transitionOutTimeline.restart();
				} else {
					this.transitionInTimeline.reverse();
				}
			});
		}

		if (!this._transitionOutPromise) {
			if (this._debug) {
				console.error('[AbstractTransitionController] Transition out was triggered when the it\'s already hidden');
			}

			// Already hidden, so resolve it right away
			return Promise.resolve();
		}

		return this._transitionOutPromise;
	}

	/**
	 * @public
	 * @method getSubTimeline
	 * @description When nesting transition components you might want to nest the timelines as well, this makes it
	 * easier to time all the component transitions
	 * @param id
	 * @param direction
	 * @returns { Animation }
	 */
	public getSubTimeline(id: string, direction: string = AbstractTransitionController.IN): Animation {
		const childComponent = <IAbstractTransitionComponent>this.viewModel.getChildComponent(id);

		if (!childComponent) {
			throw new Error('No child component for id: [' + id + ']');
		}

		if (!childComponent.transitionController) {
			throw new Error('Child component does not have a transition controller: [' + id + ']');
		}

		const transitionInTimeline = childComponent.transitionController.transitionInTimeline;
		const transitionOutTimeline = childComponent.transitionController.transitionOutTimeline;

		switch (direction) {
			case AbstractTransitionController.IN: {
				return transitionInTimeline.restart();
			}
			case AbstractTransitionController.OUT: {
				if (transitionOutTimeline.getChildren().length > 0) {
					return transitionOutTimeline.restart();
				}

				throw new Error('[AbstractTransitionController.ts] No transition out timeline was created, unable to ' +
					'add the transition in timeline to the transition out timeline. To fix this define a custom ' +
					'transition out timeline for this component');
			}
			default: {
				throw new Error('[AbstractTransitionController] Unsupported direction' + direction);
			}
		}
	}

	/**
	 * @public
	 * @method getSubTimelineDuration
	 * @param id
	 * @param direction
	 * @returns {Animation}
	 */
	public getSubTimelineDuration(id: string, direction: string = AbstractTransitionController.IN): number {
		const childComponent = <IAbstractTransitionComponent>this.viewModel.getChildComponent(id);
		const transitionInTimeline = childComponent.transitionController.transitionInTimeline;
		const transitionOutTimeline = childComponent.transitionController.transitionOutTimeline;

		if (!childComponent) {
			throw new Error('No child component for id: [' + id + ']');
		}

		switch (direction) {
			case AbstractTransitionController.IN: {
				return transitionInTimeline.duration();
			}
			case AbstractTransitionController.OUT: {
				if (transitionOutTimeline.getChildren().length > 0) {
					return transitionOutTimeline.duration();
				}

				throw new Error('[AbstractTransitionController.ts] No transition out timeline was created, unable to ' +
					'add the transition in timeline to the transition out timeline. To fix this define a custom ' +
					'transition out timeline for this component');
			}
			default: {
				throw new Error('[AbstractTransitionController] Unsupported direction' + direction);
			}
		}
	}

	/**
	 * @protected
	 * @method init
	 * @description This method will be used for setting up the timelines for the component
	 */
	protected init(): void {
		this.setupTransitionInTimeline();
		this.setupTransitionOutTimeline();
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description overwrite this method in the parent class
	 */
	protected abstract setupTransitionOutTimeline(): void
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected abstract setupTransitionInTimeline(): void

	/**
	 * @protected
	 * @method killAndClearTimeline
	 * @param timeline
	 */
	protected killAndClearTimeline(timeline: TimelineLite): void {
		this.clearTimeline(timeline);
		timeline.kill();
	}

	/**
	 * @protected
	 * @method clearTimeline
	 * @param timeline
	 */
	protected clearTimeline(timeline: TimelineLite): void {
		timeline.getChildren().forEach((target) => {
			if ((<Tween>target).target) {
				TweenLite.set((<Tween>target).target, { clearProps: 'all' });
			} else {
				this.clearTimeline(<TimelineLite>target);
			}
		});
		timeline.clear();
	}

	/**
	 * @private
	 * @method handleTransitionComplete
	 */
	private handleTransitionComplete(type: string, direction: string): void {
		switch (type) {
			case AbstractTransitionController.IN:
				this._transitionInPromise = null;
				if (this._transitionInResolveMethod) {
					this._transitionInResolveMethod();
					this._transitionInResolveMethod = null;
				}
				this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_COMPLETE));
				break;
			case AbstractTransitionController.OUT: {
				this._transitionOutPromise = null;
				if (this._transitionOutResolveMethod) {
					this._transitionOutResolveMethod();
					this._transitionOutResolveMethod = null;
				}
				this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_OUT_COMPLETE));
				break;
			}

		}
	}

	/**
	 * @private
	 * @method clean
	 * @description Clean all the timelines and the resolve method
	 */
	private clean(): void {
		this.viewModel = null;
		this._isHidden = null;

		if (this.transitionOutTimeline) {
			this.killAndClearTimeline(this.transitionOutTimeline);
			this.transitionOutTimeline = null;
		}

		if (this.transitionInTimeline) {
			this.killAndClearTimeline(this.transitionInTimeline);
			this.transitionInTimeline = null;
		}

		this._transitionOutResolveMethod = null;
		this._transitionInResolveMethod = null;

		this._transitionOutPromise = null;
		this._transitionInPromise = null;
	}

	/**
	 * @public
	 * @method destruct
	 * @description Because Vue destructs the VM instance before it removes the DOM node we want to finish the
	 * transition out before actually cleaning everything
	 */
	public dispose(): void {
		if (this._transitionOutPromise && this._transitionOutResolveMethod) {
			this._transitionOutPromise.then(this.clean.bind(this));
		} else {
			this.clean();
		}
		super.dispose();
	}
}

export default AbstractTransitionController;
