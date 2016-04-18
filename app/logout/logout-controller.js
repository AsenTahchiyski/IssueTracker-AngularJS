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
        'currentUser',
        '$timeout',
        function ($scope, $location, currentUser, $timeout) {
            $scope.logout = function () {
                // TODO: show notification
                currentUser.authToken = undefined;
                currentUser.username = undefined;
                currentUser.isAdmin = false;
                currentUser.isLogged = false;
                sessionStorage.removeItem('authToken');
                $timeout(function() {
                    $scope.$apply(function() {
                        $location.path('/login');
                    });
                }, 100);
            };
        }]);
