new Wotg.Plugins.Simple({
	title  : 'ExtendedExample',
	version: '0.2.4'
}, function (plugin, events) {
	console.log("Плагин \"Катюша\" запущен")
    /*
     * Включение-отключение: Alt+1
     * Активная кнопка - пробел. Первое нажатие - атака штаба противника всей техникой и штабом, которые могут это сделать.
     * Если атаковать некому - завершение хода.
     */

    var on = true;
    var avshd = false;
    var myturn = true;


    /** @name Plugin.Avshd.Activator */
    declare( 'Plugin.Avshd.Activator', {
        initialize: function (battle) {
            this.bindMethods([
                'selectCard',
                'selectCell',
                'checkAttackPossible',
                'checkAttackTargetPossible'
            ]);
            this.input = battle.input;
            this.cards = battle.input.cards;
            this.fields = battle.input.fields;
        },


        selectCard: function (card) {
            this.cards.selectCard(card, true);
        },

        selectCell: function (cellCoord) {
            this.fields.selectCell(cellCoord);
        },

        checkAttackPossible: function (card) {
            var props = this.input.model.card(card);
            return (props && props.attacks);
        },

        checkAttackTargetPossible: function (card, target) {
            var props = this.input.model.card(card);
            if(props && props.attacks){
                var targets = props.attacks.targets;
                for (var j = 0; j < targets.length; j++){
                    if(targets[j] == target.id){
                        return true;
                    }
                }
            }
            return false;
        }
    });


    plugin.refactor( 'Wotg.Battle.Model.Cards', {

        findHq: function (player) {
            var i, card;

            for (i = 0; i < this.list.length; i++) {
                card = this.list[i];

                if (card.owner == player && card.is('hq')) {
                    return card;
                }
            }

            return null;
        }
    });




    function getBattle () {
        var currentScreen = Wotg.controller().screens.current;
        return currentScreen.name == 'Battle' && Wotg.battle();
    }


    events.add('afterLaunch', function () {

        //обработчик сообщений
        Wotg.controller().connection.events.add('message/game/playunit', function (message) {
            if(avshd){
                if (message.actions && message.actions.attacks && message.actions.attacks.length)
                {
                    var battle = getBattle ();

                    if(battle){
                        var activator = new Plugin.Avshd.Activator(battle);
                        var oppHq = battle.cards.findHq(battle.opponent);//(battle.cards.hqs[0].props.controllerno == battle.opponent.playerno)?battle.cards.hqs[0]:battle.cards.hqs[1];
                        var found = false;

                        for (var i = 0; i < message.actions.attacks.length; i++ ) {
                            var card = battle.cards.getCard(message.actions.attacks[i].cardid);
                            //console.log('playunit:' + card);
                            var targets = message.actions.attacks[i].targets;
                            for (var j = 0; j < targets.length; j++){
                                if(targets[j] == oppHq.id){
                                    found = true;
                                    activator.selectCard(card);
                                    activator.selectCard(oppHq);
                                    break;
                                }
                            }
                            if(found){
                               break;
                            }
                        }
                    }

                }else{
                   avshd = false;
                }
            }
        });


        Wotg.controller().connection.events.add('message/game/turnbegin', function (message) {
            avshd = false;
            if (message.active == true){
                myturn = true;
            }else { //Ход противника
                myturn = false;
            }
        }); //Обработчик сообщения

    });



    // подпишемся на события клавы
    atom.Keyboard().events.add({
        'n1': function (e) {
            if (e.altKey) {
                on = !on;
                e.preventDefault();
                alert('Плагин "Катюша" ' + (on ? 'включен' : 'выключен'));
            }
        },

        // Повесим на 'space' АВШД (огонь в штаб противника из всех стволов), и если атаковать больше некому, то пропуск хода
        'space': function (e) {

            if(!myturn || (e.target.type && e.target.type.indexOf('text') !== -1) ) {
               return;
            } 

            var battle = getBattle();
            avshd = false;

            if (battle && on) {

                var activator = new Plugin.Avshd.Activator(battle);
                var oppHq = battle.cards.findHq(battle.opponent);//(battle.cards.hqs[0].props.controllerno == battle.opponent.playerno)?battle.cards.hqs[0]:battle.cards.hqs[1];
                var plHq = battle.cards.findHq(battle.player);//(battle.cards.hqs[0].props.controllerno == battle.player.playerno)?battle.cards.hqs[0]:battle.cards.hqs[1];
                var battleCards = battle.cards.list;


                //сначала атакует штаб
                //проверяем, может ли штаб атаковать
                if(activator.checkAttackPossible(plHq)){
                    avshd = true;
                    activator.selectCard(plHq);
                    activator.selectCard(oppHq);
                }else{
                    var i = 0;
                    while(i<battleCards.length){
                        var card = battleCards[i];
                        //console.log(i + ": " + card.proto.id);
                        i++;
                        if(card.model.props.location == 'BATTLEFIELD' && card.owner.playerno == battle.player.playerno){
                            //console.log("battlefield" + ": " + card.proto.id);

                            if(activator.checkAttackTargetPossible(card, oppHq)){
                                //console.log("attack" + ": " + card.proto.id);
                                avshd = true;
                                activator.selectCard(card);
                                activator.selectCard(oppHq);
                                //console.log("break");
                                break;
                            }
                        }

                    }
                }

                if(!avshd){
                    //battle.game.skip();
                    battle.send('game/skip');
                }


                // по-умолчанию пробел сдвигает страницу
                e.preventDefault();
            }

        }
    });
	
	events.add('afterLaunch', function () {
		//console.log(plugin.getImage('added-image'));
		//console.log(Wotg.controller().images.get('replaced-image'));
	});
});
