new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + plugin.repository || 'wotg-plugins-dev' + '.github.io/wotg-plugins-dev/' + plugin.title + '/';

    var css = document.createElement('link');
    css.href = pluginPath + 'ConsoleAutocomplete.css';
    document.head.appendChild(css);

    /*==================================================================================
	=            JQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
	==================================================================================*/
    var JQTxtCmplt = document.createElement('script');
    JQTxtCmplt.src = pluginPath + 'jquery.textcomplete.min.js';
    document.body.appendChild(JQTxtCmplt);

    events.add('afterLaunch', function() {
        // Make array of available commands
        debugger
        var commands = [];
        var commandsObj = Wotg.Utils.Console().commands;
        for (command in commandsObj) {
            if (!commandsObj.hasOwnProperty(command)) continue;
            commands.push(command);
        }

        $('.console-input').textcomplete([{ // tech companies
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