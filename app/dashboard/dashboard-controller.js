"use strict";

angular
    .module('issueTracker.controllers.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'usersService',
        'issuesService',
        'labelsService',
        'ISSUES_PER_PAGE',
        function ($scope, $location, projectsService, usersService, issuesService, labelsService, ISSUES_PER_PAGE) {
            if (!sessionStorage['authToken']) {
                $location.path('/login');
            }

            // pagination params
            $scope.projectsParams1 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.projectsParams2 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.projectsParams3 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.itemsPerPage = ISSUES_PER_PAGE;

            // Panel with all issues assigned to the current user
            $scope.getIssues = function getIssues() {
                issuesService.getAssignedToCurrentUser('DueDate desc', $scope.projectsParams1.pageSize, $scope.projectsParams1.startPage)
                    .then(function (success) {
                        $scope.assignedIssues = success.Issues;
                        $scope.assignedIssuesTotalNumber = success.TotalCount;
                    });
            };
            $scope.getIssues();

            // Panel with projects led by the current user
            $scope.getLedProjects = function () {
                $scope.projectsWithIssuesAssigned = [];
                usersService.getCurrent()
                    .then(function (currentUserData) {
                        // get current user
                        $scope.isAdmin = currentUserData.isAdmin;
                        projectsService.getByFilter($scope.projectsParams2.pageSize, $scope.projectsParams2.startPage,
                            'Lead.Username', currentUserData.Username)
                            .then(function (projects) {
                                $scope.totalLedProjects = projects.data.TotalCount;
                                // get projects led
                                $scope.projectsLead = projects.data.Projects;
                            }, function (error) {
                                console.error(error);
                            });
                    });
            };
            $scope.getLedProjects();

            $scope.goToProject = function (id) {
                $location.path('projects/' + id)
            };

            $scope.goToIssue = function (id) {
                $location.path('issues/' + id);
            };

            $scope.go = function (path) {
                $location.path(path);
            };

            // Panel with all projects that have issues assigned to the current user
            $scope.getProjectsWithAssignedIssues = function () {
                $scope.totalProjectsWithIssuesAssigned = [];
                issuesService.getAssignedToCurrentUser('DueDate', $scope.projectsParams3.pageSize, $scope.projectsParams3.startPage)
                    .then(function (issuesAssigned) {
                        // get all issues assigned
                        var uniqueProjectIds = [];
                        if (issuesAssigned.Issues.length > 0) {
                            issuesAssigned.Issues.forEach(function (i) {
                                // get the projects id-s for them
                                uniqueProjectIds[i.Project.Id] = i.Project.Id;
                            });
                        }

                        if (uniqueProjectIds) {
                            // get the unique projects
                            uniqueProjectIds.forEach(function (id) {
                                projectsService.getById(id)
                                    .then(function (success) {
                                        $scope.totalProjectsWithIssuesAssigned.push(success);
                                    }, function (error) {
                                        console.error(error);
                                    })
                            });
                        }

                        $scope.totalProjectsIssues = $scope.totalProjectsWithIssuesAssigned.count || 0;
                    }, function (error) {
                        console.error(error);
                    })
            };
            $scope.getProjectsWithAssignedIssues();
        }]);