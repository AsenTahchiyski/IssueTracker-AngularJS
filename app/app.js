'use strict';

angular
    .module('issueTracker', [
        'ngRoute',
        'ui.bootstrap.validation',
        'issueTracker.services.users',
        'issueTracker.controllers.loginRegister',
        'issueTracker.controllers.dashboard',
        'issueTracker.navbarDirective',
        'issueTracker.controllers.logout',
        'issueTracker.services.projects',
        'issueTracker.controllers.projects',
        'issueTracker.services.headerBuilder',
        'issueTracker.services.issues',
        'issueTracker.services.labels',
        'issueTracker.filters.date',
        'issueTracker.filters.array',
        'ui.bootstrap',
        'issueTracker.controllers.issues',
        'issueTracker.controllers.projectsEdit',
        'issueTracker.controllers.addIssue',
        'MassAutoComplete',
        'ngSanitize',
        'issueTracker.controllers.editIssue'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('ISSUES_PER_PAGE', 10);

