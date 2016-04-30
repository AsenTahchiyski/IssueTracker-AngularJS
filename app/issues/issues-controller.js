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
        '$location',
        function IssuesCtrl($scope, $routeParams, issuesService, $location) {
            $scope.getById = function() {
                issuesService.getById($routeParams.id)
                    .then(function(success) {
                        $scope.currentIssue = success;
                    });
            };
            $scope.getById();

            $scope.editIssue = function() {
                $location.path('/issues/' + $routeParams.id + '/edit');
            };
            
            issuesService.getComments($routeParams.id)
                .then(function(success) {
                    $scope.issueComments = success;
                })
        }
    ]);