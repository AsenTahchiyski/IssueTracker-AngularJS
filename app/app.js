"use strict";

angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.dashboardCtrl',
        'issueTracker.registerCtrl',
        'issueTracker.loginCtrl',
        'ui.bootstrap.validation'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');
