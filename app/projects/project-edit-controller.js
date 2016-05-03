"use strict";

angular
    .module('issueTracker.controllers.projectsEdit', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            controller: 'ProjectsEditCtrl',
            templateUrl: 'app/projects/project-edit-template.html'
        });
    }])
    .controller('ProjectsEditCtrl', [
        '$scope',
        '$routeParams',
        'projectsService',
        '$location',
        'notifier',
        function ProjectsEditCtrl($scope, $routeParams, projectsService, $location, notifier) {
            projectsService.getById($routeParams.id)
                .then(function (success) {
                    $scope.editedProject = success;
                    $scope.editedProject.LeadId = $scope.editedProject.Lead.Id;

                    if (sessionStorage['userId'] != success.Lead.Id) {
                        $location.path('/projects/' + $routeParams.id);
                    }
                });

            $scope.edit = function () {
                var labelNames = [];
                $scope.editedProject.Labels.forEach(function (l) {
                    labelNames.push(l.Name);
                });

                var priorityNames = [];
                $scope.editedProject.Priorities.forEach(function (p) {
                    priorityNames.push(p.Name);
                });

                projectsService.edit($routeParams.id, $scope.editedProject.Name, $scope.editedProject.Description,
                    $scope.editedProject.LeadId, labelNames, priorityNames)
                    .then(function (success) {
                        notifier.success('Project edited.');
                        $location.path('/projects/' + $routeParams.id);
                    }, function (error) {
                        notifier.error(error.statusText);
                    });
            };
        }
    ])
;