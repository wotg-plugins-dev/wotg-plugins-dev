new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + (plugin.repository || 'wotg-plugins-dev') + '.github.io/wotg-plugins-dev/' + plugin.title + '/';

    /*===========================
    =            CSS            =
    ===========================*/

    function CSSInit() {
        var css = document.createElement('link');
        css.href = pluginPath + 'ConsoleAutocomplete.css';
        document.head.appendChild(css);
    }

    /*==============================
    =            JQuery            =
    ==============================*/

    function JQInit() {

        var JQ = document.createElement('script');
        JQ.src = pluginPath + 'jquery-2.1.1.min.js';
        document.head.appendChild(JQ);
        JQ.onload = function() {
            JQTxtCmpltInit();
        }

    }

    /*==================================================================================
	=            JQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
	==================================================================================*/

    function JQTxtCmpltInit() {
        var JQTxtCmplt = document.createElement('script');
        JQTxtCmplt.src = pluginPath + 'jquery.textcomplete.js';
        document.body.appendChild(JQTxtCmplt);
    }

    /*==============================
    =            Events            =
    ==============================*/

    events.add('initialize', function() {
        JQInit();
        CSSInit();
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

    atom.Keyboard().events.add('gravis', function() {
        // Make array of available commands
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