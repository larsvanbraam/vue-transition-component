import * as bowser from 'bowser';
import { TweenLite } from 'gsap';
import EventDispatcher from 'seng-event';
import IRoute from '../../lib/interface/IRoute';
import FlowType from '../enum/FlowType';
import FlowEvent from '../event/FlowEvent';
import IAbstractPageTransitionComponent from '../interface/IAbstractPageTransitionComponent';

export class FlowManager extends EventDispatcher {
  /**
   * @property transitionOut
   * @type Promise<void>
   */
  public transitionOut: Promise<void>;
  /**
   * @property _previousComponentId
   * @type string
   */
  private _previousComponentId: string;
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
    /* istanbul ignore if  */
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
   * @method done
   * @description Trigger this method when the flow is fully done, it resets the promise and allows for further
   * navigation
   */
  public done(): void {
    this.transitionOut = null;
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
    to: IRoute,
  ): void {
    this.disablePointerEvents();

    if (this._previousComponentId === pageInstance.$options.name) {
      release();
    } else {
      this._previousComponentId = pageInstance.$options.name;
      this.dispatchEvent(new FlowEvent(FlowEvent.START, { to }));
      switch (pageInstance.flow) {
        case FlowType.NORMAL: {
          this.transitionOut = pageInstance.transitionOut(true);
          this.transitionOut.then(() => {
            // Release the flow
            release();
            // When the new path uses the same target component the onLeave will never be triggered on
            // the router view, therefore we mark it as done as soon as transition out is completed
            if (!this.isNewPageComponent(pageInstance, to)) {
              this.done();
            }
          });
          break;
        }
        case FlowType.CROSS: {
          this.transitionOut = pageInstance.transitionOut(true);
          setTimeout(() => release(), 0);
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
    /* istanbul ignore if  */
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
    /* istanbul ignore if  */
    if (bowser.msie && bowser.version <= 10) {
      this._pointerDiv.style.display = 'none';
    } else {
      document.body.style.pointerEvents = 'all';
    }
  }

  /**
   * @private
   * @method isNewPageComponent
   * @param pageInstance
   * @param to
   * @returns {boolean}
   */
  private isNewPageComponent(pageInstance: IAbstractPageTransitionComponent, to: IRoute): boolean {
    // Check if the current component shares the same component name, this means it's not a new component and
    // the current one will never leave the DOM
    return pageInstance.$options.name !== to.matched[0].components.default['name'];
  }

  /**
   * @public
   * @description Dispose the flow manager
   */
  public dispose(): void {
    this.transitionOut = null;
    this._previousComponentId = null;
    /* istanbul ignore if  */
    if (this._pointerDiv !== undefined && document.body !== null) {
      document.body.removeChild(this._pointerDiv);
      this._pointerDiv = null;
    }

    super.dispose();
  }
}

const flowManager = new FlowManager();

export default flowManager;
