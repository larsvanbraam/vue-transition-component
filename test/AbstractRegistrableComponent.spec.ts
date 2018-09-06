import {} from 'mocha';
import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import ChildComponentB from './util/ChildComponentB/ChildComponentB';
import ChildComponentA from './util/ChildComponentA/ChildComponentA';
import { IAbstractTransitionComponent } from 'lib/interface/IAbstractTransitionComponent';

describe('AbstractRegistrableComponent', () => {
  describe('checkComponentsReady', () => {
    it('should check if all components are ready', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      expect(component.checkComponentsReady()).to.be.undefined;
    });
  });

  describe('isReady', () => {
    it('should trigger the isReady method because the component is ready', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentA);
      const childComponent = <IAbstractTransitionComponent>component.$refs.ChildComponentB;
      expect(childComponent.isReady()).to.be.undefined;
    });
  });

  describe('updateRegistrableComponents', () => {
    it('should trigger the updateRegistrableComponents method and wait for them to be done', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      return component.allComponentsReady.then(() => {
        component.updateRegistrableComponents(resolve => setTimeout(resolve, 1))
          .then(components => expect(components).to.be.an('array').that.is.empty)
      })
    });
  });

  describe('$destroy', () => {
    it('should trigger the destroy method', () => {
      const component = <IAbstractTransitionComponent>getMountedComponent(ChildComponentB);
      component.$destroy();
      expect(component['_isDestroyed']).to.be.true;
    });
  });
});
