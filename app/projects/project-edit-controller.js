'use strict';

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
        'usersService',
        function ProjectsEditCtrl($scope, $routeParams, projectsService, $location, notifier, usersService) {
            projectsService.getById($routeParams.id)
                .then(function (success) {
                    $scope.editedProject = success;
                    $scope.editedProject.LeadId = $scope.editedProject.Lead;
                    var priorityNames = $scope.editedProject.Priorities
                        .map(function (p) {
                            return p.Name;
                        });
                    $scope.editedProject.EditPriorities = priorityNames.join(',');
                    var labelNames = $scope.editedProject.Labels
                        .map(function (p) {
                            return p.Name;
                        });
                    $scope.editedProject.EditLabels = labelNames.join(',');

                    if (sessionStorage['userId'] != success.Lead.Id) {
                        $location.path('/projects/' + $routeParams.id);
                    }
                });
            usersService.getAll().then(function (success) {
                $scope.allUsers = success;
            });

            $scope.edit = function (project) {
                var labelNames = [];
                project.EditLabels.split(',')
                    .forEach(function (l) {
                        labelNames.push(l.trim());
                    });

                var priorityNames = [];
                project.EditPriorities.split(',')
                    .forEach(function (p) {
                        priorityNames.push(p.trim());
                    });

                projectsService.edit($routeParams.id, project.Name, project.Description,
                    project.LeadId.Id, labelNames, priorityNames)
                    .then(function (success) {
                        notifier.success('Project edited.');
                        $location.path('/projects/' + $routeParams.id);
                    }, function (error) {
                        notifier.error(error.statusText);
                    });
            };

            $scope.goToProject = function () {
                $location.path('/projects/' + $routeParams.id);
            }
        }
    ])
;