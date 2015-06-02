var jet = require('../../lib/jet');

var peer = new jet.Peer({
	url: 'ws://localhost:8080'
});

var sum = new jet.Method('sum');
sum.on('call', function (args) {
	return args.reduce(function (prev, next) {
		return prev + next;
	});
});

peer.add(sum);


var even = new jet.State('even', 2);

even.on('set', function (newval) {
	console.log(newval);
	if (newval % 2 !== 0) {
		throw new Error('only accepting even numbers');
	}
});

peer.add(even);