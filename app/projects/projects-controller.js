"use strict";

angular
    .module('issueTracker.controllers.projects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/add', {
                controller: 'AddProjectCtrl'
            })
            .when('/projects/:id', {
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
        'usersService',
        function ProjectsCtrl($scope, $routeParams, projectsService, $location, issuesService, usersService) {
            $scope.getById = function () {
                projectsService.getById($routeParams.id)
                    .then(function (success) {
                        $scope.currentProject = success;
                        usersService.getCurrent().then(function (success) {
                            $scope.isLead = $scope.currentProject.Lead.Id == success.Id;
                        })
                    });
            };
            $scope.getById();

            $scope.goToEdit = function () {
                $location.path('/projects/' + $routeParams.id + '/edit');
            };

            $scope.goToAddIssue = function () {
                $location.path('/projects/' + $routeParams.id + '/add-issue')
            };

            $scope.goToOwnIssue = function (issueId) {
                $location.path('/issues/' + issueId);
            };

            $scope.goToDashboard = function () {
                $location.path('/');
            };

            issuesService.getAllFor($routeParams.id)
                .then(function (success) {
                    $scope.currentProjIssues = success;
                    $scope.currentProjCurrenUserIssues = success.filter(function (i) {
                        return i.Assignee.Id == sessionStorage['userId'];
                    })
                });

            $scope.showAll = false;
            $scope.toggleShowAll = function () {
                $scope.showAll = !$scope.showAll;
            };
        }
    ]);