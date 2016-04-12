"use strict";

angular.module('issueTracker.dashboardCtrl', ['ngRoute', 'issueTracker.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'authentication',
        '$route',
        function DashboardCtrl($scope, $location, authentication, $route) {
            $scope.login = function (loginUser) {
                authentication.login(loginUser)
                    .then(function (loginUser) {
                        sessionStorage['authToken'] = loginUser.data['access_token'];
                        $route.reload();
                    });
            };

            $scope.register = function (regUser) {
                authentication.register(regUser)
                    .then(function () {
                        $scope.login(regUser);
                    });
            };

            $scope.logout = function() {
                sessionStorage['authToken'] = undefined;
                $scope.loggedIn = false;
                $scope.go('#/');
                $route.reload();
            };

            $scope.loggedIn = !!sessionStorage['authToken'];

            $scope.go = function (path) {
                $location.path(path);
            };
        }]);