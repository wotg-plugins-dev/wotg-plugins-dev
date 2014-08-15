new Wotg.Plugins.Simple({
	title  : 'SupportOfArtReplace',
	version: '0.2.3'
}, function (plugin, events) {

	plugin.refactor( 'Wotg.Images.Lazy', {

		getFullImagePath: function (subpath) {
			var result;
            		if (subpath.indexOf('http://')==0) {
                		result = subpath;
            		} else {
            			result = Wotg.controller().preloader.getPrefix() + subpath;
            		}
			return result;
		},

		loadCard: function (proto, onLoad) {
			var
				subpath = 'cards/' + proto.country + '/' + proto.id + '.jpg',
				size = this.sizes[proto.type] || this.sizes.other;

			if (Wotg.controller().lang.get('cards.' + proto.id + '.art') != '{cards.' + proto.id + '.art}') subpath = Wotg.controller().lang.get('cards.' + proto.id + '.art');

			return Wotg.Images.LazyMockup(proto.type, this.getImage(subpath), size, onLoad);
		}

    });

});
