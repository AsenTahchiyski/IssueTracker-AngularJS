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

            $scope.itemsPerPage = ISSUES_PER_PAGE;
            $scope.getIssues = function getIssues(issuesPageNumber) {
                issuesService.getAssignedToCurrentUser('DueDate', ISSUES_PER_PAGE, issuesPageNumber)
                    .then(function (success) {
                        $scope.assignedIssues = success.Issues;
                        $scope.assignedIssuesTotalNumber = success.length;
                    });
            };
            $scope.getIssues(1);

            // and a panel with all the projects that you are associated with (you have an assigned issue in them or you are a project leader)

            $scope.getLedProjects = function (pageNumberProjectsLead) {
                $scope.getLedProjectsCurrentPage = pageNumberProjectsLead;
                $scope.projectsWithIssuesAssigned = [];
                usersService.getCurrent()
                    .then(function (currentUserData) {
                        // get current user
                        projectsService.getByFilter('Lead.Username', currentUserData.Username, ISSUES_PER_PAGE, pageNumberProjectsLead)
                            .then(function (projects) {
                                $scope.totalLedProjects = projects.data.TotalCount;
                                // get projects led
                                $scope.projectsLead = projects.data.Projects;
                            }, function (error) {
                                console.error(error);
                            });
                    });
            };
            $scope.getLedProjects(1);

            $scope.totalProjectsIssue = 0;
            $scope.getProjectsWithAssignedIssues = function (pageNumberProjectIssues) {
                issuesService.getAssignedToCurrentUser('DueDate', ISSUES_PER_PAGE, pageNumberProjectIssues)
                    .then(function (issuesAssigned) {
                        // get all issues assigned
                        if (issuesAssigned.length > 0) {
                            issuesAssigned.forEach(function (i) {
                                // get the projects for them
                                projectsService.getById(i.Project.Id)
                                    .then(function (success) {
                                        $scope.totalProjectsIssue++;
                                        $scope.projectsWithIssuesAssigned.push(success);
                                    }, function (error) {
                                        console.error(error);
                                    })
                            })
                        }
                    }, function (error) {
                        console.error(error);
                    });
            };
            $scope.getProjectsWithAssignedIssues(1);

            // paging stuff
            $scope.pageParams = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE
            };
        }]);