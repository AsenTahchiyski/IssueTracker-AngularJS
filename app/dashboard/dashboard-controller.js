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
        function ($scope, $location, projectsService) {
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
            }
        }]);