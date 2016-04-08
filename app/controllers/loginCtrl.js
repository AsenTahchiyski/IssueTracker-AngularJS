"use strict";

angular.module('issueTracker.loginCtrl', ['ngRoute', 'issueTracker.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', [
        '$scope', 
        '$location',
        'authentication',
        function LoginCtrl($scope, $location, authentication) {
        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.login = function(user) {
            authentication.login(user);
        }
    }]);