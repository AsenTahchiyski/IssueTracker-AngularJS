'use strict';

angular
    .module('issueTracker.controllers.addProject', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            controller: 'AddProjectCtrl',
            templateUrl: 'app/projects/add-project-template.html'
        });
    }])
    .controller('AddProjectCtrl', [
        '$scope',
        'projectsService',
        '$location',
        '$sce',
        '$q',
        'labelsService',
        'usersService',
        'notifier',
        function AddProjectCtrl($scope, projectsService, $location, $sce, $q, labelsService, usersService, notifier) {
            if (!sessionStorage['authToken']) {
                $location.path('/login');
            }

            // TODO: check for admin

            $scope.addProject = function (project) {
                // get priorities in proper format
                var prioriTemp = project.Priorities.split(','),
                    priorities = [];
                prioriTemp.forEach(function (p) {
                    priorities.push(p.trim())
                });

                if ($scope.dirty.value) {
                    var labels = $scope.dirty.value.split(',');
                }

                projectsService.add(project.Name, project.Description, project.LeadId.Id, labels, priorities)
                    .then(function (success) {
                        notifier.success(success.statusText);
                        $location.path('/');
                    }, function (error) {
                        notifier.error(error.statusText);
                    })
            };

            usersService.getAll()
                .then(function (success) {
                    $scope.allUsers = success;
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
        }
    ]);