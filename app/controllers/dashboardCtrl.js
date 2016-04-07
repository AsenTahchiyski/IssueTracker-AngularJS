'use strict';

angular.module('issueTracker.dashboardCtrl', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', ['$scope',
        function DashboardCtrl($scope) {
            
        }]);