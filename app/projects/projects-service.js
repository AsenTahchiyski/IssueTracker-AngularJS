"use strict";

angular
    .module('issueTracker.services.projects', [])
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        'headerService',
        function projectsService($http, $q, BASE_URL, headerService) {
            function getById(id) {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/' + id, headerService.getAuthAndJSONContentHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAll() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/', headerService.getAuthAndJSONContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getByFilter(filter, value, pageSize, pageNumber) {
                // build URL
                var requestUrl = BASE_URL + 'projects/?' + 'pageSize=' + pageSize + '&pageNumber=' + pageNumber +
                                            '&filter=' + filter + '=="' + value + '"';
                var deferred = $q.defer();
                $http.get(requestUrl, headerService.getAuthAndJSONContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function add(name, description, leadId, labels, priorities) {
                // build project object
                var project = {
                    Description: description,
                    Labels: [],
                    LeadId: leadId,
                    Name: name,
                    Priorities: []
                };

                labels.forEach(function (l) {
                    project.Labels.push({Name: l});
                });

                priorities.forEach(function (p) {
                    project.Priorities.push({Name: p});
                });

                var projectKey = '';
                var nameSplit = name.split(/\s+/g);
                nameSplit.forEach(function (word) {
                    projectKey += word.charAt(0).toUpperCase();
                });
                project.ProjectKey = projectKey;

                var deferred = $q.defer();
                $http.post(BASE_URL + 'projects/', project, headerService.getAuthAndJSONContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function edit(id, name, description, leadId, labels, priorities) {
                // build project object
                var project = {
                    Description: description,
                    Labels: [],
                    LeadId: leadId,
                    Name: name,
                    Priorities: []
                };

                labels.forEach(function (l) {
                    project.Labels.push({Name: l});
                });

                priorities.forEach(function (p) {
                    project.Priorities.push({Name: p});
                });

                var deferred = $q.defer();
                $http.put(BASE_URL + 'projects/' + id, project, headerService.getAuthAndJSONContentHeader())
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getById: getById,
                getAll: getAll,
                getByFilter: getByFilter,
                add: add,
                edit: edit
            }
        }
    ]);