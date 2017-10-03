import EventDispatcher from 'seng-event';
import FlowType from '../enum/FlowType';
import IAbstractPageTransitionComponent from '../interface/IAbstractPageTransitionComponent';
import { COMPONENT_ID } from '../mixin/AbstractRegistrableComponent';
import FlowEvent from '../event/FlowEvent';
import { Promise } from 'es6-promise';

export class FlowManager extends EventDispatcher {
	/**
	 * @property _transitionOut
	 * @type Promise<void>
	 */
	private _transitionOut: Promise<void>;
	/**
	 * @property _previousComponentId
	 * @type string
	 */
	private _previousComponentId: string;
	/**
	 * @property
	 * @type string
	 * @description the path of the new page
	 */
	private _path: string;
	/**
	 * @public
	 * @type {Promise<void>}
	 * @description Promise that contains the hijacked state of the flow
	 */
	public flowHijacked: Promise<void> = Promise.resolve();

	/**
	 * @public
	 * @method hijackFlow
	 * @returns {Promise<()=>void>}
	 */
	public hijackFlow(): Promise<() => void> {
		return new Promise<() => void>((resolve: (release) => void) => {
			this.flowHijacked = new Promise<void>(release => resolve(release));
		});
	}

	/**
	 * @public
	 * @method get transitionOut
	 * @returns {Promise<any>}
	 */
	public get transitionOut(): Promise<void> {
		return this._transitionOut;
	}

	/**
	 * @public
	 * @method done
	 * @description Trigger this method when the flow is fully done, it resets the promise and allows for further
	 * navigation
	 */
	public done(): void {
		this._transitionOut = null;
		this._path = null;
		// Reset the previous component id when the flow is done to allow re-opening of the same page after closing it
		this._previousComponentId = null;
	}

	/**
	 * @public
	 * @method start
	 * @param pageInstance
	 * @param release
	 * @param path
	 * @description The vue router triggers the onLeave method twice, so we need to store the current componentId to
	 * avoid weird page transition issues. If it's triggered on the same page we release the hijack right away.
	 * @returns {void}
	 */
	public start(
		pageInstance: IAbstractPageTransitionComponent,
		release: (param?: string | boolean) => void,
		path: string,
	): void {
		if (!this._transitionOut) {
			if (this._previousComponentId === pageInstance[COMPONENT_ID]) {
				release();
			} else {
				this._path = path;
				this._previousComponentId = pageInstance[COMPONENT_ID];
				this.dispatchEvent(new FlowEvent(FlowEvent.START));
				switch (pageInstance.flow) {
					case FlowType.NORMAL: {
						this._transitionOut = pageInstance.transitionOut(true);
						this._transitionOut.then(() => release());
						break;
					}
					case FlowType.CROSS: {
						this._transitionOut = pageInstance.transitionOut(true);
						release();
						break;
					}
					default: {
						throw new Error('[FlowManager] Unknown flow: [' + pageInstance.flow + ']');
					}
				}
			}
		} else {
			release(this._path === path); // Already transitioning out, so do nothing if we try to open a new path
		}
	}

	/**
	 * @public
	 * @description Dispose the flow manager
	 */
	public dispose(): void {
		this._transitionOut = null;
		this._previousComponentId = null;

		super.dispose();
	}
}

const flowManager = new FlowManager();

export default flowManager;
