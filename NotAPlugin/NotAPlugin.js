new Wotg.Plugins.Simple({
    title: 'NotAPlugin.js',
    version: '0.2.4'
}, function(plugin, events) {
    plugin.refactor('Wotg.Utils.Console', {
        initialize: function method() {
            console.log('test');
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
            console.log('test2');
        },
    });
});