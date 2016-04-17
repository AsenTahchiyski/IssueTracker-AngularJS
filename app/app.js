'use strict';

angular
    .module('issueTracker', [
        'ngRoute',
        'ui.bootstrap.validation',
        'issueTracker.services.userAuth',
        'issueTracker.controllers.loginRegister',
        'issueTracker.controllers.dashboard',
        'issueTracker.navbarDirective',
        'issueTracker.controllers.logout'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .value('currentUser', {
        username: undefined,
        authToken: undefined,
        isAdmin: false,
        isLogged: false
    });

