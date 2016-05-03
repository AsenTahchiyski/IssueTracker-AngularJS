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
        '$location',
        'notifier',
        function LoginRegister($scope, usersService, $location, notifier) {
            $scope.login = function (loginUser) {
                usersService.login(loginUser)
                    .then(function (success) {
                        sessionStorage['authToken'] = success.data['access_token'];
                        $location.path('/');
                        usersService.getCurrent().then(function(userDetails) {
                            notifier.success('Welcome, ' + userDetails.Username + '!');
                            sessionStorage['userId'] = userDetails.Id;
                            sessionStorage['isAdmin'] = userDetails.isAdmin;
                            sessionStorage['username'] = userDetails.Username;
                        })
                    }, function (error) {
                        notifier.error(error.data.error_description);
                    })
            };

            $scope.register = function (regUser) {
                usersService.register(regUser)
                    .then(function () {
                        notifier.success('Registration successful.');
                        $scope.login(regUser);
                    }, function (error) {
                        notifier.error(error.statusText);
                    })
            };
        }
    ]);