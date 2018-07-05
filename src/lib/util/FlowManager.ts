import * as bowser from 'bowser';
import { TweenLite } from 'gsap';
import EventDispatcher from 'seng-event';
import { IRoute } from '../../lib/interface/IRoute';
import FlowType from '../enum/FlowType';
import FlowEvent from '../event/FlowEvent';
import { IAbstractPageTransitionComponent } from '../interface/IAbstractPageTransitionComponent';

/**
 * ### FlowManager
 * The FlowManager is a singleton that is used to trigger page transitions
 * between pages. It is triggered when Vue.js detects a beforeRouteLeave,
 * passes along the next method and calls it when the transition out of the
 * current page has been completed. It can also be used for hijacking the page
 * flow, this will make sure the new page does not transition in until the
 * release method has been called.
 */
export class FlowManager extends EventDispatcher {
  /**
   * This property contains a promise that is the transition out method that
   * is called when we leave the page. When the transition out is done this
   * promise will be resolved and the flow is allowed to continue.
   *
   * @public
   */
  public transitionOut: Promise<void>;

  /**
   * This property contains the promise that hijacks the flow. When the flow
   * hijack is released this promise will be released as well and the flow is allowed to continue.
   *
   * @public
   */
  public flowHijacked: Promise<void> = Promise.resolve();

  /**
   * This property contains the componentId of the last page/component that was active. The vue-router
   * onLeave method is triggered twice, therefore we store the previous componentId so we can ignore
   * the second time.
   *
   * @private
   */
  private _previousComponentId: string;

  /**
   * If pointer-events none is not supported we inject a div into the DOM that blocks
   * all other click events. This property contains the reference to this element
   *
   * @private
   */
  private _pointerDiv: HTMLElement;

  /**
   * When the FlowManager is initially constructed it detects if we are using a browser
   * that does not support pointer-events. If it's not supported the fallback div is
   * created and injected into the DOM.
   */
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
   * When this method is called it will return a promise with a resolve method
   * that can be called to release the hijack. When the hijack is released the flow will continue.
   *
   * @public
   */
  public hijackFlow(): Promise<() => void> {
    return new Promise<() => void>((resolve: (release) => void) => {
      this.flowHijacked = new Promise<void>(release => resolve(release));
    });
  }

  /**
   * When the flow is fully done this method should be called. For example when the
   * transition out of the current page is completely done. It will reset the transition
   * out promise, clear the previous component id and re-enable all the pointer events so
   * the user can navigate further.
   *
   * @public
   */
  public done(): void {
    this.transitionOut = null;
    // Reset the previous component id when the flow is done to allow re-opening of the same page after closing it
    this._previousComponentId = null;
    // Enable the pointer events and allow the flow
    this.enablePointerEvents();
  }

  /**
   * The vue router triggers the onLeave method twice, so we need to store the current componentId to
   * avoid weird page transition issues. If it's triggered on the same page we release the hijack right away.
   *
   * @public
   * @param {IAbstractPageTransitionComponent} pageInstance
   * @param {(param?: (string | boolean)) => void} release
   * @param {IRoute} to
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
   * During page navigation we want to disable all pointer events so the user
   * cannot navigate to another page while the current page switch is still running.
   * This causes major flow issues, might not be the prettiest solution but hey it works!
   *
   * @private
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
   * After the flow is completed the pointer events can be enabled again so the
   * user can continue navigating.
   *
   * @private
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
   * This method checks if the page we are navigating to is a new component. If the current component
   * shares the same name (for example: when using params to change content) it means it's not a new component and the
   * current component will never leave the DOM!
   *
   * @private
   * @param {IAbstractPageTransitionComponent} pageInstance
   * @param {IRoute} to
   * @returns {boolean}
   */
  private isNewPageComponent(pageInstance: IAbstractPageTransitionComponent, to: IRoute): boolean {
    return pageInstance.$options.name !== to.matched[0].components.default['name'];
  }

  /**
   * This method will probably never be called but if you want to you can dispose of
   * the flow manager and everything will be cleaned.
   *
   * @public
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

/**
 * Create the single instance of the flow manager
 */
const flowManager = new FlowManager();

export default flowManager;
