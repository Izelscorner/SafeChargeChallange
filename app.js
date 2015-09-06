'use strict';

angular.module('ccProcessing', [
        'ui.router'
    ])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('creditCardProcessing', {
                url: '/',
                templateUrl: 'creditCardProcessing/creditCardProcessing.html',
                controller: 'creditCardProcessingCtrl'
            }).state('summary', {
                url: '/summary',
                templateUrl: 'summary/summary.html',
                controller: 'sumarryCtrl'
            })


    });


