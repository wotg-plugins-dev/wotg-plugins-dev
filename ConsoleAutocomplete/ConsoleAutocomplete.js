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
            match: /^(\w{1,})$/,
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
            match: /^man\\s(\w{1,})$/,
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
            match: /^plugins\\s(\w{1,})$/,
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
        var installedPlugins = Wotg.Plugins.get().installer.connectedPlugins;

        ['rm', 'config', 'code'].map(function(operation) {
            var re = new RegExp('^plugins\\s' + operation + '\\s(\\w{1,})$');

            $('.console-input').textcomplete([{
                match: re,
                search: function(term, callback) {
                    callback($.map(installedPlugins, function(word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                },
                index: 1,
                replace: function(word) {
                    return 'plugins ' + operation + ' ' + word;
                }
            }]);
        })
    });
});