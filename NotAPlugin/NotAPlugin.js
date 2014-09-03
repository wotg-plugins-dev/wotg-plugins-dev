new Wotg.Plugins.Simple({
    title: 'NotAPlugin',
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
        JQ.onload = function() {
            makeSuggestions();
        }
    }

    function makeSuggestions() {
        var conIn = $('.console-input');
        // debugger
        // Console command
        conIn.textcomplete([{
            match: /^(\w{0,})$/,
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
            match: /^man (\w{0,})$/,
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
            match: /^plugins (\w{0,})$/,
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
            match: /^exec (\w{0,})$/,
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
        // exec object.object.object
        conIn.textcomplete([{
            match: /(^exec )([^\(]*)(\.)(\w{0,})$/,
            search: function(term, callback) {
                var root = /(^exec )([^\(]*)(\.)(\w{0,})$/.exec(conIn[1].value);
                if (!root) {
                    callback($.map([], function() {
                        return null;
                    }));
                    return;
                }
                var tree = root[2].split('.');
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
            index: 4,
            replace: function(word) {
                return '$1$2$3' + word;
            }
        }]);
        // set
        conIn.textcomplete([{
            match: /^set (\w{0,})$/,
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
        commands.sort();

        // Array of plugins commands
        for (command in Wotg.Plugins.Console()) {
            if (command.indexOf('command_') === 0) pluginsCommands.push(command.slice(8))
        }
        pluginsCommands.sort();
    });

    plugin.refactor('Wotg.Utils.Console', {
        initialize: function method() {
            this.bindMethods(['onExec', 'onClear', 'onSubmit', 'onToggle', 'onSet', 'man']);

            this.events = new atom.Events(this);
            this.wrapper = this.create('div', 'wrapper', 'body');
            this.inner = this.create('div', 'inner', this.wrapper);
            this.output = this.create('div', 'output', this.inner);
            this.input = this.create('textarea', 'input', this.inner).addEvent({
                focus: function() {
                    JQTxtCmpltInit();
                }
            });

            this.bindKeyboard();

            this.commands = {};
            this.constructor.commands.forEach(function(command) {
                this.register(command);
            }.bind(this));

            this.storage = this.getStorage();
            this.currentStep = this.storage.length;

            this.input.first.addEventListener("dragenter", Mouse.prevent, false);
            this.input.first.addEventListener("dragover", Mouse.prevent, false);
            this.input.first.addEventListener('drop', function(e) {
                e.stopPropagation();
                e.preventDefault();
                this.toggle();
                Wotg.controller().replays.read(e.dataTransfer.files[0]);
            }.bind(this), false);
        },
    });
});