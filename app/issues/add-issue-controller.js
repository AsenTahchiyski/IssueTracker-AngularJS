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
        '$sce',
        '$q',
        function AddIssueCtrl($scope, issuesService, $location, $routeParams, usersService, projectsService, labelsService, $sce, $q) {
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
            labelsService.getFiltered()
                .then(function (success) {
                    $scope.allLabels = success;
                });

            // mass auto-complete stuff
            $scope.dirty = {};

            // function suggest_label(term) {
            //     var q = term.toLowerCase().trim();
            //     var results = [];
            //
            //     var labels = $scope.allLabels;
            //     for (var i = 0; i < labels.length && results.length < 10; i++) {
            //         var label = labels[i];
            //         if (label.Name.toLowerCase().indexOf(q) === 0)
            //             results.push({label: label.Name, value: lhs + label.Name});
            //     }
            //
            //     return results;
            // }
            //
            // $scope.autocomplete_options = {
            //     suggest: suggest_label
            // };
            //
            // function suggest_label_delimited(term) {
            //     var index = term.lastIndexOf(','),
            //         lhs = term.substring(0, index + 1),
            //         rhs = term.substring(index + 1),
            //         suggestions = suggest_label(rhs);
            //
            //     suggestions.forEach(function (s) {
            //         s.label = lhs + s.label;
            //     });
            //
            //     return suggestions;
            // }

            var suggestLabelRemoteAndDelimited = function (term) {
                var ix = term.lastIndexOf(','),
                    lhs = term.substring(0, ix + 1),
                    rhs = term.substring(ix + 1),
                    deferred = $q.defer();

                deferred.resolve(labelsService.getFiltered(rhs)
                    .then(function (response) {
                        var labels = response;
                        console.log(labels);
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
