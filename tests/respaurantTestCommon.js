define(["er.app","vendor/knockout-2.2.1"],function(app,ko){
	'use strict';
	function helperGetUserCoordinates(cbStack, fnTest) {
		debugger;
		app.test.stack = cbStack;
		app.test.fnTest = fnTest;
		var cb = cbStack.shift();
		$.when(app.GetUserCoordinates({errorFlag: true, important: false}))
			.then(cb);
	}
		
	function helperDoneForGetSushis(user) {
		debugger;
		var cb = app.test.stack.shift();
		var radarius = 200;
		var errRoot = undefined;
		$.when(app.GetSushis(user, radarius, errRoot))
			.then(cb);	
	}
	
	function helperDoneForGetSushisFromWebAPI(user) {
		debugger;
		var cb = app.test.stack.shift();
		var radarius = 200;
		var url = "http://localhost:48429/api/restaurants/jsonp";
		var errRoot = undefined;
		$.when(app.GetSushisFromWebAPI(user, radarius, url, errRoot))
			.then(cb);	
	}
	
	function helperDoneForSushisBind(sushis){
		debugger;
		if (!ko.dataFor(document.getElementById("restaurantCircle"))){
			ko.applyBindings(sushis.data);
		}
		app.test.fnTest();
	}
	
	function helperDoneForSushiJson(sushis){
		debugger;
		if (!ko.dataFor(document.getElementById("restaurantCircle"))){
			ko.applyBindings(sushis.data);
		}
		app.test.fnTest();
	}
	
	return {
		HelperGetUserCoordinates: helperGetUserCoordinates,
		HelperDoneForGetSushis: helperDoneForGetSushis,
		HelperDoneForGetSushisFromWebAPI: helperDoneForGetSushisFromWebAPI,
		HelperDoneForSushisBind: helperDoneForSushisBind,
		HelperDoneForSushiJson: helperDoneForSushiJson
	}
});