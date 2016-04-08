"use strict";

angular.module('issueTracker.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'Users/Register', user)
                    .then(function(success) {
                        deferred.resolve(success.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'Users/Login', user)
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