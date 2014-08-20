new Wotg.Plugins.Simple({
    title: 'research',
    version: '0.2.3'
}, function(plugin, events) {
    /*
	plugin.addImagesPreload({
		'test': 'image.png'
	});
*/
    function jslog(text) {
        console.log('JS', text)
    }

    events.add('initialize', function() {
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');

    });

    events.add('afterLaunch', function() {
        //	atom.dom(plugin.getImage('test')).appendTo('body');
        //	console.log(plugin.getImage('test'));
        console.log('J_S afterLaunch');

    });
    //========
    atom.declare('Wotg.Research.HqCardItem', Wotg.Research.TreeItem, {

        size: new Size(132, 130),
        slot: null,

        configure: function method() {
            method.previous.call(this);

            this.slot = this.data.slot;
            this.shape = new Rectangle(this.getPos(), this.size);
            this.textShape = new Rectangle(0, 0, this.shape.width, 20).moveTo(this.shape.from);

            this.events.add('mouseup', function(e) {
                Wotg.openPopup('ResearchCardView', {
                    proto: this.proto,
                    data: this.data,
                    manager: this.manager
                });
            }.bind(this));

            this.model = new Wotg.Card.Models.Model(this.proto);
            this.view = new Wotg.Card.Views.TreeLeaf(this.model);
            this.view.events.add('redraw', this.redraw);
        },

        update: function() {
            this.redraw();
        },

        getPos: function() {
            return this.manager.HQcardSlotsCoords[this.slot];
        }
    });
    //удалить если будут меняться координаты штаба 
    plugin.refactor('Wotg.Research.HQItem', {
        // Меняем один из методов класса
        'getPos': function method() {
            if (this.isCurrent) return this.manager.JShqSlotsCoords[0];
            if (this.isRootTree) return this.manager.hqSlotsCoords[this.slot];
            return this.manager.cardSlotsCoords[this.slot];
        }
    });

    plugin.refactor('Wotg.Research.Manager', {
        // Меняем один из методов класса
        'setViewMode': function method(viewMode) {
            method.previous.apply(this, arguments);
            if (viewMode == 'compact') {
                this.JShqSlotsCoords = this.JSsmallHq;
                this.HQcardSlotsCoords = this.HQsmallCards;
            } else {
                this.JShqSlotsCoords = this.JSbigHq;
                this.HQcardSlotsCoords = this.HQbigCards;
            }
        },

        // Меняем один из методов класса
        'createResearchTreeForHQ': function method(hqId) {

            var createCard = function(data) {
                var elem = new Wotg.Research.HqCardItem(this.app.layer, {
                    manager: this,
                    data: data
                });
                this.app.mouseHandler.subscribe(elem);
                this.elems.push(elem);
            }.bind(this);
            var createHq = function(data, list) {
                var elem = new Wotg.Research.HQItem(this.app.layer, {
                    manager: this,
                    data: data,
                    isCurrent: true,
                    isRootTree: false
                });
                this.app.mouseHandler.subscribe(elem);
                this.elems.push(elem);

                for (var i = 0; i < list.length; i++) {
                    list[i].slot = i + 1;
                    createCard(list[i]);
                }


            }.bind(this);

            //this.backButton.text = Wotg.controller().lang.get('research.backToRoot');
            this.isRoot = false;
            this.selector.hide();
            this.destroyElems();
            var list = this.model.getCardListForHQ(hqId);
            var listHq = this.model.getCardListForHQ(hqId, true);
            var rootData = this.model.getCardById(hqId);
            jslog({
                list: list,
                rootData: rootData,
                listHq: listHq,
                this: this
            });
            createHq(rootData, listHq);
            for (var i = 0; i < list.length; i++) {
                if (Wotg.controller().protos.get(list[i].card).type.toLowerCase() != 'hq') {
                    this.createCard(list[i]);
                } else {
                    this.createHq(list[i], false, false);
                }
            }
            setTimeout(function() {
                var lines = new Wotg.Research.Lines(this.app.linesLayer.ctx, this.elems, this);
                lines.drawLines(false);
            }.bind(this), 50);

        },
        cardSlotsCoords: {},
        HQbigCards: {
            0: new Point(240, 0),
            1: new Point(484, 0),
            2: new Point(728, 0), //101
            3: new Point(972, 0),
            4: new Point(1217, 0),
            5: new Point(484, 140),
            6: new Point(728, 140),
            7: new Point(972, 140),
            8: new Point(1217, 140)


        },
        HQsmallCards: {
            0: new Point(108, 0),
            1: new Point(267, 0),
            2: new Point(444, 0), //101
            3: new Point(621, 0),
            4: new Point(799, 0),
            5: new Point(267, 120),
            6: new Point(444, 120),
            7: new Point(621, 120),
            8: new Point(799, 120)


        },
        JShqSlotsCoords: {},
        JSbigHq: {
            0: new Point(150, 50)

        },
        JSsmallHq: {
            0: new Point(0, 50)
        }
    });
});