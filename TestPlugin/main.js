if (Wotg_Plugins) {
	Wotg_Plugins.get().addSimplePlugin('TestPlugin', '0.2.2', function (api) {
		console.log('TestPlugin 0.2.2', { Wotg: Wotg, api: api, atom: atom });
	});	
} else {
	new Wotg.Plugins.Simple({
		title  : 'MyPluginTitle',
		version: '0.2.3'
	}, function (plugin, events) {
		console.log('MyPluginTitle', { Wotg: Wotg, plugin: plugin, atom: atom });
	
		events.add('initialize', function () {
			console.log('MyPluginTitle initialized');
		});
	});
}
