define(['er.app','services/logger','durandal/plugins/router'], function(app, logger, router){
	
	var vm = {
		router: router,
		activate: activate,
		title: "Restaurants view",
		sushi: ko.observableArray()
	}
	
	function getSushisPromise(){
		var self = this;
		var radarius = 200;
		var errRoot = undefined;
		return $.when(app.GetUserCoordinates({errorFlag: true, important: false}))
			.then(function(user){
				debugger;
				$.when(app.GetSushis(user, radarius, errRoot))
					.then(function(sushis){
						debugger;
						var sushiArray = sushis.data.sushi();
						vm.sushi(sushiArray);
				});	
			});
	}
	
	function activate(){
		
		logger.log("Restaurants viewmodel activated", null, "restaurants", true);
		return getSushisPromise();
	}
	return vm;
});
