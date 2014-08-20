new Wotg.Plugins.Simple({
	title  : 'ExtendedExample',
	version: '0.2.3'
}, function (plugin, events) {
	plugin.addImages({
		'added-image': 'image.png'
	});
	
	plugin.replaceImages({
		'replaced-image': 'image.png'
	});
	
	plugin.replaceCardImages([
		'gh_trainingslager',
		'uh_trainingcamp',
		'sh_uchebnayachast'
	]);
	
	plugin.markupChange(Wotg.Card.Markup.HqBig)
		.move('Power', [ 0, 97 ])
		.move('Toughness', [ 70, 20 ]);
	
	plugin.markupChange(Wotg.Card.Markup.Big)
		.move('Power', [ 0, 97 ])
		.move('Toughness', [ 70, 20 ]);
	
	events.add('afterLaunch', function () {
		console.log(plugin.getImage('added-image'));
		console.log(Wotg.controller().images.get('replaced-image'));
	});
});
