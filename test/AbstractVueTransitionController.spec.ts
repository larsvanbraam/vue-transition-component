import { TransitionDirection } from 'transition-controller';
import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import ChildComponentA from './util/ChildComponentA/ChildComponentA';
import { IAbstractTransitionComponent } from 'lib/interface/IAbstractTransitionComponent';

describe('AbstractTransitionControllerSpec', () => {
  describe('getSubTimelineByComponent', () => {
    it('should get the subtimeline by the component reference', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.allComponentsReady
        .then(() => component.transitionController.getSubTimeline('ChildComponentB'))
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the component instance', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getSubTimeline(<IAbstractTransitionComponent>component
            .$refs.ChildComponentB),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the element', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getSubTimeline(
            (<IAbstractTransitionComponent>component.$refs.ChildComponentB).$el,
          ),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should get the subtimeline by the component reference, in the in direction', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.allComponentsReady
        .then(() =>
          component.transitionController.getSubTimeline('ChildComponentB', TransitionDirection.IN),
        )
        .then(component => expect(component).to.not.be.undefined);
    });

    it('should try to get the subtimeline but fail because it does not exist', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.allComponentsReady.then(() =>
        expect(() => component.transitionController.getSubTimeline('Foo')).to.throw(Error),
      );
    });
  });
});
