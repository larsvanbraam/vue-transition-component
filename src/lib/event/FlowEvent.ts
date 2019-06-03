import { createEventClass } from 'seng-event';
import { IRoute } from '../interface/IRoute';

/**
 * ### FlowEvent
 * The FlowManager uses the seng-event module to dispatch events to notify parent classes about
 * certain events. The following events can be listened to.
 */
export default class FlowEvent extends createEventClass<{ to: IRoute; from: IRoute }>()('START') {}
