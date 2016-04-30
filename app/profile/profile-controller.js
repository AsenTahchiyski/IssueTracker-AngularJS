"use strict";

angular
    .module('issueTracker.controllers.profile', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            controller: 'ProfileCtrl',
            templateUrl: 'app/profile/profile-template.html'
        });
    }])
    .controller('ProfileCtrl', [
        'usersService',
        '$scope',
        '$route',
        function ProfileCtrl(usersService, $scope, $route) {
            usersService.getCurrent()
                .then(function (success) {
                    $scope.currentUser = success;
                });

            $scope.changePass = function () {
                usersService.changePassword(
                    $scope.passwordChange.current,
                    $scope.passwordChange.new,
                    $scope.passwordChange.confirm)
                    .then(function (success) {
                        $('.modal-backdrop').remove();
                        $route.reload();
                    })
            }
        }
    ]);