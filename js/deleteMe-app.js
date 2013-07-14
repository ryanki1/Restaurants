app = {
    reset: function () {
        app.permissionToLocateUserAskedFor = !app.userHasLocation();
        app.user = {};
        app.selectedSalesman = {
            name: undefined,
            description: undefined,
            address: undefined,
            coords: {
                latitude: undefined,
                longitude: undefined
            }
        };
    },
    geoCallbackSuccess: function (position) {
        return app.geoAllowLocateUser(position);
    },
    geoCallbackError: function () {
        //debugger;
        log("Error - User location not locked on.");
    },
    showNearestFirst: function(geoTestCBSuccess, geoTestCBError){
        //debugger;
        if (localStorage.lat)
        {
            $.ajax({
                url: "/SalesmanModels/SequenceSalesman",
                type: "get",
                accepts: "application/html",
                data: { "lat": localStorage.lat, "lng": localStorage.lng },
                success: geoTestCBSuccess,
                error: geoTestCBError
            });
        }
    },
    showNearestFirstJSON: function (geoTestCBSuccess, geoTestCBError) {
        if (localStorage.lat) {
            $.ajax({
                url: "/SalesmanModels/SequencesalesmanJSON?lat=" + localStorage.lat + "&lng=" + localStorage.lng,
                dataType: "json",
                success: geoTestCBSuccess,
                error: geoTestCBError
            });
        }
    },
    geoRankingCallbackSuccess: function (position) {
        //debugger;
        geoAllowLocateUser(position);
    },
    geoRankingCallbackError: function () {
        //debugger;
        log("Error - User location not locked on.");
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
    geoOptions: {
        enableHighAccuracy: false,
        timeout: 120000,
        maximumAge: 1
    },
    geolocationReturnCodes: {
        SUCCESS: "0",
        NOLOCKON: "1",
        ROUTEDRAWN: "2",
        ROUTEPLACENOUTFOUND: "3",
        ROUTEZERORESULTS: "4",
        ROUTEUNKNOWNERRROR: "5",
        MAPDRAWN: "6"
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
						    		[{
						    			"id":ko.observable("00000001"),
						    			"name":ko.observable("Storchen La Cicogna"),
						    			"address1":ko.observable("Schwabentorplatz 7"),
						    			"address2":ko.observable("79098 Freiburg"),
						    			"address3":ko.observable("Deutschland")
						    		},
						    		{
						    			"id":ko.observable("00000002"),
						    			"name":ko.observable("Pizzeria Ristorante Milano"),
						    			"address1":ko.observable("Schusterstr. 7"),
						    			"address2":ko.observable("79098 Freiburg"),
						    			"address3":ko.observable("Deutschland")
						    		},
						    		{
						    			"id":ko.observable("00000003"),
						    			"name":ko.observable("Tizio Cafe Trattoria"),
						    			"address1":ko.observable("Rotteckring 14"),
						    			"address2":ko.observable("79098 Freiburg"),
						    			"address3":ko.observable("Deutschland")
						    		},
						    		{
						    			"id":ko.observable("00000004"),
						    			"name":ko.observable("Osteria"),
						    			"address1":ko.observable("Grünwälderstr.2"),
						    			"address2":ko.observable("79098 Freiburg"),
						    			"address3":ko.observable("Deutschland")
						    		},
						    		{
						    			"id":ko.observable("00000005"),
						    			"name":ko.observable("Enoteca"),
						    			"address1":ko.observable("Gerberau 21"),
						    			"address2":ko.observable("79098 Freiburg"),
						    			"address3":ko.observable("Deutschland")
						    		}]
						    	}
					    		
					    	}
				defer.resolve(sushis);
    		},
    		1000
    	);
    	
    	return defer.promise();
    },
    geoAllowLocateUser: function (position) {
	    //debugger;
	    log("User location locked-on.");
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
    userHasLocation: function(){
        var ret = false;
        if (localStorage.travellingSalesman) {
            ret = true;
        }
        return ret;
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
    },
    geoLocationFind: function (geoTestCBSuccess, geoTestCBError) {
        if (navigator.geolocation) {
            //debugger;
            //if (!(localStorage.lng || localStorage.lat))
            if (geoTestCBSuccess) {
                navigator.geolocation.getCurrentPosition(geoTestCBSuccess, geoTestCBError, app.geoOptions);
            }
            else {
                if (app.permissionToLocateUserAskedFor) {
                    navigator.geolocation.getCurrentPosition(app.geoCallbackSuccess, app.geoCallbackError, app.geoOptions);
                }
                else {
                    app.geoCallbackSuccess();
                }
            }
        }
    },
    setSalesman: function (params) {
        app.selectedSalesman.name = params.name;
        app.selectedSalesman.description = params.description;
        app.selectedSalesman.address = params.address;
        app.selectedSalesman.coords = params.coords;
    },
    setSalesmanOnRoute: function (salesman) {
        window.tut.maps.originalStation = [salesman.coords.latitude, salesman.coords.longitude];
    },
    makeToySalesman: function() {
        params = {
            name: "Tony de Wunderbar",
            description: "Clean shaven",
            address: "10 Fairbanks Avenue",
            coords: { latitude: "51.525407", longitude: "7.464409" },
        }
        app.setSalesman(params);
    },
    googleMapsReady: function () {
        //debugger;
        var userLat = app.user.coords ? app.user.coords.latitude : null;
        var userLong = app.user.coords ? app.user.coords.longitude : null;
        //var ret = tut.maps.ready([userLat, userLong]);
        tut.maps.origin = new google.maps.LatLng(app.selectedSalesman.coords.latitude, app.selectedSalesman.coords.longitude);
        return tut.maps.drawRoute([userLat, userLong]);
    },
    // Salesmanlist puttControl
    getPageFlickCount: function (leaveImpression) {
        debugger;
        var numPages = 0;
        var leadingTop = -1;
        $.each($(".unit"), function (index,ele) {
            debugger;
            var coordinates = $(ele).offset();
            if (coordinates.top > leadingTop) {
                numPages = numPages + 1;
                leadingTop = coordinates.top;
            }
            if (leaveImpression) {
                $(ele).addClass("row" + (numPages-1));
            }
        });
        return numPages;
    },
    scorePuttMatRows: function () {
        //debugger;
        var leaveImpression = true;
        app.getPageFlickCount(leaveImpression);
    },
    primePuttMat: function() {
        // For every page (row) create a hole for putting
        //debugger;
        var numPages = app.getPageFlickCount();
        var modelStr = "{\"List\":[";
        for (var i = 0; i < numPages; i++) {
            modelStr = modelStr + "{\"dummy\": \"0\"},";
        }
        modelStr = modelStr.substring(0, modelStr.length-1) + "]}" ; // Remove trailing comma and finish up
        app.unwravelMat($.parseJSON(modelStr));
        // Wireup clickability of holes
        $.each($("#puttMat a"), function(index, ele) {
            //debugger;
            $(ele).click(function(evt) {
                //debugger;
                app.teeOff(index);
            });
        });
        return numPages;
    },
    unwravelMat: function (model) {
        //debugger;
      $('#puttMatList').html($('#pagePuttTemplate').render(model));
    },
    resetPuttMat: function () {
        $(".ballInTheHole").removeClass("ballInTheHole");
    },
    getPuttMatBallIndex: function () {
        var ballIndex = -1;
        $.each($("#puttMat a"), function (index, ele) {
            debugger;
            if ($(ele).hasClass("ballInTheHole")) {
                debugger;
                ballIndex = index;
                return false;
            }
        });
        return ballIndex;
    },
    getPuttMatHoles: function () {
        return $("#puttMat a").length;
    },
    teeOff: function (index) {
        //debugger;
        app.resetPuttMat();
        if (index >= 0) {
            $("#puttMat a:eq(" + index + ")").addClass("ballInTheHole");
            app.cuePuttMatRow(index);
        }
        else {
            $("#puttMat a:first").addClass("ballInTheHole");
            app.cuePuttMatRow(0);
        }
    },
    resetPuttMatRows: function () {
        $(".activePage").removeClass("activePage").addClass("inactivePage");
    },
    cuePuttMatRow: function (hole) {
        app.resetPuttMatRows();
        $.each($("div .unit"), function (index, ele) {
            //debugger;
            if ($(ele).hasClass("row" + hole)) {
                $(ele).removeClass("unaffectLayout").addClass("affectLayout");
                $(ele).removeClass("inactivePage").addClass("activePage");
            }
            else {
                // Inactive rows should disappear so that active row positioned at the top 
                $(ele).removeClass("affectLayout").addClass("unaffectLayout");
                $(ele).removeClass("activePage").addClass("inactivePage");
            }
        });        
    }
}

// For Utility file

window.log = function (a) {
    console.log ? console.log(a) : alert(a)
};