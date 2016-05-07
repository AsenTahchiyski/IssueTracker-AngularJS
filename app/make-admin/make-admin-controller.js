'use strict';

angular
    .module('issueTracker.controllers.makeAdmin', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/makeadmin', {
            templateUrl: 'app/make-admin/make-admin-template.html',
            controller: 'MakeAdminCtrl'
        });
    }])
    .controller('MakeAdminCtrl', [
        'usersService',
        'notifier',
        '$location',
        '$scope',
        function MakeAdminCtrl(usersService, notifier, $location, $scope) {
            if (!sessionStorage['authToken'] || !sessionStorage['isAdmin']) {
                $location.path('/');
            }

            usersService.getAll()
                .then(function (allUsers) {
                    $scope.allUsers = allUsers;
                });

            $scope.makeAdmin = function (userId) {
                usersService.makeAdmin(userId.Id)
                    .then(function (success) {
                        notifier.success(userId.Username + ' is now admin.');
                        $location.path('/');
                    }, function (error) {
                        notifier.error(error.data.Message);
                    })
            };

            $scope.toDashboard = function() {
                $location.path('/');
            }
        }
    ]);