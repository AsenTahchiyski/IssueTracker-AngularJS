"use strict";

angular
    .module('issueTracker.controllers.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'usersService',
        'issuesService',
        function ($scope, $location, projectsService, usersService, issuesService) {
            if (!sessionStorage['authToken']) {
                $location.path('/login');
            }

            $scope.getProject = function (id) {
                projectsService.getById(id);
            };

            $scope.getAll = function () {
                projectsService.getAll();
            };

            $scope.getByFilter = function (filter, value, pageSize, pageNumber) {
                projectsService.getByFilter(filter, value, pageSize, pageNumber);
            };

            $scope.getUsers = function () {
                usersService.getAll();
            };

            $scope.getCurrent = function () {
                usersService.getCurrent();
            };

            $scope.changePass = function (oldPass, newPass, confirmNewPass) {
                usersService.changePassword(oldPass, newPass, confirmNewPass);
            };

            $scope.makeAdmin = function (userId) {
                usersService.makeAdmin(userId);
            };

            $scope.addProject = function (name, description, leadId, labels, priorities) {
                projectsService.add(name, description, leadId, labels, priorities);
            };

            $scope.editProject = function (id, name, description, leadId, labels, priorities) {
                projectsService.edit(id, name, description, leadId, labels, priorities);
            };

            $scope.getIssuesForProject = function (id) {
                issuesService.getAllFor(id);
            };

            $scope.getFilteredIssues = function (filter, pageSize, pageNumber) {
                issuesService.getFiltered('Priority.Name == "In Progress" or DueDate.Day == 21', pageSize, pageNumber);
            };

            $scope.getMyIssues = function (orderBy, pageSize, pageNumber) {
                issuesService.getAssignedToCurrentUser('Project.Name desc, IssueKey', pageSize, pageNumber);
            };

            $scope.getIssueById = function (id) {
                issuesService.getById(id);
            };

            $scope.addIssue = function (title, description, dueDate, projectId, assigneeId, priorityId, labels) {
                issuesService.add(title, description, dueDate, projectId, assigneeId, priorityId, labels);
            };

            $scope.updateIssue = function (id, title, description, dueDate, assigneeId, priorityId, labels) {
                issuesService.update(id, title, description, dueDate, assigneeId, priorityId, labels);
            };

            $scope.chaneIssueStatus = function (issueId, statusId) {
                issuesService.changeStatus(issueId, statusId);
            };

            $scope.getIssueComments = function (issueId) {
                issuesService.getComments(issueId);
            };

            $scope.addCommentToIssue = function (issueId, text) {
                issuesService.addComment(issueId, text);
            };
        }]);