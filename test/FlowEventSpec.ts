import FlowEvent from '../src/lib/event/FlowEvent';
import { expect } from 'chai';
import {} from 'mocha';

describe('#FlowEvent', () => {
	it('should clone itself', () => {
		const transitionEvent = new FlowEvent(FlowEvent.START);
		expect(transitionEvent.clone()).to.deep.equal(transitionEvent);
	});
});
