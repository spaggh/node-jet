var sinon = require('sinon');
var expect = require('chai').expect;
var sorter = require('../lib/jet/sorter');

describe('The jet.sorter module', function () {
	var notificationSequence = [
		{
			path: 'a',
			value: 1,
			event: 'add',
			fetchOnly: true
				},
		{
			path: 'a',
			value: 1,
			event: 'remove',
				},
		{
			path: 'a',
			value: 1,
			event: 'add',
			fetchOnly: true
				},
		{
			path: 'b',
			value: 2,
			event: 'add'
				},
		{
			path: 'c',
			value: 3,
			event: 'add'
				},
		{
			path: 'b',
			value: 2.1,
			event: 'change'
				},
		{
			path: 'c',
			value: 3.1,
			event: 'change'
				}
		];

	describe('sort by path', function () {

		var spy;
		var sortObject;

		beforeEach(function () {

			spy = sinon.spy();
			sortObject = sorter.create({
				sort: {
					byPath: true,
					from: 1,
					to: 2
				}
			}, spy);
		});

		it('spy is called once after init', function () {
			notificationSequence.forEach(function (notification) {
				sortObject.sorter(notification, true);
			});
			sortObject.flush();
			expect(spy.calledOnce).to.be.true;
			expect(spy.calledWith(
							[{
						path: 'a',
						value: 1,
						fetchOnly: true,
						index: 1
							},
					{
						path: 'b',
						value: 2.1,
						index: 2
							}], 2));
		});
	});

});