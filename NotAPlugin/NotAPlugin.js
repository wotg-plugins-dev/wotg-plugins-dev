new Wotg.Plugins.Simple({
    title: 'NotAPlugin.js',
    version: '0.2.4'
}, function(plugin, events) {
    var pluginPath = 'https://' + (plugin.repository || 'wotg-plugins-dev') + '.github.io/wotg-plugins-dev/' + plugin.title + '/';
    console.log(plugin);
    console.log(pluginPath);
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
            this.input = this.create('textarea', 'input', this.inner);

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