new Wotg.Plugins.Simple({
    	title: 'research',
	version: '0.2.3'
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
        	if (this.isCurrent) return this.manager.JShqSlotsCoords[0];
		if (this.isRootTree) return this.manager.hqSlotsCoords[this.slot];
		return this.manager.cardSlotsCoords[this.slot];
	}
	});
	
	plugin.refactor( 'Wotg.Research.Manager', {
        // Меняем один из методов класса
        'setViewMode': function method(viewMode) {
        	method.previous.apply( this, arguments );
        if (viewMode == 'compact') {
			this.JShqSlotsCoords = this.JSsmallHq;
			this.HQcardSlotsCoords = this.HQsmallCards;
		} else {
			this.JShqSlotsCoords = this.JSbigHq;
			this.HQcardSlotsCoords = this.HQbigCards;
		}
	}
	});
        	
        	
	plugin.refactor( 'Wotg.Research.Manager', {
        // Меняем один из методов класса
        'createHqCard': function  (data) {
		var elem = new Wotg.Research.HqCardItem(this.app.layer, {
			manager: this,
			data: data
		});
		this.app.mouseHandler.subscribe(elem);
		this.elems.push(elem);
	},
	'createHqHq': function  (data, list) {
		
		if (data.parenthq) {
			var parenthq = this.model.getCardById(data.parenthq);
			parenthq.slot=0;
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
		
		for (var i = 0 ; i < list.length; i++) { 
			list[i].slot = i+1;
			this.createHqCard(list[i]);
		}
		
		
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
		this.createHqHq(rootData, listHq);
		for (var i = 0 ; i < list.length; i++) {
			if (Wotg.controller().protos.get(list[i].card).type.toLowerCase() != 'hq') {
				this.createCard(list[i]);
			} else {
				this.createHq(list[i], false, false);
			}
		}
		setTimeout(function(){
			jslog(this.elems);
			var linesElems =[];
			for (var i = 0 ; i < this.elems.length; i++) {
				if (this.elems[i].Constructor != "Wotg.Research.HqCardItem") {
					linesElems.push(this.elems[i]);
				}
			}
			
		
			var lines = new Wotg.Research.Lines(this.app.linesLayer.ctx, linesElems, this);
			lines.drawLines(false);
		}.bind(this), 50);

        },
        'cardSlotsCoords': {},
        'HQbigCards': {
		0: new Point(240, 0),
		1: new Point(484, 0), 
		2: new Point(728, 0),//101
		3: new Point(972, 0),
		4: new Point(1217, 0),
		5: new Point(484, 140),
		6: new Point(728, 140),
		7: new Point(972, 140),
		8: new Point(1217, 140)
		

	},
	'HQsmallCards': {
		0: new Point(108, 0),
		1: new Point(267, 0), 
		2: new Point(444, 0),//101
		3: new Point(621, 0),
		4: new Point(799, 0),
		5: new Point(267, 125),
		6: new Point(444, 125),
		7: new Point(621, 125),
		8: new Point(799, 125)
		

	},
	'JShqSlotsCoords' :{},
	'JSbigHq' : {
		0: new Point(150, 90)
		
	},
	'JSsmallHq':{
		0: new Point(0, 90)
	},
	'smallCards': {
		0: new Point(0, 0),
		1: new Point(108, 80),
		2: new Point(799, 80),
		3: new Point(108, 265),
		4: new Point(267, 265),
		5: new Point(444, 265),
		6: new Point(621, 265),
		7: new Point(799, 265),
		8: new Point(108, 410),
		9: new Point(257, 410),
		10: new Point(434, 410),
		11: new Point(611, 410),
		12: new Point(799, 410),
		13: new Point(28, 555),
		14: new Point(348, 555),
		15: new Point(673, 555)
	},
    	'createBackButton': function method() {
    		method.previous.apply( this, arguments );

    		if (getConfig('showAll').toLowCase == 'true' && this.viewMode != 'compact') {
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
    	   this.bigCards[0]= new Point(140, 0);
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
    	'size'       : new Size(285, 80),
        'sizeCurrent': new Size(285, 160) //342,200 ----- 300,84
    });
    
});
