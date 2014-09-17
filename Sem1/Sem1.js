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
          "texture": "bzz86:Sem1:sem1",
          "frame": 0
        },
        "rect": [37, 122, 17, 30]
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



    events.add('afterLaunch', function () {

    	//обработчик сообщений
        Wotg.controller().connection.events.add('message/game/playunit', function (message) {
            var m_can_attack 	= false;
            var m_can_order 	= false;
            var m_can_move 		= false;
            var m_can_activity 	= false;
            if ( m_semafore_skip && message.actions )
            {
                // Есть варианты атаки
             	if (m_attack && message.actions.attacks && message.actions.attacks.length)
                	m_can_attack = true;
                // Есть варианты приказов
                if (m_order && message.actions.orders && message.actions.orders.length)
                	m_can_order = true;
                // Есть варианты перемещения
                if (m_move && message.actions.moves && message.actions.moves.length)
                	m_can_move = true;
                // Есть варианты абилок
                if (m_ability && message.actions.abilities && message.actions.abilities.length)
                	m_can_activity = true;

		        m_status = m_can_attack || m_can_order || m_can_move || m_can_activity;
            }

            //console.log('Status: '+m_status+' Can Attack: '+ m_can_attack + ' Can play order: '+ m_can_order + ' Can make move: ' +m_can_move +' m_can_activity: '+m_can_activity);
        });
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
                    this.setFrame('Power', atkIndicatorFrames.counter);
                    this.dava.find('Power.Value').text.color = '#e54343';
                }else{
                    this.setFrame('Power', atkIndicatorFrames.noCounter);
                    this.dava.find('Power.Value').text.color = 'rgba(191,206,191,1)';
                }
                //перемещение
                this.hide('moveIndicator');

                this.setFrame('Frames', 1);

            } else {
                //атака
                if (model.getProperty('untapped') && (model.effects.indexOf('t_cant_attack') < 0)) {
                    this.setFrame('Power', atkIndicatorFrames.attack);
                    this.dava.find('Power.Value').text.color = 'rgba(110,207,72,1)';
                }else{
                    this.setFrame('Power', atkIndicatorFrames.noAttack);
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
            this.dava.redraw(this.buffer.ctx);

            if (model.isOpponent) {
                this.setFrame('Power', atkIndicatorFrames.opponent);
                this.dava.find('Power.Value').text.color = '#e54343';
            } else {
                if (model.getProperty('untapped') && (model.effects.indexOf('t_cant_attack') < 0)) {
                    this.setFrame('Power', atkIndicatorFrames.attack);
                    this.dava.find('Power.Value').text.color = 'rgba(110,207,72,1)';
                }else{
                    this.setFrame('Power', atkIndicatorFrames.noAttack);
                    this.dava.find('Power.Value').text.color = 'rgba(191,206,191,1)';
                }
            }
        }

    });

});
