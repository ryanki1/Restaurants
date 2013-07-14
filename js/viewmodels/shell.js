define(['config','durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (config, system, router, logger) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        //#region Internal Methods
        function activate() {
            return boot();
        }

        function boot() {
        	debugger;
            router.mapNav(config.Routes.url);
            log('Shell Page Loaded!', null, true);
            debugger;
            return router.activate('restaurants');
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });