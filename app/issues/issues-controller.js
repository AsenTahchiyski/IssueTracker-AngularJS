'use strict';

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
        'projectsService',
        'notifier',
        function IssuesCtrl($scope, $routeParams, issuesService, $location, $route, projectsService, notifier) {
            $scope.getById = function () {
                issuesService.getById($routeParams.id)
                    .then(function (success) {
                        $scope.currentIssue = success;
                        $scope.isAssignee = success.Assignee.Id == sessionStorage['userId'] && !!sessionStorage['userId'];
                        projectsService.getById(success.Project.Id)
                            .then(function (proj) {
                                $scope.isLead = proj.Lead.Id == sessionStorage['userId'];
                            })
                    });
            };
            $scope.getById();

            $scope.editIssue = function () {
                $location.path('issues/' + $routeParams.id + '/edit');
            };

            function getComments() {
                issuesService.getComments($routeParams.id)
                    .then(function (success) {
                        $scope.issueComments = success;
                    });
            }

            getComments();

            $scope.addComment = function () {
                issuesService.addComment($routeParams.id, $scope.addCommentDescription)
                    .then(function () {
                        getComments();
                        $('.modal-backdrop').remove();
                        notifier.success('Comment added.');
                        $route.reload();
                    }, function (error) {
                        notifier.error(error.statusText);
                    })
            };

            $scope.changeStatus = function () {
                var newStatus = $scope.newStatus;
                issuesService.changeStatus($routeParams.id, newStatus)
                    .then(function () {
                        $('.modal-backdrop').remove();
                        notifier.success('Status changed.');
                        $route.reload();
                    }, function (error) {
                        notifier.error(error.statusText);
                    })
            };

            $scope.backToProject = function () {
                $location.path('/projects/' + $scope.currentIssue.Project.Id);
            };
        }
    ]);