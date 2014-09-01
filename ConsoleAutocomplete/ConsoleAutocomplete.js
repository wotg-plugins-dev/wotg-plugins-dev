new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    events.add('aterLaunch', function() {
        console.log(Wotg.Utils);
    });
});