define(["services/logger"],function(logger){
	var routes = {
					url: "restaurants"
				}
	function activate(){
		logger("configuration of app routes done", null, 'config', true);
		return true;
	}
	return {
		Routes: routes,
		Activate: activate
	}
});
