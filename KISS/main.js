Wotg_Plugins.get().addSimplePlugin('KISS', '0.2.2', function (api) {

﻿	api.events.add('beforeLaunch', function () {
		console.log("KISS 1!!!")
﻿	});

	api.refactor( 'Wotg.Images.PreLoader', {
		preload: function (onComplete) {
			console.log("KISS Preloader");
			console.log(Wotg.Images.PreLoader.list);	
			console.log(Wotg.Images.PreLoader.list['dava-card']);
			Wotg.Images.PreLoader.list['dava-card'] = 'http://s7.hostingkartinok.com/uploads/images/2014/07/ad409f6fa1c6466dd5701fbb6422c30c.png';
			console.log(Wotg.Images.PreLoader.list);	
			return this.preloader = this.makePreloader( Wotg.Images.PreLoader.list, onComplete );
		},
	});
	
	
	api.refactor( 'Wotg.Card.Views.Big', {
	
		redraw: function () {
			
			//SET SIZE
			Wotg.Card.Markup.Big.markup.children[0].rect = [25, 85, 347, 290]
			console.log(this.markup);
			this.markup.markup.children[0].rect = [25, 85, 347, 290]
			console.log(this.markup);
			
			var model = this.model, proto = model.proto;
	
			this.buffer.ctx.clearAll();
			if (this.proto.type == 'order') {
				this.hide('OrderBg');
				this.buffer.ctx.drawImage({
						draw: this.dava.find('OrderBg').rect,
						image: Wotg.controller().images.get('reserve-card-order-background')
					}
				)
				this.lazyDraw(this.lazyArt, 'OrderImage');
	
				this.hide('Image');
			} else {
				this.lazyDraw(this.lazyArt);
				this.hide('OrderBg');
				this.hide('OrderImage');
			}
	
			this.setFrame('Background'  , 1);
	
			//TITLE
			this.setText ('Title'       , Wotg.lang('cards.' + proto.idC + '.short') );
			
			//DESCRIPTION
			this.setText ('Description' , Wotg.lang('cards.' + proto.idC + '.full') );
	
			//RESOURCES
			if (proto.resources) {
				this.show('Increase');
				this.setValue('Increase', proto.resources, true);
			} else {
				this.hide('Increase');
			}
	
			//VALUES
			this.setValue('Power'       , proto.power);
			this.setValue('Toughness'   , proto.toughness);
			this.setValue('Cost'        , proto.cost);
	
			//NATION
			this.setFrame('NationFlag'  , this.flagFrames[proto.country]);
			
			//TYPE
			this.setFrame('Type'     , this.getSubtypeFrame(model.isOpponent));
			
			this.hide('Amount');
			this.setFrame('Power', 0);
			if (!model.premium) {
				this.hide('PremiumFrame');
			}
	
			if (!model.hasActualAbilities) {
				this.hide('Footer');
			}
	
			if (this.model.proto.type == 'order') {
				this.setFrame('Background', 2);
				this.hide('Increase');
				this.hide('Power');
				this.hide('Toughness');
			}
			if (this.proto.type == 'platoon'){
				if (this.proto.isDefense){
					this.setFrame('Background', 1);
					this.setFrame('Power', 2);
				}
				if (this.proto.isAttack) {
					this.setFrame('Power', 3);
				}
			}
			
			//HIDE VALUES
			this.hide('Increase');
			this.hide('Power');
			this.hide('Toughness');
			this.hide('NationFlag');
			this.hide('Type');
			this.hide('Cost');
			//this.hide('Title');
			this.hide('Description');
	
			this.dava.redraw(this.buffer.ctx);
	
			this.buffer.ctx.drawImage(
				Wotg.controller().cardText.getTextBuffer(proto, null, model.isOpponent),
				this.dava.find('Text').getShape()
			);
		}
	
	});

});
