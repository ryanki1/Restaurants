define(["er.app","../tests/respaurantTestCommon"],function(app,common){
	'use strict';
	
	//var onSpy;
	
	module("Respaurant story 'Find nearby restaurants'", {
		setup: function(){
			app.test = app.test || {};
			debugger;
			//onSpy = sinon.spy($(".mod.mod-respaurant"), "on");
		},
		teardown: function(){
			app.test = {};
		}
	});
	
	// asyncTest("as already discussed, should display a list of restaurants within 200m radius", function(){
		// debugger;
		// var callbackStack = [];
		// var testFairy = function(){
			// start();
				// ok(($("#restaurantCircle li").length > 0), "List of restaurants showing :-)");	
		// }
		// callbackStack.push(common.HelperDoneForGetSushis);
		// callbackStack.push(common.HelperDoneForSushisBind);
		// common.HelperGetUserCoordinates(
			// callbackStack,
			// testFairy);
	// });
	
	asyncTest("as already discussed, should show restaurants as terriffic restaurant modules on an iPhone", function(){
		debugger;
		var callbackStack = [];
		var testFairy = function(){
			start();
			ok((screen.width === 320), "Screen width is iPhone portrait :-)");
			debugger;
			ok(($(".mod.mod-respaurant").length > 0), "List of restaurants marked with mod.mod-restaurant css class:-)");
			//ok((onSpy.called === true),"On event of List of restaurants called");
			ok(($("#restaurantCircle").length > 0),	"On event of List of restaurants has been called");
		}
		callbackStack.push(common.HelperDoneForGetSushis);
		callbackStack.push(common.HelperDoneForSushisBind);
		common.HelperGetUserCoordinates(
			callbackStack,
			testFairy);
	});

	
	
	// asyncTest("as already discussed, should retrieve a list of restaurants with geo data from url 'api/restaurants'", function(){
		// var sushiJson = app.test;
		// var callbackStack = [];
		// window.jsonpRestaurants = function(sushiJson){
			// alert("jsonp callbackhandler being called :-)");
			// debugger;
			// start();
			// ok(
				// (sushiJson != undefined), 
				// "Sushi json object has been returned from Web API"
				// );
			// ok(
				// (sushiJson[0].lat != undefined) && (sushiJson[0].lon != undefined), 
				// "Sushi json object received containing store coordinates"
				// );	
		// }
		// var testFairy = function(sushiJson){
			// start();
			// ok(
				// (sushiJson != undefined), 
				// "Sushi json object has been returned from Web API"
				// );
			// ok(
				// (sushiJson[0].lat != undefined) && (sushiJson[0].lon != undefined), 
				// "Sushi json object received containing store coordinates"
				// );	
		// }
		// callbackStack.push(common.HelperDoneForGetSushisFromWebAPI);
		// //callbackStack.push(common.HelperDoneForSushiJson);
		// common.HelperGetUserCoordinates(
			// callbackStack,
			// testFairy);
	// });
});

