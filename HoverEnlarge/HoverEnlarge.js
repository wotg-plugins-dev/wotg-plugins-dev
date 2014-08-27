new Wotg.Plugins.Simple({
	title  : 'HoverEnlarge',
	version: '0.2.3'
}, function (plugin, events) {
	plugin.refactor(Wotg.Battle.Input.Cards, {
		targetCard: function (card) {
			if (!Wotg.battle().input.on() || this.targeted == card) return;
			this.targeted = card;

			this.checkCardHover(card, true);

			if (this.tmp_targetTO) clearTimeout(this.tmp_targetTO);
			this.tmp_targetTO = setTimeout(function () {
				var buffer = new Wotg.Card.Views.Big(card.viewModel).buffer;

				var mouse = Wotg.battle().mouse, coord = null;

				var tShape = new Rectangle({
					to  : card.view.shape.to.clone().move([10, 10]),
					size: new Size(buffer).mul(1/1.4)
				}).align(card.view.shape, 'center');

				if (tShape.y < 500) {
					tShape.y += 150;
				}

				Wotg.battle().layer.app.resources.set('mouseHandler', Wotg.battle().mouseHandler);
				var elem = new App.Light.Image(Wotg.battle().layer, {
					image: buffer,
					zIndex: 100400,
					mouse: false,
					shape: card.view.shape.clone()
				});
				new atom.Animatable(elem).animate({
					props: {
						'shape.from.x': tShape.from.x,
						'shape.from.y': tShape.from.y,
						'shape.to.x'  : tShape.to.x,
						'shape.to.y'  : tShape.to.y
					},
					time: 120,
					fn: 'sine-in',
					onTick: elem.redraw
				});

				function destroy () {
					new atom.Animatable(elem).animate({
						props: {
							'shape.from.x': card.view.shape.from.x,
							'shape.from.y': card.view.shape.from.y,
							'shape.to.x'  : card.view.shape.to.x,
							'shape.to.y'  : card.view.shape.to.y
						},
						time: 120,
						fn: 'linear',
						onTick: elem.redraw,
						onComplete: elem.destroy
					});
				}

				function closeDown () {
					destroy();
					mouse.events.remove('move', closeMove);
					mouse.events.remove('down', closeDown);
				}

				function closeMove () {
					var current = mouse.point.clone();

					if (!coord) {
						coord = current;
						return;
					}

					if (coord.distanceTo(current) < 5) {
						return;
					}

					destroy();
					mouse.events.remove('move', closeMove);
					mouse.events.remove('down', closeDown);
				}

				mouse.events.add('down', closeDown);
				mouse.events.add('move', closeMove);


			}.bind(this), 800);

			(this.selected && this.targeted) && Wotg.battle().predictions.create(this.selected, this.targeted);
		}
	});
});
