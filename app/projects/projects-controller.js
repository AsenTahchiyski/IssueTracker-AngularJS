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
        '$location',
        'issuesService',
        function ProjectsCtrl($scope, $routeParams, projectsService, $location, issuesService) {
            $scope.getById = function() {
                projectsService.getById($routeParams.id)
                    .then(function(success) {
                        $scope.currentProject = success;
                    });
            };
            $scope.getById();

            $scope.goToEdit = function() {
                $location.path('/projects/' + $routeParams.id + '/edit');
            };
            
            $scope.goToAddIssue = function() {
                $location.path('/projects/' + $routeParams.id + '/add-issue')
            };
            
            $scope.goToOwnIssue = function(issueId) {
                $location.path('/issues/' + issueId);
            };

            issuesService.getAllFor($routeParams.id)
                .then(function(success) {
                    $scope.currentProjIssues = success;
                })
        }
    ]);