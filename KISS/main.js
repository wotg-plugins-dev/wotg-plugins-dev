Wotg_Plugins.get().addSimplePlugin('KISS', '0.2.2', function (api) {

﻿	api.events.add('beforeLaunch', function () {
		console.log("KISS 2!!!")
		
		//SET SIZE
		//Art
		Wotg.Card.Markup.Big.markup.children[0].rect = [25, 85, 347, 290]
		//Type
		Wotg.Card.Markup.Big.markup.children[11].rect = [75, 25, 51, 61]

﻿	});

	api.refactor( 'Wotg.Images.PreLoader', {
		preload: function (onComplete) {
			Wotg.Images.PreLoader.list['dava-card'] = 'http://s7.hostingkartinok.com/uploads/images/2014/07/ad409f6fa1c6466dd5701fbb6422c30c.png';
			return this.preloader = this.makePreloader( Wotg.Images.PreLoader.list, onComplete );
		},
	});
	
	api.refactor( 'Wotg.Card.Views.Big',  {
	
		redraw: function method () {
			this.hide('NationFlag');
			method.previous.apply( this, arguments );
		}
	
	});	

});
