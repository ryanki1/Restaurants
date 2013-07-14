require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app','durandal/system','services/logger'],
    function (app, system, logger) {

    // Enable debug message to show in the console 
    system.debug(true);
	debugger;
    app.start().then(function () {
        debugger;
        //Show the app by setting the root view model for our application.
        app.setRoot('../../tests/respaurantTestManager.js', 'testBegin');
    });
});