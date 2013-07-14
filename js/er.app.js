define(['vendor/knockout-2.2.1','vendor/kgr.travSales','services/logger'],function(ko,tsa,logger){
	
	var app = {
	    geoCallbackSuccess: function (position) {
	        return app.geoAllowLocateUser(position);
	    },
	    setUserFromLocalStorage: function(){
	        // Update user
	        var user = undefined;
	        if (localStorage.travellingSalesman) {
	            travSalesman = JSON.parse(localStorage.travellingSalesman);
	            app.user = $.extend(true, travSalesman.user, app.user);
	            user = app.user;
	        }
	        return user;
	    },
	    getUserCoordinates: function (params, geoTestCBSuccess, geoTestCBError) {
	    	var self = this;
	    	var defer = $.Deferred();
	        if (!params.errorFlag) {
	            ret = app.geoLocationFind(geoTestCBSuccess, geoTestCBError);
	        }
	        else {
	            if (!params.important) { // get mock position only if attention to errorFlag not marked as important
	            	debugger;
	            	setTimeout(
	            		function(){
	            			debugger;
	            			var user = app.navigator.geolocation.getCurrentPosition();
	            			defer.resolve(user);
	            		},
	            		1000);
	            }
	        }
	        return defer.promise();
	    },
	    getSushis: function(user, radarius, errRoot){
	    	var defer = $.Deferred();
	    	setTimeout(
	    		function(){
	    			var sushis = {
	    							data: {	
	    								sushi:
							    		ko.observableArray([{
							    			"id":ko.observable("00000001"),
							    			"name":ko.observable("Le Rendez-vous"),
							    			"address1":ko.observable("Seestrasse 3"),
							    			"address2":ko.observable("8002 Zürich"),
							    			"address3":ko.observable("Schweiz"),
							    			"rating":ko.observable("2"),
							    			"lat":"47.365789",
							    			"lon":"8.53206",
							    			"distance":ko.observable("200")
							    		},
							    		{
							    			"id":ko.observable("00000002"),
							    			"name":ko.observable("Restaurant Udo"),
							    			"address1":ko.observable("Weststrasse 94"),
							    			"address2":ko.observable("8003 Zürich"),
							    			"address3":ko.observable("Schweiz"),
							    			"rating":ko.observable("3"),
							    			"lat": "47.372068",
							    			"lon": "8.521117",
							    			"distance":ko.observable("250")
							    		},
							    		{
							    			"id":ko.observable("00000003"),
							    			"name":ko.observable("Restaurant Krill"),
							    			"address1":ko.observable("Oberdorfstrasse 2"),
							    			"address2":ko.observable("8001 Zürich"),
							    			"address3":ko.observable("Schweiz"),
							    			"rating":ko.observable("1"),
							    			"lat": "47.368696",
							    			"lon": "8.545986",
							    			"distance":ko.observable("300")
							    		},
							    		{
							    			"id":ko.observable("00000004"),
							    			"name":ko.observable("Restaurant Apollo"),
							    			"address1":ko.observable("Stauffacherstrasse 41/41"),
							    			"address2":ko.observable("8004 Zürich"),
							    			"address3":ko.observable("Schweiz"),
							    			"rating":ko.observable("5"),
							    			"lat": "47.374611",
							    			"lon": "8.527983",
							    			"distance":ko.observable("350")
							    		},
							    		{
							    			"id":ko.observable("00000005"),
							    			"name":ko.observable("Caffe Caredda Napoli"),
							    			"address1":ko.observable("Münstergasse 30"),
							    			"address2":ko.observable("8001 Zürich"),
							    			"address3":ko.observable("Schweiz"),
							    			"rating":ko.observable("0"),
							    			"lat": "47.372082",
							    			"lon": "8.543948",
							    			"distance":ko.observable("400")
							    		}])
							    	}
						    		
						    	}
					defer.resolve(sushis);
	    		},
	    		1000
	    	);
	    	
	    	return defer.promise();
	    },
	    getSushisFromWebAPI: function(user, radarius, url, errRoot){
	   		//var defer = $.Deferred();
	   		$.ajax({
	   			url: url,
	   			type: 'GET',
	   			dataType: 'jsonp',
	   			jsonp: false,
	   			jsonpCallback: 'jsonpRestaurants',
	   			success: function(data,y,z){
	   				app.jsonpRestaurants(data);
	   			},
	   			error: function(x,y,z){
	   				debugger;
	   				alert('error caught :-)');
	   			} 
	   		});
	   		window.jsonpRestaurants = function(data){
		    	debugger;
		   		alert('jsonp callback returns :-)');
		    }
	   		debugger;
	   		//$.when($.ajax(options).then(function(sushiData){
	   		//	debugger;
	   		//	var sushiJson = JSON.deserialize(sushiData);
	   		//	defer.resolve(sushiJson);
	   		//}));
	   		//return defer.promise();
	    },
	    geoAllowLocateUser: function (position) {
		    //debugger;
		    logger.log("User location locked-on.");
		    if (position) {
		        localStorage.lng = position.coords.longitude;
		        localStorage.lat = position.coords.latitude;
		        position.timestamp = new Date().getTime();
		        localStorage.timestamp = position.timestamp;
		        // Replacement for above 07.02.2013
		        localStorage.travellingSalesman = "{\"user\": " + JSON.stringify(position) + "}";
		    }
		    return app.setUserFromLocalStorage();
		},
	    navigator: {
	        geolocation: {
	            getCurrentPosition: function () {
	                var position = {
	                    coords: {
	                        latitude: "47.994459",
	                        longitude: "7.853844"
	                    }
	                };
	                return app.geoCallbackSuccess(position);
	            }
	        }
	    }
	}
	debugger;
	var appInheritedFromTSA = $.extend(tsa, app);
	
	return {
		GetUserCoordinates: appInheritedFromTSA.getUserCoordinates,
		GetSushis: appInheritedFromTSA.getSushis,
		GetSushisFromWebAPI: appInheritedFromTSA.getSushisFromWebAPI
	}
});