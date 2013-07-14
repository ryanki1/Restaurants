define(
	["er.app","../tests/respaurantTestCommon"], 
	function(app,common){

	'use strict';
	module("Respaurant story 'Find restaurant rating'", {
		setup: function(){
			app.test = app.test || {};
		},
		teardown: function(){
			app.test = {};
		}
	});
	
	asyncTest("as already discussed, should show the rating for each restaurant", function(){
		debugger;
		var callbackStack = [];
		callbackStack.push(common.HelperDoneForGetSushis);
		callbackStack.push(common.HelperDoneForSushisBind);
		common.HelperGetUserCoordinates(
			callbackStack,
			function(){
				start();
				ok(($("input.stars:first").val() >= 0 && $("input.stars:first").val() <= 5), "First restaurant showing has a rating :-)");	
			});
	});

	// test(", as already discussed, should show restaurants with the best reviews first", function(){
// 		
	// });
// 	
	// test(", as already discussed, should show show how far away the restaurants are", function(){
// 		
	// });
// 	
	// test(", as already discussed, should allow restaurants to be added to the shopping cart", function(){
// 		
	// });
// 	
	// test(", as already discussed, should display those restaurants added to the shopping cart", function(){
// 		
	// });
});