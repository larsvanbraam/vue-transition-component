import EventDispatcher from 'seng-event';
import FlowType from '../enum/FlowType';
import IAbstractPageTransitionComponent from '../interface/IAbstractPageTransitionComponent';
import { COMPONENT_ID } from '../mixin/AbstractRegistrableComponent';
import * as bowser from 'bowser';
import FlowEvent from '../event/FlowEvent';
import { Promise } from 'es6-promise';
import { TweenLite } from 'gsap';

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
	 * @property
	 * @description Div used when pointer events none is not supported
	 */
	private _pointerDiv: HTMLElement;
	/**
	 * @public
	 * @type {Promise<void>}
	 * @description Promise that contains the hijacked state of the flow
	 */
	public flowHijacked: Promise<void> = Promise.resolve();

	constructor() {
		super();

		// Fallback for IE10
		if (bowser.msie && bowser.version <= 10) {
			this._pointerDiv = document.createElement('div');

			TweenLite.set(this._pointerDiv, {
				className: 'vueTransitionComponentPointerDiv',
				display: 'none',
				position: 'fixed',
				left: '0px',
				top: '0px',
				width: '100%',
				height: '100%',
				zIndex: 99999,
			});

			document.body.appendChild(this._pointerDiv);
		}
	}

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
		// Enable the pointer events and allow the flow
		this.enablePointerEvents();
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
				path: string): void {
		this.disablePointerEvents();

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
	}

	/**
	 * @private
	 * @method disablePointerEvents
	 * @description Disable pointer events during page switches
	 */
	private disablePointerEvents(): void {
		if (bowser.msie && bowser.version <= 10) {
			this._pointerDiv.style.display = 'block';
		} else {
			document.body.style.pointerEvents = 'none';
		}
	}

	/**
	 * @private
	 * @method enablePointerEvents
	 * @description Enable pointer events and allow flow navigation
	 */
	private enablePointerEvents(): void {
		if (bowser.msie && bowser.version <= 10) {
			this._pointerDiv.style.display = 'none';
		} else {
			document.body.style.pointerEvents = 'all';
		}
	}

	/**
	 * @public
	 * @description Dispose the flow manager
	 */
	public dispose(): void {
		this._transitionOut = null;
		this._previousComponentId = null;
		if (this._pointerDiv) {
			document.body.removeChild(this._pointerDiv);
			this._pointerDiv = null;
		}

		super.dispose();
	}
}

const flowManager = new FlowManager();

export default flowManager;
