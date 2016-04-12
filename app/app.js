"use strict";

angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.dashboardCtrl',
        'ui.bootstrap.validation',
        'issueTracker.issuesCtrl',
        'issueTracker.projectsCtrl'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        // $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');
