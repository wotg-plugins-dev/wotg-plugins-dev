new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + (plugin.repository || 'wotg-plugins-dev') + '.github.io/wotg-plugins-dev/' + plugin.title + '/';
    var commands = [];
    var pluginsCommands = [];

    /*==================================================================================
	=            JQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
	==================================================================================*/

    function JQTxtCmpltInit() {
        var JQTxtCmplt = document.createElement('script');
        JQTxtCmplt.src = pluginPath + 'jquery.textcomplete.js';
        document.body.appendChild(JQTxtCmplt);
    }

    events.add('initialize', function() {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginPath + 'ConsoleAutocomplete.css';
        document.head.appendChild(css);
        console.log(plugin.title + ' version ' + plugin.version + ' from ' + plugin.repository + ' initialized');
    });

    events.add('afterLaunch', function() {
        JQTxtCmpltInit();
        // Make array of available commands
        var commandsObj = Wotg.Utils.Console().commands;
        for (var command in commandsObj) {
            if (!commandsObj.hasOwnProperty(command)) continue;
            commands.push(command);
        }

        // Array of plugins commands
        for (command in Wotg.Plugins.Console()) {
            if (command.indexOf('command_') === 0) pluginsCommands.push(command.slice(8))
        }
    });

    atom.Keyboard().events.add('gravis', function() {
        // Console command
        $('.console-input').textcomplete([{
            match: /^(\w{0,})$/,
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
        // man
        $('.console-input').textcomplete([{
            match: /^man (\w{0,})$/,
            search: function(term, callback) {
                callback($.map(commands, function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'man ' + word;
            }
        }]);
        // plugins
        $('.console-input').textcomplete([{
            match: /^plugins (\w{0,})$/,
            search: function(term, callback) {
                callback($.map(pluginsCommands, function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'plugins ' + word + ' ';
            }
        }]);
        // plugins (rm || config || code)
        ['rm', 'config', 'code'].forEach(function(operation) {
            var re = new RegExp('^plugins ' + operation + ' (\\w{0,})$');

            $('.console-input').textcomplete([{
                match: re,
                search: function(term, callback) {
                    callback($.map(Wotg.Plugins.get().installer.connectedPlugins, function(word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                },
                index: 1,
                replace: function(word) {
                    return 'plugins ' + operation + ' ' + word;
                }
            }]);
        });
        // exec
        $('.console-input').textcomplete([{
            match: /^exec (\w{0,})$/,
            search: function(term, callback) {
                callback($.map(Object.keys(window), function(word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'exec ' + word;
            }
        }]);

        $('.console-input').on('focus', function() {
            var textComplete = $(this).data('textComplete');
            // Cursor has not set yet. And wait 100ms to skip global click event.
            setTimeout(function() {
                // Cursor is ready.
                textComplete.trigger();
            }, 100);
        });
    });
});