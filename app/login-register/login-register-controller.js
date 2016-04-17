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
        'userAuth',
        'currentUser',
        '$location',
        function LoginRegister($scope, userAuth, currentUser, $location) {
            $scope.login = function (loginUser) {
                userAuth.login(loginUser)
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
                userAuth.register(regUser)
                    .then(function () {
                        $scope.login(regUser);
                    }, function (error) {
                        console.error(error);
                    })
            };
        }
    ]);