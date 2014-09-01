new Wotg.Plugins.Simple({
    title: 'ConsoleAutocomplete',
    version: '0.2.4'
}, function(plugin, events) {
    events.add('afterLaunch', function() {
        var commands = Wotg.Utils.Console().commands;
        for (command in commands) {
            if (!commands.hasOwnProperty(command)) continue;
            console.log(command);
        }
    });
});