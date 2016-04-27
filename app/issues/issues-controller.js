"use strict";

angular
    .module('issueTracker.controllers.issues', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            controller: 'IssuesCtrl',
            templateUrl: 'app/issues/issue-template.html'
        });
    }])
    .controller('IssuesCtrl', [
        '$scope',
        '$routeParams',
        'issuesService',
        function IssuesCtrl($scope, $routeParams, issuesService) {
            $scope.getById = function() {
                issuesService.getById($routeParams.id)
                    .then(function(success) {
                        $scope.currentIssue = success;
                    });
            };
            $scope.getById();
        }
    ]);