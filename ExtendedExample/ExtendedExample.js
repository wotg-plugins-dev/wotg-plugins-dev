new Wotg.Plugins.Simple({
	title  : 'ExtendedExample',
	version: '0.2.4'
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
		'sh_uchebnayachast',
		
		'go_kameradderarbeit',
		'go_tagderwehrmacht',
		'gp_auskundschaftersderpdmuncheberg',
		'gv_leichttraktor',
		'gv_panzerjagerI',
		'gv_pzb2',
		'gv_t25',
		
		'uo_crushprussian',
		'uv_ramII',
		'uv_t1lt',
		'uv_t14',
		'uv_t18',
		
		'so_budbditelnym',
		'so_takbilotakbudet',
		'so_udarmolota',
		'sp_strelkiuzhnogofronta',
		'sv_kv220',
		'sv_matilda4',
		'sv_ms1',
		'sv_su18'
	]);
	
	plugin.replaceAudio([
		'background'
	]);
	
	plugin.markupChange(Wotg.Card.Markup.HqBig)
		.move('Power'    , [  0, 97 ])
		.move('Toughness', [ 70, 20 ]);
	
	plugin.markupChange(Wotg.Card.Markup.Big)
		.move('Power'    , [  0, 97 ])
		.move('Toughness', [ 70, 20 ]);
	
	events.add('afterLaunch', function () {
		console.log(plugin.getImage('added-image'));
		console.log(Wotg.controller().images.get('replaced-image'));
	});
});
