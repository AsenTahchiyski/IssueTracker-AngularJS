"use strict";

angular
    .module('issueTracker.controllers.projects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            controller: 'ProjectsCtrl',
            templateUrl: 'app/projects/project-template.html'
        });
    }])
    .controller('ProjectsCtrl', [
        '$scope',
        '$routeParams',
        'projectsService',
        function ProjectsCtrl($scope, $routeParams, projectsService) {
            $scope.getById = function() {
                projectsService.getById($routeParams.id)
                    .then(function(success) {
                        $scope.currentProject = success;
                    });
            };
            $scope.getById();
        }
    ]);