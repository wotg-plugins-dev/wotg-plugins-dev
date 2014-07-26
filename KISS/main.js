Wotg_Plugins.get().addSimplePlugin('KISS', '0.2.2', function (api) {

﻿	api.events.add('beforeLaunch', function () {
		console.log("KISS 5!!!")
﻿	});

	api.refactor( 'Wotg.Images.PreLoader', {
		preload: function (onComplete) {
			console.log("KISS Preloader");
			console.log(Wotg.Images.PreLoader.list);	
			console.log(Wotg.Images.PreLoader.list['dava-card']);
			Wotg.Images.PreLoader.list['dava-card'] = 'http://s7.hostingkartinok.com/uploads/images/2014/07/79a2c3b96b565f9625d765cdb1c5de10.png';
			console.log(Wotg.Images.PreLoader.list);	
			return this.preloader = this.makePreloader( Wotg.Images.PreLoader.list, onComplete );
		},
	});

});
