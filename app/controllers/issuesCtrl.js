"use strict";

angular.module('issueTracker.issuesCtrl', ['ngRoute', 'issueTracker.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues', {
            templateUrl: 'app/templates/issues.html',
            controller: 'IssuesCtrl'
        });
    }])

    .controller('IssuesCtrl', [
        '$scope',
        '$location',
        'authentication',
        function IssuesCtrl($scope, $location, authentication) {

        }]);