requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'jquery-1.9.1',
		'socket.io': 'socket.io-1.3.7',
        bootstrap: '../bootstrap-3.3.6/js/bootstrap.min'
    },
	shim: {
		'bootstrap': { deps: ['jquery'] },
		'socket.io': { deps: ['jquery'] }
		}
});

require(['bootstrap','player','socket.io']);