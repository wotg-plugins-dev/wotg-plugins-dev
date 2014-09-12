new Wotg.Plugins.Simple({
	title  : 'BattleCardView',
	version: '0.2.4'
}, function (plugin, events) {
	/*plugin.addImagesPreload({
		'test': 'image.png'
	});*/
	
	//Wotg.Card.Markup.Hand
	//
	
	console.log('BattleCardView', { Wotg: Wotg, plugin: plugin, atom: atom });
    
   /* plugin.refactor( 'Wotg.Plugins.DavaChange', {
    	deleteNode: function (id) {
    		var node = this.find(id);
    		if(node){
    			delete node;
    		}
    	}
    });
    */
    
    

	events.add('initialize', function () {
		console.log('BattleCardView initialized');
	});

    plugin.replaceImages({
		'battle-card-pack-own': 'battle/card-pack-own.png'
	});

	


    plugin.markupChange(Wotg.Battle.Markup)

    //.move('HandOwn', [  -240, 0 ])
    .place('HandOwn', [299, 693, 995, 160])
    .move('HandEnemy', [  30, 0 ])
    .move('PackOwn', [  11, -556 ])
    .move('PackOwn.Deck', [  -11, -26 ])
    .move('PackOwn.Grave', [  -11, -26 ])
   // .deleteNode('FlagOwn'/*, [  0, -582 ]*/)
    .move('PlatoonsOwn', [  0, 116 ])
    .move('YourTimer', [  0, -355 ])
    .move('ResourcesOwn', [  0, -355 ])
    .move('UserPhotoOwn', [  -60, -567 ])
    .move('UserNameOwn', [  -60, -567 ])
    //.place('consumableOwn1', [1207, 143, 60, 60])  172      156
    .move('consumableOwn1', [  -266, -366 ])
    .move('consumableOwn2', [  -266, -366 ])
    .move('consumableOwn3', [  -266, -366 ])
    //.place('consumableEnemy1', [1207, 299, 22, 22])
    .move('consumableEnemy1', [  264, 182 ])
    .move('consumableEnemy2', [  264, 182 ])
    .move('consumableEnemy3', [  264, 182 ])
    .move('SkipBtn', [  100, 50 ]);
    
   
   // plugin.markupChange(Wotg.Card.Markup.Hand)
   // .
            

    

    events.add('afterLaunch', function () {
    		Wotg.controller().popups.openOverlayOpacity = 0.4;
		//console.log(plugin.getImage('added-image'));
		//console.log(Wotg.controller().images.get('battle-card-pack-own'));
	});

    
    
    	/**
	 * @namespace Wotg.Card.Views
	 * @name Wotg.Card.Views.Hand
	 * @extends Wotg.Card.View
	 */
/*	declare( 'Wotg.Card.Views.Hand', Wotg.Card.View, {
	
		markup: Wotg.Card.Markup.Hand,
	
		flagFrames: { usa: 0, ussr: 1, germany: 2 },
		typeFrames: { vehicle: 0, platoon: 0, order: 1 },
		hqSubtypes: { consolidated: 0, any: 1, attack: 2, guards: 3  },
	
		initialize: function method () {
			method.previous.apply(this, arguments);
			this.imageCrop = this.model.proto.type == 'order' ?
				new Rectangle(0, 0, 172, 172):
				new Rectangle(15, 0, 250, 250);
		},
	
		redraw: function () {
			var model = this.model;
	
			this.buffer.ctx.clearAll();
			this.lazyDraw(this.lazyArt);
	
			this.setFrame('Background'  , 0);
	
			this.setText ('Title', Wotg.lang('cards.' + model.getProperty('idC') + '.short') );
			this.setValue('Cost', model.getProperty('cost'));
			if (model.isOpponent) {
				this.setFrame('Power', 0);
				this.dava.find('Power.Value').text.color = '#e54343';
			} else {
				this.setFrame('Power', 1);
			}
			if (model.getProperty('type') == 'order') {
				this.setFrame('Background', 1);
				this.hide('Increase' );
				this.hide('Power'    );
				this.hide('Toughness');
			} else {
				if (model.getProperty('resources')) {
					this.show('Increase');
					this.setValue('Increase', model.getProperty('resources'), true);
				} else {
					this.hide('Increase');
				}
				this.setValue('Power'    , model.getProperty('power'));
				this.setValue('Toughness', model.getProperty('toughness'));
				this.dava.find('Increase.Value').setShadow(null);
				if (model.getProperty('type') == 'platoon'){
					if (model.getProperty('isDefense')){
						//this.setFrame('Background', 1);
						this.setFrame('Power', 2);
						this.setValue('Power', model.getProperty('defense'));
					}
					if (model.getProperty('isAttack')) {
						this.setFrame('Power', 3);
					}
				}
			}
	
			this.setFrame('NationFlag'  , this.flagFrames[model.getProperty('country')]);
			this.setFrame('Subtype'     , this.getSubtypeFrame(model.isOpponent));
	
			// if(!this.proto.premium)
			this.hide('PremiumFrame');
			// else this.show('PremiumFrame');
			this.hide('Amount');
	
			this.dava.redraw(this.buffer.ctx);
	
			this.buffer.ctx.drawImage(
				Wotg.controller().cardText.getTextBuffer(model.proto, null, model.isOpponent),
				this.dava.find('Text').getShape()
			);
			this.events.fire("redraw");
		}
	
	});

    */
    
    	/**
	 * @namespace Wotg.Card.Views
	 * @name Wotg.Card.Views.Battle
	 * @extends Wotg.Card.View
	 */
	plugin.refactor( 'Wotg.Card.Views.Battle', {
	
		redraw: function () {
			var model = this.model;
	
			this.buffer.ctx.clearAll();
			this.lazyDraw(this.lazyArt);
	
			this.setText ('Title'       , Wotg.lang('cards.' + model.getProperty('idC') + '.short') );
	
			if (model.getProperty('increase')) {
				this.show('Increase');
				this.setValue('Increase',model.getProperty('increase'), true);
			} else {
				this.hide('Increase');
			}
	
			this.setValue('Power'       , model.getProperty('power'));
			this.setValue('Toughness'   , model.getProperty('toughness'));
	
			this.setFrame('NationFlag'  , this.flagFrames[model.getProperty('country')]);
	
			this.setFrame('Subtype'     , this.getSubtypeFrame(model.isOpponent));
	
			for (var i = 0; i <= 3; i++) {
				this.hide('Triggers.Trigger' + i);
			}
			if(model.getProperty('triggers')) {
				var triggers = model.getProperty('triggers'),
					currentIndex = 0;
				for (var i = 0; i < triggers.length; i++) {
					if (this.effectsFrames[triggers[i]] != undefined) {
						this.showEffect(currentIndex, triggers[i]);
						currentIndex++;
					} else if (triggers[i].indexOf('burning') != -1){
						this.showEffect(currentIndex, 'burning');
						currentIndex++;
					}
				}
			}
			if (model.isOpponent) {
				this.setFrame('Power', 0);
				this.setFrame('Frames', 1);
				this.dava.find('Power.Value').text.color = '#e54343';
			} else {
				this.setFrame('Power', 1);
				this.setFrame('Frames', 0);
			}
			this.hide('NoShoot');
			this.hide('NoMove');
			/*if (model.getProperty('untapped')) {
				this.hide('NoShoot');
			}  else {
				this.show('NoShoot');
			}
			if (!model.getProperty('moved')) {
				this.hide('NoMove');
			} else {
				this.show('NoMove');
			}*/
	
			this.hide('PremiumFrame');
	
			this.dava.redraw(this.buffer.ctx);
	
		}
	
	});

    	

    /** @name Wotg.Battle.Gui.Reserves */
    plugin.refactor( 'Wotg.Battle.Gui.Reserves', {
       fetchCurrentPosition: function (id, hover) {
            var
                length  = this.cards.length,
                padding = this.padding,
                size    = this.cardSize,
                from    = new Point(0, 3).move(this.shape.from),
                limits  = this.shape.width - padding * 2,
                shift   = 161;//size.width;

            if (length * shift - padding > limits) {
                // карты не помещаются - надо схлопывать
                shift = (limits - size.width) / (length - 1);
            }

           from.x += padding + id * Math.floor(shift);

            if (hover) from.y -= this.shift;

            return new Rectangle( from, size );
        }
    });

	plugin.refactor( 'Wotg.Battle.Animations', {
		/*deathSheetTime: 32,
		explosionSheetTime: 64,
		currentDeathZ: 200,
		initialize : function(){
			this.deathSheet = new Animation.Sheet({
				frames:  new Animation.Frames( Wotg.controller().images.get('battle-card-death'), 160, 160 ),
				delay : this.deathSheetTime
			});
			this.explosionSheet = new Animation.Sheet({
				frames:  new Animation.Frames( Wotg.controller().images.get('battle-explosion'), 220, 220),
				delay : this.deathSheetTime
			});
		},
		shot: function (params) {
			Wotg.sound('bullet-flight');
			new Wotg.Battle.Animations.Bullet( Wotg.battle().layer, {
				zIndex: 4,
				source: params.source.shape.center,
				target: params.target.shape.center,
				onComplete: function(params) {
					Wotg.sound('bullet-hit');
					new Wotg.Battle.Animations.Explosion(Wotg.battle().layer, {
						card : params.target,
						sheet: this.explosionSheet
					});
					params.onComplete();
				}.bind(this, params)
			});
		},*/
		death : function(params) {
			//do nothing
				/*var animation = new Wotg.Battle.Animations.Death(Wotg.battle().layer, {
				sheet: this.deathSheet,
				grave: Wotg.battle().markup.find((!params.source.card.viewModel.isOpponent) ? 'PackOwn' : 'PackEnemy').getShape().center,
				zIndex: (this.currentDeathZ += 0.0000001),
				shape: params.source.shape,
				onStart: params.onStart || function () {},
				onEnd: function(){
					params.onComplete && params.onComplete();
					animation && animation.destroy();
					animation = null;
				}
			});*/
	
		}
	});

    /*plugin.markupChange(Wotg.Card.Markup.Battle)
		.move('Power'    , [  0, 97 ])
		.move('Toughness', [ 70, 20 ]);
      */

    /** @name Wotg.Battle.Gui.StaticElements */
   plugin.refactor('Wotg.Battle.Gui.StaticElements', {
        initialize: function () {
            /*var frames = new Animation.Frames(Wotg.controller().images.get('flag-animation'), 60, 60);

            this.sheets = atom.object.map({
                GERMANY: Array.range(37, 0),
                USSR: Array.range(75, 38),
                USA: Array.range(113, 76)
            }, function (sequence) {
                return new Animation.Sheet({
                    sequence: sequence,
                    frames: frames,
                    looped: true,
                    delay: 40
                });
            });
            frames = null;
            this.flagShapes = {
                enemy: Wotg.battle().markup.find('FlagEnemy').getShape(),
                own: Wotg.battle().markup.find('FlagOwn').getShape()
            };*/
            this.texts = {
                own: {
                    deck: this.text({ z: 5, path: 'PackOwn.Deck', tooltip: "battle.tooltips.deck.own" }),
                    grave: this.text({ z: 5, path: 'PackOwn.Grave', tooltip: "battle.tooltips.grave.own" }),
                    resources: this.text({ z: 5, path: 'ResourcesOwn.Value', tooltip: "battle.tooltips.resources.own" }),
                    resourcesInc: this.text({ z: 5, path: 'ResourcesOwn.Value1', tooltip: "battle.tooltips.resourcesInc.own" })
                },
                enemy: {
                    deck: this.text({ z: 5, path: 'PackEnemy.Deck', tooltip: "battle.tooltips.deck.enemy" }),
                    grave: this.text({ z: 5, path: 'PackEnemy.Grave', tooltip: "battle.tooltips.grave.enemy" }),
                    resources: this.text({ z: 5, path: 'ResourcesEnemy.Value', tooltip: "battle.tooltips.resources.enemy" }),
                    resourcesInc: this.text({ z: 5, path: 'ResourcesEnemy.Value1', tooltip: "battle.tooltips.resourcesInc.enemy" })
                }
            };
            this.images = {
                own: {
                    pack: this.image({ z: 1, path: 'PackOwn', image: 'battle-card-pack-own' }),
                    resources: this.image({ z: 2, path: 'ResourcesOwn', image: 'battle-resources' })
                },
                enemy: {
                    pack: this.image({ z: 1, path: 'PackEnemy', image: 'battle-card-pack-enemy' }),
                    resources: this.image({ z: 2, path: 'ResourcesEnemy', image: 'battle-resources' })
                }
            };

            // Wotg.battle().mouseHandler.subscribe(this.images.own.resources);
            // Wotg.tooltip( this.images.own.resources, 'ResourcesTooltip' );

        },
        createFlag: function (country, isOpponent) {
            /*return new Wotg.Battle.Gui.Flag(Wotg.battle().layer, {
                sheet: this.sheets[country],
                shape: this.flagShapes[(isOpponent) ? 'enemy': 'own']
            });*/
        }/*,

        text: function (config) {
            var node = config.path ? Wotg.battle().markup.find(config.path) : null,
                _config = {
                    zIndex: config.z,
                    shape: node ? node.getShape() : config.shape,
                    texts: [
                        node ? {
                            config: node.text
                        } : config.data
                    ]
                },
                element = new Wotg.Battle.Gui.Element(config.layer || Wotg.battle().layer, _config);

            if (config.tooltip) {
                Wotg.battle().mouseHandler.subscribe(element);
                Wotg.tooltip(element, Wotg.lang(config.tooltip));
            }
            return element;
        },

        image: function (config) {
            var node = config.path ? Wotg.battle().markup.find(config.path) : null,
                _config = {
                    zIndex: config.z,
                    shape: node ? node.getShape() : config.shape,
                    images: [
                        {
                            image: config.image
                        }
                    ]
                },
                element = new Wotg.Battle.Gui.Element(config.layer || Wotg.battle().layer, _config);

            if (config.tooltip) {
                Wotg.battle().mouseHandler.subscribe(element);
                Wotg.tooltip(element, Wotg.lang(config.tooltip));
            }
            return element;
        },
        destroy: function() {
            for (var i in this.texts) {
                for (var j in this.texts[i]) {
                    this.texts[i][j].destroy();
                }
            }
            this.texts = null;
            for (var i in this.images) {
                for (var j in this.images[i]) {
                    this.images[i][j].destroy();
                }
            }
            this.images = null;
        }*/
    });        


	/** @name Wotg.Battle.Activity.UpdatePlayer */
	plugin.refactor('Wotg.Battle.Activity.UpdatePlayer', {
	
		updateValues: function () {
			var
				gui = Wotg.battle().gui.staticElements.texts[this.guiIndex],
				model = this.getModel().set(this.data.value);
	
			gui.deck.setText(model.deck);
			gui.grave.setText('bla'+model.graveyard);
			gui.resources.setText(model.resources);
			gui.resourcesInc.setText(model.increase);
	
			Wotg.battle().info.updateTimer('player');
			Wotg.battle().info.updateSkip();
		}
	
	});


    /*plugins.refactor( 'Manager', {

      oldCodeMethod: function () {
        if (1) this.myNewCode();
      },

      myNewCode: function () {
        console(this, 'is correct link');
      }

    });*/

   /* plugin.refactor( 'Wotg.Card.Views.Battle', Wotg.Card.View, {

        markup: Wotg.Card.Markup.Battle,

        flagFrames: { usa: 0, ussr: 1, germany: 2 },

        initialize: function method () {
            method.previous.apply(this, arguments);
            this.imageCrop = this.model.proto.type == 'order' ?
                new Rectangle(0, 60, 172, 140):
                new Rectangle(15, 5, 270, 240);
        },

        redraw: function () {
            var model = this.model, proto = model.proto;

            this.buffer.ctx.clearAll();
            this.lazyDraw(this.lazyArt);

            this.setText ('Title'       , Wotg.lang('cards.' + proto.idC + '.short') );

            if (model.increase) {
                this.show('Increase');
                this.setValue('Increase', model.increase, true);
            } else {
                this.hide('Increase');
            }

            this.setValue('Power'       , model.power);
            this.setValue('Toughness'   , model.toughness);

            this.setFrame('NationFlag'  , this.flagFrames[proto.country]);

            this.setFrame('Subtype'     , this.getSubtypeFrame(model.isOpponent));

            for (var i = 0; i <= 3; i++) {
                this.hide('Triggers.Trigger' + i);
            }
            if(model.triggers) for (var i = 0; i < model.triggers.length; i++){
                switch (model.triggers[i]) {
                    case 'assault' :
                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 2);
                        break;
                    case 'defender' :

                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 0);
                        break;
                    case 'camouflage' :
                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 1);
                        break;
                }
            }
            if (model.isOpponent) {
                this.setFrame('Power', 0);
                this.setFrame('Frames', 1);
                this.dava.find('Power.Value').text.color = '#e54343';
            } else {
                this.setFrame('Power', 1);
                this.setFrame('Frames', 0);
            }

            if (model.untapped) {
                this.hide('NoShoot');
            }  else {
                this.show('NoShoot');
            }
            if (!model.moved) {
                this.hide('NoMove');
            } else {
                this.show('NoMove');
            }

            this.hide('PremiumFrame');

            this.dava.redraw(this.buffer.ctx);

        }

    });
                         /*

    /**
     * @name Wotg.Battle.Card.View
     * @extends Wotg.Battle.Card.Back
     */
   /* plugin.refactor( 'Wotg.Battle.Card.View', Wotg.Battle.Card.Back, {

        zIndex: 10,
        selected : false,
        positionBasedZIndex : {
            battle : 10,
            battlehq : 50,
            selectedReserve : 190
        },
        inactiveOverlayColor: 'rgba(0,0,0,0.4)',
        configure: function () {
            this.card = this.settings.get('card');
            this.animatable = new atom.Animatable(this);

            var model = this.card.viewModel;

            if (this.card.is('hq')) {
                this.hqView    = new Wotg.Card.Views.HqBattle(model, this.redraw);
            } else {
                this.handView  = new Wotg.Card.Views.Hand(model, this.redraw);
            }

            if (this.card.is('vehicle')) {
                this.fieldView = new Wotg.Card.Views.Battle(model, this.redraw);
            } else if (this.card.is('platoon')) {
                this.fieldView = new Wotg.Card.Views.Platoon(model, this.redraw);
            }

            Wotg.battle().mouseHandler.subscribe(this);
            this.events.add('animateShapeStop', this.setCurrentZIndex);

            var cards = Wotg.battle().cards;

            this.events.add({
                mouseover   : cards.target.bind(cards, this.card),
                mouseout    : cards.untarget.bind(cards, this.card),
                mousedown   : cards.select.bind(cards, this.card),
                mouseup     : cards.activate.bind(cards, this.card),
                contextmenu : cards.context.bind(cards, this.card)
            });
        },
        clearViews : function(){
            this.hqView && (this.hqView = null);
            this.handView && (this.handView = null);
            this.fieldView && (this.fieldView = null);
        },
        setCurrentZIndex : function(){
            var zIndex;
            if (Wotg.battle()) {
                if (this.selected && this.card.at('reserve')){
                        zIndex = this.positionBasedZIndex.selectedReserve;
                } else if (!this.animatable.current || !this.animatable.current.timeLeft) {
                    if (this.card.is('hq')) {
                        zIndex = this.positionBasedZIndex.battlehq;
                    } else if (this.card.at('battlefield') || this.card.at('support')) {
                        zIndex = this.positionBasedZIndex.battle;
                    } else {
                        var reserve = Wotg.battle().gui.reserves;
                        zIndex = reserve.getZ(reserve.getCardPositionInHand(this.card));
                    }
                } else {
                    zIndex = this.zIndex;
                }
            } else {
                console.log('leak2');
            }
            this.zIndex = zIndex != null ? zIndex : this.zIndex;
            this.redraw();
        },
        renderTo: function (ctx) {
            this.card.prepareViewModel();

            if (!this.currentView) return;

            ctx.drawImage(this.currentView.buffer, this.shape);
            if (!this.card.at('support')) {
                if (this.card.viewModel.inactive) {
                    ctx.drawImage({
                        draw: this.shape,
                        image: Wotg.controller().images.get(this.card.at('battlefield') ? 'battle-card-frame-inactive' : this.card.is('order') ? 'reserve-card-frame-inactive-order' : 'reserve-card-frame-inactive')
                    });
                }

                if (!this.selected) {
                    ctx.drawImage({
                        draw: this.shape,
                        image: Wotg.controller().images.get(this.card.is('order') ? 'reserve-card-frame-notselected-order' : 'reserve-card-frame-notselected')
                    });
                }
            }

        },
        redrawCurrentView: function(){
            if (this.card.is('hq')) {
                this.currentView = this.hqView;
            } else if (this.card.at('battlefield') || this.card.at('support')) {
                this.currentView = this.fieldView;
            } else if (this.card.at('stack') && this.card.owner.isOpponent()) {
                this.currentView = this.fieldView;
            } else if (this.card.at('consumables')) {
                this.currentView = null;
            } else {
                this.currentView = (this.card.owner.isOpponent()) ? null : this.handView;
            }
            this.card.prepareViewModel();
            this.currentView && this.currentView.redraw();
            this.redraw();
        }
    });      */


    /**
     * @namespace Wotg.Card.Views
     * @name Wotg.Card.Views.Battle
     * @extends Wotg.Card.View
     */
  /*  plugin.refactor( 'Wotg.Card.Views.Battle', Wotg.Card.View, {

        markup: Wotg.Card.Markup.Battle,

        flagFrames: { usa: 0, ussr: 1, germany: 2 },

        initialize: function method () {
            method.previous.apply(this, arguments);
            this.imageCrop = this.model.proto.type == 'order' ?
                new Rectangle(0, 60, 172, 140):
                new Rectangle(15, 5, 270, 240);
        },

        redraw: function () {
            var model = this.model, proto = model.proto;

            this.buffer.ctx.clearAll();
            this.lazyDraw(this.lazyArt);

            this.setText ('Title'       , Wotg.lang('cards.' + proto.idC + '.short') );

            if (model.increase) {
                this.show('Increase');
                this.setValue('Increase', model.increase, true);
            } else {
                this.hide('Increase');
            }

            this.setValue('Power'       , model.power);
            this.setValue('Toughness'   , model.toughness);

            this.setFrame('NationFlag'  , this.flagFrames[proto.country]);

            this.setFrame('Subtype'     , this.getSubtypeFrame(model.isOpponent));

            for (var i = 0; i <= 3; i++) {
                this.hide('Triggers.Trigger' + i);
            }
            if(model.triggers) for (var i = 0; i < model.triggers.length; i++){
                switch (model.triggers[i]) {
                    case 'assault' :
                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 2);
                        break;
                    case 'defender' :

                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 0);
                        break;
                    case 'camouflage' :
                        this.show('Triggers.Trigger' + i);
                        this.setFrame('Triggers.Trigger' + i, 1);
                        break;
                }
            }
            if (model.isOpponent) {
                this.setFrame('Power', 0);
                this.setFrame('Frames', 1);
                this.dava.find('Power.Value').text.color = '#e54343';
            } else {
                this.setFrame('Power', 1);
                this.setFrame('Frames', 0);
            }

            if (model.untapped) {
                this.hide('NoShoot');
            }  else {
                this.show('NoShoot');
            }
            if (!model.moved) {
                this.hide('NoMove');
            } else {
                this.show('NoMove');
            }

            this.hide('PremiumFrame');

            this.dava.redraw(this.buffer.ctx);

        }

    });      */


});
