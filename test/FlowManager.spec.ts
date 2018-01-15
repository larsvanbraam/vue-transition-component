import { expect } from 'chai';
import { FlowManager } from '../src/lib/util/FlowManager';
import FlowType from '../src/lib/enum/FlowType';
import IAbstractPageTransitionComponent from '../src/lib/interface/IAbstractPageTransitionComponent';
import { getApplication, getChildComponent } from './util/app/App';

describe('FlowManager', () => {
	let flowManager: FlowManager;
	let app: any;

	const getPageComponent = (): Promise<IAbstractPageTransitionComponent> => {
		return app.allComponentsReady
		.then(() => app.getChild('PageComponentA'));
	};

	beforeEach(() => {
		app = getApplication();
		flowManager = new FlowManager();
	});

	it('should return the transition out promise', () => {
		const transitionOutPromise = flowManager.transitionOut;
		expect(transitionOutPromise).to.equal(undefined);
	});

	it('start a NORMAL flow', (done) => {
		getChildComponent(app, 'PageComponentA')
		.then((page:IAbstractPageTransitionComponent) => {
			flowManager.start(
				page,
				() => {
					flowManager.done();
					done();
				},
				{
					path: '/dummy-page',
					hash: '',
					query: {},
					params: {},
					fullPath: '',
					matched: [
            {
              components: {
                default: {
                  name: 'some-other-component',
                }
              }
            }
          ],
				},
			);
		}).catch(reason => console.log('reason', reason));
	});

	it('start a NORMAL flow and try to run it twice', (done) => {
		getPageComponent()
		.then((page) => {
			flowManager.start(
				page,
				() => {
					flowManager.done();
					flowManager.start(page, () => done(), {
						path: '/dummy-page',
						hash: '',
						query: {},
						params: {},
						fullPath: '',
						matched: [
              {
                components: {
                  default: {
                    name: 'some-other-component',
                  }
                }
              }
            ],
					});
				},
				{
					path: '/dummy-page',
					hash: '',
					query: {},
					params: {},
					fullPath: '',
					matched: [
            {
              components: {
                default: {
                  name: 'some-other-component',
                }
              }
            }
          ],
				},
			);
		});
	});

	it('start a NORMAL flow with the same component id', (done) => {
		getPageComponent()
		.then((page:IAbstractPageTransitionComponent) => {
			flowManager.start(
				page,
				() => {
					flowManager.done();
					flowManager.start(page, () => done(), {
						path: '/dummy-page',
						hash: '',
						query: {},
						params: {},
						fullPath: '',
						matched: [
              {
                components: {
                  default: {
                    name: 'PageComponentA',
                  }
                }
              }
            ],
					});
				},
				{
					path: '/dummy-page',
					hash: '',
					query: {},
					params: {},
					fullPath: '',
          matched: [
            {
              components: {
                default: {
                  name: 'PageComponentA',
                }
              }
            }
          ],
				},
			);
		});
	});

	it('start a CROSS flow', (done) => {
		getPageComponent()
		.then((page:IAbstractPageTransitionComponent) => {
			// Change the flow to Cross!
			page.flow = FlowType.CROSS;

			flowManager.start(
				page, () => {
					flowManager.done();
					done();
				},
				{
					path: '/dummy-page',
					hash: '',
					query: {},
					params: {},
					fullPath: '',
					matched: [],
				},
			);
		});
	});

	it('should throw an error', () => {
		return getChildComponent(app, 'PageComponentA')
		.then((page:IAbstractPageTransitionComponent) => {
			const pageComponent = page;
			// Strip out the flow to make it fail
			pageComponent.flow = null;
			// Expect it to fail
			expect(() => flowManager.start(
				pageComponent,
				() => {},
				{
					path: '/dummy-page',
					hash: '',
					query: {},
					params: {},
					fullPath: '',
					matched: [],
				},
			)).to.throw(Error);
		});
	});

	it('should dispose the FlowManager and mark it as disposed', () => {
		flowManager.dispose();
		expect(flowManager.isDisposed()).to.equal(true);
	});

	it('should hijack the flow by returning a promise', () => {
		return flowManager.hijackFlow().then(release => release());
	});
});
