new Wotg.Plugins.Simple({
    title: 'Snd',
    version: '0.2.3'
}, function(plugin, events) {
    var hmtlSound = new Audio();
    hmtlSound.src = 'http://k007.kiwi6.com/hotlink/uy3cmjdzjy/arena.ogg';
    hmtlSound.volume = getVolume('volume');

    function getVolume(key) {
        var def = {
            volume: 0.25,
            wotgSoundVolume: 0.17,
            wotgMusicVolume: 0.09
        };
        var value = Number(plugin.getConfig(key));
        if (!value && value !== 0 || value < 0 || value > 1) {
            value = def[key];
            plugin.setConfig(key, value);
        }
        return value;
    }

    plugin.refactor('Wotg.Utils.Sound', {
        generateSounds: function(source) {
            var target = {};

            source.forEach(function(name) {
                target[name] = new Howl({
                    urls: this.urls(name),
                    buffer: true,
                    autoplay: false,
                    volume: getVolume('wotgSoundVolume'),
                    loop: false
                });
            }.bind(this));

            return target;

        },
        music: function(name) {
            this.stopMusic();

            if (name) {
                this.currentAudioName = name;
            }

            if (name && this.on()) {
                this.currentAudio = new Howl({
                    urls: this.urls(name),
                    buffer: true,
                    autoplay: false,
                    volume: getVolume('wotgMusicVolume'),
                    loop: true
                });

                this.currentAudio.fadeIn(1, this.fadeTime);
            }
        }
    });

    events.add('initialize', function() {
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

    events.add('afterLaunch', function() {
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