"use strict";

angular
    .module('issueTracker.services.projects', [])
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        function projectsService($http, $q, BASE_URL) {
            function getById(id) {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                };
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/' + id, config)
                    .then(function (success) {
                        deferred.resolve(success.data);
                        console.log(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAll() {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                };
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/', config)
                    .then(function (success) {
                        deferred.resolve(success);
                        console.log(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getByFilter (filter, value, pageSize, pageNumber) {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                };
                // build URL
                var requestUrl = BASE_URL + 'projects/?filter=' + filter + '="' + value + '"';
                if (pageSize) {
                    requestUrl += '&pageSize=' + pageSize;
                }

                if (pageNumber) {
                    requestUrl += '&pageNumber=' + pageNumber;
                }

                var deferred = $q.defer();
                $http.get(requestUrl, config)
                    .then(function (success) {
                        deferred.resolve(success);
                        console.log(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function add (name, description, leadId, labels, priorities) {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                };

                // build project object
                var project = {
                    Description: description,
                    Labels: [],
                    LeadId: leadId,
                    Name: name,
                    Priorities: []
                };
                
                labels.forEach(function(l) {
                    project.Labels.push({Name:l});
                });
                
                priorities.forEach(function(p) {
                    project.Priorities.push({Name:p});
                });
                
                var projectKey = '';
                var nameSplit = name.split(/\s+/g);
                nameSplit.forEach(function (word) {
                    projectKey += word.charAt(0).toUpperCase();
                });
                project.ProjectKey = projectKey;

                var deferred = $q.defer();
                $http.post(BASE_URL + 'projects/', project, config)
                    .then(function (success) {
                        deferred.resolve(success);
                        console.log(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function edit (id, name, description, leadId, labels, priorities) {
                var config = {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                };

                // build project object
                var project = {
                    Description: description,
                    Labels: [],
                    LeadId: leadId,
                    Name: name,
                    Priorities: []
                };

                labels.forEach(function(l) {
                    project.Labels.push({Name:l});
                });

                priorities.forEach(function(p) {
                    project.Priorities.push({Name:p});
                });

                var deferred = $q.defer();
                $http.put(BASE_URL + 'projects/' + id, project, config)
                    .then(function (success) {
                        deferred.resolve(success);
                        console.log(success);
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