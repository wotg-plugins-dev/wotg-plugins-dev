new Wotg.Plugins.Simple({
    title: 'VolControl',
    version: '0.2.4'
}, function(plugin, events) {
    var DEFAULT_SOUND_VOLUME = 0.2;
    var DEFAULT_AMBIENT_VOLUME = 0.1;
    var DEFAULT_MUSIC_VOLUME = 0.1;

    plugin.refactor('Wotg.Utils.Sound', {
        generateSounds: function (source) {
            var target = {};
            var vol = Number(plugin.getConfig('soundVol'));

            source.forEach(function (name) {
                target[name] = new Howl({
                    urls    : this.urls(name),
                    buffer  : false,
                    autoplay: false,
                    volume  : vol === vol.limit(0,1) ? vol : DEFAULT_SOUND_VOLUME,
                    loop    : false
                });
            }.bind(this));

            return target;

        },

        ambient: function () {
            var vol = Number(plugin.getConfig('ambientVol'));
            if (this.currentAmbientNode) {
                this.currentAmbientNode.stop();
            }

            if (this.on()) {
                if (this.currentAmbientNode) {
                    this.currentAmbientNode.play();
                    console.log('- ambient : [ music/ambient ] (cached)');
                    return;
                }
                console.log('- ambient : [ music/ambient ]');

                var audio = this.currentAmbientNode = new Howl({
                    urls    : this.urls('music/ambient'),
                    buffer  : false,
                    autoplay: true,
                    loop    : false,
                    volume  : vol === vol.limit(0,1) ? vol : DEFAULT_AMBIENT_VOLUME,
                    onend   : function () {
                        audio = null;
                        this.ambient();
                    }.bind(this)
                });
            }
        },

        playNextMusic: function () {
            var vol = Number(plugin.getConfig('musicVol'));
            console.log('playNext');

            var name = this.currentMusic, cached;

            if (!this.on()) {
                return;
            }

            if (name && name.getNextId) {
                name = name.getNextId();
            }

            if (!name) {
                return;
            }

            cached = this.musicCache[name];

            if (cached) {
                console.log('- music   : [ ' + name + ' ] (cached)');
                this.currentAudioNode = cached;
                cached.play();
                return;
            }

            console.log('- music   : [ ' + name + ' ]');

            this.musicCache[name] = this.currentAudioNode = new Howl({
                urls    : this.urls(name),
                buffer  : false,
                autoplay: true,
                loop    : false,
                volume  : vol === vol.limit(0,1) ? vol : DEFAULT_MUSIC_VOLUME,
                onend   : this.playNextMusic
            });
        }
    });

    events.add('initialize', function() {
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

});