"use strict";

angular
    .module('issueTracker.controllers.addIssue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            controller: 'AddIssueCtrl',
            templateUrl: 'app/issues/add-issue-template.html'
        })
    }])
    .controller('AddIssueCtrl', [
        '$scope',
        'issuesService',
        '$location',
        '$routeParams',
        'usersService',
        'projectsService',
        'labelsService',
        function AddIssueCtrl($scope, issuesService, $location, $routeParams, usersService, projectsService, labelsService) {
            $scope.addIssue = function (issueToAdd) {
                issuesService.add(issueToAdd.Title, issueToAdd.Description, issueToAdd.DueDate,
                    issueToAdd.ProjectId, issueToAdd.AssigneeId, issueToAdd.PriorityId, issueToAdd.Labels)
                    .then(function (success) {
                        console.log(success);
                        $location.path('/projects/' + $routeParams.id);
                    }, function (error) {
                        console.error(error);
                    })
            };

            // get all users for the dropdown menu
            usersService.getAll().then(function (success) {
                success.sort(function (a, b) {
                    return a.Username.localeCompare(b.Username);
                });
                $scope.allUsers = success;
            }, function (error) {
                console.error(error);
            });

            // get project name and priorities
            projectsService.getById($routeParams.id)
                .then(function (success) {
                    $scope.addIssueProjectName = success.Name;
                    $scope.addIssueProjectPriorities = success.Priorities;
                }, function (error) {
                    console.error(error);
                });

            // get all labels
            // labelsService.getFiltered()
            //     .then(function(success) {
            //         $scope.allLabels = success;
            //         console.log(success);
            //     })
        }]);
