"use strict";

angular
    .module('issueTracker.services.users', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        function userAuth($http, $q, BASE_URL) {
            function register(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'Account/Register', user)
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
                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
                $http.post(BASE_URL + 'api/Token', data, config)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                register: register,
                login: login
            }
        }
    ]);