

if (Wotg_Plugins) {
	Wotg_Plugins.get().addRepository({
		title: 'wotg-plugins-dev',
		plugins: [
			'TestPlugin',
			'Katusha',
			'InPain',
		]
	});
} else {
	
}
