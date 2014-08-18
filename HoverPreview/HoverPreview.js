new Wotg.Plugins.Simple({
	title  : 'HoverPreviewWIP',
	version: '0.2.3'
}, function (plugin, events) {
	
	CURRENT_CARD = '';

	plugin.refactor( 'Wotg.Battle.Input.Cards', {
		targetCard: function method (card) {

			if (atom.dom('.screen-battle-hover-preview').length == 0) {
				atom.dom('.screen-battle')
					.create('div', {
					    class: 'screen-battle-hover-preview'
					})
				atom.dom('.screen-battle-hover-preview').css({
						position: 'absolute',
						top: 130,
						left: -100
					});
				atom.dom('.screen-battle-hover-preview').appendBefore('.player-content');
			};
			
			

			proto = Wotg.controller().protos.get(card.model.proto);
			model = new Wotg.Card.Models.Model(proto);
			view = new Wotg.Card.Views.Big(model);

			if (CURRENT_CARD == card.model.proto) atom.dom(atom.dom('.screen-battle-hover-preview canvas').first).destroy();
			(atom.dom(view.buffer)).appendTo(atom.dom('.screen-battle-hover-preview'));			
			CURRENT_CARD = card.model.proto;

			method.previous.apply( this, arguments );
		},
		
		untargetCard: function method (card) {
			atom.dom(atom.dom('.screen-battle-hover-preview canvas').first).destroy();
			method.previous.apply( this, arguments );
		},
	});
});
