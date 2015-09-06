'use strict';

angular.module('ccProcessing')
    .factory('ccService', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var cache = null

        return {
            setCcDetails: function(details) {

                cache = details;

            },
            getCcDetails: function(campaignId, callback) {
                
                return cache;
            }
        }
    });
