"use strict";

angular.module('issueTracker.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function(success) {
                        deferred.resolve(success.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();
                var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
                var config = {
                    headers:  { 'Content-Type': 'application/x-www-form-urlencoded' }
                };
                $http.post(BASE_URL + 'Token', data, config)
                    .then(function(success) {
                        deferred.resolve(success);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                register: registerUser,
                login: loginUser
            }
        }]);