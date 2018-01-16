import { TimelineLite, TimelineMax, TweenLite, Tween, Animation } from 'gsap';
import EventDispatcher from 'seng-event';
import IAbstractTransitionComponent from '../interface/IAbstractTransitionComponent';
import TransitionEvent from '../event/TransitionEvent';
import ComponentType from '../enum/ComponentType';
import { COMPONENT_ID } from '../enum/Functions';
import IAbstractTransitionControllerOptions from '../interface/IAbstractTransitionControllerOptions';

// Tree not working with current webpack setup!
const isElement = require('lodash/isElement');
const isString = require('lodash/isString');

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
   * @description The viewModel is the reference to the wrapping Vue.js component, you can use this to find
   * references and other methods on the component.
   */
  protected viewModel: IAbstractTransitionComponent;
  /**
   * @property transitionInTimeline { TimelineLite }
   * @protected
   * @description The timeline that is used for transition in animations.
   */
  protected transitionInTimeline: TimelineLite | TimelineMax;
  /**
   * @property transitionOutTimeline { TimelineLite }
   * @protected
   * @description The timeline that is used for transition out animations. If no animations are added it will
   * automatically use the reversed version of the transition in timeline for the out animations
   */
  protected transitionOutTimeline: TimelineLite | TimelineMax;
  /**
   * @type {boolean}
   * @private
   * @description Check if the component is currently in the transitionedOut state, this is to avoid calling the
   * transition out method when it's already transitioned out.
   */
  private _isHidden: boolean = true;
  /**
   * @private
   * @property _transitionInResolveMethod
   * @type { ()=>void }
   * @description The resolve method used for resolving the transition in promise.
   */
  private _transitionInResolveMethod: () => void = null;
  /**
   * @private
   * @property _transitionOutResolveMethod
   * @type { ()=>void }
   * @description The resolve method used for resolving the transition out promise.
   */
  private _transitionOutResolveMethod: () => void = null;
  /**
   * @private
   * @property _transitionInRejectMethod
   * @type { ()=>void }
   * @description The reject method used for rejecting the transition in promise.
   */
  private _transitionInRejectMethod: () => void = null;
  /**
   * @private
   * @property _transitionOutRejectMethod
   * @type { ()=>void }
   * @description The resolve method used for rejecting the transition out promise.
   */
  private _transitionOutRejectMethod: () => void = null;
  /**
   * @private
   * @property _transitionInPromise
   * @type { Promise<void> }
   * @description The transition promise is used so we can wait for the transition in to be completed.
   */
  private _transitionInPromise: Promise<void> = null;
  /**
   * @private
   * @property _transitionOutPromise
   * @type { Promise<void> }
   * @description The transition promise is used so we can wait for the transition out to be completed.
   */
  private _transitionOutPromise: Promise<void> = null;
  /**
   * @private
   * @property _lastTime
   * @type {number}
   * @description Since GreenSock does not trigger a on reverse start event we use this to figure out that the
   * timeline has been reversed
   */
  private _lastTime: number = 0;
  /**
   * @private
   * @property _forward
   * @type { boolean }
   * @description Since GreenSock does not trigger a on reverse start event we use this to figure out that the
   * timeline has been reversed
   */
  private _forward: boolean = true;
  /**
   * @private
   * @property _options
   * @description the options for the controller
   * @type {{}}
   * @private
   */
  private _options: IAbstractTransitionControllerOptions = {
    /**
     * @description When set to true it will show logs!
     */
    debug: false,
    /**
     * @description Use TimelineMax instead of TimelineLite
     */
    useTimelineMax: false,
  };

  constructor(
    viewModel: IAbstractTransitionComponent,
    options: IAbstractTransitionControllerOptions = {},
  ) {
    super();
    // Store the viewModel reference
    this.viewModel = viewModel;
    // Merge the options
    Object.assign(this._options, options);
    // Create the timelines
    this.createTransitionTimelines();
    // Initialize the transition controller
    this.init();
  }

  /**
   * @public
   * @method transitionIn
   * @param { boolean } forceTransition
   * @returns { Promise<any> }
   */
  public transitionIn(forceTransition: boolean = false): Promise<void> {
    let oldTransitionPromise = Promise.resolve();

    /**
     * Check if we already have a transition out going on, if so we finish it right away! and trigger a
     * transition complete.
     */
    if (this._transitionOutPromise !== null) {
      if (forceTransition) {
        if (this.transitionOutTimeline.getChildren().length > 0) {
          this.transitionOutTimeline.kill();
        } else {
          this.transitionInTimeline.kill();
        }
        this.handleTransitionComplete(AbstractTransitionController.OUT);

        if (this._options.debug) {
          console.info(this.viewModel[COMPONENT_ID] + ': Interrupted the transition out!');
        }
      } else {
        oldTransitionPromise = this._transitionOutPromise;
      }
    }

    return oldTransitionPromise.then(() => {
      // Component is already transitioning out
      if (this._transitionInPromise !== null && forceTransition) {
        if (this._options.debug) {
          console.warn(
            '[TransitionController][' +
              this.viewModel[COMPONENT_ID] +
              '] Already transitioning' +
              ' in, so rejecting the original transitionIn promise to clear any queued animations. We' +
              ' finish the current animation and return a resolved promise right away',
          );
        }
        // TODO: should the forced out wait for the original animation to be completed??
        this._transitionInRejectMethod();
        this._transitionInPromise = null;
      }

      // Make sure the transitionOut is paused in case we clicked the transitionIn while
      // the transitionOut was not finished yet.
      this.transitionOutTimeline.paused(true);

      // Only allow the transition in if the element is hidden
      if (this._transitionInPromise === null && this._isHidden) {
        this._transitionInPromise = new Promise<void>((resolve: () => void) => {
          if (this.transitionInTimeline.getChildren().length === 0) {
            if (this._options.debug) {
              console.info(
                this.viewModel[COMPONENT_ID] + ': This block has no transition in timeline',
              );
            }

            // Dispatch the events even though there is no time line
            if (!this.isDisposed()) {
              this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_START));
            }
            this._isHidden = false;

            if (!this.isDisposed()) {
              this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_COMPLETE));
            }

            resolve();
          } else {
            // Remove the paused state from transitionIn Timeline
            this.transitionInTimeline.paused(false);

            this._transitionInResolveMethod = resolve;
            this._transitionInRejectMethod = resolve;
            this.transitionInTimeline.restart();
          }
        });
      }

      if (this._transitionInPromise === null) {
        if (this._options.debug) {
          console.warn(
            '[TransitionController][' +
              this.viewModel[COMPONENT_ID] +
              '] Transition in triggered' +
              " when it's already visible, so we will do nothing and return a resolved promise!",
          );
        }
        return Promise.resolve();
      }

      return this._transitionInPromise;
    });
  }

  /**
   * @public
   * @method transitionOut
   * @oaran { boolean } forceTransition
   * @returns {Promise<any>}
   */
  public transitionOut(forceTransition: boolean = false): Promise<void> {
    let oldTransitionPromise = Promise.resolve();

    /**
     * Check if we already have a transition out going on, if so we finish it right away! and trigger a
     * transition complete.
     */
    if (this._transitionInPromise !== null) {
      if (forceTransition) {
        this.transitionInTimeline.kill();
        this.handleTransitionComplete(AbstractTransitionController.IN);

        if (this._options.debug) {
          console.warn(this.viewModel[COMPONENT_ID] + ': Interrupted the transition in!');
        }
      } else {
        oldTransitionPromise = this._transitionInPromise;
      }
    }

    return oldTransitionPromise.then(() => {
      // Component is already transitioning out
      if (this._transitionOutPromise !== null && forceTransition) {
        if (this._options.debug) {
          console.warn(
            '[TransitionController][' +
              this.viewModel[COMPONENT_ID] +
              '] Already transitioning' +
              ' out, so rejecting the original transitionOut promise to clear any queued animations. We' +
              ' finish the current animation and return a resolved promise right away',
          );
        }
        // TODO: should the forced out wait for the original animation to be completed??
        this._transitionOutRejectMethod();
        this._transitionOutPromise = null;
      }
      // Only allow the transition out if the element is not hidden
      if (this._transitionOutPromise === null && !this._isHidden) {
        this._isHidden = true;

        // If we do have a transitionOut make sure the transitionIn is paused in case we clicked the
        // transitionOut while the transitionIn was not finished yet.
        if (this.transitionOutTimeline.getChildren().length > 0) {
          this.transitionOutTimeline.paused(false);
          this.transitionInTimeline.paused(true);
        } else {
          // We don't have a transitionOutTimeline, so we are reversing it, therefore removing the paused state.
          this.transitionInTimeline.paused(false);
        }

        this._transitionOutPromise = new Promise<void>(
          (resolve: () => void, reject: () => void) => {
            this._transitionOutResolveMethod = resolve;
            this._transitionOutRejectMethod = reject;
            if (this.transitionOutTimeline.getChildren().length > 0) {
              this.transitionOutTimeline.restart();
            } else {
              this.transitionInTimeline.reverse();
            }
          },
        );
      }

      if (this._transitionOutPromise !== null) {
        if (this._options.debug) {
          console.warn(
            '[TransitionController][' +
              this.viewModel.componentId +
              '] Transition out triggered' +
              " when it's already hidden, so we will do nothing and return a resolved promise!",
          );
        }

        // Already hidden, so resolve it right away
        return Promise.resolve();
      }

      return this._transitionOutPromise;
    });
  }

  /**
   * @public
   * @method getSubTimeline
   * @description When nesting transition components you might want to nest the timelines as well, this makes it
   * easier to time all the component transitions
   * @param {string | HTMLElement | IAbstractTransitionComponent} component
   * @param {string} direction
   * @returns { Animation }
   */
  public getSubTimeline(
    component: string | HTMLElement | IAbstractTransitionComponent,
    direction: string = AbstractTransitionController.IN,
  ): Animation {
    const subTimeline = this.getSubTimelineByComponentId(component, direction);
    return this.cloneTimeline(subTimeline, direction).restart();
  }

  /**
   * @public
   * @method getSubTimelineDuration
   * @param {string | HTMLElement | IAbstractTransitionComponent} component
   * @param {string} direction
   * @returns {Animation}
   */
  public getSubTimelineDuration(
    component: string | HTMLElement | IAbstractTransitionComponent,
    direction: string = AbstractTransitionController.IN,
  ): number {
    return this.getSubTimelineByComponentId(component, direction).duration();
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
  protected abstract setupTransitionOutTimeline(): void;

  /**
   * @public
   * @method setupTransitionInTimeline
   * @description overwrite this method in the parent class
   * */
  protected abstract setupTransitionInTimeline(): void;

  /**
   * @protected
   * @method killAndClearTimeline
   * @param timeline
   */
  protected killAndClearTimeline(timeline: TimelineLite | TimelineMax): void {
    this.clearTimeline(timeline);
    timeline.kill();
  }

  /**
   * @protected
   * @method clearTimeline
   * @param timeline
   */
  protected clearTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.getChildren().forEach(target => {
      if ((<Tween>target).target) {
        const vars = <any>target.vars;
        const clearProps = vars.css ? Object.keys(vars.css).join(',') : '';
        // Clear the css properties
        TweenLite.set((<Tween>target).target, { clearProps });
      } else {
        this.clearTimeline(<TimelineLite | TimelineMax>target);
      }
    });
    timeline.clear();
  }

  /**
   * @private
   * @method createTransitionTimelines
   * @description Setup the transition timelines
   */
  private createTransitionTimelines(): void {
    this.transitionInTimeline = new (this._options.useTimelineMax ? TimelineMax : TimelineLite)({
      paused: true,
      onUpdate: this.checkDirection.bind(this),
      onStart: () => {
        // Notify about the transition in start
        if (!this.isDisposed()) {
          this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_START));
        }
        // Element is no longer visible
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

    this.transitionOutTimeline = new (this._options.useTimelineMax ? TimelineMax : TimelineLite)({
      paused: true,
      onStart: () => {
        // Notify about the transition out start
        if (!this.isDisposed()) {
          this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_OUT_START));
        }
        // Element is no longer hidden
        this._isHidden = true;
      },
      onComplete: this.handleTransitionComplete.bind(
        this,
        AbstractTransitionController.OUT,
        AbstractTransitionController.FORWARD,
      ),
    });
  }

  /**
   * @private
   * @method getSubTimelineByComponentId
   * @param {string} componentId
   * @param {string} direction
   * @returns {TimelineLite | TimelineMax}
   */
  private getSubTimelineByComponentId(
    component: string | HTMLElement | IAbstractTransitionComponent,
    direction: string,
  ): TimelineLite | TimelineMax {
    let childComponent;

    if (isString(component)) {
      childComponent = <IAbstractTransitionComponent>this.viewModel.getChild(
        <string>component,
        ComponentType.TRANSITION_COMPONENT,
      );
    } else if (isElement(component)) {
      childComponent = this.viewModel.$children.find(child => child.$el === component);
    } else {
      childComponent = component;
    }

    if (!childComponent) {
      throw this.error(`No child component for id: ${component}.`);
    }

    if (!childComponent.transitionController) {
      throw this.error(
        `Child component does not have a transition controller: ${childComponent[COMPONENT_ID]}.`,
      );
    }

    const transitionInTimeline = childComponent.transitionController.transitionInTimeline;
    const transitionOutTimeline = childComponent.transitionController.transitionOutTimeline;

    switch (direction) {
      case AbstractTransitionController.IN: {
        return transitionInTimeline;
      }
      case AbstractTransitionController.OUT: {
        if (transitionOutTimeline.getChildren().length > 0) {
          return transitionOutTimeline;
        }

        throw this.error(
          'No transition out timeline was created, unable to ' +
            'add the transition in timeline to the transition out timeline. To fix this define a custom ' +
            'transition out timeline for this component.',
        );
      }
      default: {
        throw this.error(`Unsupported direction: ${direction}`);
      }
    }
  }

  /**
   * @private
   * @method cloneTimeline
   */
  private cloneTimeline(
    source: TimelineLite | TimelineMax,
    direction: string,
  ): TimelineLite | TimelineMax {
    const children = source.getChildren(false);
    const timeline = new (this._options.useTimelineMax ? TimelineMax : TimelineLite)(source.vars);

    const parseChild = (child, timeline) => {
      if (child.getChildren) {
        const children = child.getChildren(false);
        const subTimeline = new (this._options.useTimelineMax ? TimelineMax : TimelineLite)(
          child.vars,
        );
        // Parse the child animations
        children.forEach(child => parseChild(child, subTimeline));
        // Add the timeline to the parent timeline
        timeline.add(subTimeline.restart(), child._startTime);
      } else {
        if (child.vars.startAt) {
          if (direction === AbstractTransitionController.OUT) {
            throw this.error(
              'Do not use fromTo when nesting transitionOutTimelines, use to instead!',
            );
          }
          const from = JSON.parse(JSON.stringify(child.vars.startAt));
          // Clone the vars
          const to = child.vars;
          // Create the fromTo tween
          timeline.fromTo(child.target, child._duration, from, to, child._startTime);
        } else {
          if (child.vars.runBackwards) {
            // When nesting timelines and the user defines a root timeline with a from the clone will
            // have incorrect styling because the base styling is off!
            // timeline.from(child.target, child._duration, child.vars, child._startTime);
            throw this.error(
              'Do not use from while nesting transitionInTimelines, use fromTo' + ' instead!',
            );
          } else {
            timeline.to(child.target, child._duration, child.vars, child._startTime);
          }
        }
      }
    };

    children.forEach(child => parseChild(child, timeline));

    return timeline;
  }

  /**
   * @private
   * @method handleTransitionComplete
   * @param { string } type
   */
  private handleTransitionComplete(type: string): void {
    switch (type) {
      case AbstractTransitionController.IN:
        this._transitionInPromise = null;
        if (this._transitionInResolveMethod !== null) {
          this._transitionInResolveMethod();
          this._transitionInResolveMethod = null;
        }
        if (!this.isDisposed()) {
          this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_IN_COMPLETE));
        }
        break;
      case AbstractTransitionController.OUT: {
        this._transitionOutPromise = null;
        if (this._transitionOutResolveMethod !== null) {
          this._transitionOutResolveMethod();
          this._transitionOutResolveMethod = null;
        }
        // When the transition out is completed we have to reset the last time otherwise the transition will
        // no longer work.
        this._lastTime = 0;
        if (!this.isDisposed()) {
          this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_OUT_COMPLETE));
        }
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

    if (this.transitionOutTimeline !== null) {
      this.killAndClearTimeline(this.transitionOutTimeline);
      this.transitionOutTimeline = null;
    }

    if (this.transitionInTimeline !== null) {
      this.killAndClearTimeline(this.transitionInTimeline);
      this.transitionInTimeline = null;
    }

    this._transitionOutResolveMethod = null;
    this._transitionInResolveMethod = null;

    this._transitionOutPromise = null;
    this._transitionInPromise = null;
  }

  /**
   * @private
   * @method checkDirection
   * @description GreenSock does not support onReverseStart on a timeline therefore we have this little method
   * chat checks for the direction and if ti's changed we handle it as if it's a reverse start§
   * @returns {void}
   */
  private checkDirection(): void {
    const newTime = this.transitionInTimeline.time();
    if (
      (this._forward && newTime < this._lastTime) ||
      (!this._forward && newTime > this._lastTime)
    ) {
      this._forward = !this._forward;
      if (!this._forward) {
        // Notify about the transition in start
        if (!this.isDisposed()) {
          this.dispatchEvent(new TransitionEvent(TransitionEvent.TRANSITION_OUT_START));
        }
        // Element is no longer visible
        this._isHidden = true;
      }
    }
    this._lastTime = newTime;
  }

  /**
   * @private
   * @Method error
   * @description Create an error instance, with some extra information!
   * @param message
   */
  private error(message: string): Error {
    // Prefix all errors with a location
    const location = `[AbstractTransitionController][${this.viewModel.componentId}]`;
    // Create the error message
    return new Error(`${location} - ${message}`);
  }

  /**
   * @public
   * @method destruct
   * @description Because Vue destructs the VM instance before it removes the DOM node we want to finish the
   * transition out before actually cleaning everything
   */
  public dispose(): void {
    if (this._transitionOutPromise !== null && this._transitionOutResolveMethod !== null) {
      this._transitionOutPromise.then(this.clean.bind(this));
    } else {
      this.clean();
    }
    super.dispose();
  }
}

export default AbstractTransitionController;
