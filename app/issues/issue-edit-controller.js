"use strict";

angular
    .module('issueTracker.controllers.editIssue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            controller: 'EditIssueCtrl',
            templateUrl: 'app/issues/issue-edit-template.html'
        })
    }])
    .controller('EditIssueCtrl', [
        '$scope',
        'usersService',
        'issuesService',
        '$routeParams',
        '$location',
        'projectsService',
        'notifier',
        function EditIssueCtrl($scope, usersService, issuesService, $routeParams, $location, projectsService, notifier) {
            // get all users for the dropdown menu
            usersService.getAll().then(function (success) {
                $scope.allUsers = success;
            }, function (error) {
                console.error(error);
            });

            // get issue details
            issuesService.getById($routeParams.id)
                .then(function (success) {
                    projectsService.getById(success.Project.Id)
                        .then(function (proj) {
                            if (sessionStorage['userId'] != proj.Lead.Id) {
                                $location.path('/issues/' + $routeParams.id);
                            }
                        });

                    $scope.editedIssue = success;
                    var allAvailableStatuses = [];
                    allAvailableStatuses.push(success.Status);
                    if (success.AvailableStatuses) {
                        success.AvailableStatuses.forEach(function (s) {
                            allAvailableStatuses.push(s);
                        });
                    }
                    $scope.availableStatuses = allAvailableStatuses;
                    $scope.currentStatus = success.Status;
                    $scope.priorities = success.Priority;
                });

            $scope.edit = function (editedIssue) {
                var labels = editedIssue.Labels.map(function (l) {
                    return l.Name;
                });
                issuesService.update(
                    editedIssue.Id,
                    editedIssue.Title,
                    editedIssue.Description,
                    editedIssue.DueDate,
                    editedIssue.Assignee.Id,
                    editedIssue.Priority.Id,
                    labels)
                    .then(function (success) {
                        notifier.success('Issue edited.');
                        $location.path('/issues/' + $routeParams.id);
                    }, function (error) {
                        notifier.error(error.statusText);
                    })
            };

            $scope.goBack = function() {
                $location.path('issues/' + $routeParams.id);
            }
        }
    ]);