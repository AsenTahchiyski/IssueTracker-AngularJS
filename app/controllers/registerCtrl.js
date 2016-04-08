"use strict";

angular.module('issueTracker.registerCtrl', ['ngRoute', 'issueTracker.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'RegisterCtrl'
        });
    }])

    .controller('RegisterCtrl', [
        '$scope',
        '$location',
        'authentication',
        function RegisterCtrl($scope, $location, authentication) {
        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.register = function (user) {
            authentication.register(user)
                .then(function(registeredUser) {
                    console.log(registeredUser);
                })
        };
    }]);