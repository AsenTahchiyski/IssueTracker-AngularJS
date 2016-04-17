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
        function LogoutCtrl($scope, $location, currentUser) {
            $scope.logout = function() {
                // TODO: show notification
                currentUser.authToken = undefined;
                currentUser.isAdmin = false;
                currentUser.isLogged = false;
                currentUser.username = undefined;
                sessionStorage.removeItem('authToken');
                $location.path('/login');
            };
        }]);
