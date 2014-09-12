new Wotg.Plugins.Simple({
    title: 'DeckEditor20',
    version: '0.2.4'
}, function(plugin, events) {

    plugin.addImages({
        'mcard': 'mcard_stripes.png',
        'mattackSmall': 'mattackSmall.png',
        'mDEF_small': 'mDEF_small.png',
        'mIncrease_smallFull': 'mIncrease_smallFull.png',
        'mResourseSmall': 'mResourseSmall.png'
    });

    //Копируем существующие разметки
    //TODO: Найти более красивый способ	
    Wotg.Card.Markup.MPack = JSON.parse(JSON.stringify(Wotg.Card.Markup.Pack));
    Wotg.Card.Markup.MHand = JSON.parse(JSON.stringify(Wotg.Card.Markup.Hand));
    console.info(Wotg.Card.Markup.MHand);
    console.info(Wotg.Card.Markup.MPack);

    //Меняем рамку карты в редакторе
    Wotg.Card.Markup.MHand.sprites.body_handCard = [{
        "rect": [0, 0, 176, 65],
        "shift": [0, 0]
    }];

    //Меняем рамку иконку атаки в редакторе
    Wotg.Card.Markup.MHand.sprites.attackSmall = [{
        "rect": [0, 0, 1, 1],
        "shift": [0, 0]
    }, {
        "rect": [23, 0, 1, 1],
        "shift": [0, 0]
    }];

    //Меняем рамку иконку защиты в редакторе
    Wotg.Card.Markup.MHand.sprites.DEF_small = [{
        "rect": [0, 0, 1, 1],
        "shift": [0, 0]
    }];

    //Меняем рамку иконку прироста в редакторе
    Wotg.Card.Markup.MHand.sprites.Increase_smallFull = [{
        "rect": [0, 0, 1, 1],
        "shift": [0, 0]
    }];

    //Меняем рамку иконку cтоимости в редакторе
    Wotg.Card.Markup.MHand.sprites.ResourseSmall = [{
        "rect": [0, 0, 24, 26],
        "shift": [0, 0]
    }];

    //Указываем другую рамку карты
    Wotg.Card.Markup.MHand.markup.children[1].sprite.texture = plugin.repository+":"+plugin.title+":mcard";
    Wotg.Card.Markup.MHand.markup.children[1].rect = [0, 0, 176, 65];
    //Указываем другую иконку атаки
    Wotg.Card.Markup.MHand.markup.children[10].sprite.texture = plugin.repository+":"+plugin.title+":mattackSmall";
    Wotg.Card.Markup.MHand.markup.children[10].rect = [0, 0, 23, 23];
    //Указываем другую иконку зашиты
    Wotg.Card.Markup.MHand.markup.children[11].sprite.texture = plugin.repository+":"+plugin.title+":mDEF_small";
    Wotg.Card.Markup.MHand.markup.children[11].rect = [0, 0, 23, 23];
    //Указываем другую иконку прироста
    Wotg.Card.Markup.MHand.markup.children[8].sprite.texture = plugin.repository+":"+plugin.title+":mIncrease_smallFull";
    Wotg.Card.Markup.MHand.markup.children[8].rect = [0, 0, 23, 23];
    //Указываем другую иконку стоимости
    Wotg.Card.Markup.MHand.markup.children[9].sprite.texture = plugin.repository+":"+plugin.title+":mResourseSmall";
    Wotg.Card.Markup.MHand.markup.children[9].rect = [0, 0, 24, 26];

    //Правим разметку под новый размер
    Wotg.Card.Markup.MPack.markup.rect = [0, 0, 176, 65];
    Wotg.Card.Markup.MPack.markup.children[0].rect = [0, 0, 176, 65];
    Wotg.Card.Markup.MHand.markup.rect = [0, 0, 176, 65];

    //Меняем разметку
    //Art
    Wotg.Card.Markup.MHand.markup.children[0].rect = [8, 5, 55, 55];
    //Title
    Wotg.Card.Markup.MHand.markup.children[5].rect = [66, 6, 103, 17];
    Wotg.Card.Markup.MHand.markup.children[5].textcolor = "rgba(255,255,255,1)";
    //Wotg.Card.Markup.MHand.markup.children[5].fontsize = 14;
    //Count
    Wotg.Card.Markup.MPack.markup.children[11].rect = [150, 40, 20, 25];
    //Power
    Wotg.Card.Markup.MHand.markup.children[10].rect = [65, 24, 28, 28];
    Wotg.Card.Markup.MHand.markup.children[10].children[0].fontsize = 18;
    // Wotg.Card.Markup.MHand.markup.children[10].children[0].textcolor = "rgba(159,143,111,1)";
    Wotg.Card.Markup.MHand.markup.children[10].children[0].textcolor = "white";
    // Wotg.Card.Markup.MHand.markup.children[10].children[0].textalign = "left";
    // Wotg.Card.Markup.MHand.markup.children[10].children[0].font = 'Copperplate, Papyrus, fantasy';
    Wotg.Card.Markup.MHand.markup.children[10].children[0].rect = [2, 4, 60, 20];
    //Toughness
    Wotg.Card.Markup.MHand.markup.children[11].rect = [90, 34, 23, 23];
    Wotg.Card.Markup.MHand.markup.children[11].children[0].fontsize = 14;
    Wotg.Card.Markup.MHand.markup.children[11].children[0].textcolor = "rgba(159,143,111,1)";
    Wotg.Card.Markup.MHand.markup.children[11].children[0].rect = [20, 4, 20, 20];
    //Increase
    Wotg.Card.Markup.MHand.markup.children[8].rect = [115, 34, 23, 23];
    Wotg.Card.Markup.MHand.markup.children[8].children[0].fontsize = 14;
    Wotg.Card.Markup.MHand.markup.children[8].children[0].textcolor = "rgba(159,143,111,1)";
    Wotg.Card.Markup.MHand.markup.children[8].children[0].rect = [5, 4, 20, 20];
    //Cost
    Wotg.Card.Markup.MHand.markup.children[9].rect = [0, 0, 24, 26];
    Wotg.Card.Markup.MHand.markup.children[9].children[0].fontsize = 14;
    Wotg.Card.Markup.MHand.markup.children[9].children[0].rect = [2, 7, 20, 20];

    //TODO: Убрать
    events.add('beforeLaunch', function() {
        //Для отладки
    });

    declare('Wotg.Card.Views.MHand', Wotg.Card.View, {

        markup: Wotg.Card.Markup.MHand,

        /*flagFrames: { usa: 0, ussr: 1, germany: 2 },
		typeFrames: { vehicle: 0, platoon: 0, order: 1 },
		hqSubtypes: { consolidated: 0, any: 1, attack: 2, guards: 3  },*/

        initialize: function method() {
            method.previous.apply(this, arguments);
            //TODO: Поправить ресайз арта
            this.imageCrop = this.model.proto.type == 'order' ?
                new Rectangle(5, 5, 165, 165) :
                new Rectangle(40, 15, 220, 220);
        },

        redraw: function() {
            var model = this.model;

            this.buffer.ctx.clearAll();
            this.lazyDraw(this.lazyArt);

            this.setFrame('Background', 0);

            this.setText('Title', Wotg.lang('cards.' + model.getProperty('idC') + '.short'));

            this.setValue('Cost', model.getProperty('cost'));
            /*if (model.isOpponent) {
				this.setFrame('Power', 0);
				this.dava.find('Power.Value').text.color = '#e54343';
			} else {
				this.setFrame('Power', 1);
			}*/
            if (model.getProperty('type') == 'order') {
                //this.setFrame('Background', 1);
                this.hide('Increase');
                this.hide('Power');
                this.hide('Toughness');
            } else {
                if (model.getProperty('resources')) {
                    this.show('Increase');
                    this.setValue('Increase', model.getProperty('resources'));
                } else {
                    this.hide('Increase');
                }
                var increase;
                this.setValue('Power', model.getProperty('power'));
                this.setValue('Toughness', model.getProperty('toughness'));
                //this.dava.find('Increase.Value').setShadow(null);
                if (model.getProperty('type') == 'platoon') {
                    if (model.getProperty('isDefense')) {
                        //this.setFrame('Background', 1);
                        this.setFrame('Power', 1);
                        this.setValue('Power', model.getProperty('defense'));
                    }
                    /*if (model.getProperty('isAttack')) {
						this.setFrame('Power', 3);
					}*/
                }
            }

            /*this.setFrame('NationFlag'  , this.flagFrames[model.getProperty('country')]);
			this.setFrame('Subtype'     , this.getSubtypeFrame(model.isOpponent));*/

            // if(!this.proto.premium)
            this.hide('PremiumFrame');
            // else this.show('PremiumFrame');
            this.hide('Amount');

            //Тут пока всё прячем
            this.hide('NationFlag');
            this.hide('Subtype');
            // this.hide('Increase');
            //this.hide('Cost');
            //this.hide('Power');
            // this.hide('Toughness');

            this.dava.redraw(this.buffer.ctx);

            /*this.buffer.ctx.drawImage(
				Wotg.controller().cardText.getTextBuffer(model.proto, null, model.isOpponent),
				this.dava.find('Text').getShape()
			);*/

            this.events.fire("redraw");
        }

    });

    declare('Wotg.Card.Views.MPack', Wotg.Dava.View, {
        alignedIconLabels: {
            'SilverLabel': 'center',
            'GoldLabel': 'center'
        },

        markup: Wotg.Card.Markup.MPack,

        positions: [],

        cache: {
            // store dummy cards by proto.id here.
        },

        _countRect: new Rectangle(150, 225, 32, 25),
        _toBuyRect: new Rectangle(50, 225, 132, 25),
        _costRect: new Rectangle(90, 128, 100, 25),

        iconPosition: new Point(60, 125),
        iconIndexes: {
            gold: 2,
            silver: 0
        },
        iconSize: new Size(30, 30),

        _hightlightColor: "rgba(255,255,255, 0.05)",

        initialize: function method(proto, data, lazy) {
            //Получаем протип
            this.proto = proto;
            //Получаем данные (количество, цена)
            this.data = data;
            method.previous.call(this);
            //Узнаем порядок (слот карты)
            this.order = Wotg.Card.Views.MPack.getOrder(proto);
            //Узнаем имя короткое и полное
            this.locTitle = Wotg.lang('cards.' + proto.id + '.short').toLowerCase();
            this.locDesc = Wotg.lang('cards.' + proto.id + '.full').toLowerCase();
            this.bindMethods(["_updateShowAnimation", "_updateHideAnimation", "hideLast", "showLast"]);
            if (lazy) {
                this.bindMethods(["makeVisible"]);
                this._lazy = true;
                this._visible = false;
            } else this._lazy = false;
            this.bindMethods(["drawContent"]);
            if (this.positions.length == 0) this._initPositions();
            for (var i = 1; i < 4; ++i)
                for (var j = 1; j <= i; ++j)
                    this.hideElement("Pack" + i + "" + j);
            this.hideElement("TechnicOver");
            this.hideElement("OrderOver");
            this.hideElement("SilverLabel");
            this.hideElement("GoldLabel");
            this.hideElement("BlackBack");
            this.hideElement("Count");
            this.setValue("SilverLabel", this.data.cost);
            this.setValue("GoldLabel", this.data.gold);
            //Карты, которые необходимо купить
            if (this.data.toBuy) this.setToBuy(this.data.toBuy, true);
            this.setCount(this.data.count, true);
            //Расположение отрисовки
            this.atomElem = atom.dom.create("div");
            atom.dom(this.buffer).appendTo(this.atomElem);
            this.atomElem.first.model = this;
            //Подсветка если не Штаб
            //if(proto.type != "hq") {
            this.mouse = new Mouse(this.atomElem);
            this.mouse.events.add("over", this._highlight.bind(this, true));
            this.mouse.events.add("out", this._highlight.bind(this, false));
            //}
            this._lastOpacity = 1;
            this.icons = Wotg.controller().images.get('resources-icons');
            this.redraw();
        },

        showHot: function() {
            if (this.hotIcon) {
                console.warn("icon already placed!");
                return;
            }
            this.hotIcon = new Wotg.UI.HotIcon();
            this.hotIcon.element.appendTo(this.atomElem);
        },

        hideHot: function() {
            if (!this.hotIcon) {
                console.warn("icon was not placed!");
                return;
            }
            this.hotIcon.element.destroy();
            this.hotIcon = null;
        },

        makeVisible: function() {
            this._visible = true;
            if (!this.view) {
                if (!this.cache[this.proto.id]) {
                    var model = new Wotg.Card.Models.Model(this.proto);
                    this.model = model;
                    model.cost = this.proto.cost;
                    model.increase = this.proto.resources;
                    model.power = this.proto.power;
                    model.toughness = this.proto.toughness;
                    /*if(this.proto.type == "hq")
						this.view = new Wotg.Card.Views.HqHand(model);
					else this.view = new Wotg.Card.Views.Hand(model);*/
                    this.view = new Wotg.Card.Views.MHand(model)
                    this.cache[this.proto.id] = this.view;
                } else this.view = this.cache[this.proto.id];
                this.view.events.add("redraw", this.redraw.bind(this));
            }
            this.redraw();
        },

        _highlight: function(bb) {
            if (this._highlighted == bb) return;
            this._highlighted = bb;
            this.redraw();
        },

        _initPositions: function() {
            for (var i = 1; i < 4; ++i) {
                var arr = [];
                for (var j = 1; j <= i; ++j) {
                    // arr.push(this.dava.find("Pack" + i + "" + j).getShape().from);
                    arr.push(this.dava.find("Pack" + i + "" + j).getShape());
                }
                this.positions.push(arr);
            }
        },

        isVisible: function() {
            return this.atomElem.css("display") != "none";
        },

        setToBuy: function(cc, silent) {
            this.data.toBuy = cc;
            if (!silent) this.redraw();
        },

        setCount: function(cc, silent) {
            this.data.realCount = this.data.count = cc;
            if (!silent) this.redraw();
        },

        setRealCount: function(cc) {
            this.data.realCount = cc;
        },

        finalizeAnimation: function() {
            if (this.animation) {
                try {
                    if (this._callback) this._callback(this);
                } catch (e) {
                    console.warn("Error in hide animation callback");
                }
                clearInterval(this.animation);
                delete this.animation;
                delete this._callback;
            }
        },

        hideLast: function(callback) {
            if (this._callback) {
                console.warn("callback was not called");
            }
            this._callback = callback;
            this._lastOpacity = 1;
            // this.locked = true;
            this.animation = setInterval(this._updateHideAnimation, 25);
        },

        showLast: function() {
            this._lastOpacity = 0;
            // this.locked = true;
            this.animation = setInterval(this._updateShowAnimation, 25);
        },

        drawContent: function() {
            if (!this.view) return;
            if (this._lazy && !this._visible) return;
            //Определяется количество карт в стопке
            //var cc = this.data.count - 1;
            var cc = 0;
            //if(cc > 2) cc = 2;
            //else if(cc < 0) cc = 0;
            this.buffer.ctx.clearAll();
            //Прозрачность при стопке
            // we check if last should be drawn with opacity
            /*if(this._lastOpacity != 1) {
				this.buffer.ctx.save();
				this.buffer.ctx.set({ globalAlpha: this._lastOpacity });
				this.buffer.ctx.drawImage({
					draw: this.positions[cc][0],
					image: this.view.buffer
				});
				this.buffer.ctx.restore();
			} else {*/
            this.buffer.ctx.drawImage({
                draw: this.positions[0][0],
                image: this.view.buffer
            });
            //}
            //Рисуются карты в стопке кроме первой
            // we draw all but last cards
            /*for(var i = 1; i <= cc; ++i)
				this.buffer.ctx.drawImage({
					draw: this.positions[cc][i],
					image: this.view.buffer
				});*/
            //Если в стопке только одна карта
            //if(this.data.count == 0) {
            // if(this.data.toBuy) you can display this number here
            //Определяется рамка - приказ или техника
            /*if (this.proto.type == 'order') {
					this.showElement("OrderOver");
					this.hideElement("TechnicOver");
				} else {
					this.hideElement("OrderOver");
					this.showElement("TechnicOver");
				}*/
            //Пусть пока показывается рамка везде как у техники
            //this.hideElement("OrderOver");
            //this.showElement("TechnicOver");

            //Если есть стоимость - рисуется полоска со стоимостью
            //Пока спрячем
            /*if(this.data.cost) {
					this.showElement("SilverLabel");
					this.hideElement("GoldLabel");
				} else {
					this.hideElement("SilverLabel");
					this.showElement("GoldLabel");
				}*/
            //Прячем счетчик карт
            //this.hideElement("BlackBack");
            //this.hideElement("Count");
            //} else {
            // Если стопка карт
            //this.hideElement("OrderOver");
            //this.hideElement("TechnicOver");
            //this.hideElement("SilverLabel");
            //this.hideElement("GoldLabel");
            //Если конвейер
            /*if(this.data.count > 3) {
					this.showElement("BlackBack");
					this.showElement("Count");
					this.setText("Count", this.data.count);
				} else {
					this.hideElement("BlackBack");
					this.hideElement("Count");
				}*/
            //}
            //Пусть счетчик карт будет всегда
            this.showElement("BlackBack");
            this.showElement("Count");
            this.setText("Count", "x" + this.data.count);

            //Подсветка
            if (this._highlighted) {
                this.buffer.ctx.save();
                this.buffer.ctx.set({
                    globalCompositeOperation: "source-atop"
                });
                this.buffer.ctx.fillAll(this._hightlightColor);
                this.buffer.ctx.restore();
            }
        },

        _updateHideAnimation: function() {
            this._lastOpacity = Math.max(this._lastOpacity - 0.1, 0);
            this.redraw();
            if (this._lastOpacity > 0) return;
            this._lastOpacity = 1;
            this.finalizeAnimation();
        },

        _updateShowAnimation: function() {
            this._lastOpacity = Math.min(this._lastOpacity + 0.1, 1);
            this.redraw();
            if (this._lastOpacity < 1) return;
            this._lastOpacity = 1;
            this.finalizeAnimation();
        }
    }).own({
        order: [{
            type: "hq"
        }, {
            type: "vehicle",
            subtype: "light"
        }, {
            type: "vehicle",
            subtype: "medium"
        }, {
            type: "vehicle",
            subtype: "heavy"
        }, {
            type: "vehicle",
            subtype: "spg"
        }, {
            type: "vehicle",
            subtype: "spatg"
        }, {
            type: "order"
        }, {
            type: "platoon"
        }],

        getOrder: function(proto) {
            var i = 0;
            while (i < this.order.length) {
                if (this.order[i].type == proto.type && (!this.order[i].subtype || this.order[i].subtype == proto.subtype))
                    return i;
                ++i;
            }
            console.warn("unknown order for " + proto.type + " / " + proto.subtype + ".");
            return i;
        }
    });

    plugin.refactor('Wotg.HorizontalCarousel.View', {

        afterRender: function() {

            atom.dom('.reserve .slider').css("margin-top", "0px");

            this.filters = [];
            this.filtersList.forEach(this._initSummaryTab);

            this.slider = new atom.plugins.Slider({
                id: 'deck-slider',
                size: new Size(930, 280),
                pageSize: 5,
                defaultIndent: 0,
                defaultRows: 4,
                root: this.ui.list.first,
                time: 100,
                slowDown: 50
            });

            /*this.slider.events.add("columnshow", function(data) {
				if(!data.column) return;
				if(!data.column.items[0]) return;
				data.column.items[0].first.model.makeVisible();
			}.bind(this));*/

            //TODO: Dispell this black magic
            this.slider.events.add("columnshow", function(data) {
                if (!data.column) return;
                if (!data.column.items[0]) return;
                data.column.items[0].first.model.makeVisible();
                if (!data.column.items[1]) return;
                data.column.items[1].first.model.makeVisible();
                if (!data.column.items[2]) return;
                data.column.items[2].first.model.makeVisible();
                if (!data.column.items[3]) return;
                data.column.items[3].first.model.makeVisible();
            }.bind(this));

            this.leftButton = this.addSpinButton(false, this.slider);
            this.leftButton.element.css({
                display: "none"
            });

            this.rightButton = this.addSpinButton(true, this.slider);
            this.rightButton.element.css({
                display: "none"
            });

            this.slider.events.add("end", this._updateSliderControls);

            this.slider.events.add('show', function() {
                this.leftButton.element.css({
                    display: "block"
                });
                this.rightButton.element.css({
                    display: "block"
                });
            }.bind(this));

            this.slider.events.add('hide', function() {
                this.leftButton.element.css({
                    display: "none"
                });
                this.rightButton.element.css({
                    display: "none"
                });
            }.bind(this));
        },

        addNewCard: function(proto, cardData, silent) {
            //Если не Штаб
            if (proto.type != "hq") {
                var view = new Wotg.Card.Views.MPack(proto, cardData, true);
                if (cardData.flagged) view.showHot();
                var i = 0,
                    il = this.elems.length;
                while (i < il) {
                    if (this._nationSort(view, this.elems[i]) < 0) break;
                    ++i;
                }
                if (i < il) this.elems.splice(i, 0, view);
                else this.elems.push(view);
                view.atomElem.addEvent("mouseup", this._onCardSelected);
                view.atomElem.addEvent("contextmenu", this._onContextMenu.bind(this));
                if (!silent) {
                    this.updateFilter(true);
                    this._updateCounts(true);
                    view._lastOpacity = 0;
                    view.redraw();
                    return this._makeVisible(proto, view, view.showLast.bind(view));
                }
                return null;
            }
        },

        removeCard: function(protoId) {
            var elem = this.findByModel(protoId);
            this.elems.splice(this.elems.indexOf(elem), 1);
            //var id = this.slider.findColIndexWithItem(elem.atomElem);
            //if(id < 0) console.warn("item not found", elem.atomElem, atom.dom(elem.atomElem),
            //												elem.atomElem == atom.dom(elem.atomElem));
            //else {
            this.locked = true;
            elem.hideLast(function() {
                //this.slider.removeColumn(id);
                this.locked = false;
                //console.log("after remove:", this.slider.current, this.slider.cols.length);
                if (this.slider.current >= this.slider.cols.length) {
                    if (this.slider.canScroll()) this.slider.prevPage();
                    else this.slider.reset();
                }
            }.bind(this));
            //}
            this.updateFilter();
            this._updateCounts(true);
        },

        _forDisplay: function(cardData) {
            var proto = Wotg.controller().protos.get(cardData.id);
            return {
                order: Wotg.Card.Views.MPack.getOrder(proto),
                proto: proto,
                locTitle: Wotg.lang('cards.' + proto.id + '.short').toLowerCase(),
                locDesc: Wotg.lang('cards.' + proto.id + '.full').toLowerCase(),
                count: cardData.count,
                toBuy: cardData.toBuy,
                cost: cardData.cost,
                gold: cardData.gold,
                flagged: cardData.flagged
            };
        },

    });

});