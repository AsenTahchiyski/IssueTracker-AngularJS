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
                    $scope.editedProject.LeadId = $scope.editedProject.Lead.Id;

                    if (sessionStorage['userId'] != success.Lead.Id) {
                        $location.path('/projects/' + $routeParams.id);
                    }
                });

            usersService.getAll().then(function (success) {
                $scope.allUsers = success;
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
                    $scope.editedProject.LeadId.Id, labelNames, priorityNames)
                    .then(function (success) {
                        notifier.success('Project edited.');
                        $location.path('/projects/' + $routeParams.id);
                    }, function (error) {
                        notifier.error(error.statusText);
                    });
            };
            
            $scope.goToProject = function() {
                $location.path('/projects/' + $routeParams.id);
            }
        }
    ])
;