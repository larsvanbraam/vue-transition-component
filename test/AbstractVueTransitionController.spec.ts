import { TransitionDirection } from 'transition-controller';
import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import { getApplication, getTransitionController } from './util/app/App';
import ChildComponentA from './util/ChildComponentA/ChildComponentA';
import IAbstractTransitionComponent from 'lib/interface/IAbstractTransitionComponent';

describe('AbstractTransitionControllerSpec', () => {
  describe('getSubTimelineByComponent', () => {

    it('should get the subtimeline by the component reference', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.$_allComponentsReady
        .then(() => component.transitionController.getSubTimelineByComponent('ChildComponentB'))
        .then(component => expect(component).to.not.be.undefined)
    });

    it('should get the subtimeline by the component instance', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.$_allComponentsReady
        .then(() => component.transitionController.getSubTimelineByComponent(component.$refs.ChildComponentB))
        .then(component => expect(component).to.not.be.undefined)
    });

    it('should get the subtimeline by the element', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.$_allComponentsReady
        .then(() => component.transitionController.getSubTimelineByComponent(component.$refs.ChildComponentB.$el))
        .then(component => expect(component).to.not.be.undefined)
    });

    it('should get the subtimeline by the component reference, in the in direction', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.$_allComponentsReady
        .then(() => component.transitionController.getSubTimelineByComponent('ChildComponentB', TransitionDirection.IN))
        .then(component => expect(component).to.not.be.undefined)
    });

    it('should try to get the subtimeline but fail because it does not exist', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      return component.$_allComponentsReady
        .then(() => expect(() => component.transitionController.getSubTimelineByComponent('Foo')).to.throw(Error))
    });
  });
});
