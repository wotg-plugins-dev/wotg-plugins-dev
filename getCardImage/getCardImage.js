new Wotg.Plugins.Simple({
    title: 'getCardImage',
    version: '0.2.3'
}, function(plugin, events) {
    /*====================================================================================
    =            Canvas to Blob - https://github.com/eligrey/canvas-toBlob.js            =
    ====================================================================================*/
    /*====================================================================================
    =            Save to file - https://github.com/eligrey/FileSaver.js                  =
    ====================================================================================*/
    /*=======================================================
	=            Provided by https://rawgit.com/            =
	=======================================================*/
    var scriptUrls = ['https://cdn.rawgit.com/eligrey/canvas-toBlob.js/master/canvas-toBlob.js',
        'https://cdn.rawgit.com/eligrey/FileSaver.js/master/FileSaver.js'
    ];
    for (var scriptno in scriptUrls) {
        var script = document.createElement('script');
        script.src = scriptUrls[scriptno];
        document.body.appendChild(script);
    }
    script = null;

    events.add('afterLaunch', function() {
        var buttonCss = {
            position: 'fixed',
            'line-height': '2em',
            top: '50px',
            right: '10px',
            'font-size': '36px',
            background: 'red',
            'z-index': '9000'
        };
        var inputProps = {
            value: ' [ o ] ',
            type: 'button'
        };
        atom.dom.create('input', inputProps).css(buttonCss).appendTo('#screens-markup').addClass('saveButton').addEvent({
            click: function() {
                console.info('Begin saving');
                var cards = ['go_arbeitedufuerdensieg', 'go_dersiegwirdunsersein', 'go_flammenwerfervor', 'gp_feldmedizinerder14pd', 'gp_nachaichtrnbrigadeder1pd', 'gv_88pak43jagdtiger', 'gv_pzkpfw35(t)', 'gv_pzkpfwii', 'gv_stug3', 'gv_vk3001(p)', 'gv_wespe', 'so_boltatvragupomogat', 'so_nashisilyneischislimy', 'sp_pogranichniki12dagectanskoidivizii', 'sp_saperiukrainskogofronta', 'sv_bt2', 'sv_btsv', 'sv_su122a', 'sv_su26', 'sv_su76', 'sv_t127', 'sv_t44', 'uo_freedomshallprevail', 'up_sniperplatoonofthe82division', 'uv_m3lee', 'uv_m5stuart', 'uv_m7priest', 'uv_t110e5', 'uv_t30', 'uv_t57'];
                cards = ['uv_m26pershing', 'gv_pzkpfwVItiger', 'gv_pzkpfwVpanther'];
                // v 0.1.16
                cards = ['sv_bt2', 'gv_pzkpfwVpanther', 'uv_m3lee', 'sp_pogranichniki12dagectanskoidivizii'];

                var controller = Wotg.controller();
                var protos = controller.protos.array;

                var allCards = protos.map(function(proto) {
                    return proto.id;
                }).sort();

                var cards = allCards;

                for (var i = 0; i < cards.length; i++) {

                    var proto = controller.protos.get(cards[i]);
                    if (proto.country === 'france' || proto.country === 'any') continue;
                    var model = new Wotg.Card.Models.Model(proto);
                    try {
                        var view = new Wotg.Card.Views.Big(model);
                    } catch (e) {
                        console.error(e);
                    }

                    if (!view || !view.buffer) continue;

                    view.buffer.toBlob(function(blob) {
                        saveAs(blob, cards[i] + '.png');
                    });
                }
            }
        });
    });
});