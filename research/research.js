new Wotg.Plugins.Simple({
    	title: 'research',
	version: '0.2.4'
}, function (plugin, events) {
/*
	plugin.addImagesPreload({
		'test': 'image.png'
	});
*/
function jslog(text) {
	
	console.log.apply( console, ['[JS Log] '].append(arguments) );
	
}

	events.add('initialize', function () {
		console.log(plugin.title +' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');

	});

	events.add('afterLaunch', function () {
	//	atom.dom(plugin.getImage('test')).appendTo('body');
	//	console.log(plugin.getImage('test'));
	console.log('J_S afterLaunch');
	
	});
	//========
atom.declare( 'Wotg.Research.HqCardItem', Wotg.Research.CardItem, {

	getPos: function() {
		return this.manager.HQcardSlotsCoords[this.slot];
	}
});

	//удалить если будут меняться координаты штаба 
	plugin.refactor( 'Wotg.Research.HQItem', {
        // Меняем один из методов класса
        'getPos': function method() {
        	if (this.isCurrent) {
        		jslog(this,this.data.parents.length );
        		if (this.data.parents.length == 0) {
        			return new Point(this.manager.JShqSlotsCoords[0].x,0);
        		} else	return this.manager.JShqSlotsCoords[0];
        		return this.manager.JShqSlotsCoords[0];
        	}
		if (this.isRootTree) return this.manager.hqSlotsCoords[this.slot];
		return this.manager.cardSlotsCoords[this.slot];
	}
	});
	
	plugin.refactor( 'Wotg.Research.Manager', {
        // Меняем один из методов класса
        'setViewMode': function method(viewMode) {
        	method.previous.apply( this, arguments );
        	this.viewMode = viewMode;
        if (viewMode == 'compact') {
			this.JShqSlotsCoords = this.JSsmallHq;
		//	this.HQcardSlotsCoords = this.HQsmallCards;
		} else {
			this.JShqSlotsCoords = this.JSbigHq;
		//	this.HQcardSlotsCoords = this.HQbigCards;
		}
	}
	});
        	
        	
	plugin.refactor( 'Wotg.Research.Manager', {
        // Меняем один из методов класса

	'createHqHq': function  (data) {
		
		
		if (data.parenthq) {
			var parenthq = this.model.getCardById(data.parenthq);
			if (parenthq.slot != 0)	parenthq.slot=15+parenthq.slot;
			this.createHq(parenthq, false, false);
		}
		
		var elem = new Wotg.Research.HQItem(this.app.layer, {
			manager: this,
			data: data,
			isCurrent: true,
			isRootTree: false
		});
		this.app.mouseHandler.subscribe(elem);
		this.elems.push(elem);
	},
        'createResearchTreeForHQ': function method(hqId) {
           	//this.backButton.text = Wotg.controller().lang.get('research.backToRoot');
		this.isRoot = false;
		this.selector.hide();
		this.destroyElems();
		var list = this.model.getCardListForHQ(hqId);
		var listHq = this.model.getCardListForHQ(hqId, true);
		var rootData = this.model.getCardById(hqId);
		jslog({list:list, rootData:rootData, listHq:listHq, this:this});
		//нарисовать подложку тут
		/*
		var imgNode = this.node
		var component = new Wotg.UI.ImageComponent(this.app.layer, {
			image:  Wotg.controller().images.get('popup-bg'),
			from:  new Point(0, 0),
			shape: new Rectangle (0, 0,1000,500)
		});
		//imgNode.setZIndex(zIdx);
		//imgNode.setComponent(component);
		*/
		//=====
		this.createHqHq(rootData);
		
		for (var i = 0 ; i < list.length; i++) {
			if (Wotg.controller().protos.get(list[i].card).type.toLowerCase() != 'hq') {
				if (list[i].slot > 23) {
					jslog('слишком большой слот:',list[i])
					list[i].slot = list[i].slot-15;
				}
			}
				this.createCard(list[i]);
			} else {
				this.createHq(list[i], false, false);
			}
		}
		
		list =listHq;
		for (var i = 0 ; i < list.length; i++) { 
			if (list[i].slot<16)	list[i].slot = list[i].slot+15;
			if (list[i].slot > 23) {
				jslog('слишком большой слот:',list[i])
				list[i].slot = list[i].slot-15;
			}
			this.createCard(list[i]);
		}
		
		setTimeout(function(){
			jslog(this.elems);
			var lines = new Wotg.Research.Lines(this.app.linesLayer.ctx, this.elems, this);
			lines.drawLines(true);
		}.bind(this), 50);

        },
        'cardSlotsCoords': {},
        //карты около штаба
        'bigCards': {
		0: new Point(650, 0),
		1: new Point(237, 101),
		2: new Point(1217, 101),
		3: new Point(237, 300),
		4: new Point(484, 300),
		5: new Point(728, 300),
		6: new Point(972, 300),
		7: new Point(1217, 300),
		8: new Point(237, 500),
		9: new Point(484, 500),
		10: new Point(728, 500),
		11: new Point(972, 500),
		12: new Point(1217, 500),
		13: new Point(159, 679),
		14: new Point(650, 679),
		15: new Point(1139, 679),
		
		16: new Point(484, 140), 
		17: new Point(1217, 140),//101
		18: new Point(237, 140),
		19: new Point(972, 140),
		20: new Point(484, 1),
		21: new Point(1217, 1),
		22: new Point(237, 1),
		23: new Point(972, 1),
		28: new Point(650, 0),
		29: new Point(650, 0),
		30: new Point(650, 0)
		

	},
	'JShqSlotsCoords' :{},
	//координаты штаба
	'JSbigHq' : {
		0: new Point(690, 140)
		
	},
	//координаты штаба compact
	'JSsmallHq':{
		0: new Point(375, 125)
	},
	//прокачиваемые карты  compact
	'smallCards': {
		0: new Point(348, 0), // координата предыдущего штаба
		1: new Point(77, 80),
		2: new Point(850, 80),
		3: new Point(77, 265),
		4: new Point(225, 265),
		5: new Point(424, 265),
		6: new Point(620, 265),
		7: new Point(850, 265),
		8: new Point(77, 410),
		9: new Point(225, 410),
		10: new Point(424, 410),
		11: new Point(611, 410),
		12: new Point(850, 410),
		13: new Point(0, 555),
		14: new Point(348, 555),
		15: new Point(773, 555),
		
		16: new Point(225, 125), //2-2
		17: new Point(620, 125),//2-3
		18: new Point(77, 125),//2-1
		19: new Point(850, 125),//2-4
		20: new Point(225, 1),
		21: new Point(620, 1),
		22: new Point(77, 1),
		23: new Point(850, 1),
		28: new Point(348, 0),
		29: new Point(348, 0),
		30: new Point(348, 0)
	},
    	'createBackButton': function method() {
    		method.previous.apply( this, arguments );
		var showAll = plugin.getConfig('showAll');
    		if (showAll && showAll == 'true' && this.viewMode != 'compact') {
			this.allButton = Wotg.controller().ui.buttons.header.create({
					onActivate: function(){
						//function
						Wotg.openScreen('Research', { nation : this.defaultNation, mode :'all' });;
					}.bind(this)
				},
				'tree-root'
			);
			//jslog(this.allButton);
			var targetNode = Wotg.controller().screens.headerNode;
			this.allButton.element.css('position', 'absolute')
				.css('left', 120 )
				.css('top', 6 );
			this.allButton.element.addClass("all-button").appendTo(targetNode);
		}
    	},
    	'destroy': function method() {
    		method.previous.apply( this, arguments );
    		if (this.allButton) this.allButton.destroy();
    	},
    	'initialize': function method(node, viewMode, screenOpenData) {
    	   
           if (screenOpenData.mode) {
    		this.setViewMode(viewMode);
		this.node = node;
		this.elems = [];
		this.createApp();
		this.model = Wotg.controller().model.get('research');

		if (screenOpenData.nation) this.defaultNation = screenOpenData.nation;

		this.createNationNavigator();
//		jslog(this.model, this.defaultNation );
		
		var list = this.model.getTreeByNation(this.defaultNation );
		list.sort (function(a,b) {
			return (Wotg.controller().protos.get(a.id).level - Wotg.controller().protos.get(b.id).level)
		});
		for (var i = 0 ; i < list.length; i++) { //list.length
			list[i].slot = i;
		//	this.createHqCard(list[i]);
			var elem = new Wotg.Research.AllCardItem(this.app.layer, {
			manager: this,
			data: list[i]
		});
		this.app.mouseHandler.subscribe(elem);
		this.elems.push(elem);
		}
		
		this.createBackButton();

		this.flagElem = atom.dom.create('div').addClass('big-nation').appendTo('body');
		this.setBgFlag(this.defaultNation);
    	   } else {
    	   	method.previous.apply( this, arguments );
    	   }
    		
    		
    	}
    		
    });
    atom.declare( 'Wotg.Research.AllCardItem', Wotg.Research.CardItem, {

	getPos: function() {
		var columns = 12,
		width = 127,
		hight = 127,
		x = this.slot % columns,
		y= (this.slot-x) / columns;
		return new Point (x*width,y*hight+40);
	}
    });
    
    plugin.refactor( 'Wotg.Research.HQItem', {
    	'size'       : new Size(285, 80), // непонятно работает ли
        'sizeCurrent': new Size(215, 131) //342,200 ----- 300,84 //размер штаба
    });
    plugin.refactor( 'Wotg.Research.Lines', {
	drawLine: function(from, to) {
		var rect = new Rectangle(from,to);
		if (from.y < to.y) {
			rect = new Rectangle(new Point(from.x - 2, from.y + 2), new Size(5, to.y - from.y - 2));
		} else if (from.x < to.x) {
			rect = new Rectangle(from, new Size(to.x - from.x, 5));

		} else if (from.x > to.x) {
			rect = new Rectangle(to, new Size(from.x - to.x, 5));
		}
		var pattern = this.createPattern(new Size(rect.width, rect.height));
		this.ctx.drawImage({
			image: pattern,
			draw : rect
		});
	}
    });
    
});
