new Wotg.Plugins.Simple({
    title: 'NewMusic',
    version: '0.2.4'
}, function(plugin, events) {
    var music = {
        "USSR": [{
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Broken%20Reality.mp3",
            "credits": "\"Broken Reality\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Neo%20Western.mp3",
            "credits": "\"Neo Western\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Cold%20Funk.mp3",
            "credits": "\"Cold Funk\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Sock%20Hop.mp3",
            "credits": "\"Sock Hop\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Steel%20Rods.mp3",
            "credits": "\"Steel Rods\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Future%20Gladiator.mp3",
            "credits": "\"Future Gladiator\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Harmful%20or%20Fatal.mp3",
            "credits": "\"Harmful or Fatal\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Call%20to%20Adventure.mp3",
            "credits": "\"Call to Adventure\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3",
            "credits": "\"Hitman\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hero%20Down.mp3",
            "credits": "\"Hero Down\" Kevin MacLeod (incompetech.com)"
        }],
        "GERMANY": [{
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Five%20Armies.mp3",
            "credits": "\"Five Armies\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Movement%20Proposition.mp3",
            "credits": "\"Movement Proposition\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Summon%20the%20Rawk.mp3",
            "credits": "\"Summon the Rawk\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Bet%20You%20Can.mp3",
            "credits": "\"Bet You Can\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Take%20the%20Lead.mp3",
            "credits": "\"Take the Lead\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Noise%20Attack.mp3",
            "credits": "\"Noise Attack\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Riptide.mp3",
            "credits": "\"Riptide\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Welcome%20to%20the%20Show.mp3",
            "credits": "\"Welcome to the Show\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Chipper.mp3",
            "credits": "\"Chipper\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Big%20Rock.mp3",
            "credits": "\"Big Rock\" Kevin MacLeod (incompetech.com)"
        }],
        "Background": [{
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Reawakening.mp3",
            "credits": "\"Reawakening\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Perspectives.mp3",
            "credits": "\"Perspectives\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Space%201990.mp3",
            "credits": "\"Space 1990\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Easy%20Lemon.mp3",
            "credits": "\"Easy Lemon\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Healing.mp3",
            "credits": "\"Healing\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Porch%20Swing%20Days%20-%20faster.mp3",
            "credits": "\"Porch Swing Days - faster\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Last%20Kiss%20Goodnight.mp3",
            "credits": "\"Last Kiss Goodnight\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Revival.mp3",
            "credits": "\"Revival\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Wish%20Background.mp3",
            "credits": "\"Wish Background\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Frozen%20Star.mp3",
            "credits": "\"Frozen Star\" Kevin MacLeod (incompetech.com)"
        }],
        "USA": [{
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Evening%20Melodrama.mp3",
            "credits": "\"Evening Melodrama\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Heavy%20Interlude.mp3",
            "credits": "\"Heavy Interlude\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Conflicted.mp3",
            "credits": "\"Conflicted\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Gaslamp%20Funworks.mp3",
            "credits": "\"Gaslamp Funworks\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Juniper.mp3",
            "credits": "\"Juniper\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Impact%20Lento.mp3",
            "credits": "\"Impact Lento\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Tabuk.mp3",
            "credits": "\"Tabuk\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Reign.mp3",
            "credits": "\"Reign\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Skye%20Cuillin.mp3",
            "credits": "\"Skye Cuillin\" Kevin MacLeod (incompetech.com)"
        }, {
            "url": "http://incompetech.com/music/royalty-free/mp3-royaltyfree/Sleep_and_Then.mp3",
            "credits": "\"Sleep and Then\" Kevin MacLeod (incompetech.com)"
        }]
    };

    var mp3Player = new Audio();
    for (var trigger in music) {
        mp3Player[trigger] = {};
        mp3Player[trigger].queue = atom.array.shuffle(music[trigger]);
    }

    function fadeoutThan(callback, arg) {

        if (mp3Player.paused) {
            callback.call(this, arg);
            return;
        }

        msec = 1000;
        var steps = 10;
        var vol = mp3Player.volume;
        var i = 0;
        var timer = setInterval(function() {
            mp3Player.volume -= vol / steps;
            i++;
            if (i < steps) return;
            clearInterval(timer);
            mp3Player.pause();
            mp3Player.volume = vol;
            callback.call(this, arg);
        }, msec / steps);
    }

    function startPlay(trigger) {

        var next = mp3Player[trigger].queue.pop();
        if (!next || !next.url) {
            mp3Player[trigger].queue = atom.array.shuffle(music[trigger]);
            next = mp3Player[trigger].queue.pop();
        }
        mp3Player.src = next.url;
        atom.trace(next.credits);
        mp3Player.play();
        mp3Player.onended = function() {
            startPlay(trigger);
        }
    }

    events.add('afterLaunch', function() {

        // Игра запустилась не на боевом экране - вкл. фоновую музыку
        if (Wotg.controller().screens.current.name !== 'Battle') fadeoutThan(startPlay, 'Background')

        // Переход в экран боя - вкл. боевую музыку
        Wotg.controller().screens.events.add('change', function(screen) {
            if (screen.name === 'Battle') fadeoutThan(startPlay, Wotg.battle().player.country)
        });

        // Конец боя - вкл. фоновую музыку
        Wotg.controller().connection.events.add('message/game/results', function(message) {
            fadeoutThan(startPlay, 'Background');
        });

    });
});