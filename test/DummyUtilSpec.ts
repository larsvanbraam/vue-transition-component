import {} from 'mocha';
import {expect} from 'chai';
import DummyUtil from '../src/lib/util/DummyUtil';

let example: DummyUtil;

describe('DummyUtilSpec', () => {
	beforeEach(function () {
		example = new DummyUtil();
	});

	it('should return the correct value', () => {
		expect(example.foo('foo')).to.equal('foobar');
	});
});
