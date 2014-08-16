new Wotg.Plugins.Simple({
	title  : 'Test2',
	version: '0.2.3'
}, function (plugin, events) {
	plugin.addImagesPreload({
		'test': 'image.png'
	});
	
	console.log('TestPlugin', { Wotg: Wotg, plugin: plugin, atom: atom });

	events.add('initialize', function () {
		console.log('TestPlugin initialized');
	});

	events.add('afterLaunch', function () {
		atom.dom(plugin.getImage('test')).appendTo('body');
		console.log(plugin.getImage('test'));
	});
});
