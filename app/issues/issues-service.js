'use strict';

angular
    .module('issueTracker.services.issues', [])
    .factory('issuesService', [
        '$http',
        '$q',
        'BASE_URL',
        'headerService',
        function issuesService($http, $q, BASE_URL, headerService) {
            function getAllFor(projectId) {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/' + projectId + '/issues', headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getFiltered(filter, pageSize, pageNumber) {
                var url = BASE_URL + 'issues/?filter=' + filter;
                if (pageSize) {
                    url += '&pageSize=' + pageSize;
                }

                if (pageNumber) {
                    url += '&pageNumber=' + pageNumber;
                }

                var deferred = $q.defer();
                $http.get(url, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data.Issues);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAssignedToCurrentUser(orderBy, pageSize, pageNumber) {
                var url = BASE_URL + 'issues/me?orderBy=' + orderBy;
                if (pageSize) {
                    url += '&pageSize=' + pageSize;
                }

                if (pageNumber) {
                    url += '&pageNumber=' + pageNumber;
                }

                var deferred = $q.defer();
                $http.get(url, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getById(id) {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'issues/' + id, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // admin / lead
            function add(title, description, dueDate, projectId, assigneeId, priorityId, labels) {
                // build issue object
                var issue = {
                    Title: title,
                    Description: description,
                    DueDate: dueDate,
                    ProjectId: projectId,
                    AssigneeId: assigneeId,
                    PriorityId: priorityId,
                    Labels: []
                };

                labels.forEach(function (l) {
                    issue.Labels.push({Name: l});
                });
                var deferred = $q.defer();
                $http.post(BASE_URL + 'issues/', issue, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // admin / lead
            function update(id, title, description, dueDate, assigneeId, priorityId, labels) {
                // build issue object
                var issue = {
                    Title: title,
                    Description: description,
                    DueDate: dueDate,
                    AssigneeId: assigneeId,
                    PriorityId: priorityId,
                    Labels: []
                };

                labels.forEach(function (l) {
                    issue.Labels.push({Name: l});
                });

                var deferred = $q.defer();
                $http.put(BASE_URL + 'issues/' + id, issue, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // admin / lead / assignee
            function changeStatus(issueId, statusId) {
                var url = BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId;
                var deferred = $q.defer();
                $http.put(url, undefined, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getComments(issueId) {
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                var deferred = $q.defer();
                $http.get(url, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // lead / assignee
            function addComment(issueId, text) {
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                var deferred = $q.defer();
                $http.post(url, {Text: text}, headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getAllFor: getAllFor,
                getFiltered: getFiltered,
                getAssignedToCurrentUser: getAssignedToCurrentUser,
                getById: getById,
                add: add,
                update: update,
                changeStatus: changeStatus,
                getComments: getComments,
                addComment: addComment
            }
        }
    ]);