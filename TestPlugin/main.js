if (window.Wotg_Plugins) {
	Wotg_Plugins.get().addSimplePlugin('TestPlugin', '0.2.2', function (api) {
		console.log('TestPlugin 0.2.2', { Wotg: Wotg, api: api, atom: atom });
	});	
} else {
	new Wotg.Plugins.Simple({
		title  : 'TestPlugin',
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
			console.log(plugin.getImage('test'));
		});
	});
}
