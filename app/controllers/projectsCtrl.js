"use strict";

angular.module('issueTracker.projectsCtrl', ['ngRoute', 'issueTracker.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/templates/projects.html',
            controller: 'ProjectsCtrl'
        });
    }])

    .controller('ProjectsCtrl', [
        '$scope',
        '$location',
        'authentication',
        function ProjectsCtrl($scope, $location, authentication) {
            
        }]);