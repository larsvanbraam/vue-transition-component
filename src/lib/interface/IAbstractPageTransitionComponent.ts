import FlowType from '../enum/FlowType';
import { IAbstractTransitionComponent } from './IAbstractTransitionComponent';

export interface IAbstractPageTransitionComponent extends IAbstractTransitionComponent {
  /**
   * @public
   * @method hijack transition in
   * @returns {Promise<(release: () => void) => void>}
   */
  hijackTransitionIn(): Promise<(release: () => void) => void>;

  /**
   * @property flow
   * @description The flow of the page transition, see the FlowTypes file for the options
   */
  flow: FlowType;
}
