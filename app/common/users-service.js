"use strict";

angular
    .module('issueTracker.services.users', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        'headerService',
        function userAuth($http, $q, BASE_URL, headerService) {
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
                        deferred.resolve(success.data);
                        console.log(success.data)
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

            function makeAdmin(userId) {
                getCurrent().then(function (currentUser) {
                    if (!currentUser.isAdmin) {
                        console.error('Only admins can do that.');
                        return;
                    }

                    var deferred = $q.defer();
                    var data = 'UserId=' + userId;
                    $http.put(BASE_URL + 'users/makeadmin', data, headerService.getAuthAndWWWContentHeader())
                        .then(function (success) {
                            deferred.resolve(success);
                        }, function (error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }, function (error) {
                    console.error(error);
                });
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
                makeAdmin: makeAdmin
            }
        }
    ]);