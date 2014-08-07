Wotg_Plugins.get().addSimplePlugin('InPain', '0.2.2', function (api) {
﻿	
﻿	console.log(api);

﻿	api.events.add('beforeLaunch', function () {
		Wotg.controller().lang.set({'hangar.battleButton' : 'В Боль!'});
﻿	});

});
