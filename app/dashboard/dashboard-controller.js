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
        function ($scope, $location, projectsService, usersService) {
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
            
            $scope.changePass = function(oldPass, newPass, confirmNewPass) {
                usersService.changePassword(oldPass, newPass, confirmNewPass);
            };
            
            $scope.makeAdmin = function(userId) {
                usersService.makeAdmin(userId);
            }
        }]);