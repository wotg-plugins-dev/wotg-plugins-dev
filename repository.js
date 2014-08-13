if (window.Wotg_Plugins) {
	Wotg_Plugins.get().addRepository({
		title: 'wotg-plugins-dev',
		plugins: [
			'TestPlugin',
			'Katusha',
			'InPain',
		]
	});
} else {
	new Wotg.Plugins.Repository({
		title: 'wotg-plugins-dev',
		plugins: [
			'TestPlugin',
			'Katusha',
			'InPain'
		]
	});
}
