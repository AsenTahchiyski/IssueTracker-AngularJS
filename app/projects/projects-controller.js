"use strict";

angular
    .module('issueTracker.controllers.projects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            controller: 'ProjectsCtrl',
            template: '<button ng-click="getById()">Load</button>'
        });
    }])
    .controller('ProjectsCtrl', [
        '$scope',
        '$routeParams',
        'projectsService',
        function ProjectsCtrl($scope, $routeParams, projectsService) {
            $scope.getById = function() {
                return projectsService.getById($routeParams.id);
            };
        }
    ]);