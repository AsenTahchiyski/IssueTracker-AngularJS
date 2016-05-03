"use strict";

angular
    .module('issueTracker.controllers.logout', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutCtrl'
        });
    }])
    .controller('LogoutCtrl', [
        '$scope',
        '$location',
        '$timeout',
        'notifier',
        function ($scope, $location, $timeout, notifier) {
            $scope.logout = function () {
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('isAdmin');
                sessionStorage.removeItem('username');
                $timeout(function () {
                    $scope.$apply(function () {
                        $location.path('/login');
                        notifier.success('Logout successful.');
                    });
                }, 100);
            };
        }]);
