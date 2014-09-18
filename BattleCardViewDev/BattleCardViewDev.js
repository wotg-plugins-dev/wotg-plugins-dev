new Wotg.Plugins.Simple({
	title  : 'BattleCardView',
	version: '0.2.4'
}, function (plugin, events) {

	events.add('initialize', function () {
		console.log('BattleCardView initialized');
	});

    plugin.replaceImages({
		'battle-card-pack-own': 'battle/card-pack-own-m.png'
	});

    plugin.markupChange(Wotg.Battle.Markup)
    .place('HandOwn', [299, 693, 995, 160])
    .move('HandEnemy', [  30, 0 ])
    .place('PackOwn', [125, 55, 280, 253])  //  "rect": [99, 611, 296, 263]
    //.move('PackOwn', [  11, -556 ])
    .move('PackOwn.Deck', [  -26, -18 ])
    .move('PackOwn.Grave', [  -29, -18 ])
    .move('PlatoonsOwn', [  0, 116 ])
    .move('YourTimer', [  0, -355 ])
    .move('ResourcesOwn', [  0, -355 ])
    .move('UserPhotoOwn', [  -60, -567 ])
    .move('UserNameOwn', [  -60, -567 ])
    .move('consumableOwn1', [  -266, -366 ])
    .move('consumableOwn2', [  -266, -366 ])
    .move('consumableOwn3', [  -266, -366 ])
    .move('consumableEnemy1', [  264, 182 ])
    .move('consumableEnemy2', [  264, 182 ])
    .move('consumableEnemy3', [  264, 182 ])
    .move('SkipBtn', [  100, 50 ]);

    events.add('afterLaunch', function () {
   		Wotg.controller().popups.openOverlayOpacity = 0.4;
	});


    var indicatorImage = plugin.getConfig('sem') || '1';
    //новые картинки для индикации атаки и передвижения
    plugin.addImages({
		'sem1': 'semaphore/semaphore'+indicatorImage+'.png'
	});

    //картинка индикатора движения
    Wotg.Card.Markup.Battle.sprites.moveIndicator = [{
      "rect": [53, 42, 17, 30],  //36
      "shift": [0, 0]
    }];

    Wotg.Card.Markup.Battle.sprites.atkIndicator = [{
      "rect": [0, 39, 36, 39],      //red
      "shift": [0, 0]
    },
    {
      "rect": [0, 0, 36, 39],       //green
      "shift": [0, 0]
    },
    {
      "rect": [36, 0, 36, 39],     //grey
      "shift": [0, 0]
    }
    ];

    //добавляем индикатор движения на карту
    Wotg.Card.Markup.Battle.markup.children.push({
        "children": [],
        "id": "moveIndicator",
        "sprite": {
          "name": "moveIndicator",
          "texture": "bzz86:BattleCardView:sem1",
          "frame": 0
        },
        "rect": [37, 122, 17, 30]
      });

    //заменяем иконку ОМ
    plugin.markupChange(Wotg.Card.Markup.Battle)
    .change('Power', function(node){
         node.sprite = {
          "name": "atkIndicator",
          "texture": "bzz86:BattleCardView:sem1",
          "frame": 1
        }
    });



    /**
     * @namespace Wotg.Card.Views
     * @name Wotg.Card.Views.Battle
     * @extends Wotg.Card.View
     */
    plugin.refactor( 'Wotg.Card.Views.Battle', {

        atkIndicatorFrames : {
            opponent: 0,
            counter: 0,
            attack : 1,
            noAttack : 2,
            noCounter : 2
        },

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
                //контратака
                if (model.getProperty('cancounter')) {
                    this.setFrame('Power', this.atkIndicatorFrames['counter']);
                    this.dava.find('Power.Value').text.color = '#e54343';
                }else{
                    this.setFrame('Power', this.atkIndicatorFrames['noCounter']);
                    this.dava.find('Power.Value').text.color = 'rgba(191,206,191,1)';
                }
                //перемещение
                this.hide('moveIndicator');

                this.setFrame('Frames', 1);

            } else {
                //атака
                if (model.getProperty('untapped') && (model.effects.indexOf('t_cant_attack') < 0)) {
                    this.setFrame('Power', this.atkIndicatorFrames['attack']);
                    this.dava.find('Power.Value').text.color = 'rgba(110,207,72,1)';
                }else{
                    this.setFrame('Power', this.atkIndicatorFrames['noAttack']);
                    this.dava.find('Power.Value').text.color = 'rgba(191,206,191,1)';
                }
                //перемещение
                if( model.getProperty('movable') && (!model.getProperty('moved')) && (model.effects.indexOf('t_cant_move') < 0)){
                    this.show('moveIndicator');
                }else{
                    this.hide('moveIndicator');
                }

                this.setFrame('Frames', 0);
            }


            //скрываем стандартные значки
            this.hide('NoShoot');
            this.hide('NoMove');

            this.hide('PremiumFrame');

            this.dava.redraw(this.buffer.ctx);

        }

    });


    //спрайт для штаба
    Wotg.Card.Markup.HqBattle.sprites.atkIndicator = [{
      "rect": [0, 39, 36, 39],      //red
      "shift": [0, 0]
    },
    {
      "rect": [0, 0, 36, 39],       //green
      "shift": [0, 0]
    },
    {
      "rect": [36, 0, 36, 39],     //grey
      "shift": [0, 0]
    }
    ];

    //заменяем иконку ОМ для штаба
    plugin.markupChange(Wotg.Card.Markup.HqBattle)
    .change('Power', function(node){
         node.sprite = {
          "name": "atkIndicator",
          "texture": "bzz86:BattleCardView:sem1",
          "frame": 1
        }
    });

    /**
     * @namespace Wotg.Card.Views
     * @name Wotg.Card.Views.HqBattle
     * @extends Wotg.Card.View
     */
    plugin.refactor( 'Wotg.Card.Views.HqBattle', {

        atkIndicatorFrames : {
            opponent : 0,
            attack : 1,
            noAttack : 2
        },

        redraw: function () {
            var model = this.model;

            this.buffer.ctx.clearAll();
            this.lazyDraw(this.lazyArt);

            this.setText ('Title'       , Wotg.lang('cards.' + model.getProperty('idC')+ '.short') );

            this.setValue('Increase'    , model.getProperty('increase'), true);
            this.setValue('Power'       , model.getProperty('power'));
            this.setValue('Toughness'   , model.getProperty('toughness'));

            //this.setFrame('NationFlag'  , this.flagFrames[proto.country]);
            this.hide('NationFlag');
            this.setFrame('Subtype'     , this.hqSubtypes[(model.isOpponent)?'enemy':'own'][model.getProperty('subtype')]);


            if (model.isOpponent) {
                this.setFrame('Power', this.atkIndicatorFrames['opponent']);
                this.dava.find('Power.Value').text.color = '#e54343';
            } else {
                if (model.getProperty('untapped') && (model.effects.indexOf('t_cant_attack') < 0)) {
                    this.setFrame('Power', this.atkIndicatorFrames['attack']);
                    this.dava.find('Power.Value').text.color = 'rgba(110,207,72,1)';
                }else{
                    this.setFrame('Power', this.atkIndicatorFrames['noAttack']);
                    this.dava.find('Power.Value').text.color = 'rgba(191,206,191,1)';
                }
            }

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
		death : function(params) {
			//do nothing
		}
	});

    /** @name Wotg.Battle.Gui.StaticElements */
   plugin.refactor('Wotg.Battle.Gui.StaticElements', {
        initialize: function () {
            //removed flags were here

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
        },
        createFlag: function (country, isOpponent) {
            //do nothing
        }
    });        


	/** @name Wotg.Battle.Activity.UpdatePlayer */
	plugin.refactor('Wotg.Battle.Activity.UpdatePlayer', {
	
		updateValues: function () {
			var
				gui = Wotg.battle().gui.staticElements.texts[this.guiIndex],
				model = this.getModel().set(this.data.value);
	
	
			var deckQtyEl = gui.deck;	
			if( parseInt(model.deck) <= 5 ){	
				for (var i = 0; i < deckQtyEl.texts.length; i++){
					deckQtyEl.texts[i].config.color = '#d32c2f';//'#cb1d20';
					deckQtyEl.texts[i].config.size = 22;
					//fontsize
				//	deckQtyEl.texts[i].config.shadow = 'white';
					deckQtyEl.texts[i].config.bold = true;
				//	plugin.markupChange(Wotg.Battle.Markup).move('PackOwn.Deck', [  0, -40 ]);

				}
			}else{
				for (var i = 0; i < deckQtyEl.texts.length; i++){
					deckQtyEl.texts[i].config.color = (new Wotg.Lib.Dava.Node(Wotg.Battle.Markup.markup)).find('PackOwn.Deck').markup.textcolor;
					deckQtyEl.texts[i].config.size = (new Wotg.Lib.Dava.Node(Wotg.Battle.Markup.markup)).find('PackOwn.Deck').markup.fontsize;
				}
			}
			gui.deck.setText(model.deck);
			gui.grave.setText(model.graveyard);
			gui.resources.setText(model.resources);
			gui.resourcesInc.setText(model.increase);
	
			Wotg.battle().info.updateTimer('player');
			Wotg.battle().info.updateSkip();
		}
	
	});

});
