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
        function ($scope, $location, $timeout) {
            $scope.logout = function () {
                sessionStorage.removeItem('authToken');
                $timeout(function() {
                    $scope.$apply(function() {
                        $location.path('/login');
                    });
                }, 100);
            };
        }]);
