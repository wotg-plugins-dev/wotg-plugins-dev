Wotg_Plugins.get().addSimplePlugin('KISS', '0.2.2', function (api) {

﻿	api.events.add('beforeLaunch', function () {
		console.log("KISS 3!!!")
		
		//SET SIZE
		//Art
		Wotg.Card.Markup.Big.markup.children[0].rect = [25, 85, 347, 290];
		//Type
		Wotg.Card.Markup.Big.markup.children[11].rect = [75, 25, 51, 61];
		//Title
		Wotg.Card.Markup.Big.markup.children[5].rect = [125, 28, 228, 30];
		//Description
		Wotg.Card.Markup.Big.markup.children[6].rect = [125, 59, 241, 22];
		//Power
		Wotg.Card.Markup.Big.markup.children[14].rect = [19, 385, 75, 75];
		//Toughness
		Wotg.Card.Markup.Big.markup.children[15].rect = [25, 465, 61, 75];		

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
