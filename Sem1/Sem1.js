new Wotg.Plugins.Simple({
	title  : 'Sem1',
	version: '0.2.4'
}, function (plugin, events) {


    //новые картинки для индикации атаки и передвижения
    plugin.addImages({
		'sem1': 'semaphore/semafor3.png'
	});

    //картинка индикатора движения
    Wotg.Card.Markup.Battle.sprites.moveIndicator = [{
      "rect": [36, 42, 17, 30],
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
          "texture": "bzz86:Sem1:sem1",
          "frame": 0
        },
        "rect": [37, 124, 17, 30]
      });

    //заменяем иконку ОМ
    plugin.markupChange(Wotg.Card.Markup.Battle)
    .change('Power', function(node){
         node.sprite = {
          "name": "atkIndicator",
          "texture": "bzz86:Sem1:sem1",
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
            attack : 2,
            defense : 1
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

            //to change 'Power' icon
            //this.setFrame('Power', this.kindFrames[model.getProperty('kind')]);

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
                    this.setFrame('Power', 0);
                    this.dava.find('Power.Value').text.color = '#e54343';
                }else{
                    this.setFrame('Power', 2);
                    this.dava.find('Power.Value').text.color = 'grey';
                }
                //перемещение
                this.hide('moveIndicator');

                this.setFrame('Frames', 1);

            } else {
                //атака
                if (model.getProperty('untapped') && (model.effects.indexOf('t_cant_attack') < 0)) {
                    this.setFrame('Power', 1);
                    this.dava.find('Power.Value').text.color = 'rgba(110,207,72,1)';
                }else{
                    this.setFrame('Power', 2);
                    this.dava.find('Power.Value').text.color = 'grey';
                }
                //перемещение
                if( model.getProperty('movable') && (!model.getProperty('moved')) && (model.effects.indexOf('t_cant_move') < 0)){
                    this.show('moveIndicator');
                }else{
                    this.hide('moveIndicator');
                }

                this.setFrame('Frames', 0);
            }


            //обработка индикации атаки и перемещения
           /* if (m_card_attack && this.card.props.untapped && this.card.owner.sid == unsafeWindow.Wotg.battle().player.sid && (this.card.effects.indexOf('t_cant_attack') < 0))
            {
                draw.ctx.drawImage({
                    image:	this.resources.get('images').get('battle-card-semafor-icons'),
                    draw: 	this.atkShape,
                    crop: 	new Rectangle(32, 0, 16, 16)
                });
            }
            if (m_card_counter && this.card.props.cancounter && this.card.owner.sid != unsafeWindow.Wotg.battle().player.sid)
            {
                draw.ctx.drawImage({
                    image:	this.resources.get('images').get('battle-card-semafor-icons'),
                    draw: 	this.atkShape,
                    crop: 	new Rectangle(16, 0, 16, 16)
                });
            }
            if (m_card_flame && this.card.props.burning)
            {
                draw.ctx.drawImage({
                    image: 	this.resources.get('images').get('battle-card-semafor-icons'),
                    draw: 	this.flameShape,
                    crop: 	new Rectangle(0, 0, 16, 16)
                });
            }
            if (m_card_move && this.card.owner.sid == unsafeWindow.Wotg.battle().player.sid && this.card.props.movable && (this.card.effects.indexOf ('t_cant_move') < 0) &&
                ((typeof this.card.props.moves != 'undefined') && ( (this.card.props.maxmoves && (this.card.props.moves < this.card.props.maxmoves)) || (!this.card.props.maxmoves && !this.card.props.moves) ))
               )
            {
                // 2 Перемещения
                if (this.card.props.maxmoves - this.card.props.moves > 1 )
                    draw.ctx.drawImage({
                        image: 	this.resources.get('images').get('battle-card-semafor-icons'),
                        draw: 	this.movShapeD,
                        crop: 	new Rectangle(48, 0, 16, 16)
                    });
                draw.ctx.drawImage({
                    image: 	this.resources.get('images').get('battle-card-semafor-icons'),
                    draw: 	this.movShape,
                    crop: 	new Rectangle(48, 0, 16, 16)
                });
            }
            if (m_card_scouted && this.card.props.scouted && this.card.owner.sid != unsafeWindow.Wotg.battle().player.sid) // Техника засвеченна
            {
                var shift = 0;
                if ( this.card.triggers.indexOf('camouflage') >= 0) // Есть маскировка
                    shift = 16;
                draw.ctx.drawImage({
                    image: 	this.resources.get('images').get('battle-card-semafor-icons'),
                    draw: 	this.lampShape,
                    crop: 	new Rectangle(64+shift, 0, 16, 16)
                });
            } */



            //скрываем стандартные значки
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
});
