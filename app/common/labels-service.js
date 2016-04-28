"use strict";

angular
    .module('issueTracker.services.labels', [])
    .factory('labelsService', [
        '$http',
        '$q',
        'BASE_URL',
        'headerService',
        function labelsService($http, $q, BASE_URL, headerService) {
            function getFiltered(filter) {
                var url = BASE_URL + 'labels/?filter=' + (filter || '');
                var deferred = $q.defer();
                $http.get(url, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        console.error(error);
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            return {
                getFiltered: getFiltered
            }
        }
    ]);