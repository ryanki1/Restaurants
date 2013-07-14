(function ($) {

    "use strict";

    /**
     * Respaurant module implementation.
     *
     * @author Terrific Composer
     * @namespace Tc.Module
     * @class Respaurant
     * @extends Tc.Module
     */
    Tc.Module.Respaurant = Tc.Module.extend({

        /**
         * Initializes the Hero module.
         *
         * @method init
         * @return {void}
         * @constructor
         * @param {jQuery} $ctx the jquery context
         * @param {Sandbox} sandbox the sandbox to get the resources from
         * @param {Number} id the unique module id
         */
        init:function ($ctx, sandbox, id) {
            // call base constructor
            this._super($ctx, sandbox, id);
        },

        /**
         * Hook function to do all of your module stuff.
         *
         * @method on
         * @param {Function} callback function
         * @return void
         */
        on:function (callback) {
            var $ctx = this.$ctx,
                self = this;
			
			$($ctx).closest(".mod.mod-respaurant").attr("id","restaurantCircle");
			debugger;
            callback();
        },

        /**
         * Hook function to trigger your events.
         *
         * @method after
         * @return void
         */
        after:function () {
            var $ctx = this.$ctx;
        },


        /**
         * Handles the incoming messages from the other superheroes
         */
        onMessage:function (data) {
            var $ctx = this.$ctx;

            data = data || {};

        }

    });
})(Tc.$);
