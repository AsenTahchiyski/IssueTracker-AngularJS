'use strict';

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
        '$sce',
        '$q',
        function AddIssueCtrl($scope, issuesService, $location, $routeParams, usersService, projectsService, labelsService, $sce, $q) {
            $scope.backToProject = function () {
                $location.path('/projects/' + $routeParams.id);
            };

            $scope.addIssue = function (issueToAdd) {
                if ($scope.dirty.value) {
                    var labels = $scope.dirty.value.split(',');
                }

                issuesService.add(issueToAdd.Title, issueToAdd.Description, issueToAdd.DueDate,
                    $routeParams.id, issueToAdd.AssigneeId.Id, issueToAdd.PriorityId, labels)
                    .then(function (success) {
                        $location.path('/projects/' + $routeParams.id);
                    }, function (error) {
                        console.error(error);
                    })
            };

            // get all users for the dropdown menu
            usersService.getAll().then(function (success) {
                $scope.allUsers = success;
            }, function (error) {
                console.error(error);
            });

            // get project name and priorities
            projectsService.getById($routeParams.id)
                .then(function (success) {
                    $scope.addIssueProjectName = success.Name;
                    $scope.addIssueProjectPriorities = success.Priorities;
                    if (sessionStorage['userId'] != success.Lead.Id) {
                        $location.path('/projects/' + $routeParams.id);
                    }

                }, function (error) {
                    console.error(error);
                });

            // mass auto-complete stuff
            $scope.dirty = {};

            var suggestLabelRemoteAndDelimited = function (term) {
                var ix = term.lastIndexOf(','),
                    lhs = term.substring(0, ix + 1),
                    rhs = term.substring(ix + 1),
                    deferred = $q.defer();

                deferred.resolve(labelsService.getFiltered(rhs)
                    .then(function (response) {
                        var labels = response;
                        var result = [];
                        labels.forEach(function (l) {
                            result.push({label: l.Name, value: lhs + l.Name});
                        });

                        return result;
                    }));

                return deferred.promise;
            };

            $scope.ac_option_delimited = {
                suggest: suggestLabelRemoteAndDelimited
            };
        }]);