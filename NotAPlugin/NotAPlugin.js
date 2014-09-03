new Wotg.Plugins.Simple({
    title: 'NotAPlugin.js',
    version: '0.2.4'
}, function(plugin, events) {
    plugin.refactor('Wotg.Utils.Console', {
        initialize: function method() {
            method.previous.apply(this, arguments);
        },
    });
});