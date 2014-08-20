new Wotg.Plugins.Simple({
	title  : 'TestPlugin',
	version: '0.2.3'
}, function (plugin, events) {
	plugin.addImagesPreload({
		'test': 'image.png'
	});
	
	console.log('MyTestPlugin', { Wotg: Wotg, plugin: plugin, atom: atom });

	events.add('initialize', function () {
		console.log('TestPlugin initialized');
	});

	events.add('afterLaunch', function () {
		atom.dom(plugin.getImage('test')).appendTo('body');
		console.log(plugin.getImage('test'));
	});
});
