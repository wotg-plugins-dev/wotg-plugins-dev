Wotg_Plugins.get().addSimplePlugin('KISS', '0.2.2', function (api) {

﻿	api.events.add('beforeLaunch', function () {
		console.log("KISS!!!")
﻿	});

	api.refactor( 'Wotg.Images.PreLoader', {
		preload: function method (onComplete) {
			console.log("KISS Preloader");
			console.log(Wotg.Images.PreLoader.list);
			method.previous.apply( this, arguments );
		},
	}),

});
