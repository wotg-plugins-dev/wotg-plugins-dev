new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = this.getPluginPath();
    var commands = [];
    var pluginsCommands = [];

    jQtcAdd(pluginPath);
    cssAdd(pluginPath);

    console.log(this.title + ' version ' + this.version + ' from ' + this.repository + ' initialized');

    /*==================================================================================
    =            jQuery Textcomplete http://yuku-t.com/jquery-textcomplete/            =
    ==================================================================================*/
    function jQtcAdd(pluginPath) {
        var jQueryWaiting = setInterval(function() {
            if (!window.jQuery) return;
            Wotg.config().addScript(pluginPath + 'jquery.textcomplete.js');
            clearInterval(jQueryWaiting);
        }, 500);
    }

    function cssAdd(pluginPath) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginPath + 'ConsoleAutocomplete.css';
        document.head.appendChild(css);
    }

    function makeSuggestions() {
        var conIn = $('.console-input');
        // Console command
        conIn.textcomplete([{
            match: /^(\w*)$/,
            search: function(term, callback) {
                callback($.map(commands, function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return word + ' ';
            }
        }]);
        // man
        conIn.textcomplete([{
            match: /^man (\w*)$/,
            search: function(term, callback) {
                callback($.map(commands, function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'man ' + word;
            }
        }]);
        // plugins
        conIn.textcomplete([{
            match: /^plugins (\w*)$/,
            search: function(term, callback) {
                callback($.map(pluginsCommands, function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'plugins ' + word + ' ';
            }
        }]);
        // plugins (rm || config || code)
        ['rm', 'config', 'code'].forEach(function(operation) {
            var re = new RegExp('^plugins ' + operation + ' ([\\w:]{0,})$');

            conIn.textcomplete([{
                match: re,
                search: function(term, callback) {
                    callback($.map(Wotg.Plugins.get().installer.connectedPlugins.sort(), function(word) {
                        return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                    }));
                },
                index: 1,
                replace: function(word) {
                    return 'plugins ' + operation + ' ' + word;
                }
            }]);
        });
        // exec
        conIn.textcomplete([{
            match: /^exec (\w*)$/,
            search: function(term, callback) {
                callback($.map(Object.keys(window).sort(), function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'exec ' + word;
            }
        }]);
        // exec object.object_.object5
        conIn.textcomplete([{
            match: /(^exec [\w\.]*\.)(\w*)$/,
            search: function(term, callback) {
                var root = /^exec ([\w\.]*)\.\w*$/.exec(conIn[1].value);
                if (!root) {
                    callback($.map([], function() {
                        return null;
                    }));
                    return;
                }
                var tree = root[1].split('.');
                var leaf = tree.reduce(function(obj, parameter) {
                    return obj[parameter];
                }, window);
                if (!(leaf instanceof Object)) {
                    callback($.map([], function() {
                        return null;
                    }));
                    return;
                }
                callback($.map(Object.keys(leaf).sort(), function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 2,
            replace: function(word) {
                return '$1' + word;
            }
        }]);
        // set
        conIn.textcomplete([{
            match: /^set (\w*)$/,
            search: function(term, callback) {
                callback($.map(['maxLogDepth', 'height', 'margin'], function(word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function(word) {
                return 'set ' + word + '=';
            }
        }]);
    }

    events.add('afterLaunch', function() {
        // Make array of available commands
        var commandsObj = Wotg.Utils.Console().commands;
        for (var command in commandsObj) {
            if (!commandsObj.hasOwnProperty(command)) continue;
            commands.push(command);
        }
        commands.sort();

        // Array of plugins commands
        for (command in Wotg.Plugins.Console()) {
            if (command.indexOf('command_') === 0) pluginsCommands.push(command.slice(8))
        }
        pluginsCommands.sort();
    });

    plugin.refactor('Wotg.Utils.Console', {
        initialize: function method() {
            method.previous.call(this);
            this.input.addEvent({

                focus: function() {
                    makeSuggestions();
                }

            });
            this.commands.log = {
                name: 'log',
                manual: 'console.log({argument})',
                launch: function(console, content) {
                    console.log(
                        new Function('', 'console.log(' + content + '); return ' +
                            Object.prototype.toString.call(content) === '[object Object]' ? Object.keys(content) : content)()
                    );
                }
            }
        },
    });
});