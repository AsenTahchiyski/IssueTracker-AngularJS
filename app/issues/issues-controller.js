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
        '$route',
        function IssuesCtrl($scope, $routeParams, issuesService, $location, $route) {
            $scope.getById = function() {
                issuesService.getById($routeParams.id)
                    .then(function(success) {
                        $scope.currentIssue = success;
                    });
            };
            $scope.getById();

            $scope.editIssue = function() {
                $location.path('issues/' + $routeParams.id + '/edit');
            };
            
            function getComments() {
                issuesService.getComments($routeParams.id)
                    .then(function(success) {
                        $scope.issueComments = success;
                    });
            }
            getComments();

            $scope.addComment = function() {
                issuesService.addComment($routeParams.id, $scope.addCommentDescription)
                    .then(function() {
                        getComments();
                        $('.modal-backdrop').remove();
                        $route.reload();
                    })
            };

            $scope.changeStatus = function() {
                var newStatus = $scope.newStatus;
                issuesService.changeStatus($routeParams.id, newStatus)
                    .then(function() {
                        $('.modal-backdrop').remove();
                        $route.reload();
                    })
            };

            $scope.backToProject = function() {
                $location.path('/projects/' + $scope.currentIssue.Project.Id);
            }
        }
    ]);