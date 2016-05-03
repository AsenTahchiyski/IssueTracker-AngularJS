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
                        notifier.success('great success');
                        console.log(success);
                        sessionStorage['authToken'] = success.data['access_token'];
                        $location.path('/');
                        usersService.getCurrent().then(function(userDetails) {
                            sessionStorage['userId'] = userDetails.Id;
                            sessionStorage['isAdmin'] = userDetails.isAdmin;
                            sessionStorage['username'] = userDetails.Username;
                        })
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