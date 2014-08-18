new Wotg.Plugins.Simple({
	title  : 'BattleCardView',
	version: '0.2.3'
}, function (plugin, events) {
	/*plugin.addImagesPreload({
		'test': 'image.png'
	});*/
	
	console.log('BattleCardView', { Wotg: Wotg, plugin: plugin, atom: atom });
console.log('update');

	events.add('initialize', function () {
		console.log('TestPlugin initialized');
	});

	events.add('afterLaunch', function () {
		//atom.dom(plugin.getImage('test')).appendTo('body');
		//console.log(plugin.getImage('test'));
	});
});
