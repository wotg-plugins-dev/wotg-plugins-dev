new Wotg.Plugins.Simple({
	title  : 'Sem1',
	version: '0.2.4'
}, function (plugin, events) {


    //новые картинки для индикации атаки и передвижения
    plugin.addImages({
		'sem1': 'semaphore/semafor1.png'
	});

    //картинка индикатора движения
    Wotg.Card.Markup.Battle.sprites.moveIndicator = [{
      "rect": [36, 36, 20, 39],
      "shift": [0, 0]
    }];

    //добавляем индикатор движения на карту
    Wotg.Card.Markup.Battle.markup.children.push({
        "children": [],
        "id": "moveIndicator",
        "sprite": {
          "name": "moveIndicator",
          "texture": "bzz86:Sem1:sem1",
          "frame": 0
        },
        "rect": [38, 115, 20, 34]
      });


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
});
