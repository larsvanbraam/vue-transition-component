import { expect } from 'chai';
import {} from 'mocha';
import FlowEvent from '../src/lib/event/FlowEvent';

describe('#FlowEvent', () => {
	it('should clone itself', () => {
		const transitionEvent = new FlowEvent(FlowEvent.START, { to: {
			path: '/dummy-page',
			hash: '',
			query: {},
			params: {},
			fullPath: '',
			matched: [],
		} });
		expect(transitionEvent.clone()).to.deep.equal(transitionEvent);
	});
});
