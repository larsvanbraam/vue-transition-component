import AbstractVueTransitionController from '../../../src/lib/util/AbstractVueTransitionController';

class ChildComponentATransitionController extends AbstractVueTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @description overwrite this method in the parent class
   */
  protected setupTransitionInTimeline(): void {
    this.transitionInTimeline.fromTo(this.parentController.$el, 0.1, { autoAlpha: 0 }, { autoAlpha: 1 });
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @description overwrite this method in the parent class
   * */
  protected setupTransitionOutTimeline(): void {}
}

export default ChildComponentATransitionController;
