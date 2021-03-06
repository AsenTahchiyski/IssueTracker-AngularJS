'use strict';

angular
    .module('issueTracker.services.users', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        'headerService',
        function usersService($http, $q, BASE_URL, headerService) {
            function register(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();
                var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
                $http.post(BASE_URL + 'api/Token', data, headerService.getWWWContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAll() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users/', headerService.getAuthHeader())
                    .then(function (success) {
                        var users = success.data.sort(function (a, b) {
                            return a.Username.localeCompare(b.Username);
                        });
                        deferred.resolve(users);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getCurrent() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users/me/', headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function isAdmin() {
                getCurrent().then(function (success) {
                    return success.isAdmin;
                })
            }

            function makeAdmin(userId) {
                var deferred = $q.defer();
                getCurrent().then(function (currentUser) {
                    if (!currentUser.isAdmin) {
                        console.error('Only admins can do that.');
                        return;
                    }

                    var data = 'UserId=' + userId;
                    $http.put(BASE_URL + 'users/makeadmin', data, headerService.getAuthAndWWWContentHeader())
                        .then(function (success) {
                            deferred.resolve(success);
                        }, function (error) {
                            deferred.reject(error);
                        });
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            }

            function changePassword(oldPass, newPass, confirmNewPass) {
                if (newPass != confirmNewPass) {
                    console.error('Passwords do not match.');
                    return;
                }

                var deferred = $q.defer();
                var data = 'OldPassword=' + oldPass + '&NewPassword=' + newPass + '&ConfirmPassword=' + confirmNewPass;
                $http.post(BASE_URL + 'api/Account/ChangePassword', data, headerService.getAuthAndWWWContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                register: register,
                login: login,
                getAll: getAll,
                getCurrent: getCurrent,
                changePassword: changePassword,
                makeAdmin: makeAdmin,
                isAdmin: isAdmin
            }
        }
    ]);