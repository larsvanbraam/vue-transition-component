import { IAbstractRegistrableComponent } from './lib/interface/IAbstractRegistrableComponent';
import { IAbstractTransitionComponent } from './lib/interface/IAbstractTransitionComponent';
import { IAbstractPageTransitionComponent } from './lib/interface/IAbstractPageTransitionComponent';
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
export {
  IAbstractPageTransitionComponent,
  IAbstractRegistrableComponent,
  IAbstractTransitionComponent,
  IRoute,
};

export const AbstractRegistrableComponent: IAbstractRegistrableComponent = require('./lib/mixin/AbstractRegistrableComponent')
  .default;
export const AbstractTransitionComponent: IAbstractTransitionComponent = require('./lib/mixin/AbstractTransitionComponent')
  .default;
export const AbstractPageTransitionComponent: IAbstractPageTransitionComponent = require('./lib/mixin/AbstractPageTransitionComponent')
  .default;
