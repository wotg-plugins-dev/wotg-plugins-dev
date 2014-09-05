new Wotg.Plugins.Simple({
	title  : 'BattleCardView',
	version: '0.2.3'
}, function (plugin, events) {
	/*plugin.addImagesPreload({
		'test': 'image.png'
	});*/
	
	console.log('BattleCardView', { Wotg: Wotg, plugin: plugin, atom: atom });
    console.log('update');

	events.add('initialize', function () {
		console.log('BattleCardView initialized');
	});

    plugin.replaceImages({
		'battle-card-pack-own': 'images/battle/card-pack-own.png'
	});

    plugin.markupChange(Wotg.Battle.Markup)

    //.move('HandOwn', [  -240, 0 ])
    .place('HandOwn', [299, 693, 995, 160])
    .move('HandEnemy', [  30, 0 ])
    .move('PackOwn', [  0, -582 ])
    .move('FlagOwn', [  0, -582 ])
    .move('PlatoonsOwn', [  0, 116 ])
    .move('YourTimer', [  0, -355 ])
    .move('ResourcesOwn', [  0, -355 ])
    .move('UserPhotoOwn', [  0, -582 ])
    .move('UserNameOwn', [  0, -582 ])
    //.place('consumableOwn1', [1207, 143, 60, 60])  172      156
   // .move('consumableOwn2', [  0, -550 ])
    //.move('consumableOwn3', [  0, -550 ])
    .place('consumableEnemy1', [1207, 299, 22, 22])
   // .move('consumableEnemy2', [  0, -550 ])
   // .move('consumableEnemy3', [  0, -550 ])
    .move('SkipBtn', [  100, 50 ])


            ;

    /*plugin.markupChange(Wotg.Card.Markup.Battle)
		.move('Power'    , [  0, 97 ])
		.move('Toughness', [ 70, 20 ]);
      */

    /** @name Wotg.Battle.Gui.StaticElements */
 /*   declare('Wotg.Battle.Gui.StaticElements', {
        initialize: function () {
            var frames = new Animation.Frames(Wotg.controller().images.get('flag-animation'), 60, 60);

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
            };
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
            return new Wotg.Battle.Gui.Flag(Wotg.battle().layer, {
                sheet: this.sheets[country],
                shape: this.flagShapes[(isOpponent) ? 'enemy': 'own']
            });
        },

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
        }
    });        */




	events.add('afterLaunch', function () {

        /*Wotg.Card.Markup.Battle = ({
          "sprites": {
            "body_battleCard": [{
              "rect": [266, 1852, 100, 100],
              "shift": [0, 0]
            }],
            "nation_flag_bgBattleCard": [{
              "rect": [1347, 90, 150, 29],
              "shift": [0, 0]
            }, {
              "rect": [1501, 0, 150, 29],
              "shift": [0, 0]
            }, {
              "rect": [1501, 30, 150, 29],
              "shift": [0, 0]
            }],
            "PremiumBattleFrame": [{
              "rect": [1414, 531, 146, 148],
              "shift": [0, 0]
            }],
            "BattleCardFrame": [{
              "rect": [1253, 692, 154, 154],
              "shift": [0, 0]
            }, {
              "rect": [1253, 847, 154, 154],
              "shift": [0, 0]
            }],
            "Type_middle": [{
              "rect": [1141, 150, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 197, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 222, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1108, 167, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1108, 192, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1108, 217, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 125, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 100, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 170, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 145, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 118, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 93, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 66, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [897, 41, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [308, 226, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 50, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 75, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 25, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 0, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 175, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 200, 19, 24],
              "shift": [0, 0]
            }, {
              "rect": [1141, 225, 19, 24],
              "shift": [0, 0]
            }],
            "Increase_smallFull": [{
              "rect": [1071, 123, 34, 36],
              "shift": [0, 0]
            }],
            "attackSmall": [{
              "rect": [1030, 206, 36, 39],
              "shift": [0, 0]
            }, {
              "rect": [1030, 126, 36, 39],
              "shift": [0, 0]
            }, {
              "rect": [1030, 166, 36, 39],
              "shift": [0, 0]
            }, {
              "rect": [1071, 0, 36, 39],
              "shift": [0, 0]
            }],
            "DEF_small": [{
              "rect": [1071, 197, 32, 37],
              "shift": [0, 0]
            }],
            "battleCardAbility": [{
              "rect": [266, 2013, 29, 34],
              "shift": [0, 0]
            }, {
              "rect": [356, 2013, 29, 34],
              "shift": [0, 0]
            }, {
              "rect": [326, 2013, 29, 34],
              "shift": [0, 0]
            }, {
              "rect": [296, 2013, 29, 34],
              "shift": [0, 0]
            }],
            "NoShoot_icon": [{
              "rect": [339, 71, 62, 60],
              "shift": [0, 0]
            }],
            "noMove_icon": [{
              "rect": [339, 132, 62, 60],
              "shift": [0, 0]
            }]
          },
          "markup": {
            "children": [{
              "children": [],
              "id": "Image",
              "rect": [13, 28, 135, 120]
            }, {
              "children": [],
              "id": "Background",
              "rect": [0, 0, 160, 160],
              "sprite": {
                "name": "body_battleCard",
                "texture": "dava-card",
                "frame": 0
              }
            }, {
              "children": [],
              "id": "NationFlag",
              "rect": [5, 5, 150, 29],
              "sprite": {
                "name": "nation_flag_bgBattleCard",
                "texture": "dava-card-flags",
                "frame": 0
              }
            }, {
              "children": [],
              "id": "PremiumFrame",
              "rect": [5, 9, 146, 148],
              "sprite": {
                "name": "PremiumBattleFrame",
                "texture": "dava-card",
                "frame": 0
              }
            }, {
              "children": [],
              "id": "Frames",
              "rect": [4, 2, 154, 153],
              "sprite": {
                "name": "BattleCardFrame",
                "texture": "dava-card",
                "frame": 0
              }
            }, {
              "children": [],
              "id": "Title",
              "fontsize": 16,
              "rect": [26, 8, 97, 19],
              "textalign": "left",
              "textcolor": "rgba(174,157,122,1)"
            }, {
              "children": [],
              "id": "Subtype",
              "rect": [5, 7, 19, 24],
              "sprite": {
                "name": "Type_middle",
                "texture": "dava-card-icons",
                "frame": 21
              }
            }, {
              "children": [{
                "children": [],
                "id": "Value",
                "fontsize": 12,
                "rect": [12, 12, 15, 13],
                "textalign": "center",
                "textcolor": "rgba(23,22,19,1)"
              }],
              "id": "Increase",
              "rect": [123, 3, 34, 36],
              "sprite": {
                "name": "Increase_smallFull",
                "texture": "dava-card-icons",
                "frame": 0
              }
            }, {
              "children": [{
                "children": [],
                "id": "Value",
                "fontsize": 18,
                "rect": [9, 7, 20, 20],
                "textalign": "center",
                "textcolor": "rgba(110,207,72,1)"
              }],
              "id": "Power",
              "rect": [4, 76, 36, 39],
              "sprite": {
                "name": "attackSmall",
                "texture": "dava-card-icons",
                "frame": 1
              }
            }, {
              "children": [{
                "children": [],
                "id": "Value",
                "fontsize": 18,
                "rect": [6, 7, 20, 20],
                "textalign": "center",
                "textcolor": "rgba(191,206,191,1)"
              }],
              "id": "Toughness",
              "rect": [6, 116, 32, 37],
              "sprite": {
                "name": "DEF_small",
                "texture": "dava-card-icons",
                "frame": 0
              }
            }, {
              "children": [{
                "children": [],
                "id": "Trigger0",
                "rect": [91, 3, 29, 34],
                "sprite": {
                  "name": "battleCardAbility",
                  "texture": "dava-card",
                  "frame": 0
                }
              }, {
                "children": [],
                "id": "Trigger1",
                "rect": [61, 3, 29, 34],
                "sprite": {
                  "name": "battleCardAbility",
                  "texture": "dava-card",
                  "frame": 0
                }
              }, {
                "children": [],
                "id": "Trigger2",
                "rect": [31, 3, 29, 34],
                "sprite": {
                  "name": "battleCardAbility",
                  "texture": "dava-card",
                  "frame": 0
                }
              }, {
                "children": [],
                "id": "Trigger3",
                "rect": [2, 3, 29, 34],
                "sprite": {
                  "name": "battleCardAbility",
                  "texture": "dava-card",
                  "frame": 2
                }
              }],
              "id": "Triggers",
              "rect": [36, 117, 121, 37]
            }, {
              "children": [],
              "id": "NoShoot",
              "rect": [97, 28, 10, 10],
              "sprite": {
                "name": "NoShoot_icon",
                "texture": "dava-card-icons",
                "frame": 0
              }
            }, {
              "children": [],
              "id": "NoMove",
              "rect": [97, 88, 62, 60],
              "sprite": {
                "name": "noMove_icon",
                "texture": "dava-card-icons",
                "frame": 0
              }
            }],
            "id": "UIForm",
            "rect": [0, 0, 160, 160]
          }
        });
                  */
		//atom.dom(plugin.getImage('test')).appendTo('body');
		//console.log(plugin.getImage('test'));
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
