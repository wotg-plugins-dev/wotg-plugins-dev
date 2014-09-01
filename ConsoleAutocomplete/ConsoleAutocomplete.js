new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + (plugin.repository || 'wotg-plugins-dev') + '.github.io/wotg-plugins-dev/' + plugin.title + '/';
    var commands = [];

    /*==================================================================================
	=            JQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
	==================================================================================*/

    function JQTxtCmpltInit(callback) {
        var JQTxtCmplt = document.createElement('script');
        JQTxtCmplt.src = pluginPath + 'jquery.textcomplete.js';
        document.body.appendChild(JQTxtCmplt);
        callback.apply(this, arguments);
    }

    events.add('initialize', function() {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginPath + 'ConsoleAutocomplete.css';
        document.head.appendChild(css);
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

    events.add('afterLaunch', function() {
        // Make array of available commands
        var commandsObj = Wotg.Utils.Console().commands;
        for (command in commandsObj) {
            if (!commandsObj.hasOwnProperty(command)) continue;
            commands.push(command);
        }
        // ...and give it to TC
        JQTxtCmpltInit(function() {
            $('.console-input').textcomplete([{
                match: /\b(\w{1,})$/,
                search: function(term, callback) {
                    callback($.map(commands, function(word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                },
                index: 1,
                replace: function(word) {
                    return word + ' ';
                }
            }]);
        });
    });
});