new Wotg.Plugins.Simple({
    title: 'Snd',
    version: '0.2.4'
}, function(plugin, events) {
    var hmtlSound = new Audio();
    hmtlSound.src = 'http://k007.kiwi6.com/hotlink/uy3cmjdzjy/arena.ogg';
    hmtlSound.volume = getVolume('volume');

    function getVolume(key) {
        var DEFAULT = 1;
        var value = Number(plugin.getConfig(key));
        if (!value && value !== 0 || value < 0 || value > 1) {
            value = DEFAULT;
            plugin.setConfig(key, value);
        }
        return value;
    }

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