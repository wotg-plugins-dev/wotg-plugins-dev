new Wotg.Plugins.Simple({
    title: 'VolControl',
    version: '0.2.4'
}, function(plugin, events) {

    function getVolume(key) {
        var DEFAULT = 0.2;
        var value = Number(plugin.getConfig(key));
        if (!value && value !== 0 || value < 0 || value > 1) {
            value = DEFAULT;
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
                    volume: getVolume('vol'),
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
                    volume: getVolume('vol'),
                    loop: true
                });

                this.currentAudio.fadeIn(1, this.fadeTime);
            }
        }
    });

    events.add('initialize', function() {
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

});