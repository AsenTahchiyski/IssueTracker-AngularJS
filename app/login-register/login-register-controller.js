"use strict";

angular
    .module('issueTracker.controllers.loginRegister', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/login-register/login-register.html',
            controller: 'LoginRegisterCtrl'
        });
    }])
    .controller('LoginRegisterCtrl', [
        '$scope',
        'usersService',
        'currentUser',
        '$location',
        function LoginRegister($scope, usersService, currentUser, $location) {
            $scope.login = function (loginUser) {
                usersService.login(loginUser)
                    .then(function (success) {
                        currentUser.username = loginUser.email;
                        currentUser.authToken = success.data['access_token'];
                        sessionStorage['authToken'] = success.data['access_token'];
                        currentUser.isAdmin = loginUser.isAdmin || false;
                        currentUser.isLogged = true;
                        $location.path('/');
                    }, function (error) {
                        console.error(error);
                    })
            };

            $scope.register = function (regUser) {
                usersService.register(regUser)
                    .then(function () {
                        $scope.login(regUser);
                    }, function (error) {
                        console.error(error);
                    })
            };
        }
    ]);