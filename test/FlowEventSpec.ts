import { expect } from 'chai';
import {} from 'mocha';
import FlowEvent from '../src/lib/event/FlowEvent';

describe('#FlowEvent', () => {
	it('should clone itself', () => {
		const transitionEvent = new FlowEvent(FlowEvent.START);
		expect(transitionEvent.clone()).to.deep.equal(transitionEvent);
	});
});
