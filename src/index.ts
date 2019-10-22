import { IAbstractRegistrableComponent } from './lib/interface/IAbstractRegistrableComponent';
import { IAbstractTransitionComponent } from './lib/interface/IAbstractTransitionComponent';
import { IAbstractPageTransitionComponent } from './lib/interface/IAbstractPageTransitionComponent';
import { IAbstractScrollComponent } from './lib/interface/IAbstractScrollComponent';
import { IAbstractPageScrollComponent } from './lib/interface/IAbstractPageScrollComponent';
import { getEventBus } from './lib/scrollTrackerPlugin';
import { ADD_COMPONENTS, REMOVE_COMPONENTS } from './lib/eventbus/scrollTrackerEvents';
import { IRoute } from './lib/interface/IRoute';

export {
  TransitionEvent,
  TimelineType,
  TransitionDirection,
  IAbstractTransitionControllerOptions,
  ICreateTimelineOptions,
} from 'transition-controller';

export { default as FlowManager } from './lib/util/FlowManager';
export {
  default as AbstractTransitionController,
} from './lib/util/AbstractVueTransitionController';
export { default as FlowType } from './lib/enum/FlowType';
export { default as FlowEvent } from './lib/event/FlowEvent';
export { default as ScrollTrackerPlugin } from './lib/scrollTrackerPlugin';
export {
  IAbstractPageTransitionComponent,
  IAbstractRegistrableComponent,
  IAbstractTransitionComponent,
  IAbstractScrollComponent,
  IAbstractPageScrollComponent,
  IRoute,
  getEventBus,
  ADD_COMPONENTS,
  REMOVE_COMPONENTS,
};

export const AbstractRegistrableComponent: IAbstractRegistrableComponent = require('./lib/mixin/AbstractRegistrableComponent')
  .default;
export const AbstractTransitionComponent: IAbstractTransitionComponent = require('./lib/mixin/AbstractTransitionComponent')
  .default;
export const AbstractPageTransitionComponent: IAbstractPageTransitionComponent = require('./lib/mixin/AbstractPageTransitionComponent')
  .default;
export const AbstractScrollComponent: IAbstractScrollComponent = require('./lib/mixin/AbstractScrollComponent')
  .default;
export const AbstractPageScrollComponent: IAbstractPageScrollComponent = require('./lib/mixin/AbstractPageScrollComponent')
  .default;
