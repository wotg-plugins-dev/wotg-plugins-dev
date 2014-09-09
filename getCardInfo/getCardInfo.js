new Wotg.Plugins.Simple({
    title: 'getCardInfo',
    version: '0.2.4'
}, function(plugin, events) {
    var ver = this.version;

    /*===============================================================
    =            https://github.com/eligrey/FileSaver.js            =
    ===============================================================*/
    Wotg.config().addScript(this.getPluginPath('FileSaver.js'));

    events.add('afterLaunch', function() {
        var csvTable = 'v.' + ver + '\n';

        var flushedCards = ['sv_su122a', 'go_arbeitedufuerdensieg', 'so_boltatvragupomogat', 'go_dersiegwirdunsersein', 'gp_feldmedizinerder14pd', 'uv_m3lee', 'uv_m5stuart', 'uv_m7priest', 'sv_t127', 'gp_nachaichtrnbrigadeder1pd', 'so_nashisilyneischislimy', 'gv_pzkpfw35(t)', 'sp_saperiukrainskogofronta', 'up_sniperplatoonofthe82division', 'gv_stug3', 'sv_su26', 'sv_su76', 'uv_t57', 'uv_t30', 'sv_t44', 'gv_wespe', 'gv_vk3001(p)', 'sv_btsv', 'sv_bt2', 'go_flammenwerfervor', 'gv_pzkpfwii', 'gv_88pak43jagdtiger'];
        var allCards = Wotg.controller().protos.array.map(function(proto) {
            return proto.id;
        }).sort();

        /*====================================================================================================================================
        Если строка ниже закомментирована, то плагин даёт инфу по всем картам, если раскомментирована - то только по слитым (flushed)       */

        // allCards = undefined;

        /*==================================================================================================================================*/


        var cards = allCards || flushedCards;

        /*=========================================
        =            Заголовок таблицы            =
        =========================================*/

        var csvRow = 'full;short;';

        for (var prop in Wotg.Card.Proto.prototype) {
            if (typeof Wotg.Card.Proto.prototype[prop] === 'function') continue;
            // Удаляем пустые свойства
            // if (prop === 'craft' || prop === 'promo' || prop === 'class' || prop === 'repaircost') {
            //     continue;
            // }
            csvRow += prop + ';';
        }

        csvTable += csvRow + '\n';


        /*====================================
		=            Тело таблицы            =
		====================================*/

        var cardLoco = Wotg.controller().lang.items.cards;

        for (var i = 0; i < cards.length; i++) {
            card = Wotg.controller().protos.get(cards[i]);

            if (!cardLoco[card.idC]) continue;

            csvRow = cardLoco[card.idC].full ? cardLoco[card.idC].full + ';' : ';';
            csvRow += cardLoco[card.idC].short ? cardLoco[card.idC].short + ';' : ';';

            for (var j = 0; j < propList.length; j++) {
                prop = propList[j];
                if (prop === 'text') {
                    for (var t = 0; t < card.text.length; t++) {
                        csvRow += Wotg.controller().lang.get('cards.' + card.idC + '.' + card.text[t]) + '***';
                    }
                    csvRow += ';'
                    continue;
                }
                // Свойство kind есть у взводов. У техники и штабов вместо него subtype
                // if (prop === 'kind' && (card.type === 'vehicle' || card.type === 'hq')) {
                //     csvRow += card.subtype ? card.subtype + ';' : ';';
                //     continue;
                // }
                csvRow += card[prop] ? card[prop] + ';' : ';';
            }

            csvTable += csvRow + '\n';
        }

        /*=========================================
        =            Сохранение в файл            =
        =========================================*/
        /*===============================================================
        =            https://github.com/eligrey/FileSaver.js            =
        ===============================================================*/

        var blob = new Blob([csvTable], {
            type: 'text/plain;charset=utf-8'
        });
        saveAs(blob, 'cardsInfo.v.' + ver + '.csv'); // Формат csv, разделитель ;
    });
});