import { IAbstractScrollComponent } from './IAbstractScrollComponent';
import { IAbstractPageTransitionComponent } from './IAbstractPageTransitionComponent';

export interface IAbstractPageScrollComponent extends IAbstractPageTransitionComponent {
  scrollComponents: Array<IAbstractScrollComponent>;
}
