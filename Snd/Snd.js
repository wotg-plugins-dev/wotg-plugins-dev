new Wotg.Plugins.Simple({
	title  : 'Snd',
	version: '0.2.3'
}, function (plugin, events) {
	var hmtlSound = new Audio();
	hmtlSound.src ='http://k007.kiwi6.com/hotlink/uy3cmjdzjy/arena.ogg';

	// TODO: Сделать громкость параметром плагина
	// hmtlSound.volume = 0.25;
	// var wotgSoundVolume = 0.17; // Громкость звуков игры (от 0 до 1)
	// var wotgMusicVolume = wotgSoundVolume / 2; // Громкость музыки игры (от 0 до 1)

	// plugin.refactor( 'Wotg.Utils.Sound', {
	// 	generateSounds: function (source) {
	// 		var target = {};

	// 		source.forEach(function (name) {
	// 			target[name] = new Howl({
	// 				urls    : this.urls(name),
	// 				buffer  : true,
	// 				autoplay: false,
	// 				volume	: wotgSoundVolume,
	// 				loop    : false
	// 			});
	// 		}.bind(this));

	// 		return target;

	// 	},
	// 	music: function (name) {
	// 		this.stopMusic();

	// 		if (name && this.on()) {
	// 			this.currentAudio = new Howl({
	// 				urls    : this.urls(name),
	// 				buffer  : true,
	// 				autoplay: false,
	// 				volume	: wotgMusicVolume,
	// 				loop    : true
	// 			});

	// 			this.currentAudio.fadeIn(1, this.fadeTime);
	// 		}
	// 	}
	// });

	events.add('initialize', function () {
		console.log('Snd initialized');
	});

	events.add('beforeLaunch', function () {
		// Wotg.controller().storage.setItem('sound', 'off');
	});

	events.add('afterLaunch', function () {
		// Начало боя
		Wotg.controller().connection.events.add('message/game/start', function(message) {
		    hmtlSound.play();
		});
		// Конец боя
		Wotg.controller().connection.events.add('message/game/results', function(message) {
			hmtlSound.play();
		});
		// Переход хода
		Wotg.controller().connection.events.add('message/game/turnbegin', function(message) {
			hmtlSound.play();
		});
	});
});
