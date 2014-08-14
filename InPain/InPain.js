new Wotg.Plugins.Simple({
	title  : 'InPain',
	version: '0.2.3'
}, function (plugin, events) {
	events.add('beforeLaunch', function () {
		Wotg.controller().lang.set({'hangar.battleButton' : 'В Боль!'});
	});
});
