import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import { IAbstractTransitionComponent } from 'lib/interface/IAbstractTransitionComponent';
import ChildComponentB from './util/ChildComponentB/ChildComponentB';

describe('AbstractTransitionComponentSpec', () => {
  describe('transitionIn', () => {
    it('should transition in the component', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      return component.allComponentsReady
        .then(() => component.transitionIn())
        .then(() => expect(component.transitionController.isHidden).to.be.false)
    });
  });

  describe('transitionOut', () => {
    it('should transition out the component', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      return component.allComponentsReady
        .then(() => component.transitionIn())
        .then(() => component.transitionOut())
        .then(() => expect(component.transitionController.isHidden).to.be.true)
    });
  });

  describe('$destroy', () => {
    it('should trigger the destroy method', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      return component.allComponentsReady
        .then(() => component.$destroy())
        .then(() => expect(component['_isDestroyed']).to.be.true)
    });
  });
});
