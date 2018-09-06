import { expect } from 'chai';
import { getMountedComponent } from './util/App';
import {} from 'mocha';
import { IAbstractPageTransitionComponent }  from '../src/lib/interface/IAbstractPageTransitionComponent';
import PageComponentA from './util/PageComponentA/PageComponentA';

describe('AbstractPageTransitionComponent', () => {
  describe('hijackTransitionIn', () => {
    it('should hijack the transition in until it\'s done', () => {
      const component = <IAbstractPageTransitionComponent>getMountedComponent(PageComponentA);
      return component.hijackTransitionIn().then(release => setTimeout(release, 1))
        .then(() => expect(component.transitionInHijack).to.not.be.undefined)
    });
  });
});
